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


export default function CourseDetail({ reviews, setReviews }) {
  let { id } = useParams(),
    c = COURSES.find((x) => x.id === id),
    nav = useNavigate();
  if (!c) return <Navigate to="/student/courses" />;
  return (
    <Section
      title={c.name}
      subtitle={`${c.modules} modules Ãƒâ€šÃ‚Â· ${c.level} Ãƒâ€šÃ‚Â· Instructor: Ms. Nethmi`}
      action={
        <Link className="btn-light" to="/student/courses">
          All courses
        </Link>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
        <Card>
          <img
            className="mb-5 h-52 w-full rounded-xl object-cover"
            src={c.image}
            alt={c.name}
          />
          <h3 className="panel-title">Course curriculum</h3>
          <p className="muted mt-2">{c.description}</p>
          <div className="my-5 progress">
            <div style={{ width: c.completion + "%" }} />
          </div>
          <p className="text-sm font-semibold">{c.completion}% complete</p>
          <div className="mt-5 space-y-3">
            {c.topics.map((x, i) => (
              <div
                key={x}
                className="flex items-center justify-between rounded-xl bg-[#f3f6ff] p-4"
              >
                <span>
                  Module {i + 1}: {x}
                </span>
                {i < c.completion / 25 ? (
                  <CheckCircle2 size={17} className="text-emerald-600" />
                ) : (
                  <Clock size={17} className="text-[#98a6bf]" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link className="btn" to="/student/learning">
              Continue learning
            </Link>
            {c.completion === 100 ? (
              <Link className="btn-light" to={"/student/review/" + c.id}>
                Rate & review
              </Link>
            ) : (
              <span className="muted self-center">
                Rating unlocks at 100% completion.
              </span>
            )}
          </div>
        </Card>
        <Card>
          <h3 className="panel-title">Hardware requirements</h3>
          {c.kit ? (
            <>
              <p className="mt-4 font-bold text-[#455b9b]">{c.kit}</p>
              <p className="muted my-3">
                Course-matched educational kit for practical activities.
              </p>
              <p className="mb-5 font-bold text-emerald-700">
                {money(c.price)}
              </p>
              <Link className="btn w-full" to={"/student/checkout/" + c.id}>
                Order hardware kit <ArrowRight size={16} />
              </Link>
            </>
          ) : (
            <p className="muted mt-5">
              No physical kit required. All coding resources are digital.
            </p>
          )}
          <div className="mt-7 space-y-2">
            <Link
              to={"/student/leaderboards/" + c.id}
              className="btn-light w-full"
            >
              View course XP leaderboard
            </Link>
            <Link to="/student/quiz" className="btn-light w-full">
              Practice quiz
            </Link>
          </div>
        </Card>
      </div>
      {reviews[c.id] && (
        <Notice>
          Your review: {reviews[c.id].stars} stars Ãƒâ€šÃ‚Â· {reviews[c.id].text}
        </Notice>
      )}
    </Section>
  );
}
