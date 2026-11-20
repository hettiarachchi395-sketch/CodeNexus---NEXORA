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


export default function Assignments({ submissions, setSubmissions }) {
  let nav = useNavigate();
  return (
    <Section
      title="Assignments & Projects"
      subtitle="Review requirements, submit your code and track your feedback."
    >
      <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
        <Card>
          <h3 className="panel-title">My assignments</h3>
          {ASSIGNMENTS.map((a) => (
            <div
              key={a.id}
              className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#f3f6ff] p-5"
            >
              <div>
                <h4 className="font-bold">{a.title}</h4>
                <p className="muted">
                  {a.course} Ãƒâ€šÃ‚Â· Due {a.due}
                </p>
                <p className="mt-1 text-xs font-semibold text-[#4b63b1]">
                  {submissions[a.id]
                    ? "ÃƒÂ¢Ã…â€œÃ¢â‚¬Å“ Submitted Ãƒâ€šÃ‚Â· Awaiting grading"
                    : "In progress"}
                </p>
              </div>
              <Link className="btn-light" to={"/student/assignments/" + a.id}>
                View assignment
              </Link>
            </div>
          ))}
        </Card>
        <Card>
          <h3 className="panel-title">Submission overview</h3>
          <p className="mt-5 text-2xl font-extrabold text-nblue">
            {Object.keys(submissions).length}/{ASSIGNMENTS.length}
          </p>
          <p className="muted">Assignments submitted</p>
          <Link className="btn mt-6 w-full" to="/student/notifications">
            View deadline reminders
          </Link>
        </Card>
      </div>
    </Section>
  );
}
