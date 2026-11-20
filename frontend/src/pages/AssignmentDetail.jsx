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


export default function AssignmentDetail({ submissions, setSubmissions }) {
  let { id } = useParams(),
    a = ASSIGNMENTS.find((x) => x.id === id);
  let [code, setCode] = useState(
    a?.id === "arduino"
      ? "void setup() { pinMode(13, OUTPUT); }\nvoid loop() { digitalWrite(13, HIGH); delay(1000); digitalWrite(13, LOW); delay(1000); }"
      : "for i in range(1, 11):\n    print(i)",
  );
  let [explanation, setExplanation] = useState(""),
    [file, setFile] = useState(""),
    [review, setReview] = useState(false),
    nav = useNavigate();
  if (!a) return <Navigate to="/student/assignments" />;
  const send = () => {
    setSubmissions((s) => ({
      ...s,
      [id]: { code, explanation, file, submittedAt: new Date().toISOString() },
    }));
    nav("/student/assignments/confirmation/" + id);
  };
  return (
    <Section title={a.title} subtitle={a.course + " Ãƒâ€šÃ‚Â· Due " + a.due}>
      <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
        <Card>
          <h3 className="panel-title">Assignment requirements</h3>
          <ol className="mt-5 list-inside list-decimal space-y-3 text-sm text-[#597096]">
            {a.tasks.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
          <div className="mt-6">
            <label className="font-semibold">Code / solution</label>
            <textarea
              className="field mono mt-2 !bg-[#192542] !text-[#b8edda]"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={8}
            />
          </div>
          <div className="mt-4">
            <label className="font-semibold">Explanation</label>
            <textarea
              className="field mt-2"
              rows={4}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Explain your code and circuit design..."
            />
          </div>
          <div className="mt-4">
            <label className="font-semibold">
              Attach evidence (local UI demo)
            </label>
            <input
              type="file"
              className="field mt-2"
              onChange={(e) => setFile(e.target.files?.[0]?.name || "")}
            />
            {file && <p className="muted mt-1">Selected: {file}</p>}
          </div>
          <button
            className="btn mt-5"
            disabled={!code.trim() || !explanation.trim()}
            onClick={() => setReview(true)}
          >
            Review submission <ArrowRight size={16} />
          </button>
        </Card>
        <Card>
          <h3 className="panel-title">Submission checklist</h3>
          {[
            "Source code included",
            "Explanation provided",
            "Evidence optional",
            "Confirm original work",
          ].map((x, i) => (
            <p key={x} className="muted mt-5">
              {(i === 0 && code.trim()) ||
              (i === 1 && explanation.trim()) ||
              (i === 2 && file)
                ? "ÃƒÂ¢Ã…â€œÃ¢â‚¬Å“"
                : "ÃƒÂ¢Ã¢â‚¬â€Ã¢â‚¬Â¹"}{" "}
              {x}
            </p>
          ))}
          <Notice>
            Frontend demo: selecting a file does not upload it to a server.
          </Notice>
        </Card>
      </div>
      {review && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-[#17264a]/60 p-4">
          <Card className="max-w-lg">
            <h2 className="panel-title">Confirm submission</h2>
            <p className="muted mt-3">{a.title}</p>
            <p className="mt-4 text-sm">Selected file: {file || "None"}</p>
            <p className="muted mt-2">
              I confirm this submission is my original work.
            </p>
            <div className="mt-6 flex gap-3">
              <button className="btn-light" onClick={() => setReview(false)}>
                Edit draft
              </button>
              <button className="btn" onClick={send}>
                Confirm & submit
              </button>
            </div>
          </Card>
        </div>
      )}
    </Section>
  );
}
