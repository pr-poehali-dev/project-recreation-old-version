import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

// ─── Data ───────────────────────────────────────────────────────────────────

const sidebarItems = [
  { icon: "Search", label: "Поиск", id: "search" },
  { icon: "LayoutDashboard", label: "Обзор", id: "overview", active: true },
  { icon: "AlertTriangle", label: "Инциденты", id: "incidents" },
  { icon: "TrendingUp", label: "Прогнозы", id: "forecasts" },
  { icon: "Brain", label: "ИИ-аналитика", id: "ai" },
  { icon: "Building2", label: "Органы ECSU", id: "organs" },
  { icon: "Shield", label: "Безопасность", id: "security" },
  { icon: "FileCheck", label: "Лицензия", id: "license" },
  { icon: "Upload", label: "Загрузка", id: "upload" },
  { icon: "Settings", label: "Настройки", id: "settings" },
];

const topNavItems = [
  { label: "Поиск", color: "#4a9eff" },
  { label: "ЦПВОА", color: "#00c8f8" },
  { label: "Уведомления", color: "#f5830a" },
  { label: "Аналитика", color: "#00e676" },
  { label: "Поставщики", color: "#ff6b6b" },
  { label: "Финансы", color: "#ffd93d" },
  { label: "Владелец", color: "#c84bff" },
  { label: "Правовая база", color: "#4aff91" },
  { label: "API", color: "#ff9f40" },
  { label: "Документы", color: "#4a9eff" },
  { label: "Пользователи", color: "#00c8f8" },
  { label: "Вознаграждение", color: "#ffd93d" },
  { label: "Инструкции", color: "#f5830a" },
  { label: "Возможности", color: "#c84bff" },
  { label: "Экспорт", color: "#00e676" },
];

const statCards = [
  { label: "Всего инцидентов", value: "1 247", delta: "+12%", deltaUp: true, icon: "AlertTriangle", color: "#e8142a", iconBg: "rgba(232,20,42,0.15)" },
  { label: "Решено", value: "893", delta: "+8%", deltaUp: true, icon: "CheckCircle", color: "#00e676", iconBg: "rgba(0,230,118,0.15)" },
  { label: "Активных", value: "241", delta: "-3%", deltaUp: false, icon: "Activity", color: "#f5830a", iconBg: "rgba(245,131,10,0.15)" },
  { label: "Стран-участниц", value: "47", delta: "+2", deltaUp: true, icon: "Globe", color: "#c84bff", iconBg: "rgba(200,75,255,0.15)" },
];

const incidentTypes = [
  { label: "Экология", value: 45, pct: 45, color: "#00c8f8" },
  { label: "Коррупция", value: 28, pct: 28, color: "#00e676" },
  { label: "Права человека", value: 16, pct: 16, color: "#ffd93d" },
  { label: "Кибербезопасность", value: 7, pct: 7, color: "#f5830a" },
  { label: "Прочее", value: 4, pct: 4, color: "#c84bff" },
];

const weekData = [
  { day: "Пн", value: 28, h: 55 },
  { day: "Вт", value: 34, h: 68 },
  { day: "Ср", value: 19, h: 38 },
  { day: "Чт", value: 52, h: 100 },
  { day: "Пт", value: 41, h: 80 },
  { day: "Сб", value: 23, h: 46 },
  { day: "Вс", value: 31, h: 62 },
];

const recentIncidents = [
  { id: "ИНЦ-001", title: "Незаконная вырубка леса", status: "critical", region: "Сибирь" },
  { id: "ИНЦ-002", title: "Загрязнение реки Рейн", status: "warning", region: "Европа" },
  { id: "ИНЦ-003", title: "Выброс CO₂ сверх нормы", status: "active", region: "Урал" },
  { id: "ИНЦ-004", title: "Взяточничество в администрации", status: "critical", region: "Москва" },
];

