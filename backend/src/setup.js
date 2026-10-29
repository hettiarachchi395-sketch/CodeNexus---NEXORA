// Run once: npm run db:setup. SEEDS ARE DEMO DATA, not production user accounts.
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import bcrypt from 'bcryptjs';
import { pool } from './db.js';
const here=dirname(fileURLToPath(import.meta.url));
const sql=await readFile(resolve(here,'../../database/schema.sql'),'utf8');
const students=[
  ['Sara Perera','sara@nexora.demo'],['Nimal Silva','nimal@nexora.demo'],
  ['Ishani Fernando','ishani@nexora.demo'],['Alex Fernando','alex@nexora.demo'],
  ['Ayesha Fernando','ayesha@nexora.demo']
];
const courses=[
  ['robotics-arduino','Robotics & Arduino','🤖',[1380,1150,980,850,500]],
  ['python-programming','Python Programming','🐍',[1260,1100,960,640,440]],
  ['circuit-design','Circuit Design','⚡',[1230,1020,920,510,400]],
  ['cpp-foundations','C++ Foundations','💻',[1300,990,850,470,390]],
  ['smart-iot-sensors','Smart IoT & Sensors','📡',[1150,1050,870,390,310]],
  ['creative-blockly','Creative Blockly','🧩',[1120,970,760,230,200]]
];
const quizBank=[
  [['Which board uses the ATmega328P microcontroller?','Arduino Uno','ESP32','Raspberry Pi 5','micro:bit'],['What does PWM stand for?','Pulse Width Modulation','Power Wave Memory','Parallel Wire Module','Pulse Work Mode'],['What is the purpose of pinMode() in Arduino?','Configure a pin as INPUT or OUTPUT','Create a loop','Read serial data','Delay the program'],['Which signal does analogRead() measure on Arduino Uno?','Analog voltage through ADC','Only digital HIGH/LOW','Wi-Fi strength','Clock frequency'],['Which programming language is commonly used in Arduino sketches?','C/C++','SQL','HTML','Bash']],
  [['Which keyword defines a function in Python?','def','function','fun','method'],['What does len([1,2,3]) return?','3','2','4','1'],['Which data type is mutable?','list','tuple','str','int'],['What starts a comment in Python?','#','//','<!--','/*'],['Which loop iterates over a sequence?','for','when','repeat-until','switch']],
  [['Ohm’s law is?','V = I × R','P = I + R','V = R / I','I = V × R'],['An LED is usually protected with a?','Series resistor','Capacitor in parallel only','Transformer','Crystal'],['Which unit measures resistance?','Ohm','Volt','Ampere','Watt'],['What component stores electric charge?','Capacitor','Diode','Fuse','Switch'],['Which tool measures voltage?','Voltmeter','Tachometer','Thermometer','Altimeter']],
  [['Which operator accesses a C++ class member via object?','.','::','->','&'],['Which keyword declares a class?','class','structonly','object','define'],['Which header provides std::cout?','<iostream>','<vector>','<string>','<cmath>'],['Which is a valid C++ loop keyword?','while','repeat','until','iterate'],['Which symbol starts a single-line C++ comment?','//','##','<!--','**']],
  [['What does IoT stand for?','Internet of Things','Input of Technology','Internet of Tools','Integrated Online Transfer'],['Which protocol is commonly used by IoT devices for publish/subscribe?','MQTT','FTP','SMTP','POP3'],['ESP32 is capable of which built-in wireless connections?','Wi-Fi and Bluetooth','Satellite only','Zigbee only','NFC only'],['What does a temperature sensor measure?','Temperature','Altitude only','Voltage only','Pressure only'],['What is a typical IoT sensor purpose?','Collect environmental data','Render HTML only','Store video frames','Compile C++ only']],
  [['What does a repeat block do?','Runs blocks multiple times','Deletes a sprite','Renames a project','Changes username'],['Which block represents a logical choice?','if / else','wait','say','play sound'],['In block coding, an event can be triggered by?','Clicking a green flag','Opening a text file','Formatting a disk','Changing a database'],['What is a variable used for?','Store a value','Draw pixels only','Connect USB only','Mute audio only'],['Which block lets you compare two values?','greater than operator','sound block','costume block','motion step']]
];
const client=await pool.connect();
try{
 await client.query('BEGIN');
 await client.query(sql);
 const hash=await bcrypt.hash('Demo1234!',12);
 for(const [name,email] of students){await client.query('INSERT INTO students(full_name,email,password_hash) VALUES($1,$2,$3) ON CONFLICT(email) DO NOTHING',[name,email,hash]);}
 for(let i=0;i<courses.length;i++){
   const [slug,title,icon,xps]=courses[i];
   const c=(await client.query('INSERT INTO courses(slug,title,icon) VALUES($1,$2,$3) ON CONFLICT(slug) DO UPDATE SET title=EXCLUDED.title,icon=EXCLUDED.icon RETURNING id',[slug,title,icon])).rows[0];
   for(let j=0;j<students.length;j++){
     const s=(await client.query('SELECT id FROM students WHERE email=$1',[students[j][1]])).rows[0];
     await client.query('INSERT INTO enrollments(student_id,course_id) VALUES($1,$2) ON CONFLICT DO NOTHING',[s.id,c.id]);
     const recorded=(await client.query("SELECT 1 FROM xp_ledger WHERE student_id=$1 AND course_id=$2 AND source='historical_seed'",[s.id,c.id])).rowCount;
     if(!recorded){
       await client.query("INSERT INTO xp_ledger(student_id,course_id,amount,source) VALUES($1,$2,$3,'historical_seed')",[s.id,c.id,xps[j]]);
       await client.query('UPDATE enrollments SET total_xp=total_xp+$3 WHERE student_id=$1 AND course_id=$2',[s.id,c.id,xps[j]]);
     }
   }
   const quiz=(await client.query('INSERT INTO quizzes(course_id,title) SELECT $1,$2 WHERE NOT EXISTS(SELECT 1 FROM quizzes WHERE course_id=$1 AND title=$2) RETURNING id',[c.id,`${title} · Fundamentals Check`])).rows[0];
   if(quiz){
    for(let n=0;n<quizBank[i].length;n++){
      const [prompt,...options]=quizBank[i][n];
      const q=(await client.query('INSERT INTO questions(quiz_id,prompt,position) VALUES($1,$2,$3) RETURNING id',[quiz.id,prompt,n+1])).rows[0];
      for(let k=0;k<options.length;k++){
        const sourceIndex=(k+n+i)%options.length;
        await client.query('INSERT INTO choices(question_id,text,is_correct) VALUES($1,$2,$3)',[q.id,options[sourceIndex],sourceIndex===0]);
      }
    }
   }
 }
 await client.query('COMMIT');
 console.log('Database schema + six courses + five students + six quizzes seeded.');
 console.log('Demo sign-in: alex@nexora.demo / Demo1234!');
} catch(e){await client.query('ROLLBACK');console.error(e);process.exitCode=1;}
finally{client.release();await pool.end();}
