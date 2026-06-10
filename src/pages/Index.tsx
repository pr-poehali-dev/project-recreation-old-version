import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const incidents = [
  { id: "ИНЦ-2024-0847", type: "Административное", status: "critical", priority: "ВЫСОКИЙ", location: "Московская обл., г. Подольск", time: "08:42", unit: "ОВД Подольск", desc: "Превышение должностных полномочий" },
  { id: "ИНЦ-2024-0846", type: "Коррупционное", status: "warning", priority: "СРЕДНИЙ", location: "г. Москва, ЮВАО", time: "07:15", unit: "ГУ МВД Москвы", desc: "Вымогательство при оформлении разрешений" },
  { id: "ИНЦ-2024-0845", type: "Процессуальное", status: "active", priority: "НИЗКИЙ", location: "г. Санкт-Петербург", time: "06:30", unit: "УМВД СПб", desc: "Нарушение процессуальных сроков" },
  { id: "ИНЦ-2024-0844", type: "Права граждан", status: "critical", priority: "ВЫСОКИЙ", location: "Краснодарский край", time: "05:50", unit: "ГУ МВД КК", desc: "Незаконное задержание" },
  { id: "ИНЦ-2024-0843", type: "Административное", status: "warning", priority: "СРЕДНИЙ", location: "г. Екатеринбург", time: "04:20", unit: "ГУ МВД Свердловск", desc: "Нарушение порядка рассмотрения жалоб" },
];

const stats = [
  { label: "Активных инцидентов", value: "847", delta: "+12", trend: "up", color: "var(--ecsu-red)" },
  { label: "На рассмотрении", value: "1 243", delta: "-8", trend: "down", color: "var(--ecsu-orange)" },
  { label: "Решено за 24ч", value: "156", delta: "+23", trend: "up", color: "var(--ecsu-green)" },
  { label: "ИИ-аналитика", value: "94.7%", delta: "", trend: "stable", color: "var(--ecsu-accent)" },
];

const modules = [
  {
    icon: "AlertTriangle",
    title: "Мониторинг инцидентов",
    desc: "Регистрация, классификация и отслеживание инцидентов в режиме реального времени с автоматической эскалацией по критичности.",
    status: "АКТИВЕН",
    statusType: "active",
    count: "847 активных",
  },
  {
    icon: "Brain",
    title: "ИИ-аналитика",
    desc: "Машинное обучение для выявления паттернов нарушений, предиктивный анализ рисков и автоматическая классификация обращений.",
    status: "РАБОТАЕТ",
    statusType: "active",
    count: "94.7% точность",
  },
  {
    icon: "Scale",
    title: "Правовое содействие",
    desc: "Автоматическая привязка к нормативной базе, формирование процессуальных документов, контроль сроков рассмотрения.",
    status: "АКТИВЕН",
    statusType: "active",
    count: "1 243 дела",
  },
  {
    icon: "Radio",
    title: "Координация реагирования",
    desc: "Межведомственная координация, распределение задач между подразделениями, контроль исполнения и отчётность.",
    status: "ОЖИДАНИЕ",
    statusType: "warning",
    count: "12 задач",
  },
  {
    icon: "Map",
    title: "Геоаналитика",
    desc: "Визуализация инцидентов на карте, тепловые карты нарушений, геокластеризация по регионам и ведомствам.",
    status: "АКТИВЕН",
    statusType: "active",
    count: "85 регионов",
  },
  {
    icon: "Shield",
    title: "Защита заявителей",
    desc: "Анонимизация данных заявителей, шифрование обращений, контроль нераскрытия персональных данных.",
    status: "АКТИВЕН",
    statusType: "active",
    count: "AES-256",
  },
];

const navItems = [
  { label: "Дашборд", icon: "LayoutDashboard", active: true },
  { label: "Инциденты", icon: "AlertTriangle", active: false },
  { label: "Аналитика", icon: "BarChart2", active: false },
  { label: "Правовая база", icon: "Scale", active: false },
  { label: "Реагирование", icon: "Radio", active: false },
  { label: "Геокарта", icon: "Map", active: false },
  { label: "Отчёты", icon: "FileText", active: false },
  { label: "Настройки", icon: "Settings", active: false },
];

const aiInsights = [
  { text: "Выявлен кластер нарушений: ЮВАО Москвы — рост на 34% за 7 дней", type: "warning" },
  { text: "Паттерн: дела ОВД Подольск — высокая вероятность системного нарушения (87%)", type: "critical" },
  { text: "Рекомендация: инициировать проверку Краснодарский край — 12 связанных инцидентов", type: "info" },
  { text: "Срок рассмотрения ИНЦ-2024-0801 истекает через 2 дня", type: "warning" },
];

