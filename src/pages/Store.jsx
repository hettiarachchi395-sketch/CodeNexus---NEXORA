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


export default function Store() {
  return (
    <Section
      title="Hardware store"
      subtitle="Order course-matched kits from partner suppliers"
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {COURSES.filter((c) => c.kit).map((c) => (
          <Card key={c.id}>
            <div className="mb-4 text-4xl">{c.icon}</div>
            <h3 className="panel-title">{c.kit}</h3>
            <p className="muted mt-2">For {c.name}</p>
            <p className="my-5 text-lg font-extrabold text-emerald-700">
              {money(c.price)}
            </p>
            <Link className="btn w-full" to={"/student/checkout/" + c.id}>
              Order kit
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
