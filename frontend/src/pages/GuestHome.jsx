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


export default function GuestHome() {
  return (
    <Section
      title="The future of STEM starts here."
      subtitle="Learn. Build. Experiment. Inspire. Ãƒâ€šÃ‚Â· Interactive STEM & Robotics education"
    >
      <div className="grid min-h-[340px] overflow-hidden rounded-[28px] bg-[#435ed5] p-7 text-white lg:grid-cols-[1fr_.82fr] lg:p-10">
        <div className="flex flex-col justify-between gap-7">
          <div>
            <p className="text-xs font-bold tracking-wide text-[#dde5ff]">
              BUILD TOMORROW, TODAY
            </p>
            <h2 className="mt-8 max-w-xl text-3xl font-extrabold leading-tight lg:text-5xl">
              A universe of learning, made for young innovators.
            </h2>
            <p className="mt-6 max-w-lg text-sm text-[#e0e7ff]">
              Live lessons, hands-on robotics, coding challenges and brilliant
              discoveries in one magical place.
            </p>
          </div>
          <Link className="btn w-fit bg-[#5a76ff]" to="/catalogue">
            Explore courses <ArrowRight size={16} />
          </Link>
        </div>
        <div className="relative mt-7 overflow-hidden rounded-[28px] lg:mt-0">
          <img
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=85"
            className="h-full min-h-64 w-full object-cover"
            alt="Robotics learning"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#142655]/75 px-5 py-4 text-center text-xs font-bold tracking-wide">
            ARDUINO Ãƒâ€šÃ‚Â· PYTHON Ãƒâ€šÃ‚Â· ROBOTICS
          </div>
        </div>
      </div>
      <div className="grid gap-5 pt-6 md:grid-cols-3">
        {[
          [Sparkles, "Interactive learning", "Hands-on STEM for curious minds"],
          [Video, "Virtual classroom", "Learn live with expert instructors"],
          [Trophy, "Earn experience", "Course rankings and XP rewards"],
        ].map(([Icon, t, d]) => (
          <Card key={t}>
            <Icon className="mb-6 text-nblue" size={30} />
            <h3 className="text-lg font-bold">{t}</h3>
            <p className="muted mt-2">{d}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
