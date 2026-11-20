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


export default function Notifications() {
  return (
    <Section
      title="Assignment deadline reminders"
      subtitle="Deadline notifications only Ãƒâ€šÃ‚Â· No email or SMS"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {ASSIGNMENTS.map((a) => (
          <Card key={a.id}>
            <Bell className="mb-4 text-nblue" />
            <h3 className="panel-title">{a.title}</h3>
            <p className="muted my-3">Due {a.due} Ãƒâ€šÃ‚Â· Reminder enabled</p>
            <Link className="btn-light" to={"/student/assignments/" + a.id}>
              Open assignment
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
