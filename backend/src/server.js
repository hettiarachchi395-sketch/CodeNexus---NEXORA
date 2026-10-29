import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { pool } from './db.js';
import { evaluateAnswers } from './xp.js';

if(!process.env.JWT_SECRET || process.env.JWT_SECRET.length<32){
 throw new Error('JWT_SECRET must be at least 32 characters. Configure backend/.env');
}
const app=express();
app.disable('x-powered-by');
app.use(helmet({contentSecurityPolicy:process.env.NODE_ENV==='production'?undefined:false}));
app.use(express.json({limit:'32kb'}));
app.use(cookieParser());
const FRONTEND_ORIGIN=process.env.FRONTEND_ORIGIN;
app.use((req,res,next)=>{
 if(['POST','PUT','PATCH','DELETE'].includes(req.method) && req.get('origin') && FRONTEND_ORIGIN && req.get('origin')!==FRONTEND_ORIGIN){
   return res.status(403).json({message:'Untrusted request origin'});
 }
 next();
});
const authLimit=rateLimit({windowMs:15*60*1000,limit:15,standardHeaders:'draft-7',legacyHeaders:false});
const cookieOpts={httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:8*60*60*1000};
const mustAuth=(req,res,next)=>{
 try{
   const token=req.cookies.nexora_session;
   if(!token)return res.status(401).json({message:'Please sign in'});
   const decoded=jwt.verify(token,process.env.JWT_SECRET,{algorithms:['HS256']});
   req.studentId=Number(decoded.sub);
   if(!Number.isSafeInteger(req.studentId))throw Error('Invalid token');
   next();
 }catch{return res.status(401).json({message:'Session expired. Sign in again'});}
};
const integer=(value)=>{const x=Number(value);return Number.isSafeInteger(x)&&x>0?x:null;};
const jsonError=(res,e)=>{console.error(e);return res.status(e.status||500).json({message:e.status?e.message:'An unexpected server error occurred'});};
async function enrolled(client,studentId,courseId,lock=false){
 const r=await client.query(`SELECT student_id,course_id,total_xp FROM enrollments WHERE student_id=$1 AND course_id=$2 ${lock?'FOR UPDATE':''}`,[studentId,courseId]);
 return r.rows[0];
}
async function quizQuestions(client,quizId,includeCorrect){
 const {rows}=await client.query(`SELECT q.id AS question_id,q.prompt,q.position,c.id AS choice_id,c.text AS choice_text ${includeCorrect?',c.is_correct':''}
 FROM questions q JOIN choices c ON c.question_id=q.id WHERE q.quiz_id=$1 ORDER BY q.position,c.id`,[quizId]);
 const groups=new Map();
 for(const r of rows){
  if(!groups.has(r.question_id))groups.set(r.question_id,{id:r.question_id,prompt:r.prompt,choices:[]});
  const choice={id:r.choice_id,text:r.choice_text};
  if(includeCorrect)choice.isCorrect=r.is_correct;
  groups.get(r.question_id).choices.push(choice);
 }
 return [...groups.values()];
}
app.get('/api/health',async(req,res)=>{
 try{await pool.query('SELECT 1');res.json({status:'ok',database:'connected'});}
 catch{res.status(503).json({status:'error',database:'unavailable'});}
});
app.post('/api/auth/login',authLimit,async(req,res)=>{
 const email=typeof req.body?.email==='string'?req.body.email.trim().toLowerCase():'';
 const password=typeof req.body?.password==='string'?req.body.password:'';
 if(!email||!password)return res.status(400).json({message:'Email and password required'});
 try{
  const {rows}=await pool.query('SELECT id,full_name,email,password_hash FROM students WHERE email=$1',[email]);
  const u=rows[0];
  if(!u||!(await bcrypt.compare(password,u.password_hash)))return res.status(401).json({message:'Invalid email or password'});
  const token=jwt.sign({},process.env.JWT_SECRET,{algorithm:'HS256',subject:String(u.id),expiresIn:'8h'});
  res.cookie('nexora_session',token,cookieOpts);
  res.json({student:{id:u.id,fullName:u.full_name,email:u.email}});
 }catch(e){jsonError(res,e);}
});
app.post('/api/auth/logout',mustAuth,(req,res)=>{
 res.clearCookie('nexora_session',{path:'/',sameSite:'strict',httpOnly:true,secure:cookieOpts.secure});res.json({ok:true});
});
app.get('/api/auth/me',mustAuth,async(req,res)=>{
 try{const r=await pool.query('SELECT id,full_name,email FROM students WHERE id=$1',[req.studentId]);if(!r.rows[0])return res.status(401).json({message:'Account not found'});const u=r.rows[0];res.json({student:{id:u.id,fullName:u.full_name,email:u.email}});}
 catch(e){jsonError(res,e);}
});
app.get('/api/courses',mustAuth,async(req,res)=>{
 try{
 const r=await pool.query(`SELECT c.id,c.slug,c.title,c.icon,e.total_xp AS "myXP"
 FROM courses c JOIN enrollments e ON e.course_id=c.id WHERE e.student_id=$1 ORDER BY c.id`,[req.studentId]);
 res.json({courses:r.rows});
 }catch(e){jsonError(res,e);}
});
app.get('/api/courses/:courseId/leaderboard',mustAuth,async(req,res)=>{
 const courseId=integer(req.params.courseId);if(!courseId)return res.status(400).json({message:'Invalid course ID'});
 try{
 const e=await enrolled(pool,req.studentId,courseId);if(!e)return res.status(403).json({message:'Not enrolled in this course'});
 const c=(await pool.query('SELECT id,title,icon FROM courses WHERE id=$1',[courseId])).rows[0];
 const r=await pool.query(`SELECT s.id AS "studentId",s.full_name AS "fullName",e.total_xp AS "totalXP",
 ROW_NUMBER() OVER (ORDER BY e.total_xp DESC,s.id ASC)::int AS rank
 FROM enrollments e JOIN students s ON s.id=e.student_id WHERE e.course_id=$1
 ORDER BY e.total_xp DESC,s.id ASC LIMIT 100`,[courseId]);
 res.json({course:c,rows:r.rows,myRank:r.rows.find(x=>x.studentId===req.studentId)?.rank??null,myXP:e.total_xp});
 }catch(err){jsonError(res,err);}
});
app.get('/api/courses/:courseId/quizzes',mustAuth,async(req,res)=>{
 const courseId=integer(req.params.courseId);if(!courseId)return res.status(400).json({message:'Invalid course ID'});
 try{
 if(!await enrolled(pool,req.studentId,courseId))return res.status(403).json({message:'Not enrolled'});
 const r=await pool.query(`SELECT q.id,q.title,a.id IS NOT NULL AS completed,
 a.earned_xp AS "earnedXP",a.correct_count AS "correctCount",a.question_count AS "questionCount"
 FROM quizzes q LEFT JOIN quiz_attempts a ON a.quiz_id=q.id AND a.student_id=$2 WHERE q.course_id=$1 ORDER BY q.id`,[courseId,req.studentId]);
 res.json({quizzes:r.rows});
 }catch(e){jsonError(res,e);}
});
app.get('/api/quizzes/:quizId',mustAuth,async(req,res)=>{
 const quizId=integer(req.params.quizId);if(!quizId)return res.status(400).json({message:'Invalid quiz ID'});
 try{
 const q=(await pool.query('SELECT id,course_id,title FROM quizzes WHERE id=$1',[quizId])).rows[0];
 if(!q)return res.status(404).json({message:'Quiz not found'});
 if(!await enrolled(pool,req.studentId,q.course_id))return res.status(403).json({message:'Not enrolled'});
 const attempt=(await pool.query('SELECT id,correct_count,question_count,earned_xp FROM quiz_attempts WHERE student_id=$1 AND quiz_id=$2',[req.studentId,quizId])).rows[0];
 const questions=attempt?[]:await quizQuestions(pool,quizId,false);
 res.json({quiz:{id:q.id,courseId:q.course_id,title:q.title},completed:Boolean(attempt),attempt:attempt?{correctCount:attempt.correct_count,questionCount:attempt.question_count,earnedXP:attempt.earned_xp}:null,questions});
 }catch(e){jsonError(res,e);}
});
app.post('/api/quizzes/:quizId/submit',mustAuth,async(req,res)=>{
 const quizId=integer(req.params.quizId);if(!quizId)return res.status(400).json({message:'Invalid quiz ID'});
 if(!Array.isArray(req.body?.answers))return res.status(400).json({message:'answers must be an array'});
 const client=await pool.connect();
 try{
  await client.query('BEGIN');
  const q=(await client.query('SELECT id,course_id FROM quizzes WHERE id=$1',[quizId])).rows[0];
  if(!q)throw Object.assign(Error('Quiz not found'),{status:404});
  // Lock the enrollment: two concurrent submissions cannot both award XP.
  const enr=await enrolled(client,req.studentId,q.course_id,true);
  if(!enr)throw Object.assign(Error('Not enrolled'),{status:403});
  const old=(await client.query('SELECT correct_count,question_count,earned_xp FROM quiz_attempts WHERE student_id=$1 AND quiz_id=$2',[req.studentId,quizId])).rows[0];
  if(old){await client.query('ROLLBACK');return res.status(409).json({message:'Quiz already completed. XP cannot be awarded twice.',alreadyCompleted:true,attempt:{correctCount:old.correct_count,questionCount:old.question_count,earnedXP:old.earned_xp}});}
  const questions=await quizQuestions(client,quizId,true);
  if(!questions.length)throw Object.assign(Error('Quiz has no questions'),{status:409});
  const result=evaluateAnswers(questions,req.body.answers);
  const attempt=(await client.query('INSERT INTO quiz_attempts(student_id,quiz_id,correct_count,question_count,earned_xp) VALUES($1,$2,$3,$4,$5) RETURNING id',[req.studentId,quizId,result.correctCount,result.totalQuestions,result.earnedXP])).rows[0];
  for(const a of result.results){await client.query('INSERT INTO attempt_answers(attempt_id,question_id,choice_id,is_correct) VALUES($1,$2,$3,$4)',[attempt.id,a.questionId,a.choiceId,a.correct]);}
  await client.query("INSERT INTO xp_ledger(student_id,course_id,quiz_attempt_id,amount,source) VALUES($1,$2,$3,$4,'quiz')",[req.studentId,q.course_id,attempt.id,result.earnedXP]);
  const updated=(await client.query('UPDATE enrollments SET total_xp=total_xp+$3 WHERE student_id=$1 AND course_id=$2 RETURNING total_xp',[req.studentId,q.course_id,result.earnedXP])).rows[0];
  await client.query('COMMIT');
  res.status(201).json({message:'Quiz submitted successfully',correctCount:result.correctCount,totalQuestions:result.totalQuestions,earnedXP:result.earnedXP,newCourseXP:updated.total_xp,results:result.results});
 }catch(e){await client.query('ROLLBACK').catch(()=>{});jsonError(res,e);}
 finally{client.release();}
});
// Host the built SPA on the same origin when deploying a single server.
if(process.env.NODE_ENV==='production'){
 const dir=resolve(dirname(fileURLToPath(import.meta.url)),'../../frontend/dist');
 app.use(express.static(dir));
 app.get('*',(req,res)=>res.sendFile(resolve(dir,'index.html')));
}
const port=Number(process.env.PORT||4000);
const server=app.listen(port,()=>console.log(`NEXORA Leaderboard API: http://localhost:${port}`));
process.on('SIGTERM',()=>{server.close(()=>pool.end());});
