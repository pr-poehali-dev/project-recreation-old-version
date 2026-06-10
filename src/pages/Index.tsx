import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const quickActions = [
  { icon: "Building2", label: "Органы ECSU", color: "var(--ecsu-accent2)" },
  { icon: "EyeOff", label: "Анонимная жалоба", color: "var(--ecsu-accent)" },
  { icon: "FileText", label: "Обращение в орган", color: "var(--ecsu-green)" },
  { icon: "Phone", label: "Экстренные службы", color: "var(--ecsu-red)" },
];

const systemStatus = [
  { label: "Ядро ECSU", sub: "v2.0 · активно", ok: true },
  { label: "База данных", sub: "PostgreSQL · онлайн", ok: true },
  { label: "ЦПВОА", sub: "мониторинг активен", ok: true },
  { label: "Безопасность", sub: "все системы работают", ok: true },
  { label: "Серверы (Ковчег)", sub: "3/3 узла в сети", ok: true },
  { label: "ВИП-канал", sub: "анонимность активна", ok: true },
];

const modules = [
  {
    icon: "Send",
    title: "Обращения в ведомства",
    desc: "МЧС, МВД, Прокуратура, ФСБ, международные органы",
    law: "Конституция РФ ст. 33; ФЗ №59",
    badge: null,
    color: "var(--ecsu-accent2)",
  },
  {
    icon: "Camera",
    title: "Фиксация инцидентов",
    desc: "Экология, кибератаки, права человека — с доказательной базой",
    law: "ФЗ №7; Орхусская конвенция; ФЗ №149",
    badge: null,
    color: "var(--ecsu-accent)",
  },
  {
    icon: "Coins",
    title: "Запрос вознаграждения",
    desc: "За выявление коррупции, экологических нарушений, киберугроз",
    law: "ФЗ №273 «О противодействии коррупции»",
    badge: null,
    color: "var(--ecsu-orange)",
  },
  {
    icon: "Phone",
    title: "Экстренные службы",
    desc: "112, МЧС, МВД, скорая — прямые контакты работают офлайн",
    law: "ФЗ №68 «О защите населения от ЧС»",
    badge: null,
    color: "var(--ecsu-red)",
  },
  {
    icon: "Scale",
    title: "Правовая база",
    desc: "УК РФ, КоАП, конституционные права, международные конвенции",
    law: "Конституция РФ; международные договоры РФ",
    badge: null,
    color: "var(--ecsu-green)",
  },
  {
    icon: "Building2",
    title: "Органы системы ECSU",
    desc: "10 органов ECSU принимают и направляют обращения в госведомства",
    law: "Конституция РФ ст. 33; ФЗ №59",
    badge: "НОВОЕ",
    color: "var(--ecsu-accent)",
  },
  {
    icon: "EyeOff",
    title: "ВИП-анонимный канал",
    desc: "Конфиденциальная жалоба для судей, прокуроров, журналистов, граждан",
    law: "ФЗ №273 ст. 9; Закон о СМИ ст. 41; УК РФ ст. 306",
    badge: "ВИП",
    color: "var(--ecsu-accent)",
    vip: true,
  },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Доброе утро";
  if (h >= 12 && h < 17) return "Добрый день";
  if (h >= 17 && h < 22) return "Добрый вечер";
  return "Доброй ночи";
}

