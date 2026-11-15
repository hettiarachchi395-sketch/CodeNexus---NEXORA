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


export default function Catalog({ guest }) {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("All");
  return (
    <Section
      title={
        guest ? "Explore available courses" : "Explore exceptional courses"
      }
      subtitle={
        guest
          ? "Browse courses before creating your student account."
          : "Discover curated robotics, electronics and programming courses."
      }
    >
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="flex min-w-[250px] flex-1 items-center gap-2 rounded-xl bg-white px-4">
          <Search size={18} className="text-[#7d91be]" />
          <input
            className="w-full bg-transparent py-3 outline-none"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses by title or topic..."
          />
        </div>
        <select
          className="field !w-auto"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option>All</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>
      <CourseCards
        guest={guest}
        query={q + (level === "All" ? "" : " " + level)}
      />
      {guest && (
        <Notice>
          Enroll Now redirects to Student Registration. Browsing does not
          require login.
        </Notice>
      )}
    </Section>
  );
}
