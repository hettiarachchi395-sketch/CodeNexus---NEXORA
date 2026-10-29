import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateXP,evaluateAnswers} from '../src/xp.js';
test('10 XP per correct answer; none for wrong',()=>{
 assert.equal(calculateXP(0),0);assert.equal(calculateXP(3),30);assert.equal(calculateXP(5),50);
});
test('invalid counts are rejected',()=>{
 assert.throws(()=>calculateXP(-1));assert.throws(()=>calculateXP(1.5));
});
const questions=[{id:1,choices:[{id:11,isCorrect:true},{id:12,isCorrect:false}]},{id:2,choices:[{id:21,isCorrect:false},{id:22,isCorrect:true}]}];
test('answers are marked securely against server keys',()=>{
 const r=evaluateAnswers(questions,[{questionId:1,choiceId:11},{questionId:2,choiceId:21}]);
 assert.equal(r.correctCount,1);assert.equal(r.earnedXP,10);
});
test('duplicate, missing and wrong-quiz option ids rejected',()=>{
 assert.throws(()=>evaluateAnswers(questions,[{questionId:1,choiceId:11}]));
 assert.throws(()=>evaluateAnswers(questions,[{questionId:1,choiceId:11},{questionId:1,choiceId:11}]));
 assert.throws(()=>evaluateAnswers(questions,[{questionId:1,choiceId:22},{questionId:2,choiceId:21}]));
});
