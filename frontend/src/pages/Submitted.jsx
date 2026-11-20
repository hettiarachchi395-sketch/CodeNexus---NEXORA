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


export default function Submitted() {
  let { id } = useParams(),
    a = ASSIGNMENTS.find((x) => x.id === id);
  return (
    <Section
      title="Assignment submitted successfully!"
      subtitle="Submission receipt Ãƒâ€šÃ‚Â· Demo mode"
    >
      <Card>
        <CheckCircle2 className="mb-4 text-emerald-600" size={55} />
        <h3 className="panel-title">Submission confirmed</h3>
        <p className="muted mt-3">
          {a?.title} Ãƒâ€šÃ‚Â· Reference NXR-ASG-{id === "arduino" ? "1042" : "1043"}
        </p>
        <p className="muted">Status: Awaiting instructor grading</p>
        <Link className="btn mt-7" to="/student/assignments">
          Back to assignments
        </Link>
      </Card>
    </Section>
  );
}
