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


export default function CodeStudio() {
  const [lang, setLang] = useState("Python"),
    [codes, setCodes] = useState(DEFAULT_CODES),
    [output, setOutput] = useState(
      "Run the selected example to see a simulated output.",
    );
  const run = () =>
    setOutput(
      lang === "Python"
        ? "Hello NEXORA!\nLesson 1\nLesson 2\nLesson 3\nLesson 4\nLesson 5"
        : lang === "C++"
          ? "Lesson 1\nLesson 2\nLesson 3\nLesson 4\nLesson 5"
          : "Hello NEXORA! (ÃƒÆ’Ã¢â‚¬â€5)",
    );
  return (
    <Section
      title="Code. Run. Learn."
      subtitle="Python, C++ and Blockly editor demos"
    >
      <div className="flex flex-wrap gap-3">
        {Object.keys(DEFAULT_CODES).map((l) => (
          <button
            key={l}
            className={lang === l ? "btn" : "btn-light"}
            onClick={() => {
              setLang(l);
              setOutput("Run the selected example to see output.");
            }}
          >
            {l}
          </button>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
        <Card>
          <h3 className="panel-title">{lang} Editor</h3>
          {lang === "Blockly" && (
            <div className="my-3 flex flex-wrap gap-2">
              {["Repeat", "If / Else", "Print", "Variable", "Math"].map((x) => (
                <button
                  onClick={() =>
                    setCodes((s) => ({
                      ...s,
                      Blockly: s.Blockly + "\n" + x.toUpperCase(),
                    }))
                  }
                  className="tag"
                  key={x}
                >
                  ÃƒÂ¯Ã‚Â¼Ã¢â‚¬Â¹ {x}
                </button>
              ))}
            </div>
          )}
          <textarea
            spellCheck={false}
            className="field mono mt-5 min-h-[300px] !bg-[#17233f] !text-[#a5eccb]"
            value={codes[lang]}
            onChange={(e) =>
              setCodes((s) => ({ ...s, [lang]: e.target.value }))
            }
          />
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="btn" onClick={run}>
              <Play size={17} />{" "}
              {lang === "C++"
                ? "Compile & Run"
                : lang === "Blockly"
                  ? "Run Blocks"
                  : "Run Code"}
            </button>
            <button
              className="btn-light"
              onClick={() => setCodes((s) => ({ ...s, [lang]: "" }))}
            >
              Clear
            </button>
            <button
              className="btn-light"
              onClick={() =>
                setCodes((s) => ({ ...s, [lang]: DEFAULT_CODES[lang] }))
              }
            >
              Reset example
            </button>
          </div>
        </Card>
        <Card>
          <h3 className="panel-title">Output console</h3>
          <pre className="mono mt-5 min-h-[270px] overflow-auto whitespace-pre-wrap rounded-xl bg-[#17233f] p-5 text-sm text-[#a2ebc7]">
            {output}
          </pre>
          <Notice>
            Demo output uses predefined sample responses. This project does not
            execute arbitrary Python/C++ code.
          </Notice>
        </Card>
      </div>
    </Section>
  );
}
