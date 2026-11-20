import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import * as Icons from "lucide-react";
import { useLeaderboardCourses, useCourseLeaderboard, submitDemoResult } from "../leaderboardApi.js";
import { Card, Notice, Section } from "../components/ui.jsx";
import CourseCards from "../components/CourseCards.jsx";
import { COURSES } from "../data/courses.js";
import { ASSIGNMENTS, QUIZ, DEFAULT_CODES, VIDEOS, INITIAL_ORDERS } from "../data/appData.js";
const { ArrowRight, AlertTriangle, Bell, BookOpen, Brain, CalendarDays, Camera, CameraOff, CheckCircle, CheckCircle2, ChevronRight, ClipboardList, Code2, Download, ExternalLink, FileText, Filter, GraduationCap, Hand, Home, LogIn, LogOut, MapPin, Menu, Mic, MicOff, Monitor, Package, Play, PlayCircle, Plus, RotateCcw, Search, Send, Shapes, ShoppingBag, ShoppingCart, ShieldCheck, Sparkles, Star, Trash2, Trophy, Upload, User, UserPlus, Video, X, Clock } = Icons;
const money = (n) => "LKR " + Number(n).toLocaleString("en-LK");


export default function Quiz({ onResult, result }) {
  let [answers, setAnswers] = useState({}),
    [done, setDone] = useState(false);
  const score = QUIZ.reduce(
      (acc, x, i) => acc + (answers[i] === x.correct ? 1 : 0),
      0,
    ),
    nav = useNavigate();
  return (
    <Section
      title="Python Fundamentals Quiz"
      subtitle="Automatic grading preview Ãƒâ€šÃ‚Â· Topic: Loops and Functions"
    >
      <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
        <Card>
          {QUIZ.map((q, i) => (
            <div key={q.q} className="mb-7 border-b border-[#e8effb] pb-6">
              <h3 className="mb-4 font-bold">
                Question {i + 1}: {q.q}
              </h3>
              <div className="space-y-2">
                {q.options.map((o, j) => (
                  <label
                    key={o}
                    className={
                      "flex cursor-pointer items-center gap-3 rounded-xl p-3 " +
                      (answers[i] === j ? "bg-[#e2eaff]" : "bg-[#f6f8ff]")
                    }
                  >
                    <input
                      type="radio"
                      name={"q" + i}
                      checked={answers[i] === j}
                      onChange={() => setAnswers((a) => ({ ...a, [i]: j }))}
                    />
                    {o}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            className="btn"
            disabled={Object.keys(answers).length !== QUIZ.length}
            onClick={() => {
              setDone(true);
              onResult({
                score,
                percentage: Math.round((score / QUIZ.length) * 100),
                topics: {
                  Loops: answers[0] === 0 && answers[1] === 0 ? 100 : 40,
                  Functions: answers[2] === 1 ? 100 : 0,
                },
              });
            }}
          >
            Submit quiz
          </button>
          {done && (
            <div className="mt-5 rounded-xl bg-[#e5f8f1] p-5">
              <h3 className="text-xl font-bold text-emerald-800">
                Score: {score}/{QUIZ.length}
              </h3>
              <p className="mt-2 text-sm text-emerald-700">
                Your quiz score is saved in this browser demo. XP is awarded by
                the backend after an evaluated result is submitted.
              </p>
              <Link className="btn mt-4" to="/student/recommendations">
                View skill recommendations
              </Link>
            </div>
          )}
        </Card>
        <Card>
          <h3 className="panel-title">Quiz information</h3>
          <p className="muted mt-3">3 multiple-choice questions</p>
          <p className="muted mt-2">Auto-graded Ãƒâ€šÃ‚Â· Topic tags Ãƒâ€šÃ‚Â· XP award</p>
        </Card>
      </div>
    </Section>
  );
}
