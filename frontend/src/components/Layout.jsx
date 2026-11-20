import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LogOut, Menu, Sparkles, X } from "lucide-react";
import { guestNavigation, studentNavigation } from "../app/navigation.js";

export default function Layout({ children, student, onLogout }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = student ? studentNavigation : guestNavigation;

  return (
    <div className="min-h-screen bg-[#edf2ff] md:flex">
      <button
        className="fixed left-3 top-3 z-50 rounded-lg bg-white p-2 shadow md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        {open ? <X /> : <Menu />}
      </button>

      <aside
        className={
          (open ? "translate-x-0" : "-translate-x-full") +
          " fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-l-[6px] border-[#546cf2] bg-white px-4 py-7 transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0"
        }
      >
        <Link
          to={student ? "/student" : "/"}
          className="mb-10 flex items-center gap-3 px-1"
        >
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#526bf0] text-white">
            <Sparkles size={27} fill="white" />
          </span>
          <b className="text-[25px] tracking-tight text-[#202f68]">NEXORA</b>
        </Link>

        <p className="px-3 pb-4 text-[11px] font-bold tracking-wide text-[#92a4c5]">
          LEARNING UNIVERSE
        </p>

        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto">
          {links.map(([to, label, Icon]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/" || to === "/student"}
              className={({ isActive }) =>
                "side-link " + (isActive ? "active" : "")
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {student && (
          <button
            onClick={onLogout}
            className="mt-3 flex w-full items-center gap-3 rounded-xl bg-[#fff0f2] px-4 py-3 text-sm font-bold text-[#b34154] hover:bg-[#ffe1e6]"
          >
            <LogOut size={17} /> Logout
          </button>
        )}
      </aside>

      {open && (
        <button
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
        />
      )}

      <main className="min-w-0 flex-1 px-5 pb-14 pt-20 md:px-9 md:pt-8 xl:px-12">
        <header className="mb-12 flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-[#657bcc]" />
          <div className="flex items-center gap-3">
            <span className="hidden rounded-2xl bg-white px-5 py-3 text-xs font-bold text-[#425487] sm:inline">
              {student ? "Student account" : "Guest demo account"}
            </span>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#7374ed] font-bold text-white">
              {student ? "S" : "G"}
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-[1240px]">{children}</div>
      </main>
    </div>
  );
}
