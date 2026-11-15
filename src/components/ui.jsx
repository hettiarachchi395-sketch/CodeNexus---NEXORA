export const Section = ({ title, subtitle, children, action }) => (
  <div className="space-y-6">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 text-[#7387ac]">{subtitle}</p>}
      </div>
      {action}
    </div>
    {children}
  </div>
);

export const Card = ({ children, className = '' }) => (
  <div className={`glass p-5 ${className}`}>{children}</div>
);

export const Notice = ({ children }) => (
  <div className="rounded-xl border border-[#dce7ff] bg-[#e6edff] px-4 py-3 text-sm text-[#4563a6]">
    ℹ {children}
  </div>
);
