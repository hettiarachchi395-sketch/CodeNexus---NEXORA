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


export default function Checkout({ orders, setOrders }) {
  const { id } = useParams(),
    c = COURSES.find((c) => c.id === id),
    nav = useNavigate();
  const [address, setAddress] = useState("123 Galle Road, Colombo"),
    [method, setMethod] = useState("Demo card"),
    [step, setStep] = useState(false);
  if (!c?.kit) return <Navigate to="/student/store" />;
  const place = () => {
    let oid = "NXR-2026-" + String(4200 + orders.length + 1);
    setOrders((s) => [
      ...s,
      {
        id: oid,
        course: c.id,
        kit: c.kit,
        status: "Confirmed",
        amount: c.price,
      },
    ]);
    nav("/student/orders?new=" + oid);
  };
  return (
    <Section
      title="Hardware kit checkout"
      subtitle="Partner-vendor fulfillment Ãƒâ€šÃ‚Â· Demo payment"
    >
      <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
        <Card>
          <h3 className="panel-title">Delivery & payment</h3>
          <div className="mt-5">
            <label className="font-semibold">
              Delivery address
              <textarea
                className="field mt-2"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          </div>
          <h4 className="mt-6 font-bold">Payment method</h4>
          {["Demo card", "Demo online banking", "Cash on delivery (demo)"].map(
            (m) => (
              <label
                className="mt-4 flex items-center gap-3 rounded-xl bg-[#f3f6ff] p-4"
                key={m}
              >
                <input
                  type="radio"
                  checked={method === m}
                  onChange={() => setMethod(m)}
                />
                {m}
              </label>
            ),
          )}
          <button
            className="btn mt-6"
            disabled={!address.trim()}
            onClick={() => setStep(true)}
          >
            Review & confirm order <ArrowRight size={16} />
          </button>
        </Card>
        <Card>
          <h3 className="panel-title">Order summary</h3>
          <p className="mt-5 font-bold">{c.kit}</p>
          <p className="muted mt-2">Course: {c.name}</p>
          <p className="mt-5 text-2xl font-extrabold text-nblue">
            {money(c.price)}
          </p>
          <Notice>
            No real payment is processed. Never enter card credentials.
          </Notice>
        </Card>
      </div>
      {step && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-[#152443]/60 p-4">
          <Card className="max-w-lg">
            <h3 className="panel-title">Confirm demo order</h3>
            <p className="muted mt-4">
              {c.kit} Ãƒâ€šÃ‚Â· {money(c.price)}
            </p>
            <p className="muted mt-2">Payment: {method}</p>
            <div className="mt-5 flex gap-2">
              <button className="btn-light" onClick={() => setStep(false)}>
                Back
              </button>
              <button className="btn" onClick={place}>
                Place demo order
              </button>
            </div>
          </Card>
        </div>
      )}
    </Section>
  );
}
