import { useEffect, useMemo, useRef, useState } from "react";

const QUOTES = [
  "Я не дерзкая. Я охуевшая. Учите матчасть.",
  "Извиняться? За то, что я права? Смешно.",
  "Мне пофиг. Эстетично пофиг.",
  "Токсичная? Нет, детка, честная.",
  "Королевы не объясняются. Точка.",
  "Я не меняюсь под людей. Люди меняются под меня.",
  "Да, я охуела. И что дальше?",
  "У меня не характер — у меня приговор.",
  "Терпеть не буду. Ни тебя, ни твоё мнение.",
  "Я не холодная. Я дорогая.",
  "На колени встали? Встаньте в очередь.",
  "Моё «нет» звучит громче вашего «люблю».",
];

const REASONS = [
  {
    n: "01",
    title: "НЕ ИЗВИНЯЕТСЯ",
    text: "Никогда. Даже если накосячила — найдёт способ, как это была твоя вина. И ты поверишь.",
    bg: "#ff2e88",
    fg: "#0b0b0c",
  },
  {
    n: "02",
    title: "ДЕЛАЕТ ЧТО ХОЧЕТ",
    text: "Говорит «ушла» — уходит. Говорит «вернулась» — все рады. Правила пишет сама.",
    bg: "#caff00",
    fg: "#0b0b0c",
  },
  {
    n: "03",
    title: "ЗЕРКАЛИТ ХАМСТВО",
    text: "Ты ей грубость — она тебе диагноз. Без анестезии, с улыбкой.",
    bg: "#101014",
    fg: "#ffffff",
    border: true,
  },
  {
    n: "04",
    title: "НЕ УГОВАРИВАЕТСЯ",
    text: "«Пожалуйста» не работает. Работает уважение. И то не всегда.",
    bg: "#7b5bff",
    fg: "#fff9e6",
  },
  {
    n: "05",
    title: "МОЛЧИТ ГРОМКО",
    text: "Её игнор оглушает сильнее крика. Проверено на бывших.",
    bg: "#ffffff",
    fg: "#0b0b0c",
  },
  {
    n: "06",
    title: "КРАСИВО ПОХУЙ",
    text: "Уровень безразличия: люкс. Глаза: «ты кто вообще?»",
    bg: "#ff2e88",
    fg: "#fff",
  },
];

const STATS = [
  { k: "ДЕРЗОСТЬ", v: "999%", sub: "выше некуда", color: "#ff2e88" },
  { k: "ХАРИЗМА", v: "12/10", sub: "шкала сломана", color: "#caff00" },
  { k: "ТЕРПЕНИЕ", v: "0.0с", sub: "не обнаружено", color: "#7b5bff" },
  { k: "ВЛИЯНИЕ", v: "100%", sub: "на всех вокруг", color: "#ffffff" },
];

const VIBES = [
  {
    img: "https://images.pexels.com/photos/8107948/pexels-photo-8107948.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    tag: "CYBER QUEEN",
    note: "не подходи",
  },
  {
    img: "https://images.pexels.com/photos/31159374/pexels-photo-31159374.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    tag: "НОЧНОЙ ВАЙБ",
    note: "опасно красива",
  },
  {
    img: "https://images.pexels.com/photos/8574370/pexels-photo-8574370.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    tag: "PINK MAFIA",
    note: "улыбается = беги",
  },
  {
    img: "https://images.pexels.com/photos/10142575/pexels-photo-10142575.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    tag: "ЛЕДЯНАЯ",
    note: "0 эмоций",
  },
];

const REVIEWS = [
  {
    who: "бывший №3",
    text: "Она сломала моё эго, собрала обратно криво, и я ещё спасибо сказал. Мазохист? Нет, просто она.",
    stars: "★★★★★",
  },
  {
    who: "лучшая подруга",
    text: "С ней страшно, без неё скучно. Выбираю страшно. Она — ходячий красный флаг, который я вешаю себе на стену.",
    stars: "★★★★★",
  },
  {
    who: "бывший босс",
    text: "Уволилась сообщением «я вам слишком крутая». Она была права.",
    stars: "★★★★☆",
  },
  {
    who: "бармен из «Шума»",
    text: "Заходит — тишина. Все смотрят. Она даже не замечает. Вот это уровень.",
    stars: "★★★★★",
  },
  {
    who: "мама",
    text: "Ну характер у неё… сложный. Но зато какая красивая, а!",
    stars: "★★★★★",
  },
  {
    who: "таксист, 4 утра",
    text: "Села, сказала «едем». Куда — не сказала. Я поехал. Куда надо.",
    stars: "★★★★★",
  },
];

