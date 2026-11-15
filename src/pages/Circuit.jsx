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


export default function Circuit() {
  const [parts, setParts] = useState([
      "Arduino UNO",
      "Breadboard",
      "LED",
      "220ÃƒÅ½Ã‚Â© resistor",
      "Wire",
    ]),
    [wires, setWires] = useState(true),
    [status, setStatus] = useState(null);
  const good =
    parts.includes("LED") &&
    parts.includes("220ÃƒÅ½Ã‚Â© resistor") &&
    parts.includes("Arduino UNO") &&
    wires;
  const validate = () => setStatus(good ? "working" : "error");
  return (
    <Section
      title="Circuit Lab"
      subtitle="Visual component selection and rule-based demo circuit checker"
    >
      <div className="grid gap-5 xl:grid-cols-[220px_1fr_260px]">
        <Card>
          <h3 className="panel-title">Components</h3>
          <div className="mt-5 space-y-3">
            {[
              "Arduino UNO",
              "Breadboard",
              "LED",
              "220ÃƒÅ½Ã‚Â© resistor",
              "Button",
              "Battery",
              "Wire",
              "Ultrasonic sensor",
            ].map((x) => (
              <button
                className="btn-light !justify-start w-full !px-3 text-xs"
                key={x}
                onClick={() => setParts((s) => (s.includes(x) ? s : [...s, x]))}
              >
                <Plus size={14} /> {x}
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="panel-title">Circuit designer canvas</h3>
          <div className="grid-circuit mt-4 min-h-[395px] rounded-xl border border-[#dbe5fa] bg-[#f6f9ff] p-4">
            <div className="mb-5 flex flex-wrap gap-3">
              {parts.map((x) => (
                <button
                  key={x}
                  className="rounded-lg border border-[#bcd0f0] bg-white px-3 py-2 text-xs font-semibold"
                  onClick={() => {
                    setParts((s) => s.filter((y) => y !== x));
                    setStatus(null);
                  }}
                  title="Click to remove"
                >
                  {x === "LED"
                    ? "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡"
                    : x === "Arduino UNO"
                      ? "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ…â€™"
                      : x === "Breadboard"
                        ? "ÃƒÂ¢Ã¢â‚¬â€œÃ‚Â¦"
                        : "ÃƒÂ¢Ã…Â¡Ã‚Â¡"}{" "}
                  {x} ÃƒÆ’Ã¢â‚¬â€
                </button>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <div className="rounded-xl bg-[#b7c9f0] p-8 font-extrabold text-[#3151a0]">
                ARDUINO UNO
              </div>
              <span className="font-bold text-[#5979d7]">ÃƒÂ¢Ã¢â‚¬ÂÃ‚ÂÃƒÂ¢Ã¢â‚¬ÂÃ‚ÂÃƒÂ¢Ã¢â‚¬ÂÃ‚Â</span>
              <div className="rounded-xl bg-[#e3eaf6] p-8 font-bold text-[#4f6195]">
                BREADBOARD
              </div>
            </div>
            <div className="mt-12 flex justify-center gap-5 text-sm font-bold text-[#5d76bd]">
              {parts.includes("LED") && "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡ LED"}{" "}
              {parts.includes("220ÃƒÅ½Ã‚Â© resistor") && "ÃƒÂ¢Ã¢â‚¬â€œÃ‚Â± 220ÃƒÅ½Ã‚Â© Resistor"}
            </div>
          </div>
          <label className="mt-4 flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={wires}
              onChange={(e) => {
                setWires(e.target.checked);
                setStatus(null);
              }}
            />{" "}
            Ground and pin-13 wires connected
          </label>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="btn" onClick={validate}>
              Check circuit
            </button>
            <button className="btn-light" onClick={validate}>
              <Play size={16} /> Run simulation
            </button>
            <button
              className="btn-light"
              onClick={() => {
                setParts([
                  "Arduino UNO",
                  "Breadboard",
                  "LED",
                  "220ÃƒÅ½Ã‚Â© resistor",
                  "Wire",
                ]);
                setWires(true);
                setStatus(null);
              }}
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </Card>
        <Card>
          <h3 className="panel-title">Validation panel</h3>
          <p className="muted my-5">
            Checks presence of a basic Arduino LED demo configuration.
          </p>
          {status === "working" ? (
            <div className="rounded-xl bg-emerald-50 p-4 text-emerald-800">
              <CheckCircle2 className="mb-3" />
              Circuit Working ÃƒÂ¢Ã…â€œÃ¢â‚¬Å“
              <p className="mt-2 text-sm">LED blinking Ãƒâ€šÃ‚Â· Demo 5 V setup.</p>
            </div>
          ) : status === "error" ? (
            <div className="rounded-xl bg-rose-50 p-4 text-rose-800">
              <AlertTriangle className="mb-3" />
              Circuit Not Working
              <p className="mt-2 text-sm">
                Check the resistor, LED, Arduino UNO and GND wire.
              </p>
            </div>
          ) : (
            <p className="muted">
              Click Check circuit for a demo validation result.
            </p>
          )}
          <Notice>
            Visual rule checker only; no electrical simulation or drag-and-drop
            wiring engine is connected.
          </Notice>
        </Card>
      </div>
    </Section>
  );
}