const mapDots = [
  { top: "38%", left: "52%", color: "#e8142a", size: 10 },
  { top: "32%", left: "62%", color: "#f5830a", size: 8 },
  { top: "45%", left: "47%", color: "#00e676", size: 7 },
  { top: "29%", left: "55%", color: "#e8142a", size: 9 },
  { top: "50%", left: "58%", color: "#f5830a", size: 6 },
  { top: "35%", left: "44%", color: "#00c8f8", size: 7 },
];

// ─── Globe SVG ───────────────────────────────────────────────────────────────

function Globe3D() {
  return (
    <div className="relative flex items-center justify-center" style={{ height: 280 }}>
      {/* Glow backdrop */}
      <div
        className="absolute rounded-full"
        style={{
          width: 260, height: 260,
          background: "radial-gradient(circle, rgba(0,102,204,0.25) 0%, rgba(0,50,120,0.1) 60%, transparent 80%)",
          filter: "blur(20px)",
        }}
      />
      {/* Globe circle */}
      <div
        className="relative rounded-full"
        style={{
          width: 220, height: 220,
          background: "radial-gradient(circle at 35% 35%, rgba(30,80,180,0.9) 0%, rgba(5,20,60,0.95) 60%, rgba(2,8,30,0.98) 100%)",
          border: "1px solid rgba(0,150,255,0.3)",
          boxShadow: "0 0 40px rgba(0,100,255,0.2), inset 0 0 60px rgba(0,50,200,0.1)",
          overflow: "hidden",
        }}
      >
        {/* Latitude lines */}
        {[20, 40, 60, 80, 100, 120, 140, 160].map((y) => (
          <div
            key={y}
            className="absolute"
            style={{
              top: `${y / 2.2}%`, left: "5%", right: "5%",
              height: 1,
              background: "rgba(0,150,255,0.12)",
              borderRadius: 4,
            }}
          />
        ))}
        {/* Longitude lines */}
        {[25, 50, 75].map((x) => (
          <div
            key={x}
            className="absolute"
            style={{
              left: `${x}%`, top: "0", bottom: "0",
              width: 1,
              background: "rgba(0,150,255,0.1)",
            }}
          />
        ))}
        {/* Continents rough shapes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 220 220" opacity={0.35}>
          {/* Europe/Asia */}
          <ellipse cx="120" cy="85" rx="45" ry="22" fill="rgba(0,180,255,0.5)" />
          {/* Africa */}
          <ellipse cx="115" cy="130" rx="20" ry="28" fill="rgba(0,180,255,0.4)" />
          {/* Americas */}
          <ellipse cx="65" cy="105" rx="18" ry="35" fill="rgba(0,180,255,0.4)" />
          {/* Australia */}
          <ellipse cx="160" cy="145" rx="16" ry="12" fill="rgba(0,180,255,0.35)" />
        </svg>
        {/* Incident dots on globe */}
        {mapDots.map((d, i) => (
          <div
            key={i}
            className="absolute rounded-full pulse-dot"
            style={{
              top: d.top, left: d.left,
              width: d.size, height: d.size,
              background: d.color,
              boxShadow: `0 0 ${d.size * 2}px ${d.color}`,
              transform: "translate(-50%,-50%)",
            }}
          />
        ))}
      </div>
      {/* Bottom label */}
      <div
        className="absolute bottom-2 text-center w-full"
        style={{ fontSize: 10, color: "rgba(74,96,128,0.8)", letterSpacing: "0.1em", fontFamily: "'Oswald', sans-serif" }}
      >
        — нажмите для просмотра деталей —
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("overview");
  const [mapMode, setMapMode] = useState<"flat" | "globe" | "heat">("globe");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const statusColor = (s: string) =>
    s === "critical" ? "#e8142a" : s === "warning" ? "#f5830a" : "#00e676";

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--ecsu-bg)", color: "var(--ecsu-text)", fontFamily: "'Golos Text', sans-serif" }}
    >
      <div className="scan-line" />

      {/* ── Sidebar ── */}
      <aside
        className="flex-shrink-0 flex flex-col"
        style={{ width: 160, background: "var(--ecsu-panel)", borderRight: "1px solid var(--ecsu-border)" }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2 px-3 py-3 cursor-pointer"
          style={{ borderBottom: "1px solid var(--ecsu-border)" }}
          onClick={() => navigate("/egsu/start")}
        >
          <div
            className="flex-shrink-0 flex items-center justify-center rounded"
            style={{ width: 30, height: 30, background: "linear-gradient(135deg,var(--ecsu-accent2),var(--ecsu-accent))" }}
          >
            <Icon name="Shield" size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.1em", lineHeight: 1 }}>
              ЦЕНТР<br />ЗАДАЧ
            </div>
            <div style={{ fontSize: 8, color: "var(--ecsu-muted)", lineHeight: 1 }}>ECSU 2.0</div>
          </div>
        </div>

        {/* Search */}
        <div className="px-3 py-2" style={{ borderBottom: "1px solid var(--ecsu-border)" }}>
          <div
            className="flex items-center gap-2 px-2 py-1.5 rounded"
            style={{ background: "rgba(0,200,248,0.06)", border: "1px solid var(--ecsu-border)", cursor: "pointer" }}
          >
            <Icon name="Search" size={12} color="var(--ecsu-muted)" />
            <span style={{ fontSize: 11, color: "var(--ecsu-muted)" }}>Поиск</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2 overflow-auto">
          {sidebarItems.slice(1).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className="w-full flex items-center gap-2 px-3 py-2 text-left transition-all"
              style={{
                background: activeNav === item.id ? "rgba(0,200,248,0.1)" : "transparent",
                borderLeft: activeNav === item.id ? "2px solid var(--ecsu-accent)" : "2px solid transparent",
                color: activeNav === item.id ? "var(--ecsu-accent)" : "var(--ecsu-muted)",
                fontSize: 12,
              }}
            >
              <Icon name={item.icon} size={14} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Time at bottom */}
        <div className="px-3 py-3" style={{ borderTop: "1px solid var(--ecsu-border)" }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, color: "var(--ecsu-accent)", letterSpacing: "0.08em" }}>
            {timeStr}
          </div>
          <div style={{ fontSize: 9, color: "var(--ecsu-muted)" }}>Москва UTC+3</div>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top nav */}
        <div
          className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 overflow-x-auto"
          style={{ background: "var(--ecsu-panel)", borderBottom: "1px solid var(--ecsu-border)", scrollbarWidth: "none" }}
        >
          {topNavItems.map((item, i) => (
            <button
              key={i}
              className="flex-shrink-0 px-3 py-1 rounded text-xs transition-all"
              style={{
                background: `${item.color}18`,
                border: `1px solid ${item.color}40`,
                color: item.color,
                fontFamily: "'Oswald', sans-serif",
                letterSpacing: "0.06em",
                fontSize: 11,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            className="flex-shrink-0 ml-auto px-3 py-1 rounded text-xs"
            style={{
              background: "var(--ecsu-red)",
              color: "#fff",
              fontFamily: "'Oswald', sans-serif",
              letterSpacing: "0.08em",
              fontSize: 11,
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            + Новый инцидент
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 ecsu-grid-bg">

          {/* Page title */}
          <div className="mb-4">
            <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 600, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>
              Обзор системы
            </h1>
            <div style={{ fontSize: 12, color: "var(--ecsu-muted)" }}>
              Апрель 2026 · Все регионы
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {statCards.map((s, i) => (
              <div
                key={i}
                className="ecsu-card p-4 fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="flex items-center justify-center rounded"
                    style={{ width: 32, height: 32, background: s.iconBg }}
                  >
                    <Icon name={s.icon} size={16} color={s.color} />
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      color: s.deltaUp ? "var(--ecsu-green)" : "var(--ecsu-red)",
                      fontFamily: "'Oswald', sans-serif",
                    }}
                  >
                    {s.delta}
                  </span>
                </div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 28, fontWeight: 700, color: s.color, lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 11, color: "var(--ecsu-muted)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="ecsu-card mb-4 overflow-hidden">
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{ borderBottom: "1px solid var(--ecsu-border)" }}
            >
              <div className="flex items-center gap-2">
                <div className="ecsu-section-header" style={{ marginBottom: 0 }}>
                  Карта инцидентов
                </div>
                <span
                  className="px-2 py-0.5 rounded"
                  style={{ fontSize: 10, background: "rgba(0,200,248,0.1)", color: "var(--ecsu-accent)", border: "1px solid rgba(0,200,248,0.2)" }}
                >
                  6 объектов
                </span>
              </div>
              <div className="flex items-center gap-1">
                {(["Плоская", "3D Глобус", "Тепловая"] as const).map((mode, i) => {
                  const modeKey = (["flat", "globe", "heat"] as const)[i];
                  return (
                    <button
                      key={mode}
                      onClick={() => setMapMode(modeKey)}
                      className="px-3 py-1 rounded text-xs transition-all"
                      style={{
                        background: mapMode === modeKey ? "var(--ecsu-accent2)" : "transparent",
                        color: mapMode === modeKey ? "#fff" : "var(--ecsu-muted)",
                        border: `1px solid ${mapMode === modeKey ? "var(--ecsu-accent)" : "var(--ecsu-border)"}`,
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: 11,
                        cursor: "pointer",
                      }}
                    >
                      {mode}
                    </button>
                  );
                })}
                <div className="flex items-center gap-2 ml-2">
                  {[{ label: "Критические", color: "#e8142a" }, { label: "Средние", color: "#f5830a" }, { label: "Низкие", color: "#00e676" }].map((l) => (
                    <div key={l.label} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                      <span style={{ fontSize: 10, color: "var(--ecsu-muted)" }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {mapMode === "globe" ? (
              <Globe3D />
            ) : mapMode === "flat" ? (
              <div
                className="relative flex items-center justify-center"
                style={{ height: 280, background: "linear-gradient(180deg, rgba(0,20,60,0.6) 0%, rgba(0,10,30,0.8) 100%)" }}
              >
                {/* Flat map simplified */}
                <svg viewBox="0 0 900 280" className="absolute inset-0 w-full h-full" opacity={0.3}>
                  <rect x="80" y="60" width="120" height="140" rx="8" fill="rgba(0,150,255,0.4)" />
                  <rect x="350" y="50" width="180" height="110" rx="8" fill="rgba(0,150,255,0.4)" />
                  <rect x="360" y="160" width="90" height="100" rx="8" fill="rgba(0,150,255,0.35)" />
                  <rect x="620" y="90" width="140" height="80" rx="8" fill="rgba(0,150,255,0.4)" />
                  <rect x="660" y="175" width="70" height="60" rx="8" fill="rgba(0,150,255,0.3)" />
                </svg>
                {mapDots.map((d, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full pulse-dot"
                    style={{
                      top: d.top, left: d.left,
                      width: d.size, height: d.size,
                      background: d.color,
                      boxShadow: `0 0 ${d.size * 2}px ${d.color}`,
                      transform: "translate(-50%,-50%)",
                    }}
                  />
                ))}
                <span style={{ fontSize: 10, color: "var(--ecsu-muted)", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.1em" }}>
                  ПЛОСКАЯ КАРТА
                </span>
              </div>
            ) : (
              <div
                className="relative flex items-center justify-center"
                style={{ height: 280, background: "linear-gradient(180deg, rgba(0,20,60,0.6) 0%, rgba(0,10,30,0.8) 100%)" }}
              >
                <svg viewBox="0 0 900 280" className="absolute inset-0 w-full h-full">
                  {[
                    { cx: 450, cy: 140, r: 120, opacity: 0.15, color: "#e8142a" },
                    { cx: 480, cy: 100, r: 80, opacity: 0.2, color: "#f5830a" },
                    { cx: 420, cy: 160, r: 60, opacity: 0.18, color: "#e8142a" },
                    { cx: 560, cy: 130, r: 70, opacity: 0.15, color: "#f5830a" },
                    { cx: 350, cy: 120, r: 50, opacity: 0.12, color: "#00e676" },
                  ].map((c, i) => (
                    <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={c.color} opacity={c.opacity} />
                  ))}
                </svg>
                <span style={{ fontSize: 10, color: "var(--ecsu-muted)", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.1em" }}>
                  ТЕПЛОВАЯ КАРТА
                </span>
              </div>
            )}
          </div>

          {/* Bottom row: weekly chart + types + incidents */}
          <div className="grid grid-cols-3 gap-3">

            {/* Weekly chart */}
            <div className="col-span-1 ecsu-card p-4">
              <div className="ecsu-section-header mb-3">Инциденты за неделю</div>
              <div className="flex items-end gap-2 h-24">
                {weekData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t transition-all"
                      style={{
                        height: `${d.h}%`,
                        background: "linear-gradient(180deg, var(--ecsu-accent) 0%, var(--ecsu-accent2) 100%)",
                        opacity: 0.7,
                        minHeight: 4,
                      }}
                    />
                    <span style={{ fontSize: 9, color: "var(--ecsu-muted)", fontFamily: "'Oswald', sans-serif" }}>{d.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {weekData.map((d, i) => (
                  <span key={i} style={{ fontSize: 9, color: "var(--ecsu-muted)", flex: 1, textAlign: "center" }}>{d.value}</span>
                ))}
              </div>
            </div>

            {/* By type */}
            <div className="col-span-1 ecsu-card p-4">
              <div className="ecsu-section-header mb-3">По типам</div>
              <div className="flex flex-col gap-2">
                {incidentTypes.map((t, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span style={{ fontSize: 11, color: "var(--ecsu-text)" }}>{t.label}</span>
                      <span style={{ fontSize: 11, color: t.color, fontFamily: "'Oswald', sans-serif" }}>{t.pct}%</span>
                    </div>
                    <div className="ecsu-progress">
                      <div
                        className="ecsu-progress-fill"
                        style={{ width: `${t.pct}%`, background: t.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button style={{ fontSize: 11, color: "var(--ecsu-accent)", background: "none", border: "none", cursor: "pointer", marginTop: 8 }}>
                Все →
              </button>
            </div>

            {/* Recent incidents */}
            <div className="col-span-1 ecsu-card overflow-hidden">
              <div
                className="px-4 py-3 flex items-center justify-between"
                style={{ borderBottom: "1px solid var(--ecsu-border)" }}
              >
                <div className="ecsu-section-header" style={{ marginBottom: 0 }}>Последние инциденты</div>
              </div>
              <div className="p-3 flex flex-col gap-2">
                {recentIncidents.map((inc, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded cursor-pointer transition-all"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid transparent" }}
                  >
                    <div
                      className="flex-shrink-0 w-2 h-2 rounded-full"
                      style={{ background: statusColor(inc.status), boxShadow: `0 0 6px ${statusColor(inc.status)}` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div style={{ fontSize: 11, color: "#fff", lineHeight: 1.3 }}>{inc.title}</div>
                      <div style={{ fontSize: 10, color: "var(--ecsu-muted)" }}>{inc.id} · {inc.region}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Filter row */}
              <div
                className="px-3 py-2 flex gap-2"
                style={{ borderTop: "1px solid var(--ecsu-border)" }}
              >
                {[{ label: "Высокие", color: "#e8142a" }, { label: "Подозрительные", color: "#f5830a" }, { label: "Решённые", color: "#c84bff" }, { label: "Опасные", color: "#ffd93d" }].map((f) => (
                  <div key={f.label} className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: f.color }} />
                    <span style={{ fontSize: 9, color: "var(--ecsu-muted)" }}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="mt-4 pt-3 text-center"
            style={{ borderTop: "1px solid var(--ecsu-border)", fontSize: 10, color: "rgba(74,96,128,0.5)" }}
          >
            © Апрель 2026 · ECSU 2.0 · Все права защищены<br />
            <span style={{ fontSize: 9 }}>
              Система не является органом власти · Владелец: Николаев Владимир Владимирович · nikolaevvladimir77@yandex.ru
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
