import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, RotateCcw, Trophy } from "lucide-react";
import {
  useCourseLeaderboard,
  useLeaderboardCourses,
  submitDemoResult,
} from "../leaderboardApi.js";
import { Card, Notice, Section } from "../components/ui.jsx";
import { COURSES } from "../data/courses.js";

export function Leaderboards() {
  const { courses, loading, error, refresh } = useLeaderboardCourses();
  return (
    <Section
      title="Course leaderboards"
      subtitle="Select a course to view its independent XP ranking. No combined XP leaderboard."
      action={
        <button className="btn-light" onClick={refresh}>
          <RotateCcw size={16} /> Refresh
        </button>
      }
    >
      <Notice>
        Live rankings come from the Spring Boot API when running. If the backend
        is offline, seeded preview data is displayed and clearly labeled.
      </Notice>
      {error && (
        <p className="text-sm text-amber-700" role="status">
          Preview mode: {error}
        </p>
      )}
      {loading && <p className="muted">Loading course rankings...</p>}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((c) => (
          <Card key={c.id} className="flex flex-col">
            <div className="mb-5 flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#edf2ff] text-2xl">
                {COURSES.find((x) => x.id === c.id)?.icon || "Ã°Å¸Ââ€ "}
              </span>
              <span className="tag">Course XP</span>
            </div>
            <h3 className="panel-title">{c.name}</h3>
            <p className="muted mt-3">
              Ranked by XP earned in this course only
            </p>
            <p className="my-5 text-lg font-extrabold text-[#5369d7]">
              Your XP: {c.myXp.toLocaleString()}
            </p>
            <Link
              className="btn mt-auto w-full"
              to={"/student/leaderboards/" + c.id}
            >
              View course leaderboard <ArrowRight size={16} />
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function Leaderboard() {
  const { id } = useParams(),
    course = COURSES.find((c) => c.id === id);
  const { data, loading, error, refresh } = useCourseLeaderboard(id);
  const [submitting, setSubmitting] = useState(false),
    [message, setMessage] = useState("");
  const [correct, setCorrect] = useState(4),
    [attempt, setAttempt] = useState(() => `demo-${Date.now()}`);
  const award = async () => {
    setSubmitting(true);
    setMessage("");
    try {
      const result = await submitDemoResult({
        courseId: id,
        studentId: 4,
        attemptId: attempt,
        correctAnswers: Number(correct),
        totalQuestions: 5,
      });
      setMessage(
        result.duplicate
          ? "This attempt has already been counted. No duplicate XP awarded."
          : `Awarded +${result.xpAwarded} XP. Leaderboard updated.`,
      );
      refresh();
    } catch (e) {
      setMessage(e.message);
    } finally {
      setSubmitting(false);
    }
  };
  if (!course) return <Navigate to="/student/leaderboards" replace />;
  return (
    <Section
      title={course.name + " leaderboard"}
      subtitle={
        "Only XP earned in " + course.name + " is counted towards these ranks."
      }
      action={
        <button className="btn-light" onClick={refresh}>
          <RotateCcw size={16} /> Refresh
        </button>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_295px]">
        <Card>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <h2 className="panel-title uppercase tracking-wide">
              Course XP rankings
            </h2>
            <span className="tag">{data?.rankings?.length || 0} learners</span>
          </div>
          {error && (
            <p className="mb-4 text-sm text-amber-700" role="status">
              Preview mode: {error}
            </p>
          )}
          {loading && <p className="muted">Loading ranking...</p>}
          <div className="space-y-3">
            {data?.rankings?.map((p) => (
              <div
                key={p.studentId}
                className={
                  "flex items-center justify-between gap-4 rounded-xl px-5 py-5 " +
                  (p.isMe
                    ? "bg-[#e5ebff] ring-1 ring-[#cad6ff]"
                    : "bg-[#f3f6fe]")
                }
              >
                <div className="flex min-w-0 items-center gap-4">
                  <span className="min-w-9 font-extrabold text-[#4562c5]">
                    {String(p.rank).padStart(2, "0")}
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white font-bold text-[#5b6dd1]">
                    {p.name.charAt(0)}
                  </span>
                  <span className="truncate font-bold text-[#354b7e]">
                    {p.name}{" "}
                    {p.isMe && (
                      <span className="text-xs font-medium text-[#5269bd]">
                        (You)
                      </span>
                    )}
                  </span>
                </div>
                <b className="shrink-0 text-sm text-[#4b65ba]">
                  {p.xp.toLocaleString()} course XP
                </b>
              </div>
            ))}
          </div>
          {!data?.rankings?.length && !loading && (
            <p className="muted">No students ranked yet.</p>
          )}
          <Link className="btn-light mt-6" to="/student/leaderboards">
            <ArrowRight className="rotate-180" size={16} /> All course
            leaderboards
          </Link>
        </Card>
        <div className="space-y-5">
          <Card>
            <Trophy size={32} className="text-[#5269ef]" />
            <h3 className="panel-title mt-4">Your course progress</h3>
            <p className="mt-4 text-3xl font-extrabold text-[#4f68df]">
              {(data?.myXp || 0).toLocaleString()} XP
            </p>
            <p className="muted mt-2">
              Rank #{data?.myRank || "Ã¢â‚¬â€"} in this course
            </p>
            <p className="muted mt-3">Each correct quiz answer earns 10 XP.</p>
          </Card>
          <Card>
            <h3 className="panel-title">XP integration demo</h3>
            <p className="muted mt-2">
              Simulate Member 4 sending a graded quiz result for Alex Fernando.
              Requires running backend with demo profile.
            </p>
            <label className="mt-4 block text-sm font-bold">
              Correct answers (out of 5)
              <select
                className="field mt-2"
                value={correct}
                onChange={(e) => setCorrect(Number(e.target.value))}
              >
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="btn mt-4 w-full"
              onClick={award}
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Submit graded quiz result"}
            </button>
            <button
              className="btn-light mt-2 w-full"
              onClick={() => {
                setAttempt(
                  `demo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                );
                setMessage("New attempt ready.");
              }}
            >
              Create new attempt
            </button>
            {message && (
              <p role="status" className="mt-3 text-sm text-[#405b9e]">
                {message}
              </p>
            )}
            <p className="mt-3 text-xs text-[#8191af]">
              Submitting the same attempt again awards 0 additional XP.
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
}

export default Leaderboards;
