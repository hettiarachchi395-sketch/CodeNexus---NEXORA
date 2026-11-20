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


export default function Learning() {
  return (
    <Section
      title="My learning journey"
      subtitle="Continue lessons, videos, practicals and quizzes."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {COURSES.filter((c) => c.completion > 0).map((c) => (
          <Card key={c.id}>
            <h3 className="panel-title">
              {c.icon} {c.name}
            </h3>
            <p className="muted mt-3">
              {c.completion}% complete Ãƒâ€šÃ‚Â· {c.modules} modules
            </p>
            <div className="progress mt-4">
              <div style={{ width: c.completion + "%" }} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link className="btn-light" to={"/student/courses/" + c.id}>
                Open course
              </Link>
              <Link className="btn-light" to="/student/videos">
                Video lessons
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