export default function App() {
  const [name, setName] = useState("ЮЛЯ");
  const [ohLevel, setOhLevel] = useState(847.32);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [wildMode, setWildMode] = useState(false);
  const [showCert, setShowCert] = useState(false);
  const [toast, setToast] = useState("");
  const [slider, setSlider] = useState(97);
  const tickRef = useRef<number | null>(null);

  const prettyName = useMemo(() => (name.trim() || "ОНА").toUpperCase(), [name]);

  useEffect(() => {
    // читаем имя из URL: ?girl=ЛЕРА
    try {
      const params = new URLSearchParams(window.location.search);
      const g = params.get("girl") || params.get("name");
      if (g && g.trim().length > 0) {
        setName(g.trim().slice(0,14).toUpperCase());
      }
    } catch {}
    tickRef.current = window.setInterval(() => {
      setOhLevel(v => {
        const inc = Math.random() * 0.41 + 0.07;
        const next = v + inc;
        return next > 1234 ? 847 + Math.random() * 12 : next;
      });
    }, 110);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const nextQuote = () => {
    setQuoteIdx(i => (i + 1) % QUOTES.length);
  };

  const doProof = () => {
    setWildMode(true);
    setToast("ДОКАЗАТЕЛЬСТВО ПРИНЯТО. ОНА РЕАЛЬНО ОХУЕВШАЯ.");
    setTimeout(() => setWildMode(false), 1100);
    // fake confetti trigger - just shake
    if (navigator.vibrate) navigator.vibrate(80);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/?girl=${encodeURIComponent(prettyName)}`);
      setToast(`Скопировано! Теперь все узнают, какая ${prettyName} охуевшая.`);
    } catch {
      setToast("Скопируй вручную, бро.");
    }
  };

  return (
    <div
      style={{ fontFamily: `"Manrope", system-ui, sans-serif` }}
      className="min-h-screen bg-[#0b0b0c] text-[#f5f3ef] antialiased relative overflow-x-hidden"
    >
      <style>{`
        .unbounded { font-family: "Unbounded", "Manrope", sans-serif; }
        @keyframes glitch-shift {
          0%,100% { transform: translate(0); }
          20% { transform: translate(-1.5px, .8px); }
          40% { transform: translate(1.5px, -1px); }
          60% { transform: translate(-1px, 1px); }
          80% { transform: translate(1px, .5px); }
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes flick {
          0%,100% { opacity:1; }
          48% { opacity:1; }
          50% { opacity:.45; }
          52% { opacity:1; }
          78% { opacity:.72; }
          80% { opacity:1; }
        }
        @keyframes pop {
          0% { transform: scale(.98); }
          60% { transform: scale(1.015); }
          100% { transform: scale(1); }
        }
        .glitch { animation: glitch-shift 1.8s infinite linear; text-shadow: 2px 0 #ff2e88, -2px 0 #caff00; }
        .marquee-track { animation: marquee 22s linear infinite; }
        .flicker { animation: flick 3.8s infinite; }
        .pop-in { animation: pop .32s ease-out; }
        .noise:before {
          content:"";
          position: absolute; inset:0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E");
          opacity:.032;
          pointer-events:none;
          mix-blend-mode:screen;
        }
        ::selection { background:#ff2e88; color:#fff; }
        input[type=range] { accent-color:#ff2e88; }
      `}</style>

      {/* subtle background grid */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.031) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="pointer-events-none fixed -top-28 -right-20 w-[520px] h-[520px] rounded-full blur-[170px] opacity-[.17]" style={{ background: "radial-gradient(circle, #ff2e88 0%, #7b5bff 45%, transparent 70%)" }} />
      <div className="pointer-events-none fixed bottom-[-140px] left-[-90px] w-[460px] h-[460px] rounded-full blur-[130px] opacity-[.13]" style={{ background: "radial-gradient(circle, #caff00 0%, #ff2e88 55%, transparent 72%)" }} />

      {/* NAV */}
      <header className="relative z-40 border-b border-white/[.085] bg-[#0b0b0c]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 py-[14px] flex items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] rounded-[10px] bg-[#ff2e88] flex items-center justify-center unbounded font-[800] text-[13px] text-white tracking-tight shadow-[0_0_24px_rgba(255,46,136,0.33)]">ОХ³</div>
            <div className="leading-tight">
              <div className="unbounded text-[12px] font-[700] tracking-[0.08em] text-zinc-300">ОХУЕВШАЯ™</div>
              <div className="text-[10.7px] text-zinc-500 font-[600] tracking-wide">официальное досье • 2026</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11.5px] font-[700] tracking-wide text-zinc-400">
            <span className="px-2 py-1 rounded bg-white/[.05] border border-white/[.08]">LIVE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#caff00] flicker" />
            <span>{ohLevel.toFixed(2)} OH/s</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 14).toUpperCase())}
              placeholder="ИМЯ"
              className="w-[118px] sm:w-[154px] bg-[#141417] border border-white/[.14] rounded-[10px] px-3 py-[9px] text-[13px] font-[800] tracking-wider text-[#caff00] outline-none focus:border-[#ff2e88] transition"
              style={{ fontFamily: `"Unbounded", sans-serif` }}
              maxLength={14}
            />
            <button
              onClick={copyLink}
              className="hidden sm:block text-[11px] font-[800] tracking-wider px-3 py-[9px] border border-white/[.13] rounded-[10px] hover:border-white/[.33] hover:bg-white/[.035] transition"
            >
              ПОДЕЛИТЬСЯ
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 pt-14 sm:pt-20 pb-10">
        <div className="grid lg:grid-cols-[1.18fr_.82fr] gap-12 lg:gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[10.5px] tracking-[0.19em] font-[800] text-[#caff00] mb-5">
              <span className="w-[28px] h-px bg-[#caff00]/80" />
              ОФИЦИАЛЬНОЕ ПРЕДУПРЕЖДЕНИЕ
              <span className="hidden sm:inline w-[28px] h-px bg-[#caff00]/80" />
            </div>

            <h1 className="unbounded font-[900] leading-[0.83] tracking-[-0.035em]">
              <span className="block text-[42px] sm:text-[68px] lg:text-[90px] text-zinc-100">ОНА</span>
              <span
                className={`block text-[50px] sm:text-[82px] lg:text-[108px] ${wildMode ? "glitch" : ""}`}
                style={{ color: wildMode ? "#fff" : "#ff2e88" }}
              >
                {prettyName}.
              </span>
              <span className="block text-[42px] sm:text-[64px] lg:text-[79px] text-white">
                ОХУЕВШАЯ
              </span>
              <span className="block text-[26px] sm:text-[38px] lg:text-[44px] text-zinc-400 mt-1">
                И ОЧЕНЬ <span className="text-[#caff00]">КРУТАЯ</span>
              </span>
            </h1>

            <p className="max-w-[560px] mt-6 text-[15.8px] leading-relaxed text-zinc-300">
              Зафиксированный уровень дерзости превышает допустимые нормы.
              Объект <span className="text-white font-[700]">{prettyName}</span> не поддаётся контролю,
              игнорирует чужие ожидания и выглядит при этом преступно хорошо.
              Подтверждено независимой комиссией бывших.
            </p>

            <div className="flex flex-wrap gap-3 mt-7">
              <button
                onClick={doProof}
                className="unbounded px-[22px] py-[15px] rounded-[14px] bg-[#ff2e88] text-white font-[800] text-[14px] tracking-tight shadow-[0_12px_40px_rgba(255,46,136,0.24)] hover:translate-y-[-1px] active:translate-y-[1px] transition"
              >
                ДОКАЗАТЬ СЕЙЧАС →
              </button>
              <button
                onClick={() => setShowCert(true)}
                className="unbounded px-[22px] py-[15px] rounded-[14px] bg-white text-[#111] font-[800] text-[14px] tracking-tight hover:bg-zinc-200 transition"
              >
                СЕРТИФИКАТ ОХ³
              </button>
              <button
                onClick={nextQuote}
                className="px-[18px] py-[15px] rounded-[14px] border border-white/[.17] text-[13.4px] font-[700] hover:border-white/[.34] hover:bg-white/[.035] transition"
              >
                её цитата
              </button>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] text-zinc-400 mt-5 font-[600]">
              <span>• 18+ по дерзости</span>
              <span>• проверено бывшими</span>
              <span>• не извиняется с 2018</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-[8px] items-center">
              <span className="text-[11px] text-zinc-500 font-[700] tracking-wider mr-1">БЫСТРОЕ ИМЯ:</span>
              {["ЮЛЯ","ЛЕРА","КАТЯ","НАСТЯ","СОФА","ВИКА","ДАША","МАША","КИРА"].map(nm=>(
                <button
                  key={nm}
                  onClick={()=>setName(nm)}
                  className={`text-[11px] font-[800] tracking-wider px-[11px] py-[6px] rounded-full border transition ${
                    prettyName===nm
                      ? "bg-[#ff2e88] border-[#ff2e88] text-white"
                      : "border-white/[.15] text-zinc-300 hover:border-white/[.34] hover:bg-white/[.04]"
                  }`}
                >
                  {nm}
                </button>
              ))}
            </div>
          </div>

          {/* Polaroid collage */}
          <div className="relative min-h-[495px] flex items-center justify-center">
            <div className="absolute right-[30px] top-[12px] rotate-[7deg] bg-[#fff] text-[#111] p-[13px] pb-[44px] shadow-[0_26px_70px_rgba(0,0,0,.55)] w-[250px]">
              <img
                alt="vibe"
                src="https://images.pexels.com/photos/8107948/pexels-photo-8107948.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
                className="w-full h-[300px] object-cover"
              />
              <div className="pt-[12px] text-center unbounded text-[12.8px] font-[800]">НЕ ПОДХОДИ.</div>
            </div>

            <div className="absolute left-[18px] top-[140px] -rotate-[9deg] bg-[#caff00] text-[#141414] p-[12px] pb-[40px] shadow-[0_22px_60px_rgba(0,0,0,.5)] w-[220px]">
              <img
                alt="vibe2"
                src="https://images.pexels.com/photos/31159374/pexels-photo-31159374.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
                className="w-full h-[255px] object-cover grayscale-[18%]"
              />
              <div className="pt-[10px] text-center unbounded text-[11.5px] font-[800]">КРУЧЕ ТЕБЯ × 37</div>
            </div>

            <div className="absolute right-[8px] bottom-[16px] rotate-[-2.5deg] bg-[#101015] border border-white/[.10] p-[11px] pb-[38px] shadow-2xl w-[208px]">
              <img
                alt="vibe3"
                src="https://images.pexels.com/photos/8574370/pexels-photo-8574370.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
                className="w-full h-[225px] object-cover"
              />
              <div className="pt-[10px] text-center text-[11px] font-[800] text-[#ff2e88] tracking-wider unbounded">ОХУЕВШАЯ™</div>
            </div>

            {/* floating stats */}
            <div className="absolute left-[-4px] top-[18px] bg-[#0f0f13]/85 backdrop-blur-md border border-white/[.11] rounded-2xl px-4 py-3 text-[11px] font-[700] shadow-xl">
              <div className="text-zinc-400">ДЕРЗОСТЬ</div>
              <div className="unbounded text-[19px] text-[#ff2e88]">∞</div>
            </div>
            <div className="absolute right-[-2px] top-[228px] bg-[#0f0f13]/85 backdrop-blur-md border border-white/[.11] rounded-2xl px-4 py-3 text-[11px] font-[700] shadow-xl">
              <div className="text-zinc-400">LIVE OH</div>
              <div className="unbounded text-[18px] text-[#caff00]">{ohLevel.toFixed(1)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="relative z-10 border-y border-white/[.085] bg-[#ff2e88] text-white overflow-hidden">
        <div className="marquee-track whitespace-nowrap unbounded font-[800] text-[16px] sm:text-[21px] py-[14px] tracking-tight flex">
          {[...Array(2)].map((_,dup) => (
            <div key={dup} className="flex shrink-0">
              {Array.from({ length: 8 }).map((__, i) => (
                <span key={i} className="px-7">
                  {prettyName} ОХУЕВШАЯ • КРУЧЕ ВСЕХ • НЕ ИЗВИНЯЕТСЯ • {prettyName} ОХУЕВШАЯ •
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* STATS GRID */}
      <section className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[14px]">
          {STATS.map((s) => (
            <div
              key={s.k}
              className="relative rounded-[22px] bg-[#131318] border border-white/[.09] p-[22px] min-h-[150px] noise overflow-hidden"
            >
              <div className="text-[11px] tracking-[0.16em] text-zinc-500 font-[800]">{s.k}</div>
              <div className="unbounded text-[44px] font-[800] leading-none mt-3" style={{ color: s.color }}>{s.v}</div>
              <div className="text-[12.8px] text-zinc-400 mt-2 font-[600]">{s.sub}</div>
              <div className="absolute right-[-18px] bottom-[-16px] text-[84px] leading-none font-[900] text-white/[.032] unbounded">{s.v[0]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* REASONS */}
      <section className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 pb-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
          <h2 className="unbounded text-[32px] sm:text-[46px] font-[800] tracking-[-0.02em] leading-[1.04]">
            ПОЧЕМУ ОНА<br />ТАКАЯ <span className="text-[#ff2e88]">ОХУЕВШАЯ?</span>
          </h2>
          <div className="text-[13px] text-zinc-400 max-w-[390px] font-[500] leading-relaxed">
            Лабораторно доказанные факты. Опросили 247 человек. 246 согласились молча. Один пропал.
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-[14px]">
          {REASONS.map(r => (
            <div
              key={r.n}
              className="rounded-[22px] px-[22px] py-[22px] min-h-[218px] flex flex-col justify-between"
              style={{
                background: r.bg,
                color: r.fg,
                border: r.border ? "1px solid rgba(255,255,255,0.16)" : "none",
              }}
            >
              <div className="text-[11.5px] font-[800] opacity-70 tracking-wider">{r.n} / АРХИВ</div>
              <div>
                <div className="unbounded font-[800] text-[20.5px] leading-tight tracking-[-0.01em] mb-2">{r.title}</div>
                <div className="text-[14.2px] leading-snug font-[600]" style={{ opacity: r.bg === "#ffffff" || r.bg === "#caff00" ? 0.78 : 0.94 }}>
                  {r.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE ROULETTE */}
      <section className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 py-14">
        <div className="rounded-[30px] border border-white/[.11] bg-[linear-gradient(165deg,#15151a_0%,#0c0c0f_100%)] p-7 sm:p-12 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 text-[200px] leading-none unbounded font-[900] text-white/[.022] select-none">“</div>
          <div className="max-w-[980px]">
            <div className="text-[11px] tracking-[0.2em] text-[#caff00] font-[800]">ЦИТАТНИК {prettyName.toUpperCase()}</div>
            <div className="unbounded text-[28px] sm:text-[40px] lg:text-[48px] font-[700] leading-[1.12] tracking-[-0.018em] mt-4 min-h-[144px] pop-in" key={quoteIdx}>
              «{QUOTES[quoteIdx]}»
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <button onClick={nextQuote} className="px-5 py-[12px] rounded-full bg-white text-[#111] text-[13.5px] font-[800] unbounded hover:bg-zinc-200 transition">
                ещё дерзость →
              </button>
              <span className="text-[12.7px] text-zinc-400">{quoteIdx + 1} / {QUOTES.length} • ручная сборка</span>
              <button
                onClick={() => { navigator.clipboard?.writeText(`«${QUOTES[quoteIdx]}» — ${prettyName}`); setToast("Цитата украдена. Молодец."); }}
                className="text-[12px] text-zinc-300 underline underline-offset-4 decoration-white/25 hover:decoration-white"
              >
                скопировать цитату
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDER / OH-METER */}
      <section className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 pb-8">
        <div className="grid lg:grid-cols-[1.06fr_.94fr] gap-[14px]">
          <div className="rounded-[26px] bg-[#131318] border border-white/[.10] p-[26px] sm:p-[32px]">
            <div className="text-[11px] tracking-[0.18em] text-zinc-500 font-[800]">ОХ³-ДЕТЕКТОР • LIVE</div>
            <div className="flex items-baseline gap-3 mt-3 flex-wrap">
              <div className="unbounded text-[54px] sm:text-[66px] font-[900] tracking-[-0.03em] text-[#ff2e88]">{ohLevel.toFixed(2)}</div>
              <div className="text-[13px] text-zinc-400 font-[600]">OH / сек<br/>растёт в реальном времени</div>
            </div>
            <div className="mt-5 h-[11px] w-full rounded-full bg-[#0b0b0c] border border-white/[.08] overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: "100%", background: "linear-gradient(90deg, #ff2e88, #caff00, #7b5bff)" }}
              />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-6 text-[12.5px] font-[700]">
              <div className="bg-[#0f0f13] rounded-xl px-[14px] py-[12px] border border-white/[.07]">
                <div className="text-zinc-500 text-[10.5px]">ПИКОВЫЙ</div>
                <div className="text-[16px] unbounded">1 247 OH</div>
              </div>
              <div className="bg-[#0f0f13] rounded-xl px-[14px] py-[12px] border border-white/[.07]">
                <div className="text-zinc-500 text-[10.5px]">СЕГОДНЯ</div>
                <div className="text-[16px] unbounded">+8 402</div>
              </div>
              <div className="bg-[#0f0f13] rounded-xl px-[14px] py-[12px] border border-white/[.07]">
                <div className="text-zinc-500 text-[10.5px]">СТАТУС</div>
                <div className="text-[16px] unbounded text-[#caff00]">КРИТ.</div>
              </div>
            </div>
          </div>

          <div className="rounded-[26px] bg-white text-[#141417] p-[28px] sm:p-[34px]">
            <div className="text-[11px] font-[800] tracking-[0.16em] text-zinc-500">НАСКОЛЬКО ОХУЕВШАЯ?</div>
            <div className="unbounded text-[44px] font-[900] leading-none mt-2">{slider}%</div>
            <input
              type="range"
              min={80}
              max={120}
              value={slider}
              onChange={e=>setSlider(parseInt(e.target.value))}
              className="w-full mt-5"
            />
            <div className="text-[13.4px] text-zinc-700 mt-3 font-[600]">
              {slider < 93
                ? "Слабовато. Она бы не одобрила. Поднимай."
                : slider < 100
                ? "Почти. Ещё чуть дерзости."
                : slider === 100
                ? "Сто. Как её взгляд в 2 ночи."
                : "Больше 100%? Да. Она ломает шкалы. Законно."}
            </div>
            <div className="mt-5 text-[11.5px] font-[700] text-zinc-500">
              Слайдер чисто для понтов. Реально там {Math.round(ohLevel)} OH.
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 py-14">
        <div className="flex items-center justify-between mb-6">
          <h3 className="unbounded text-[30px] sm:text-[38px] font-[800]">ВАЙБ-ГАЛЕРЕЯ</h3>
          <div className="text-[12.5px] text-zinc-400 font-[600]">смотреть, не трогать</div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[14px]">
          {VIBES.map(v => (
            <div key={v.img} className="group rounded-[22px] overflow-hidden bg-[#131318] border border-white/[.09]">
              <div className="relative h-[380px] overflow-hidden">
                <img src={v.img} alt={v.tag} className="w-full h-full object-cover group-hover:scale-[1.035] transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[11px] tracking-wider font-[800] text-[#caff00]">{v.note.toUpperCase()}</div>
                  <div className="unbounded text-[17.5px] font-[800]">{v.tag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="relative z-10 bg-[#f6f3ef] text-[#15151a]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-[86px]">
          <div className="flex flex-wrap items-end justify-between mb-8 gap-4">
            <h3 className="unbounded text-[32px] sm:text-[44px] font-[800] tracking-[-0.02em] leading-[1.04]">ОТЗЫВЫ<br/>ПОСТРАДАВШИХ</h3>
            <div className="text-[13.3px] text-zinc-700 max-w-[370px] font-[600] leading-relaxed">
              Реальные люди. Реальные травмы эго. Публикуем с разрешения. Почти.
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[13px]">
            {REVIEWS.map((r,i)=>(
              <div key={i} className="rounded-[22px] bg-white border border-black/[.08] p-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.053)]">
                <div className="text-[#ff2e88] text-[14px] tracking-wider">{r.stars}</div>
                <div className="text-[15px] leading-relaxed mt-[10px] font-[550] text-zinc-800">“{r.text}”</div>
                <div className="mt-[14px] text-[11.5px] font-[800] tracking-wider text-zinc-500">— {r.who.toUpperCase()}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[22px] bg-[#111116] text-[#f2f2f2] p-[26px] sm:p-[34px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="unbounded text-[22px] sm:text-[27px] font-[800]">Хочешь оставить отзыв?</div>
              <div className="text-[13.3px] text-zinc-400 mt-1">Сначала переживи встречу с ней. Потом поговорим.</div>
            </div>
            <button
              onClick={()=>setToast("Отзывы закрыты. Она сказала: хватит ныть.")}
              className="rounded-full px-5 py-[12px] bg-[#ff2e88] text-white text-[13px] font-[800] unbounded"
            >
              оставить отзыв
            </button>
          </div>
        </div>
      </section>

      {/* CERTIFICATE CTA */}
      <section className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <div className="rounded-[30px] border border-[#ff2e88]/35 bg-[radial-gradient(1200px_600px_at_60%_-10%,rgba(255,46,136,0.10),transparent_65%),#121218] p-[30px] sm:p-[48px]">
          <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-10 items-center">
            <div>
              <div className="text-[11px] tracking-[0.19em] text-[#caff00] font-[800]">ОФИЦИАЛЬНО • СЕРТИФИЦИРОВАНО</div>
              <h4 className="unbounded text-[32px] sm:text-[44px] font-[800] tracking-[-0.018em] leading-[1.02] mt-3">
                СЕРТИФИКАТ<br/>ОХУЕВШЕСТИ<br/><span className="text-[#ff2e88]">УРОВЕНЬ «БОГ»</span>
              </h4>
              <p className="text-[14.8px] text-zinc-300 mt-4 max-w-[540px] leading-relaxed">
                Именной сертификат для <b>{prettyName}</b>. Подписи: 3 бывших, 2 подруги, 1 бармен. Подделка карается игнором.
              </p>
              <div className="flex gap-3 mt-6 flex-wrap">
                <button onClick={()=>setShowCert(true)} className="unbounded bg-white text-[#121217] px-5 py-[13px] rounded-[12px] text-[13.8px] font-[800]">
                  открыть сертификат
                </button>
                <button onClick={copyLink} className="px-5 py-[13px] rounded-[12px] text-[13.6px] font-[700] border border-white/[.18] hover:border-white/[.35]">
                  отправить ей →
                </button>
              </div>
            </div>
            <div className="bg-[#fbf9f6] text-[#17171b] rounded-[18px] p-[22px] border-[9px] border-[#1d1d24] shadow-[0_30px_90px_rgba(0,0,0,.56)] rotate-[-1.2deg]">
              <div className="text-[10.5px] tracking-[0.19em] font-[800] text-zinc-500">СЕРТИФИКАТ № OH-2026-{prettyName.slice(0,3)}</div>
              <div className="unbounded text-[21px] font-[800] mt-2 leading-tight">ОХУЕВШАЯ<br/>КАТЕГОРИЯ AAA</div>
              <div className="mt-3 text-[13.5px] font-[600] text-zinc-700">
                Выдаётся <b>{prettyName}</b><br/>
                За: дерзость, красоту,<br/>отсутствие совести<br/>и 100% крутость.
              </div>
              <div className="flex justify-between items-end mt-[18px] text-[11px] font-[700] text-zinc-500">
                <div>Подпись комиссии<br/><span className="unbounded text-[#111] text-[14px]">бывших</span></div>
                <div className="text-right text-[10.5px] leading-tight">печать<br/>ОХ³</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 border-t border-white/[.085]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-[84px] text-center">
          <div className="unbounded text-[34px] sm:text-[56px] lg:text-[72px] font-[900] tracking-[-0.032em] leading-[0.92]">
            ОНА — <span className="text-[#ff2e88]">ОХУЕВШАЯ</span>.<br/>
            И ЭТО НЕ ОБСУЖДАЕТСЯ.
          </div>
          <div className="text-[15px] text-zinc-300 mt-5 max-w-[630px] mx-auto">
            Сделай {prettyName} красиво. Отправь ей эту страницу. Пусть знает, что весь интернет в курсе, какая она крутая.
          </div>
          <div className="flex justify-center gap-3 mt-7 flex-wrap">
            <button onClick={copyLink} className="unbounded bg-[#caff00] text-[#0d0d0f] px-[24px] py-[15px] rounded-[14px] text-[14.5px] font-[800]">
              скопировать ссылку
            </button>
            <button onClick={doProof} className="px-[22px] py-[15px] rounded-[14px] text-[14px] font-[700] border border-white/[.19] hover:border-white/[.4]">
              доказать ещё раз
            </button>
          </div>
          <div className="text-[11.6px] text-zinc-500 mt-4 font-[600]">ohuevshaya.{prettyName.toLowerCase()}.live • создано с уважением и лёгким страхом</div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[.080] text-zinc-500 text-[12.2px]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 ОХУЕВШАЯ™ • досье {prettyName} • все права защищены её взглядом</div>
          <div className="flex gap-5 font-[700]">
            <span>18+ по наглости</span>
            <span>•</span>
            <span>Made for {prettyName}</span>
          </div>
        </div>
      </footer>

      {/* Certificate modal */}
      {showCert && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={()=>setShowCert(false)} />
          <div className="relative max-w-[740px] w-full bg-[#faf7f2] text-[#17171b] rounded-[26px] p-[30px] sm:p-[44px] border-[10px] border-[#111116] shadow-[0_40px_120px_rgba(0,0,0,.68)] pop-in">
            <button onClick={()=>setShowCert(false)} className="absolute right-5 top-4 text-[22px] text-zinc-400 hover:text-zinc-800">×</button>
            <div className="text-[11px] tracking-[0.22em] font-[800] text-zinc-500">ГОСУДАРСТВЕННЫЙ СТАНДАРТ ОХ³-2026</div>
            <div className="unbounded text-[30px] sm:text-[42px] font-[900] tracking-[-0.02em] mt-2 leading-[1.05]">СЕРТИФИКАТ<br/>ОХУЕВШЕСТИ</div>

            <div className="mt-6 grid sm:grid-cols-2 gap-6 text-[14px]">
              <div>
                <div className="text-[11px] text-zinc-500 font-[700]">ИМЯ НОСИТЕЛЯ</div>
                <div className="unbounded text-[26px] font-[800] text-[#ff2e88]">{prettyName}</div>

                <div className="mt-5 text-[11px] text-zinc-500 font-[700]">КАТЕГОРИЯ</div>
                <div className="unbounded text-[18px] font-[800]">AAA • “БОГИНЯ ДЕРЗОСТИ”</div>

                <div className="mt-5 text-[11px] text-zinc-500 font-[700]">ВЫДАН</div>
                <div className="font-[600]">30 марта 2026 • Комиссией бывших</div>
              </div>
              <div className="text-[13.7px] leading-relaxed font-[500] text-zinc-700">
                Настоящим подтверждается, что гражданка <b>{prettyName}</b> прошла полную проверку на охуевание и набрала
                <b> {ohLevel.toFixed(1)} OH</b> при норме 100 OH.
                <br/><br/>
                Признаки: не извиняется, делает что хочет, выглядит преступно, игнорирует мнение масс.
                <br/><br/>
                Сертификат бессрочный. Попытки оспорить караются молчанием.
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mt-7 pt-5 border-t border-black/[.10] text-[11.4px] text-zinc-600 font-[700]">
              <div>Подписи: Бывший №1 • Бывший №2 • Бывший №3<br/>+ лучшая подруга (вынужденно)</div>
              <div className="text-right">
                <div className="w-[84px] h-[84px] rounded-full border-[2.5px] border-[#ff2e88] flex items-center justify-center unbounded text-[13px] font-[900] text-[#ff2e88]">ОХ³<br/>ПЕЧАТЬ</div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-[11px] rounded-xl bg-[#111] text-white text-[13px] font-[800]"
              >
                распечатать / сохранить
              </button>
              <button onClick={()=>setShowCert(false)} className="px-4 py-[11px] rounded-xl border border-black/[.18] text-[13px] font-[700]">
                закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] px-5 py-[13px] rounded-[15px] bg-[#fff] text-[#121217] text-[13.5px] font-[750] shadow-[0_16px_60px_rgba(0,0,0,.45)] max-w-[90vw] text-center pop-in">
          {toast}
        </div>
      )}
    </div>
  );
}