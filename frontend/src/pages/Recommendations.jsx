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


export default function Recommendations({ quiz }) {
  let weak = quiz?.topics?.Loops ?? 40;
  return (
    <Section title="Skill recommendations">
      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <Card>
          <p className="tag inline-block">Python Ãƒâ€šÃ‚Â· Loops</p>
          <h3 className="mt-5 text-2xl font-bold">Loops needs revision</h3>
          <p className="muted mt-2">
            Your topic score: <b className="text-[#bd7445]">{weak}%</b> Ãƒâ€šÃ‚Â· Below
            the configured 60% target.
          </p>
          <div className="my-6 rounded-2xl bg-[#eaf0ff] p-6">
            <div className="flex items-center gap-3">
              <PlayCircle size={36} className="text-nblue" />
              <div>
                <h4 className="font-bold">
                  Python For Loops ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Beginner Tutorial
                </h4>
                <p className="muted">Predetermined YouTube search resource</p>
              </div>
            </div>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/results?search_query=python+for+loops+beginner"
              className="btn mt-6"
            >
              Open YouTube lesson <ExternalLink size={15} />
            </a>
          </div>
          <Link className="btn-light" to="/student/quiz">
            Retry practice quiz
          </Link>
        </Card>
        <Card>
          <h3 className="panel-title">Why this recommendation?</h3>
          <p className="muted mt-3">
            NEXORA checks topic scores against a rule-defined threshold and maps
            each weak topic to a predefined learning link.
          </p>
        </Card>
      </div>
    </Section>
  );
}