export default function Index() {
  const [now, setNow] = useState(new Date());
  const [vipOpen, setVipOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateStr = now.toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div
      className="min-h-screen ecsu-grid-bg"
      style={{ background: "var(--ecsu-bg)", color: "var(--ecsu-text)", fontFamily: "'Golos Text', sans-serif" }}
    >
      <div className="scan-line" />

      {/* Header */}
      <header
        className="ecsu-header-gradient sticky top-0 z-50"
        style={{ borderBottom: "1px solid var(--ecsu-border)" }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded"
              style={{
                width: 38, height: 38,
                background: "linear-gradient(135deg, var(--ecsu-accent2), var(--ecsu-accent))",
                boxShadow: "0 0 16px rgba(0,200,248,0.3)",
              }}
            >
              <Icon name="Shield" size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "0.12em", color: "#fff", lineHeight: 1 }}>
                ECSU 2.0
              </div>
              <div style={{ fontSize: 9, color: "var(--ecsu-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                СИСТЕМА УПРАВЛЕНИЯ
              </div>
            </div>
          </div>

          {/* Center: VIP */}
          <button
            onClick={() => setVipOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded transition-all"
            style={{
              background: "rgba(0,200,248,0.07)",
              border: "1px solid rgba(0,200,248,0.2)",
              color: "var(--ecsu-accent)",
              fontFamily: "'Oswald', sans-serif",
              fontSize: 12,
              letterSpacing: "0.1em",
              cursor: "pointer",
            }}
          >
            <Icon name="Lock" size={14} />
            🔒 ВИП-канал
          </button>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button
              className="px-4 py-2 rounded transition-all"
              style={{
                background: "var(--ecsu-accent2)",
                color: "#fff",
                fontFamily: "'Oswald', sans-serif",
                fontSize: 12,
                letterSpacing: "0.1em",
                border: "none",
                cursor: "pointer",
              }}
            >
              Центр управления →
            </button>
            <div className="text-right">
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, color: "var(--ecsu-accent)", letterSpacing: "0.08em", lineHeight: 1 }}>
                {timeStr}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Hero greeting */}
        <div className="text-center mb-10 fade-in-up">
          <div style={{ fontSize: 12, color: "var(--ecsu-muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8, fontFamily: "'Oswald', sans-serif" }}>
            {dateStr}
          </div>
          <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 36, fontWeight: 600, color: "#fff", letterSpacing: "0.05em", marginBottom: 4 }}>
            {getGreeting()}, Владимир
          </h1>
          <p style={{ fontSize: 13, color: "var(--ecsu-muted)", letterSpacing: "0.05em" }}>
            ECSU 2.0 · Единая Централизованная Система Управления · Николаев В.В.
          </p>
        </div>

        {/* VIP Block */}
        <div
          className="rounded mb-6 overflow-hidden fade-in-up ecsu-glow"
          style={{
            border: "1px solid rgba(0,200,248,0.25)",
            background: "linear-gradient(135deg, rgba(0,102,204,0.12), rgba(0,200,248,0.06))",
            animationDelay: "0.1s",
          }}
        >
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded"
                style={{
                  width: 56, height: 56,
                  background: "linear-gradient(135deg, var(--ecsu-accent2), var(--ecsu-accent))",
                  boxShadow: "0 0 20px rgba(0,200,248,0.3)",
                }}
              >
                <Icon name="EyeOff" size={26} color="#fff" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, color: "#fff", letterSpacing: "0.08em" }}>
                    ВИП Анонимный Канал
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-xs"
                    style={{ background: "var(--ecsu-accent2)", color: "#fff", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.1em" }}
                  >
                    ВИП
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-xs"
                    style={{ background: "rgba(0,230,118,0.15)", color: "var(--ecsu-green)", border: "1px solid rgba(0,230,118,0.3)", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.1em" }}
                  >
                    ЗАЩИЩЕНО
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "var(--ecsu-text)", lineHeight: 1.6, marginBottom: 12 }}>
                  Для судей, прокуроров, следователей, журналистов и граждан — анонимная подача жалобы.
                  Личность скрыта даже от владельца системы. Раскрытие только по решению суда.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["📜 ФЗ №273 ст. 9", "📜 Закон о СМИ ст. 41", "📜 УК РФ ст. 306 — ответственность за ложный донос"].map((law) => (
                    <span
                      key={law}
                      className="px-2 py-1 rounded text-xs"
                      style={{ background: "rgba(0,200,248,0.08)", border: "1px solid rgba(0,200,248,0.15)", color: "var(--ecsu-muted)", fontSize: 11 }}
                    >
                      {law}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mb-8 fade-in-up" style={{ animationDelay: "0.15s" }}>
          <div className="ecsu-section-header mb-3">Быстрые действия</div>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((a, i) => (
              <button
                key={i}
                className="ecsu-card p-4 flex flex-col items-center gap-3 text-center cursor-pointer transition-all hover:scale-105"
                style={{ border: "1px solid var(--ecsu-border)", background: "var(--ecsu-card)" }}
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{ width: 44, height: 44, background: `${a.color}20`, border: `1px solid ${a.color}40` }}
                >
                  <Icon name={a.icon} size={20} color={a.color} />
                </div>
                <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, letterSpacing: "0.05em", color: "#fff", textTransform: "uppercase" }}>
                  {a.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Two columns: modules + system status */}
        <div className="grid grid-cols-3 gap-4 mb-8">

          {/* Modules — 2 cols */}
          <div className="col-span-2 fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="ecsu-section-header mb-3">
              Гражданские инструменты
              <div style={{ fontSize: 10, color: "var(--ecsu-muted)", fontFamily: "'Golos Text', sans-serif", letterSpacing: "normal", textTransform: "none", fontWeight: 400, marginTop: 2 }}>
                Модули системы · Доступно каждому гражданину — на основании законов РФ
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {modules.map((mod, i) => (
                <div
                  key={i}
                  className="ecsu-card p-4 cursor-pointer transition-all"
                  style={{
                    border: mod.vip ? "1px solid rgba(0,200,248,0.25)" : "1px solid var(--ecsu-border)",
                    background: mod.vip ? "linear-gradient(135deg, rgba(0,102,204,0.08), rgba(0,200,248,0.04))" : "var(--ecsu-card)",
                    animationDelay: `${0.2 + i * 0.06}s`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex-shrink-0 flex items-center justify-center rounded"
                      style={{ width: 36, height: 36, background: `${mod.color}18`, border: `1px solid ${mod.color}30` }}
                    >
                      <Icon name={mod.icon} size={18} color={mod.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: "#fff", letterSpacing: "0.04em" }}>
                          {mod.title}
                        </span>
                        {mod.badge && (
                          <span
                            className="px-1.5 py-0.5 rounded text-xs"
                            style={{
                              background: mod.badge === "ВИП" ? "var(--ecsu-accent2)" : "rgba(0,230,118,0.2)",
                              color: mod.badge === "ВИП" ? "#fff" : "var(--ecsu-green)",
                              fontFamily: "'Oswald', sans-serif",
                              fontSize: 10,
                              letterSpacing: "0.1em",
                            }}
                          >
                            {mod.badge}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--ecsu-muted)", lineHeight: 1.4 }}>{mod.desc}</div>
                      <div style={{ fontSize: 10, color: "rgba(74,96,128,0.7)", marginTop: 3 }}>📜 {mod.law}</div>
                    </div>
                    <Icon name="ChevronRight" size={16} color="var(--ecsu-muted)" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System status */}
          <div className="fade-in-up" style={{ animationDelay: "0.25s" }}>
            <div className="ecsu-section-header mb-3">Статус систем</div>

            {/* Clock */}
            <div
              className="ecsu-card p-4 mb-3 text-center"
              style={{ border: "1px solid rgba(0,200,248,0.2)", background: "rgba(0,200,248,0.04)" }}
            >
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 30, fontWeight: 600, color: "var(--ecsu-accent)", letterSpacing: "0.1em", lineHeight: 1 }}>
                {timeStr}
              </div>
            </div>

            <div className="ecsu-card overflow-hidden">
              {systemStatus.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: i < systemStatus.length - 1 ? "1px solid var(--ecsu-border)" : "none" }}
                >
                  <div>
                    <div style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>{s.label}</div>
                    <div style={{ fontSize: 10, color: "var(--ecsu-muted)" }}>{s.sub}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-full pulse-dot"
                      style={{ background: s.ok ? "var(--ecsu-green)" : "var(--ecsu-red)", boxShadow: `0 0 6px ${s.ok ? "var(--ecsu-green)" : "var(--ecsu-red)"}` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div
          className="rounded p-4 mb-6 fade-in-up"
          style={{ background: "rgba(26,42,64,0.4)", border: "1px solid var(--ecsu-border)", animationDelay: "0.5s" }}
        >
          <p style={{ fontSize: 11, color: "var(--ecsu-muted)", lineHeight: 1.7 }}>
            <strong style={{ color: "rgba(200,216,232,0.6)" }}>Правовая основа системы ECSU 2.0:</strong>{" "}
            Все инструменты работают в рамках действующего законодательства РФ и международных конвенций.
            Система не является органом власти и не заменяет официальные обращения — она помогает их составить и направить.
            Пользователь несёт ответственность за достоверность сведений (УК РФ ст. 306).{" "}
            <strong style={{ color: "rgba(200,216,232,0.6)" }}>Владелец системы:</strong>{" "}
            Николаев Владимир Владимирович,{" "}
            <a href="mailto:nikolaevvladimir77@yandex.ru" style={{ color: "var(--ecsu-accent2)" }}>nikolaevvladimir77@yandex.ru</a>
          </p>
        </div>

        {/* Footer */}
        <div
          className="text-center py-4"
          style={{ borderTop: "1px solid var(--ecsu-border)", fontSize: 11, color: "var(--ecsu-muted)" }}
        >
          ECSU 2.0 · © 2026 Николаев Владимир Владимирович · Все права защищены
        </div>
      </div>

      {/* VIP Modal */}
      {vipOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(6,10,18,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setVipOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded p-6 fade-in-up"
            style={{ background: "var(--ecsu-card)", border: "1px solid rgba(0,200,248,0.3)", boxShadow: "0 0 40px rgba(0,200,248,0.1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Icon name="Lock" size={20} color="var(--ecsu-accent)" />
                <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, color: "#fff", letterSpacing: "0.1em" }}>
                  ВИП АНОНИМНЫЙ КАНАЛ
                </span>
              </div>
              <button onClick={() => setVipOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ecsu-muted)" }}>
                <Icon name="X" size={20} />
              </button>
            </div>
            <p style={{ fontSize: 13, color: "var(--ecsu-muted)", lineHeight: 1.6, marginBottom: 16 }}>
              Анонимная подача жалобы. Личность скрыта даже от владельца системы. Раскрытие только по решению суда.
            </p>
            <div className="flex flex-col gap-2 mb-4">
              {["📜 ФЗ №273 ст. 9", "📜 Закон о СМИ ст. 41", "📜 УК РФ ст. 306 — ответственность за ложный донос"].map((l) => (
                <div key={l} className="px-3 py-2 rounded" style={{ background: "rgba(0,200,248,0.06)", border: "1px solid rgba(0,200,248,0.15)", fontSize: 12, color: "var(--ecsu-muted)" }}>
                  {l}
                </div>
              ))}
            </div>
            <button
              className="w-full py-3 rounded"
              style={{
                background: "linear-gradient(135deg, var(--ecsu-accent2), var(--ecsu-accent))",
                color: "#000",
                fontFamily: "'Oswald', sans-serif",
                fontSize: 14,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Подать анонимную жалобу
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
