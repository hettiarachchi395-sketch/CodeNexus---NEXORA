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


export default function Review({ reviews, setReviews }) {
  let { id } = useParams(),
    c = COURSES.find((x) => x.id === id),
    nav = useNavigate();
  const [stars, setStars] = useState(5),
    [text, setText] = useState(
      "This course helped me understand the practical activities and projects.",
    );
  if (!c) return <Navigate to="/student/courses" />;
  if (c.completion !== 100)
    return (
      <Section
        title="Review locked"
        subtitle="Complete 100% of the course to leave a review."
      >
        <Link className="btn" to={"/student/courses/" + id}>
          Back to course
        </Link>
      </Section>
    );
  return (
    <Section
      title={"Review " + c.name}
      subtitle="Course completed Ãƒâ€šÃ‚Â· Your feedback helps other learners."
    >
      <Card>
        <h3 className="panel-title">Give your course a rating</h3>
        <div className="my-5 flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setStars(n)}
              aria-label={n + " stars"}
            >
              <Star
                size={35}
                fill={n <= stars ? "#eeb943" : "none"}
                color="#eeb943"
              />
            </button>
          ))}
        </div>
        <label className="block font-semibold">
          Write your review
          <textarea
            className="field mt-3"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <button
          className="btn mt-5"
          disabled={!text.trim()}
          onClick={() => {
            setReviews((s) => ({ ...s, [id]: { stars, text } }));
            nav("/student/courses/" + id);
          }}
        >
          Submit rating & review
        </button>
      </Card>
    </Section>
  );
}
