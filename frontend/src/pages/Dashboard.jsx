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


export default function Dashboard({ user, orders }) {
  return (
    <Section
      title={`Welcome back, ${user?.name?.split(" ")[0] || "Alex"}! ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¹`}
      subtitle="Ready to build something incredible today?"
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[
          [
            BookOpen,
            "My learning",
            "4 courses Ãƒâ€šÃ‚Â· Robotics 100%",
            "/student/learning",
          ],
          [
            Trophy,
            "Course XP rankings",
            "Robotics rank #04",
            "/student/leaderboards",
          ],
          [
            Video,
            "Next live class",
            "Robotics Lab Ãƒâ€šÃ‚Â· 4:00 PM",
            "/student/live",
          ],
          [
            Brain,
            "Skill recommendations",
            "Python Loops score: 40%",
            "/student/recommendations",
          ],
          [
            Code2,
            "Code challenges",
            "Python, C++ and Blockly",
            "/student/code",
          ],
          [
            Bell,
            "Assignment reminders",
            "Arduino mini-project deadline",
            "/student/notifications",
          ],
        ].map(([Icon, title, sub, path]) => (
          <Card key={title}>
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#e6ebff]">
              <Icon className="text-nblue" />
            </div>
            <h3 className="panel-title">{title}</h3>
            <p className="muted mt-2 mb-6">{sub}</p>
            <Link className="btn-light" to={path}>
              Open workspace <ArrowRight size={15} />
            </Link>
          </Card>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <h3 className="panel-title">Upcoming learning</h3>
          <p className="muted mt-3">
            Arduino Sensors Ãƒâ€šÃ‚Â· Live Classroom Ãƒâ€šÃ‚Â· Friday 4:00 PM
          </p>
          <Link className="btn mt-5" to="/student/live">
            Join class
          </Link>
        </Card>
        <Card>
          <h3 className="panel-title">Hardware order</h3>
          <p className="muted mt-3">
            {orders[0]?.id || "No orders"} Ãƒâ€šÃ‚Â·{" "}
            {orders[0]?.status || "Not ordered"}
          </p>
          <Link className="btn-light mt-5" to="/student/orders">
            Track orders
          </Link>
        </Card>
      </div>
    </Section>
  );
}
