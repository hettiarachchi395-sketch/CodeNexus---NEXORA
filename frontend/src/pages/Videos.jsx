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


export default function Videos() {
  let [active, setActive] = useState(0);
  return (
    <Section
      title="Recorded lessons & replays"
      subtitle="Browse sample recorded sessions at your own pace"
    >
      <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
        <Card>
          <h3 className="panel-title">{VIDEOS[active][0]}</h3>
          <div className="mt-4 grid aspect-video place-items-center rounded-xl bg-[#17243f] text-white">
            <div className="text-center">
              <PlayCircle className="mx-auto mb-3 text-white" size={76} />
              <p className="font-bold">Recorded lesson preview</p>
              <p className="mt-2 text-xs text-[#a7b8d8]">
                {VIDEOS[active][2]} Ãƒâ€šÃ‚Â· Sample video metadata
              </p>
            </div>
          </div>
          <Notice>
            No video file or streaming URL supplied. Replace this preview with
            an authorized recording URL to enable actual playback.
          </Notice>
        </Card>
        <Card>
          <h3 className="panel-title">Lesson playlist</h3>
          <div className="mt-5 space-y-3">
            {VIDEOS.map((v, i) => (
              <button
                key={i}
                className={
                  "w-full rounded-xl p-4 text-left " +
                  (active === i ? "bg-[#e4ebff]" : "bg-[#f4f7ff]")
                }
                onClick={() => setActive(i)}
              >
                <b>{v[0]}</b>
                <p className="muted mt-1">
                  {v[1]} Ãƒâ€šÃ‚Â· {v[2]}
                </p>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}
