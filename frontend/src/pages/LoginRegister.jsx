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


export default function LoginRegister({ mode, onLogin }) {
  const nav = useNavigate(),
    loc = useLocation(),
    course = new URLSearchParams(loc.search).get("course");
  const [name, setName] = useState(""),
    [username, setUsername] = useState(""),
    [password, setPassword] = useState(""),
    [confirm, setConfirm] = useState(""),
    [parent, setParent] = useState(""),
    [error, setError] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Username and password are required.");
      return;
    }
    if (
      mode === "register" &&
      (!name.trim() ||
        !parent.trim() ||
        password.length < 8 ||
        password !== confirm)
    ) {
      setError(
        "Enter all fields, use 8+ character password, and ensure both passwords match.",
      );
      return;
    }
    onLogin({ name: name || "Alex Fernando", username });
    nav(course ? "/student/courses/" + course : "/student");
  };
  return (
    <Section
      title={
        mode === "register"
          ? "Create your student account"
          : "Welcome back to NEXORA"
      }
      subtitle={
        mode === "register"
          ? "Register as a student to begin your STEM journey."
          : "Sign in to your student learning workspace."
      }
    >
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Card>
          <form className="space-y-4" onSubmit={submit}>
            {mode === "register" && (
              <>
                <label className="block text-sm font-semibold">
                  Full name
                  <input
                    className="field mt-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Fernando"
                  />
                </label>
              </>
            )}
            <label className="block text-sm font-semibold">
              Username
              <input
                className="field mt-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose username"
              />
            </label>
            <label className="block text-sm font-semibold">
              Password
              <input
                type="password"
                className="field mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
              />
            </label>
            {mode === "register" && (
              <>
                <label className="block text-sm font-semibold">
                  Retype your password
                  <input
                    type="password"
                    className="field mt-2"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Confirm password"
                  />
                </label>
                <label className="block text-sm font-semibold">
                  Parent's full name
                  <input
                    className="field mt-2"
                    value={parent}
                    onChange={(e) => setParent(e.target.value)}
                    placeholder="Parent's full name"
                  />
                </label>
              </>
            )}
            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}
            <button className="btn w-full" type="submit">
              {mode === "register"
                ? "Create student account"
                : "Sign in as student"}{" "}
              <ArrowRight size={16} />
            </button>
            <p className="muted">
              {mode === "register" ? (
                <>
                  Already registered?{" "}
                  <Link className="font-semibold text-nblue" to="/login">
                    Sign in instead
                  </Link>
                </>
              ) : (
                <>
                  New student?{" "}
                  <Link className="font-semibold text-nblue" to="/register">
                    Create an account
                  </Link>
                </>
              )}
            </p>
          </form>
        </Card>
        <Card>
          <GraduationCap size={35} className="mb-5 text-nblue" />
          <h3 className="panel-title">Your learning adventure awaits</h3>
          <p className="muted mt-3">
            Access programming, robotics, live classes, projects, XP and quizzes
            after registration.
          </p>
        </Card>
      </div>
    </Section>
  );
}
