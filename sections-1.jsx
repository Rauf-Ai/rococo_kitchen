/* global React, useScrollY, smoothScrollTo, IconPhone, IconArrowUR, IconArrowR, IconBurger, IconClose */
const { useEffect: useE1, useRef: useR1, useState: useS1, useMemo: useM1 } = React;

// ===== Header =====
function Header() {
  const [open, setOpen] = useS1(false);
  const y = useScrollY();
  const links = [
    { id: 'portfolio', label: 'Портфолио' },
    { id: 'calculator', label: 'Калькулятор' },
    { id: 'stages', label: 'Этапы' },
    { id: 'installment', label: 'Рассрочка' },
  ];
  return (
    <header className="hdr-root">
      <div className={`hdr glass ${y > 8 ? 'hdr-scrolled' : ''}`}>
        <button className="hdr-nav-btn" onClick={() => setOpen(o => !o)} aria-label="Меню">
          {open ? <IconClose size={18} /> : <IconBurger size={18} />}
          <span>{open ? 'Закрыть' : 'Меню'}</span>
        </button>
        <a href="#hero" className="hdr-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); }}>
          <img src="assets/logo.png" alt="Rococo Mebel" className="hdr-logo-img" />
        </a>
        <div className="hdr-right">
          <a href="tel:+79779085252" className="hdr-phone">
            <IconPhone size={14} />
            <span>+7 (977) 908-52-52</span>
          </a>
          <button className="btn btn-primary hdr-cta" onClick={() => smoothScrollTo('lead')}>
            Бесплатный замер
          </button>
        </div>
      </div>
      <div className={`hdr-drawer ${open ? 'hdr-drawer-open' : ''}`}>
        <div className="hdr-drawer-inner glass">
          {links.map((l, i) => (
            <button key={l.id} className="hdr-drawer-link" onClick={() => { smoothScrollTo(l.id); setOpen(false); }}>
              <span className="hdr-drawer-num">0{i+1}</span>
              <span>{l.label}</span>
              <IconArrowUR size={20} />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

// ===== Hero with 5-layer parallax =====
function Hero() {
  const y = useScrollY();
  // Map scroll to parallax offsets. Layers are stacked identically and use translate3d ONLY.
  // Back layers move DOWN more (positive) so they "lag" behind = parallax depth illusion.
  const speeds = [0.65, 0.38, 0.18, -0.10];
  // Layers, in stacking order back→front (island layer removed)
  const layers = [
    { src: 'assets/layer-1-landscape.png', cls: 'h-l1' },
    { src: 'assets/layer-2-kitchen.png',   cls: 'h-l2' },
    { src: 'assets/layer-3-title.png',     cls: 'h-l3' },
    { src: 'assets/layer-5-badge.png',     cls: 'h-l5' },
  ];

  return (
    <section id="hero" className="hero">
      <div className="hero-stage">
        {layers.map((L, i) => (
          <div key={i}
            className={`hero-layer ${L.cls}`}
            style={{ transform: `translate3d(0, ${y * speeds[i]}px, 0)` }}>
            <img src={L.src} alt="" loading="eager" draggable="false" />
          </div>
        ))}
      </div>

      <div className="hero-scrollhint">
        <span className="hero-scrollhint-l">Прокрутите вниз</span>
        <span className="hero-scrollhint-arrow"/>
      </div>

      <div className="hero-actions">
        <button className="btn btn-primary btn-lg" onClick={() => smoothScrollTo('calculator')}>
          Рассчитать кухню
          <IconArrowR size={18} />
        </button>
        <button className="btn hero-actions-ghost" onClick={() => smoothScrollTo('portfolio')}>
          Смотреть работы
        </button>
      </div>
    </section>
  );
}

// ===== Portfolio sticky horizontal slider — 3 grouped cases with lightbox =====
const ALL_CASES = [
  {
    id: 'case1',
    name: 'Калакатта',
    style: 'Графит · Орех · Калакатта',
    desc: 'Угловой гарнитур с фасадами тёмно-серый матт и шпон-орех. Столешница из кварц-агломерата, фартук — спечённый камень с прожилками.',
    price: 280000, duration: '19 дней', sqm: '8,2 м²',
    cover: 'assets/case1-5.jpg',
    photos: ['assets/case1-5.jpg','assets/case1-4.jpg','assets/case1-3.jpg','assets/case1-2.jpg','assets/case1-1.jpg'],
  },
  {
    id: 'case2',
    name: 'Каррара',
    style: 'Бежевый матт · Камень · Чёрная вытяжка',
    desc: 'Минимализм без ручек, гладкий бежевый матт, мраморная столешница и фартук. Встроенная техника Bosch, цилиндрическая вытяжка.',
    price: 245000, duration: '17 дней', sqm: '6,4 м²',
    cover: 'assets/case2-4.jpg',
    photos: ['assets/case2-4.jpg','assets/case2-3.jpg','assets/case2-2.jpg','assets/case2-1.jpg'],
  },
  {
    id: 'case3',
    name: 'Олива',
    style: 'Глянец оливковый · Алюминиевые рамки',
    desc: 'Камерная П-образная кухня в зелёном глянце. Верхние шкафы — глянцевые витрины в алюминиевых рамках, бетонная фактура фартука.',
    price: 198000, duration: '15 дней', sqm: '5,1 м²',
    cover: 'assets/case3-4.jpg',
    photos: ['assets/case3-4.jpg','assets/case3-3.jpg','assets/case3-2.jpg','assets/case3-1.jpg'],
  },
  {
    id: 'case4',
    name: 'Дымчатый дуб',
    style: 'Шпон дуб · Светлые фасады · Камень',
    desc: 'Просторная кухня в натуральных тонах: шпонированные фасады дымчатого дуба, столешница из керамогранита под камень, встроенная техника.',
    price: 310000, duration: '20 дней', sqm: '9,1 м²',
    cover: 'assets/case4-6.jpg',
    photos: ['assets/case4-6.jpg','assets/case4-5.jpg','assets/case4-4.jpg','assets/case4-3.jpg','assets/case4-2.jpg','assets/case4-1.jpg'],
  },
  {
    id: 'case5',
    name: 'Тёмный шоколад',
    style: 'МДФ тёмно-коричневый · Латунные ручки',
    desc: 'Богатый и насыщенный гарнитур в тёмно-шоколадных тонах. Латунные акценты в ручках и карнизе, подсветка столешницы.',
    price: 265000, duration: '18 дней', sqm: '7,4 м²',
    cover: 'assets/case5-10.jpg',
    photos: ['assets/case5-10.jpg','assets/case5-9.jpg','assets/case5-8.jpg','assets/case5-7.jpg','assets/case5-6.jpg','assets/case5-5.jpg','assets/case5-4.jpg','assets/case5-3.jpg','assets/case5-2.jpg','assets/case5-1.jpg'],
  },
  {
    id: 'case6',
    name: 'Скандинав',
    style: 'Белый матт · Дерево · Открытые полки',
    desc: 'Скандинавский минимализм: белые матовые фасады без ручек, деревянные вставки, открытые полки и максимум естественного света.',
    price: 189000, duration: '14 дней', sqm: '5,8 м²',
    cover: 'assets/case6-7.jpg',
    photos: ['assets/case6-7.jpg','assets/case6-6.jpg','assets/case6-5.jpg','assets/case6-4.jpg','assets/case6-3.jpg','assets/case6-2.jpg','assets/case6-1.jpg'],
  },
  {
    id: 'case7',
    name: 'Антрацит',
    style: 'МДФ антрацит · Матовые фасады · Остров',
    desc: 'Угловой гарнитур с островом в глубоком антраците. Фасады без ручек с системой push-to-open, белая кварцевая столешница.',
    price: 335000, duration: '21 день', sqm: '10,3 м²',
    cover: 'assets/case7-6.jpg',
    photos: ['assets/case7-6.jpg','assets/case7-5.jpg','assets/case7-4.jpg','assets/case7-3.jpg','assets/case7-2.jpg','assets/case7-1.jpg'],
  },
  {
    id: 'case8',
    name: 'Пудровый',
    style: 'Пудровый матт · Золотые акценты',
    desc: 'Нежный пудрово-розовый гарнитур с золотыми ручками и вытяжкой. Встроенная духовая колонна, посудомоечная машина под столешницей.',
    price: 218000, duration: '16 дней', sqm: '6,0 м²',
    cover: 'assets/case8-4.jpg',
    photos: ['assets/case8-4.jpg','assets/case8-3.jpg','assets/case8-2.jpg','assets/case8-1.jpg'],
  },
  {
    id: 'case9',
    name: 'Арктик',
    style: 'Белоснежный глянец · Хром',
    desc: 'Компактная прямая кухня в белом глянце с хромированными ручками. Увеличенные верхние шкафы до потолка, подсветка LED.',
    price: 175000, duration: '13 дней', sqm: '4,6 м²',
    cover: 'assets/case9-4.jpg',
    photos: ['assets/case9-4.jpg','assets/case9-3.jpg','assets/case9-2.jpg','assets/case9-1.jpg'],
  },
  {
    id: 'case10',
    name: 'Дерево + белый',
    style: 'Комбинация · Верхние белые · Нижние дерево',
    desc: 'Популярная комбинация: нижние тумбы в шпоне ореха, верхние шкафы — белые матовые. Столешница под светлый бетон.',
    price: 228000, duration: '17 дней', sqm: '6,8 м²',
    cover: 'assets/case10-3.jpg',
    photos: ['assets/case10-3.jpg','assets/case10-2.jpg','assets/case10-1.jpg'],
  },
  {
    id: 'case11',
    name: 'Хаки',
    style: 'МДФ хаки матт · Медные ручки',
    desc: 'Трендовый цвет хаки в матовом исполнении. Медные круглые ручки, столешница с текстурой дерева, встроенная микроволновка.',
    price: 195000, duration: '15 дней', sqm: '5,5 м²',
    cover: 'assets/case11-3.jpg',
    photos: ['assets/case11-3.jpg','assets/case11-2.jpg','assets/case11-1.jpg'],
  },
  {
    id: 'case12',
    name: 'Венге',
    style: 'Шпон венге · Чёрная столешница',
    desc: 'Представительная тёмная кухня в шпоне венге. Столешница из чёрного кварца, встроенная варочная и духовой шкаф Miele.',
    price: 295000, duration: '19 дней', sqm: '8,0 м²',
    cover: 'assets/case12-4.jpg',
    photos: ['assets/case12-4.jpg','assets/case12-3.jpg','assets/case12-2.jpg','assets/case12-1.jpg'],
  },
  {
    id: 'case13',
    name: 'Слоновая кость',
    style: 'Классика · Патина · Резные фасады',
    desc: 'Классический гарнитур в цвете слоновой кости с лёгкой патиной. Резные фасады, карниз с подсветкой, колонна под технику.',
    price: 255000, duration: '22 дня', sqm: '7,2 м²',
    cover: 'assets/case13-2.jpg',
    photos: ['assets/case13-2.jpg','assets/case13-1.jpg'],
  },
  {
    id: 'case14',
    name: 'Чёрный матт',
    style: 'Чёрный ультраматт · Без ручек',
    desc: 'Максимально строгий и современный вид: ультраматтовые фасады Deep Black, открывание push-to-open, тонкая кварцевая столешница.',
    price: 320000, duration: '20 дней', sqm: '8,8 м²',
    cover: 'assets/case14-3.jpg',
    photos: ['assets/case14-3.jpg','assets/case14-2.jpg','assets/case14-1.jpg'],
  },
  {
    id: 'case15',
    name: 'Серый шпон',
    style: 'Шпон серый ясень · Угловая',
    desc: 'Угловая кухня в благородном сером ясене. Столешница из керамики 12 мм, встроенный холодильник, система хранения Blum.',
    price: 288000, duration: '18 дней', sqm: '8,5 м²',
    cover: 'assets/case15-5.jpg',
    photos: ['assets/case15-5.jpg','assets/case15-4.jpg','assets/case15-3.jpg','assets/case15-2.jpg','assets/case15-1.jpg'],
  },
];


function Portfolio() {
  const trackRef = useR1(null);
  const [active, setActive] = useS1(0);
  const [scrollPct, setScrollPct] = useS1(0);
  const [lightbox, setLightbox] = useS1(null);
  const N = ALL_CASES.length;

  // Track which card is nearest the left edge → active
  useE1(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = Array.from(track.querySelectorAll('.pf-card'));
      const trackRect = track.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;
      let best = 0, bestDist = Infinity;
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const cardCenter = r.left + r.width / 2;
        const d = Math.abs(cardCenter - trackCenter);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActive(best);
      const maxScroll = track.scrollWidth - track.clientWidth;
      setScrollPct(maxScroll > 0 ? track.scrollLeft / maxScroll : 0);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  // Arrow navigation — scroll exactly one card width
  const scrollBy = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const cardW = (track.querySelector('.pf-card')?.offsetWidth || 620) + 20;
    track.scrollBy({ left: dir * cardW, behavior: 'smooth' });
  };

  // Lightbox keyboard
  useE1(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox(lb => lb ? { ...lb, photoIdx: (lb.photoIdx + 1) % ALL_CASES[lb.caseIdx].photos.length } : null);
      if (e.key === 'ArrowLeft')  setLightbox(lb => lb ? { ...lb, photoIdx: (lb.photoIdx - 1 + ALL_CASES[lb.caseIdx].photos.length) % ALL_CASES[lb.caseIdx].photos.length } : null);
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [lightbox]);

  const lbCase = lightbox ? ALL_CASES[lightbox.caseIdx] : null;

  return (
    <section id="portfolio" className="pf">
      {/* Header */}
      <div className="wrap pf-head">
        <div className="reveal">
          <div className="eyebrow">[03 — ПОРТФОЛИО]</div>
          <h2 className="section-h">Реализованные<br/>проекты</h2>
        </div>
        <div className="pf-head-right reveal d1">
          <div className="pf-counter">
            <span className="pf-counter-num">{String(active + 1).padStart(2, '0')}</span>
            <span className="pf-counter-sep">/</span>
            <span className="pf-counter-tot">{String(N).padStart(2, '0')}</span>
          </div>
          <div className="pf-nav">
            <button className="pf-nav-arr" onClick={() => scrollBy(-1)} aria-label="Назад">
              <IconArrowR size={18} style={{ transform: 'rotate(180deg)' }}/>
            </button>
            <button className="pf-nav-arr" onClick={() => scrollBy(1)} aria-label="Вперёд">
              <IconArrowR size={18}/>
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable track — native overflow-x, snap centers active card */}
      <div className="pf-track" ref={trackRef}>
        <div className="pf-track-inner">
          {ALL_CASES.map((c, i) => (
            <article key={c.id}
              className={`pf-card ${i === active ? 'pf-card-active' : ''}`}
              onClick={() => setLightbox({ caseIdx: i, photoIdx: 0 })}>
              <div className="pf-card-img">
                <img src={c.cover} alt={c.name} loading={i < 4 ? 'eager' : 'lazy'}/>
                <span className="pf-card-count">+{c.photos.length - 1} фото</span>
              </div>
              <div className="pf-card-meta">
                <div className="pf-card-name">{c.name}</div>
                <div className="pf-card-style">{c.style}</div>
                <div className="pf-card-foot">
                  <div className="pf-card-stats">
                    <div className="pf-card-stat"><span>от</span><b>{c.price.toLocaleString('ru-RU')} ₽</b></div>
                    <div className="pf-card-stat"><span>срок</span><b>{c.duration}</b></div>
                    <div className="pf-card-stat"><span>площадь</span><b>{c.sqm}</b></div>
                  </div>
                  <button className="pf-card-go" aria-label="Открыть галерею">
                    <IconArrowUR size={20}/>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="wrap pf-bar-wrap">
        <div className="pf-bar"><div className="pf-bar-fill" style={{ width: `${scrollPct * 100}%` }}/></div>
        <div className="pf-hint">Листайте → · {N} проектов · кликните для просмотра фото</div>
      </div>

      {lbCase && (
        <div className="lb" onClick={() => setLightbox(null)}>
          <div className="lb-shell" onClick={(e) => e.stopPropagation()}>
            <div className="lb-head">
              <div className="lb-head-l">
                <div className="lb-head-name">{lbCase.name}</div>
                <div className="lb-head-style">{lbCase.style}</div>
              </div>
              <button className="lb-close" onClick={() => setLightbox(null)} aria-label="Закрыть">
                <IconClose size={20}/>
              </button>
            </div>
            <div className="lb-stage">
              <img src={lbCase.photos[lightbox.photoIdx]} alt={lbCase.name} />
              <button className="lb-arr lb-arr-l" onClick={() => setLightbox(lb => ({ ...lb, photoIdx: (lb.photoIdx - 1 + lbCase.photos.length) % lbCase.photos.length }))} aria-label="Назад">
                <IconArrowR size={20} style={{transform:'rotate(180deg)'}}/>
              </button>
              <button className="lb-arr lb-arr-r" onClick={() => setLightbox(lb => ({ ...lb, photoIdx: (lb.photoIdx + 1) % lbCase.photos.length }))} aria-label="Дальше">
                <IconArrowR size={20}/>
              </button>
              <div className="lb-counter">{lightbox.photoIdx+1}/{lbCase.photos.length}</div>
            </div>
            <div className="lb-foot">
              <div className="lb-thumbs">
                {lbCase.photos.map((src, i) => (
                  <button key={i} className={`lb-thumb ${i===lightbox.photoIdx ? 'lb-thumb-on' : ''}`}
                    onClick={() => setLightbox(lb => ({ ...lb, photoIdx: i }))}
                    style={{ backgroundImage: `url(${src})` }}/>
                ))}
              </div>
              <div className="lb-info">
                <div className="lb-info-row"><span>Стоимость</span><b>от {lbCase.price.toLocaleString('ru-RU')} ₽</b></div>
                <div className="lb-info-row"><span>Срок</span><b>{lbCase.duration}</b></div>
                <div className="lb-info-row"><span>Площадь</span><b>{lbCase.sqm}</b></div>
              </div>
            </div>
            <p className="lb-desc">{lbCase.desc}</p>
          </div>
        </div>
      )}
    </section>
  );
}

Object.assign(window, { Header, Hero, Portfolio });
