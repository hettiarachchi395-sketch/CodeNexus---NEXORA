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


export default function Orders({ orders }) {
  const q = new URLSearchParams(useLocation().search).get("new"),
    [search, setSearch] = useState(q || "");
  const match = orders.filter((o) =>
    o.id.toLowerCase().includes(search.toLowerCase()),
  );
  const stages = [
    "Placed",
    "Payment confirmed",
    "Vendor assigned",
    "Packed",
    "Dispatched",
    "In transit",
    "Delivered",
  ];
  return (
    <Section
      title="Track hardware orders"
      subtitle="Search by tracking ID and view current demo delivery status"
    >
      <Card>
        <div className="flex items-center gap-2">
          <Search className="text-[#637aba]" />
          <input
            className="field"
            placeholder="Enter tracking ID, e.g. NXR-2026-4101"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Card>
      {match.map((o) => (
        <Card key={o.id}>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="panel-title">{o.id}</h3>
              <p className="muted mt-2">
                {o.kit} Ãƒâ€šÃ‚Â· {money(o.amount)}
              </p>
            </div>
            <span className="tag">{o.status}</span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((s, i) => (
              <div
                key={s}
                className={
                  "rounded-xl p-4 text-sm " +
                  (i <= stages.indexOf(o.status) || i === 0
                    ? "bg-[#e3f7ed] text-emerald-700"
                    : "bg-[#f2f6ff] text-[#7a8dac]")
                }
              >
                {i <= stages.indexOf(o.status) || i === 0 ? "ÃƒÂ¢Ã…â€œÃ¢â‚¬Å“" : "ÃƒÂ¢Ã¢â‚¬â€Ã¢â‚¬Â¹"} {s}
              </div>
            ))}
          </div>
          <Notice>
            Fulfillment status is sample data; there is no live courier API.
          </Notice>
        </Card>
      ))}
      {!match.length && (
        <p className="muted">No matching tracking IDs in this demo.</p>
      )}
    </Section>
  );
}