export default function Index() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeNav, setActiveNav] = useState("Дашборд");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const formatDate = (d: Date) =>
    d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });

  const statusColor = (s: string) => {
    if (s === "critical") return "var(--ecsu-red)";
    if (s === "warning") return "var(--ecsu-orange)";
    return "var(--ecsu-green)";
  };

  return (
    <div
      className="min-h-screen ecsu-grid-bg"
      style={{ background: "var(--ecsu-bg)", color: "var(--ecsu-text)", fontFamily: "'Golos Text', sans-serif" }}
    >
      {/* Scan line effect */}
      <div className="scan-line" />

      {/* Header */}
      <header
        className="ecsu-header-gradient sticky top-0 z-50 flex items-center justify-between px-4 py-2"
        style={{ height: 56 }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded"
            style={{ color: "var(--ecsu-accent)" }}
          >
            <Icon name="Menu" size={20} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center rounded"
              style={{
                width: 32, height: 32,
                background: "linear-gradient(135deg, var(--ecsu-accent2), var(--ecsu-accent))",
              }}
            >
              <Icon name="Shield" size={18} color="#fff" />
            </div>
            <div>
              <div
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.15em", color: "#fff", lineHeight: 1.1 }}
              >
                ЕЦСУ 2.0
              </div>
              <div style={{ fontSize: 9, color: "var(--ecsu-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Единая Центральная Система Управления
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div
            className="flex items-center gap-1 px-2 py-1 rounded"
            style={{ background: "rgba(0,230,118,0.1)", border: "1px solid rgba(0,230,118,0.3)" }}
          >
            <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: "var(--ecsu-green)" }} />
            <span style={{ fontSize: 10, color: "var(--ecsu-green)", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.1em" }}>
              СИСТЕМА АКТИВНА
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Alert count */}
          <div className="flex items-center gap-2">
            <div
              className="relative flex items-center justify-center"
              style={{ width: 32, height: 32, background: "rgba(232,20,42,0.1)", border: "1px solid rgba(232,20,42,0.3)", borderRadius: 4 }}
            >
              <Icon name="Bell" size={16} color="var(--ecsu-red)" />
              <span
                className="absolute -top-1 -right-1 flex items-center justify-center rounded-full"
                style={{ width: 16, height: 16, background: "var(--ecsu-red)", fontSize: 9, color: "#fff", fontWeight: 700 }}
              >
                7
              </span>
            </div>
          </div>

          {/* Clock */}
          <div className="text-right">
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, letterSpacing: "0.1em", color: "var(--ecsu-accent)", lineHeight: 1 }}>
              {formatTime(currentTime)}
            </div>
            <div style={{ fontSize: 10, color: "var(--ecsu-muted)", letterSpacing: "0.05em" }}>
              {formatDate(currentTime)} МСК
            </div>
          </div>

          {/* User */}
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center rounded"
              style={{ width: 32, height: 32, background: "var(--ecsu-accent2)", fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "'Oswald', sans-serif" }}
            >
              НВВ
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>Николаев В.В.</div>
              <div style={{ fontSize: 10, color: "var(--ecsu-muted)" }}>Администратор</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex" style={{ minHeight: "calc(100vh - 56px)" }}>
        {/* Sidebar */}
        {sidebarOpen && (
          <aside
            className="flex-shrink-0"
            style={{
              width: 220,
              background: "var(--ecsu-panel)",
              borderRight: "1px solid var(--ecsu-border)",
              padding: "16px 0",
            }}
          >
            <nav>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveNav(item.label)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left transition-all"
                  style={{
                    background: activeNav === item.label ? "rgba(0,200,248,0.08)" : "transparent",
                    borderLeft: activeNav === item.label ? "2px solid var(--ecsu-accent)" : "2px solid transparent",
                    color: activeNav === item.label ? "var(--ecsu-accent)" : "var(--ecsu-muted)",
                    fontSize: 13,
                    fontFamily: "'Golos Text', sans-serif",
                  }}
                >
                  <Icon name={item.icon} size={16} />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Sidebar footer */}
            <div style={{ marginTop: "auto", padding: "16px", borderTop: "1px solid var(--ecsu-border)", marginTop: 32 }}>
              <div className="ecsu-section-header" style={{ marginBottom: 8 }}>Версия</div>
              <div style={{ fontSize: 12, color: "var(--ecsu-muted)" }}>ЕЦСУ v2.0.1-beta</div>
              <div style={{ fontSize: 10, color: "rgba(74,96,128,0.6)", marginTop: 2 }}>build 20240610</div>
            </div>
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4" style={{ gap: 16 }}>

          {/* Page title */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 600, letterSpacing: "0.1em", color: "#fff", textTransform: "uppercase" }}>
                Командный дашборд
              </h1>
              <div style={{ fontSize: 12, color: "var(--ecsu-muted)" }}>
                Оперативный мониторинг · Обновлено только что
              </div>
            </div>
            <div className="flex gap-2">
              <button className="ecsu-btn-primary flex items-center gap-2">
                <Icon name="Plus" size={14} />
                Новый инцидент
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2"
                style={{
                  background: "transparent",
                  border: "1px solid var(--ecsu-border)",
                  color: "var(--ecsu-muted)",
                  fontSize: 13,
                  fontFamily: "'Oswald', sans-serif",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                <Icon name="Download" size={14} />
                Отчёт
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {stats.map((s, i) => (
              <div key={i} className="ecsu-card p-4 fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="ecsu-section-header" style={{ color: s.color, borderLeftColor: s.color }}>
                  {s.label}
                </div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 32, fontWeight: 700, color: "#fff", lineHeight: 1 }}>
                  {s.value}
                </div>
                {s.delta && (
                  <div
                    className="flex items-center gap-1 mt-1"
                    style={{ fontSize: 11, color: s.trend === "up" && s.label === "Решено за 24ч" ? "var(--ecsu-green)" : s.trend === "up" ? "var(--ecsu-red)" : "var(--ecsu-green)" }}
                  >
                    <Icon name={s.trend === "up" ? "TrendingUp" : "TrendingDown"} size={12} />
                    {s.delta} за 24ч
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Middle row: incidents table + AI insights */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* Incidents table */}
            <div className="col-span-2 ecsu-card" style={{ overflow: "hidden" }}>
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--ecsu-border)" }}>
                <div className="ecsu-section-header" style={{ marginBottom: 0 }}>
                  Последние инциденты
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-1 rounded" style={{ background: "rgba(232,20,42,0.1)", fontSize: 10, color: "var(--ecsu-red)" }}>
                    <div className="w-1.5 h-1.5 rounded-full blink" style={{ background: "var(--ecsu-red)" }} />
                    КРИТИЧЕСКИХ: 2
                  </div>
                  <button style={{ fontSize: 11, color: "var(--ecsu-accent)", cursor: "pointer", background: "none", border: "none" }}>
                    Все инциденты →
                  </button>
                </div>
              </div>
              <table className="w-full ecsu-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Тип</th>
                    <th>Приоритет</th>
                    <th>Подразделение</th>
                    <th>Время</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((inc) => (
                    <tr
                      key={inc.id}
                      onClick={() => setSelectedIncident(inc.id === selectedIncident ? null : inc.id)}
                      style={{ cursor: "pointer", background: selectedIncident === inc.id ? "rgba(0,200,248,0.05)" : undefined }}
                    >
                      <td style={{ color: "var(--ecsu-accent)", fontSize: 11, fontFamily: "'Oswald', sans-serif" }}>{inc.id}</td>
                      <td>{inc.type}</td>
                      <td>
                        <span
                          className="px-2 py-0.5 rounded text-xs"
                          style={{
                            background: inc.status === "critical" ? "rgba(232,20,42,0.15)" : inc.status === "warning" ? "rgba(245,131,10,0.15)" : "rgba(0,230,118,0.15)",
                            color: statusColor(inc.status),
                            fontFamily: "'Oswald', sans-serif",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {inc.priority}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: "var(--ecsu-muted)" }}>{inc.unit}</td>
                      <td style={{ fontSize: 12, fontFamily: "'Oswald', sans-serif", color: "var(--ecsu-muted)" }}>{inc.time}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${inc.status === "critical" ? "blink" : ""}`}
                            style={{ background: statusColor(inc.status), boxShadow: `0 0 6px ${statusColor(inc.status)}` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Expanded incident detail */}
              {selectedIncident && (
                <div
                  className="px-4 py-3 fade-in-up"
                  style={{ background: "rgba(0,200,248,0.03)", borderTop: "1px solid var(--ecsu-border)" }}
                >
                  {(() => {
                    const inc = incidents.find((i) => i.id === selectedIncident);
                    if (!inc) return null;
                    return (
                      <div className="flex items-start justify-between">
                        <div>
                          <div style={{ fontSize: 11, color: "var(--ecsu-accent)", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.1em", marginBottom: 4 }}>
                            {inc.id} · {inc.location}
                          </div>
                          <div style={{ fontSize: 13, color: "#fff" }}>{inc.desc}</div>
                        </div>
                        <div className="flex gap-2">
                          <button className="ecsu-btn-primary" style={{ fontSize: 11, padding: "5px 12px" }}>Принять</button>
                          <button className="ecsu-btn-danger" style={{ fontSize: 11, padding: "5px 12px" }}>Эскалировать</button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* AI insights */}
            <div className="ecsu-card" style={{ overflow: "hidden" }}>
              <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--ecsu-border)" }}>
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center justify-center rounded"
                    style={{ width: 24, height: 24, background: "linear-gradient(135deg, var(--ecsu-accent2), var(--ecsu-accent))" }}
                  >
                    <Icon name="Brain" size={14} color="#fff" />
                  </div>
                  <div className="ecsu-section-header" style={{ marginBottom: 0 }}>ИИ-Аналитика</div>
                </div>
              </div>
              <div className="p-3 flex flex-col gap-2">
                {aiInsights.map((insight, i) => (
                  <div
                    key={i}
                    className="p-3 rounded fade-in-up"
                    style={{
                      animationDelay: `${i * 0.15}s`,
                      background: insight.type === "critical" ? "rgba(232,20,42,0.08)" : insight.type === "warning" ? "rgba(245,131,10,0.08)" : "rgba(0,200,248,0.08)",
                      border: `1px solid ${insight.type === "critical" ? "rgba(232,20,42,0.2)" : insight.type === "warning" ? "rgba(245,131,10,0.2)" : "rgba(0,200,248,0.2)"}`,
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <Icon
                        name={insight.type === "critical" ? "AlertOctagon" : insight.type === "warning" ? "AlertTriangle" : "Info"}
                        size={14}
                        color={insight.type === "critical" ? "var(--ecsu-red)" : insight.type === "warning" ? "var(--ecsu-orange)" : "var(--ecsu-accent)"}
                      />
                      <p style={{ fontSize: 12, color: "var(--ecsu-text)", lineHeight: 1.4 }}>{insight.text}</p>
                    </div>
                  </div>
                ))}

                {/* AI accuracy */}
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span style={{ fontSize: 11, color: "var(--ecsu-muted)", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.08em" }}>ТОЧНОСТЬ МОДЕЛИ</span>
                    <span style={{ fontSize: 11, color: "var(--ecsu-accent)" }}>94.7%</span>
                  </div>
                  <div className="ecsu-progress">
                    <div className="ecsu-progress-fill" style={{ width: "94.7%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span style={{ fontSize: 11, color: "var(--ecsu-muted)", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.08em" }}>БАЗА ЗНАНИЙ</span>
                    <span style={{ fontSize: 11, color: "var(--ecsu-accent)" }}>78.2%</span>
                  </div>
                  <div className="ecsu-progress">
                    <div className="ecsu-progress-fill" style={{ width: "78.2%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modules grid */}
          <div className="mb-4">
            <div className="ecsu-section-header mb-3">Модули системы</div>
            <div className="grid grid-cols-3 gap-3">
              {modules.map((mod, i) => (
                <div
                  key={i}
                  className="ecsu-card p-4 fade-in-up cursor-pointer"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="flex items-center justify-center rounded"
                      style={{
                        width: 40, height: 40,
                        background: mod.statusType === "active" ? "rgba(0,200,248,0.1)" : "rgba(245,131,10,0.1)",
                        border: `1px solid ${mod.statusType === "active" ? "rgba(0,200,248,0.2)" : "rgba(245,131,10,0.2)"}`,
                      }}
                    >
                      <Icon name={mod.icon} size={20} color={mod.statusType === "active" ? "var(--ecsu-accent)" : "var(--ecsu-orange)"} />
                    </div>
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full ${mod.statusType === "warning" ? "blink" : "pulse-dot"}`}
                        style={{ background: mod.statusType === "active" ? "var(--ecsu-green)" : "var(--ecsu-orange)" }}
                      />
                      <span
                        style={{
                          fontSize: 9,
                          fontFamily: "'Oswald', sans-serif",
                          letterSpacing: "0.1em",
                          color: mod.statusType === "active" ? "var(--ecsu-green)" : "var(--ecsu-orange)",
                        }}
                      >
                        {mod.status}
                      </span>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 600, color: "#fff", letterSpacing: "0.05em", marginBottom: 6 }}>
                    {mod.title}
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--ecsu-muted)", lineHeight: 1.5, marginBottom: 10 }}>
                    {mod.desc}
                  </p>
                  <div
                    className="flex items-center justify-between"
                    style={{ borderTop: "1px solid var(--ecsu-border)", paddingTop: 8, marginTop: "auto" }}
                  >
                    <span style={{ fontSize: 11, color: "var(--ecsu-accent)", fontFamily: "'Oswald', sans-serif" }}>{mod.count}</span>
                    <Icon name="ChevronRight" size={14} color="var(--ecsu-muted)" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row: regional stats + activity log */}
          <div className="grid grid-cols-2 gap-3">
            {/* Regional distribution */}
            <div className="ecsu-card p-4">
              <div className="ecsu-section-header">Региональная статистика</div>
              {[
                { region: "г. Москва", count: 234, pct: 28 },
                { region: "Московская обл.", count: 187, pct: 22 },
                { region: "г. Санкт-Петербург", count: 143, pct: 17 },
                { region: "Краснодарский край", count: 98, pct: 12 },
                { region: "Свердловская обл.", count: 76, pct: 9 },
                { region: "Прочие регионы", count: 109, pct: 12 },
              ].map((r, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span style={{ fontSize: 12, color: "var(--ecsu-text)" }}>{r.region}</span>
                    <span style={{ fontSize: 12, color: "var(--ecsu-muted)", fontFamily: "'Oswald', sans-serif" }}>{r.count}</span>
                  </div>
                  <div className="ecsu-progress">
                    <div className="ecsu-progress-fill" style={{ width: `${r.pct}%`, background: i < 2 ? "linear-gradient(90deg, var(--ecsu-red), rgba(232,20,42,0.6))" : "linear-gradient(90deg, var(--ecsu-accent2), var(--ecsu-accent))" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Activity log */}
            <div className="ecsu-card" style={{ overflow: "hidden" }}>
              <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--ecsu-border)" }}>
                <div className="ecsu-section-header" style={{ marginBottom: 0 }}>Журнал активности</div>
              </div>
              <div className="p-3 flex flex-col gap-2 overflow-auto" style={{ maxHeight: 280 }}>
                {[
                  { time: "08:47:23", event: "Зарегистрирован новый инцидент ИНЦ-2024-0847", type: "create", user: "Система" },
                  { time: "08:45:11", event: "ИИ-анализ завершён: выявлен кластер нарушений ЮВАО", type: "ai", user: "ИИ-модуль" },
                  { time: "08:42:58", event: "Инцидент ИНЦ-2024-0846 эскалирован до уровня 2", type: "escalate", user: "Николаев В.В." },
                  { time: "08:30:00", event: "Плановая синхронизация базы нормативных актов", type: "sync", user: "Система" },
                  { time: "08:15:44", event: "Инцидент ИНЦ-2024-0839 закрыт: нарушение устранено", type: "close", user: "Иванов А.С." },
                  { time: "07:58:02", event: "Добавлено правовое заключение к делу ИНЦ-2024-0835", type: "doc", user: "Петрова М.Н." },
                  { time: "07:40:15", event: "Резервное копирование базы данных завершено", type: "backup", user: "Система" },
                ].map((log, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
                      style={{
                        background: log.type === "escalate" ? "var(--ecsu-red)" : log.type === "ai" ? "var(--ecsu-accent)" : log.type === "create" ? "var(--ecsu-orange)" : "var(--ecsu-muted)",
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div style={{ fontSize: 12, color: "var(--ecsu-text)", lineHeight: 1.3 }}>{log.event}</div>
                      <div className="flex gap-2 mt-0.5">
                        <span style={{ fontSize: 10, color: "var(--ecsu-muted)", fontFamily: "'Oswald', sans-serif" }}>{log.time}</span>
                        <span style={{ fontSize: 10, color: "var(--ecsu-accent2)" }}>{log.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between mt-4 pt-3"
            style={{ borderTop: "1px solid var(--ecsu-border)", fontSize: 10, color: "var(--ecsu-muted)" }}
          >
            <span style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.1em" }}>
              ЕЦСУ 2.0 © 2024 · Николаев Владимир Владимирович
            </span>
            <div className="flex items-center gap-4">
              <span>Версия: 2.0.1-beta</span>
              <span>|</span>
              <span>Сервер: ЦОД-01-МСК</span>
              <span>|</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "var(--ecsu-green)" }} />
                <span style={{ color: "var(--ecsu-green)" }}>Все системы работают</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}