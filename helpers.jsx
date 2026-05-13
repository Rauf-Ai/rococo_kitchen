/* global React */
const { useEffect, useRef, useState, useMemo, useCallback } = React;

// ===== Reveal on scroll =====
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

// ===== Scroll progress hook =====
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { setY(window.scrollY); raf = 0; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}

// ===== Smooth scroll =====
function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

// ===== Icons (minimal, original) =====
const IconArrowUR = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M7 17 L17 7" />
    <path d="M8 7 H17 V16" />
  </svg>
);
const IconArrowR = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12 H19" />
    <path d="M13 6 L19 12 L13 18" />
  </svg>
);
const IconPhone = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 4 H9 L11 9 L8.5 10.5 a11 11 0 0 0 5 5 L15 13 L20 15 V19 a2 2 0 0 1 -2 2 A16 16 0 0 1 3 6 a2 2 0 0 1 2 -2 z" />
  </svg>
);
const IconGift = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8 V21" />
    <path d="M4 12 V20 a1 1 0 0 0 1 1 H19 a1 1 0 0 0 1 -1 V12" />
    <path d="M7.5 8 a2.5 2.5 0 1 1 2.5 -2.5 c0 1 -.5 2.5 -2.5 2.5 z" />
    <path d="M16.5 8 a2.5 2.5 0 1 0 -2.5 -2.5 c0 1 .5 2.5 2.5 2.5 z" />
  </svg>
);
const IconCheck = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 12 L10 18 L20 6" />
  </svg>
);
const IconChevD = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M6 9 L12 15 L18 9" />
  </svg>
);
const IconStar = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||16} height={p.size||16} fill={p.fill || "#F2B544"} {...p}>
    <path d="M12 2 L14.6 8.6 L21.6 9.2 L16.3 13.9 L17.9 20.8 L12 17.2 L6.1 20.8 L7.7 13.9 L2.4 9.2 L9.4 8.6 Z" />
  </svg>
);
const IconYandex = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||22} height={p.size||22} {...p}>
    <circle cx="12" cy="12" r="11" fill="#FC3F1D"/>
    <path d="M13.4 17.6 V6.4 H11.3 c-2 0 -3.4 1.3 -3.4 3.2 c0 1.4 .7 2.3 1.9 2.8 L7 17.6 H8.9 L11.1 12.9 H12.1 V17.6 Z M12.1 11.5 H11.4 c-1.2 0 -1.9 -.7 -1.9 -1.9 c0 -1.2 .8 -1.8 1.9 -1.8 H12.1 Z" fill="#fff"/>
  </svg>
);
const IconPin = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill={p.fill || "currentColor"} {...p}>
    <path d="M12 2 a7 7 0 0 0 -7 7 c0 5 7 13 7 13 s7 -8 7 -13 a7 7 0 0 0 -7 -7 z m0 9.5 a2.5 2.5 0 1 1 0 -5 a2.5 2.5 0 0 1 0 5 z" />
  </svg>
);
const IconTg = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="currentColor" {...p}>
    <path d="M21.4 3.6 L2.6 11.1 c-1 .4 -1 1.7 0 2 l4.7 1.5 l1.8 5.8 c.2 .8 1.2 1 1.7 .4 l2.7 -2.7 l4.6 3.4 c.7 .5 1.7 .2 1.9 -.7 l3.3 -15.4 c.3 -1.1 -.9 -2 -1.9 -1.7 z M9.1 14.7 l8.8 -5.4 l-7.2 6.5 z" />
  </svg>
);
const IconClose = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
    <path d="M5 5 L19 19 M19 5 L5 19" />
  </svg>
);
const IconBurger = (p) => (
  <svg viewBox="0 0 24 24" width={p.size||18} height={p.size||18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
    <path d="M4 8 H20 M4 16 H14" />
  </svg>
);

// ===== Telegram notification =====
const TG_TOKEN = '8735229938:AAGCmNPz_U6KeqnVALzNFOky0hqXuwjKNPw';
const TG_CHAT  = '730539864';

function sendToTelegram(text) {
  return fetch('https://api.telegram.org/bot' + TG_TOKEN + '/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TG_CHAT, text: text, parse_mode: 'HTML' }),
  })
  .then(function(r) { return r.json(); })
  .then(function(d) { if (!d.ok) console.warn('TG error', d); })
  .catch(function(e) { console.warn('TG fetch error', e); });
}
window.sendToTelegram = sendToTelegram;

Object.assign(window, {
  useReveal, useScrollY, smoothScrollTo, sendToTelegram,
  IconArrowUR, IconArrowR, IconPhone, IconGift, IconCheck, IconChevD,
  IconStar, IconYandex, IconPin, IconTg, IconClose, IconBurger,
});
