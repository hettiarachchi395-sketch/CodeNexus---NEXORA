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


export default function Live() {
  const [messages, setMessages] = useState([
      { who: "Ms. Nethmi", text: "Connect the LED to Arduino pin 13." },
      { who: "Alex", text: "Why do we need a 220ÃƒÅ½Ã‚Â© resistor?" },
      { who: "Ms. Nethmi", text: "To limit current and protect the LED." },
    ]),
    [draft, setDraft] = useState(""),
    [mic, setMic] = useState(false),
    [cam, setCam] = useState(false);
  return (
    <Section
      title="LIVE Ãƒâ€šÃ‚Â· Robotics Lab"
      subtitle="WebRTC-style classroom layout Ãƒâ€šÃ‚Â· 24 participants Ãƒâ€šÃ‚Â· Demo"
    >
      <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
        <Card>
          <h3 className="panel-title">Ms. Nethmi is presenting</h3>
          <div className="relative mt-5 grid min-h-[350px] place-items-center overflow-hidden rounded-2xl bg-[#17243f] text-white">
            <span className="absolute left-5 top-5 rounded-lg bg-[#3a4f78] px-4 py-2 text-xs font-bold">
              ÃƒÂ¢Ã¢â‚¬â€Ã‚Â LIVE Ãƒâ€šÃ‚Â· 24 participants
            </span>
            <div className="text-center">
              <Monitor size={69} className="mx-auto mb-4 text-[#c8d7ff]" />
              <p className="font-bold">
                Instructor video / screen share preview
              </p>
              <p className="mt-2 text-xs text-[#a2b6d9]">
                Video streaming requires WebRTC/LiveKit integration.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button className="btn-light" onClick={() => setMic(!mic)}>
              {mic ? <Mic /> : <MicOff />} Mic {mic ? "On" : "Off"}
            </button>
            <button className="btn-light" onClick={() => setCam(!cam)}>
              {cam ? <Camera /> : <CameraOff />} Camera {cam ? "On" : "Off"}
            </button>
            <button
              className="btn-light"
              onClick={() => alert("Raise hand sent (demo).")}
            >
              <Hand /> Raise hand
            </button>
            <Link className="btn-light" to="/student/quiz">
              Live quiz
            </Link>
          </div>
          <Notice>
            Chat and device toggles are local UI demos; this is not a connected
            live classroom.
          </Notice>
        </Card>
        <Card>
          <h3 className="panel-title">Class discussion</h3>
          <p className="muted mb-4 mt-1">
            Ask the instructor questions during the lesson.
          </p>
          <div className="min-h-[350px] space-y-3 overflow-auto rounded-xl bg-[#f3f6ff] p-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  "rounded-xl p-3 text-sm " +
                  (m.who === "Alex" ? "bg-[#e0e9ff]" : "bg-white")
                }
              >
                <b className="text-[#506cc3]">{m.who}</b>
                <p className="mt-1 text-[#5b6e96]">{m.text}</p>
              </div>
            ))}
          </div>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (draft.trim()) {
                setMessages((s) => [...s, { who: "Alex", text: draft }]);
                setDraft("");
              }
            }}
          >
            <input
              className="field min-w-0"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your question..."
            />
            <button className="btn !px-3" aria-label="Send message">
              <Send size={17} />
            </button>
          </form>
        </Card>
      </div>
    </Section>
  );
}
