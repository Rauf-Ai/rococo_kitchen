/* global React, IconArrowR, IconCheck, IconGift, IconTg, sendToTelegram */
const { useState: useSC, useMemo: useMC } = React;

const STYLES = [
  { id: 'modern',   label: 'Современный',       img: 'assets/case4-6.jpg' },
  { id: 'classic',  label: 'Классика',           img: 'assets/case16-1.jpg' },
  { id: 'loft',     label: 'Лофт',               img: 'assets/case17-1.jpg' },
  { id: 'modclass', label: 'Современная классика', img: 'assets/case6-7.jpg' },
];

// Shape SVGs (top-down kitchen plan)
const ShapeSvg = ({ shape, active }) => {
  const c1 = active ? '#A78877' : '#0C0E0E';
  const c2 = active ? '#BF9F86' : '#0C0E0E';
  const fill = active ? 'rgba(167,136,119,0.16)' : 'rgba(12,14,14,0.04)';
  if (shape === 'straight') return (
    <svg viewBox="0 0 100 80" width="100%" height="100%">
      <rect x="6" y="6" width="88" height="68" rx="6" fill="none" stroke={c1} strokeWidth="1.2" strokeDasharray="3 3"/>
      <rect x="12" y="14" width="76" height="14" rx="3" fill={fill} stroke={c2} strokeWidth="1.6"/>
      <line x1="22" y1="14" x2="22" y2="28" stroke={c2}/>
      <line x1="38" y1="14" x2="38" y2="28" stroke={c2}/>
      <line x1="60" y1="14" x2="60" y2="28" stroke={c2}/>
      <line x1="76" y1="14" x2="76" y2="28" stroke={c2}/>
    </svg>
  );
  if (shape === 'corner') return (
    <svg viewBox="0 0 100 80" width="100%" height="100%">
      <rect x="6" y="6" width="88" height="68" rx="6" fill="none" stroke={c1} strokeWidth="1.2" strokeDasharray="3 3"/>
      <path d="M 12 14 L 88 14 L 88 28 L 26 28 L 26 66 L 12 66 Z" fill={fill} stroke={c2} strokeWidth="1.6" strokeLinejoin="round"/>
      <line x1="38" y1="14" x2="38" y2="28" stroke={c2}/>
      <line x1="56" y1="14" x2="56" y2="28" stroke={c2}/>
      <line x1="74" y1="14" x2="74" y2="28" stroke={c2}/>
      <line x1="12" y1="40" x2="26" y2="40" stroke={c2}/>
      <line x1="12" y1="54" x2="26" y2="54" stroke={c2}/>
    </svg>
  );
  if (shape === 'u') return (
    <svg viewBox="0 0 100 80" width="100%" height="100%">
      <rect x="6" y="6" width="88" height="68" rx="6" fill="none" stroke={c1} strokeWidth="1.2" strokeDasharray="3 3"/>
      <path d="M 12 14 L 88 14 L 88 66 L 74 66 L 74 28 L 26 28 L 26 66 L 12 66 Z" fill={fill} stroke={c2} strokeWidth="1.6" strokeLinejoin="round"/>
      <line x1="38" y1="14" x2="38" y2="28" stroke={c2}/>
      <line x1="60" y1="14" x2="60" y2="28" stroke={c2}/>
      <line x1="12" y1="40" x2="26" y2="40" stroke={c2}/>
      <line x1="74" y1="40" x2="88" y2="40" stroke={c2}/>
    </svg>
  );
  if (shape === 'island') return (
    <svg viewBox="0 0 100 80" width="100%" height="100%">
      <rect x="6" y="6" width="88" height="68" rx="6" fill="none" stroke={c1} strokeWidth="1.2" strokeDasharray="3 3"/>
      <path d="M 12 14 L 88 14 L 88 28 L 12 28 Z" fill={fill} stroke={c2} strokeWidth="1.6"/>
      <rect x="32" y="48" width="36" height="18" rx="3" fill={fill} stroke={c2} strokeWidth="1.6"/>
      <line x1="36" y1="14" x2="36" y2="28" stroke={c2}/>
      <line x1="56" y1="14" x2="56" y2="28" stroke={c2}/>
      <line x1="76" y1="14" x2="76" y2="28" stroke={c2}/>
      <line x1="50" y1="48" x2="50" y2="66" stroke={c2}/>
    </svg>
  );
  return null;
};

const SHAPES = [
  { id: 'straight', label: 'Прямая' },
  { id: 'corner',   label: 'Угловая' },
  { id: 'u',        label: 'П-образная' },
  { id: 'island',   label: 'С островом' },
];

const TIMING = [
  { id: 'now', label: 'В день замера', disc: '−10%', sub: 'Максимальная скидка' },
  { id: 'month', label: 'В течение месяца', disc: '−3%', sub: 'Небольшая скидка' },
  { id: 'later', label: 'Через 2–3 месяца', disc: '0%', sub: 'Без скидки' },
];

function fmtMoney(n) { return n.toLocaleString('ru-RU') + ' ₽'; }
function fmtMeters(n) { return n.toFixed(n % 1 === 0 ? 0 : 1) + ' м'; }

function Calculator() {
  const [step, setStep] = useSC(0);
  const [data, setData] = useSC({
    style: null, shape: null,
    sideA: 3, sideB: 2, noSize: false,
    timing: null,
    budget: 250000,
    name: '', phone: '',
  });
  const [done, setDone] = useSC(false);

  const total = 6;
  const filled = useMC(() => {
    let n = 0;
    if (data.style) n++;
    if (data.shape) n++;
    if (data.noSize || data.sideA || data.sideB) n++;
    if (data.timing) n++;
    if (data.budget) n++;
    if (data.name && data.phone) n++;
    return n;
  }, [data]);

  const progress = (filled / total) * 100;
  const next = () => setStep(s => Math.min(total - 1, s + 1));
  const back = () => setStep(s => Math.max(0, s - 1));
  const pick = (k, v) => { setData(d => ({ ...d, [k]: v })); setTimeout(next, 250); };

  // Estimated 3 prices based on data
  const estimate = useMC(() => {
    const sizeM = data.noSize ? 4 : (data.sideA + data.sideB);
    const base = Math.max(60000, sizeM * 38000);
    const shapeMul = { straight: 1.0, corner: 1.15, u: 1.3, island: 1.35 }[data.shape] || 1.1;
    const styleMul = { modern: 1.0, classic: 1.15, loft: 1.05, other: 1.05 }[data.style] || 1.05;
    const disc = data.timing === 'now' ? 0.9 : data.timing === 'month' ? 0.97 : 1.0;
    const mid = Math.round(base * shapeMul * styleMul * disc / 1000) * 1000;
    return {
      eco: Math.round(mid * 0.75 / 1000) * 1000,
      std: mid,
      pro: Math.round(mid * 1.35 / 1000) * 1000,
    };
  }, [data]);

  const CALC_PRIZES = [
    { num: '01', title: '3D-дизайн-проект', desc: 'Визуализация кухни до начала производства', img: 'assets/prize-3d.jpg' },
    { num: '02', title: 'Бесплатный замер', desc: 'Дизайнер выедет с образцами фасадов', img: 'assets/prize-measure.png' },
    { num: '03', title: 'Розыгрыш кофемашины', desc: 'Среди участников квиза этого месяца', img: 'assets/prize-coffee.png' },
  ];

  return (
    <section id="calculator" className="calc">
      <div className="wrap">
        <div className="reveal">
          <div className="eyebrow">[05 — КАЛЬКУЛЯТОР]</div>
          <h2 className="section-h">Узнайте стоимость<br/>вашей кухни <span className="calc-h-accent">в 3-х вариантах</span></h2>
          <p className="section-sub">Ответьте на 5 вопросов — получите точный расчёт в течение 24 часов.</p>
        </div>

        <div className="calc-layout reveal d1">
        <div className="calc-shell">
          {/* Fixed back button — top-left, hidden on first step */}
          <div className={`calc-back-wrap ${step === 0 ? 'calc-back-hidden' : ''}`}>
            <button className="calc-back-btn" onClick={back} aria-label="Назад">
              <IconArrowR size={16} style={{ transform: 'rotate(180deg)' }}/>
              <span>Назад</span>
            </button>
          </div>

          {/* progress bar */}
          <div className="calc-progress">
            <div className="calc-progress-track">
              <div className="calc-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="calc-progress-meta">
              <span>Шаг <b>{Math.min(step+1, total)}</b> из {total}</span>
              <span style={{color:'var(--muted)'}}>осталось {total - Math.min(step+1, total)} вопроса</span>
            </div>
          </div>

          <div className="calc-stage">
            {/* slides */}
            <div className="calc-slides" style={{ transform: `translateX(-${step * 100}%)` }}>

              {/* Step 0: style */}
              <div className="calc-slide">
                <div className="calc-slide-h">
                  <div className="calc-step-no">01</div>
                  <h3 className="calc-q">Какой стиль кухни вам ближе?</h3>
                  <p className="calc-q-sub">Выберите вариант — мы покажем похожие проекты из портфолио.</p>
                </div>
                <div className="calc-style-grid">
                  {STYLES.map(s => (
                    <button key={s.id}
                      className={`calc-style ${data.style===s.id ? 'calc-style-on' : ''}`}
                      onClick={() => pick('style', s.id)}>
                      <div className="calc-style-img" style={{ backgroundImage: `url(${s.img})` }}/>
                      <div className="calc-style-label">{s.label}</div>
                      {data.style===s.id && <div className="calc-style-check"><IconCheck size={16}/></div>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 1: shape */}
              <div className="calc-slide">
                <div className="calc-slide-h">
                  <div className="calc-step-no">02</div>
                  <h3 className="calc-q">Какая у вас планировка?</h3>
                  <p className="calc-q-sub">Схема влияет на расчёт количества модулей и итоговую стоимость.</p>
                </div>
                <div className="calc-shape-grid">
                  {SHAPES.map(s => (
                    <button key={s.id}
                      className={`calc-shape ${data.shape===s.id ? 'calc-shape-on' : ''}`}
                      onClick={() => pick('shape', s.id)}>
                      <div className="calc-shape-svg"><ShapeSvg shape={s.id} active={data.shape===s.id}/></div>
                      <div className="calc-shape-label">{s.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: size */}
              <div className="calc-slide">
                <div className="calc-slide-h">
                  <div className="calc-step-no">03</div>
                  <h3 className="calc-q">Размер кухни в погонных метрах</h3>
                  <p className="calc-q-sub">Замерьте стены вдоль которых встанет гарнитур. Прямая кухня — только сторона А, угловая — А и Б.</p>
                </div>
                <div className="calc-size-row">
                  <div className="calc-size-controls">
                    <div className={`calc-size-block ${data.noSize ? 'calc-disabled' : ''}`}>
                      <div className="calc-size-l">Сторона <span className="calc-size-accent">А</span></div>
                      <div className="calc-size-val">{fmtMeters(data.sideA)}</div>
                      <input className="calc-range" type="range" min="1" max="10" step="0.1" value={data.sideA}
                        disabled={data.noSize}
                        onChange={(e) => setData(d => ({...d, sideA: +e.target.value}))} />
                      <div className="calc-size-scale"><span>1 м</span><span>10 м</span></div>
                    </div>
                    <div className={`calc-size-block ${data.noSize ? 'calc-disabled' : ''}`}>
                      <div className="calc-size-l">Сторона <span className="calc-size-accent">Б</span></div>
                      <div className="calc-size-val">{fmtMeters(data.sideB)}</div>
                      <input className="calc-range" type="range" min="0" max="10" step="0.1" value={data.sideB}
                        disabled={data.noSize}
                        onChange={(e) => setData(d => ({...d, sideB: +e.target.value}))} />
                      <div className="calc-size-scale"><span>0 м</span><span>10 м</span></div>
                    </div>
                    <button className={`calc-nosize ${data.noSize ? 'calc-nosize-on' : ''}`}
                      onClick={() => setData(d => ({...d, noSize: !d.noSize}))}>
                      <span className="calc-nosize-box">{data.noSize && <IconCheck size={14}/>}</span>
                      <span>Не знаю размеры — нужен замерщик</span>
                    </button>
                  </div>

                  {/* Diagram — same visual style as shape SVGs in step 2 */}
                  <div className="calc-measure-diagram">
                    <svg viewBox="0 0 200 180" width="100%" preserveAspectRatio="xMidYMid meet">
                      {/* Room outline */}
                      <rect x="38" y="10" width="154" height="130" rx="5" fill="none"
                            stroke="rgba(12,14,14,0.2)" strokeWidth="1.2" strokeDasharray="5 3"/>

                      {/* Side А — bottom wall cabinets */}
                      <rect x="38" y="122" width="154" height="18" rx="3"
                            fill="rgba(167,136,119,0.15)" stroke="#A78877" strokeWidth="1.8"/>
                      <line x1="78"  y1="122" x2="78"  y2="140" stroke="#A78877" strokeWidth="0.9"/>
                      <line x1="118" y1="122" x2="118" y2="140" stroke="#A78877" strokeWidth="0.9"/>
                      <line x1="158" y1="122" x2="158" y2="140" stroke="#A78877" strokeWidth="0.9"/>

                      {/* Side Б — left wall cabinets */}
                      <rect x="38" y="10" width="18" height="112" rx="3"
                            fill="rgba(167,136,119,0.15)" stroke="#A78877" strokeWidth="1.8"/>
                      <line x1="38" y1="47"  x2="56" y2="47"  stroke="#A78877" strokeWidth="0.9"/>
                      <line x1="38" y1="84"  x2="56" y2="84"  stroke="#A78877" strokeWidth="0.9"/>

                      {/* Measurement line А (below) */}
                      <line x1="38" y1="155" x2="192" y2="155" stroke="#A78877" strokeWidth="1.4"/>
                      <line x1="38"  y1="150" x2="38"  y2="160" stroke="#A78877" strokeWidth="1.4"/>
                      <line x1="192" y1="150" x2="192" y2="160" stroke="#A78877" strokeWidth="1.4"/>
                      <text x="115" y="152" textAnchor="middle" dominantBaseline="middle"
                            fontSize="12" fill="#A78877" fontWeight="700"
                            fontFamily="-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif">Сторона А</text>

                      {/* Measurement line Б (left) */}
                      <line x1="24" y1="10" x2="24" y2="122" stroke="#A78877" strokeWidth="1.4"/>
                      <line x1="19" y1="10"  x2="29" y2="10"  stroke="#A78877" strokeWidth="1.4"/>
                      <line x1="19" y1="122" x2="29" y2="122" stroke="#A78877" strokeWidth="1.4"/>
                      <text x="21" y="66" textAnchor="middle" dominantBaseline="middle"
                            fontSize="12" fill="#A78877" fontWeight="700"
                            fontFamily="-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif"
                            transform="rotate(-90 21 66)">Сторона Б</text>
                    </svg>
                    <div className="calc-measure-hint">
                      Замерьте каждую стену рулеткой от угла до угла, учитывая трубы и окна
                    </div>
                  </div>
                </div>
                <div className="calc-step-actions">
                  <button className="btn btn-primary" onClick={next}>Далее <IconArrowR size={16}/></button>
                </div>
              </div>

              {/* Step 3: timing */}
              <div className="calc-slide">
                <div className="calc-slide-h">
                  <div className="calc-step-no">04</div>
                  <h3 className="calc-q">Когда готовы оформить заказ?</h3>
                  <p className="calc-q-sub">От сроков зависит размер скидки на изготовление и сборку.</p>
                </div>
                <div className="calc-timing-grid">
                  {TIMING.map(t => (
                    <button key={t.id}
                      className={`calc-timing ${data.timing===t.id ? 'calc-timing-on' : ''}`}
                      onClick={() => pick('timing', t.id)}>
                      <div className="calc-timing-disc">{t.disc}</div>
                      <div className="calc-timing-label">{t.label}</div>
                      <div className="calc-timing-sub">{t.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: budget */}
              <div className="calc-slide">
                <div className="calc-slide-h">
                  <div className="calc-step-no">05</div>
                  <h3 className="calc-q">Какой ориентировочный бюджет?</h3>
                  <p className="calc-q-sub">Подберём материалы и фурнитуру, чтобы попасть в комфортную цену.</p>
                </div>
                <div className="calc-budget">
                  <div className="calc-budget-val">{fmtMoney(data.budget)}</div>
                  <input className="calc-range calc-range-lg" type="range" min="60000" max="1000000" step="10000" value={data.budget}
                    onChange={(e) => setData(d => ({...d, budget: +e.target.value}))} />
                  <div className="calc-size-scale calc-budget-scale"><span>60 000 ₽</span><span>1 000 000 ₽</span></div>
                </div>
                <div className="calc-step-actions">
                  <button className="btn btn-primary" onClick={next}>Получить точный расчёт <IconArrowR size={16}/></button>
                </div>
              </div>

              {/* Step 5: contacts */}
              <div className="calc-slide">
                {done ? (
                  <div className="calc-thanks">
                    <div className="calc-thanks-icon"><IconGift size={36}/></div>
                    <h3 className="calc-thanks-h">Спасибо, {data.name || 'друг'}!</h3>
                    <p className="calc-thanks-p">Свяжемся с вами в ближайшее время. Ваши подарки:</p>
                    <div className="calc-gifts">
                      <div className="calc-gift"><span className="calc-gift-n">01</span><span>3D-дизайн-проект</span></div>
                      <div className="calc-gift"><span className="calc-gift-n">02</span><span>Бесплатный замер дизайнера</span></div>
                      <div className="calc-gift"><span className="calc-gift-n">03</span><span>Розыгрыш кофемашины</span></div>
                    </div>
                    <div className="calc-thanks-links">
                      <a className="btn btn-dark" href="https://t.me/rococomeb00" target="_blank" rel="noopener"><IconTg size={16}/> Telegram-канал</a>
                      <a className="btn btn-ghost" href="https://max.ru/id271703624445_biz" target="_blank" rel="noopener">Канал в Max</a>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="calc-slide-h">
                      <div className="calc-step-no">06</div>
                      <h3 className="calc-q">Куда отправить расчёт?</h3>
                      <p className="calc-q-sub">Отправим в WhatsApp / Telegram и созвонимся в удобное время.</p>
                    </div>
                    <form className="calc-contact" onSubmit={(e) => {
                      e.preventDefault();
                      if (!data.name || !data.phone) return;
                      setDone(true);
                      const styleLabel = STYLES.find(s => s.id === data.style)?.label || '—';
                      const shapeLabel = SHAPES.find(s => s.id === data.shape)?.label || '—';
                      const timingLabel = TIMING.find(t => t.id === data.timing)?.label || '—';
                      const sizeText = data.noSize ? 'Нужен замерщик' : `А: ${data.sideA} м / Б: ${data.sideB} м`;
                      const msg = [
                        '🧮 <b>Новая заявка — Калькулятор кухни</b>',
                        '',
                        `👤 <b>Имя:</b> ${data.name}`,
                        `📞 <b>Телефон:</b> ${data.phone}`,
                        '',
                        `🎨 <b>Стиль:</b> ${styleLabel}`,
                        `📐 <b>Планировка:</b> ${shapeLabel}`,
                        `📏 <b>Размер:</b> ${sizeText}`,
                        `⏰ <b>Когда заказать:</b> ${timingLabel}`,
                        `💰 <b>Бюджет:</b> ${data.budget.toLocaleString('ru-RU')} ₽`,
                        '',
                        `🌐 <b>Источник:</b> Квиз на сайте Rococo Mebel`,
                      ].join('\n');
                      window.sendToTelegram && window.sendToTelegram(msg);
                    }}>
                      <input className="field" placeholder="Ваше имя" value={data.name} onChange={(e) => setData(d => ({...d, name: e.target.value}))} required/>
                      <input className="field" type="tel" placeholder="+7 (___) ___-__-__" value={data.phone} onChange={(e) => setData(d => ({...d, phone: e.target.value}))} required/>
                      <button className="btn btn-primary btn-lg calc-submit" type="submit">
                        Отправить и получить подарок <IconGift size={18}/>
                      </button>
                      <div className="calc-policy">
                        Нажимая на кнопку «Отправить» вы соглашаетесь на обработку персональных данных согласно{' '}
                        <button type="button" className="lead-policy-link" onClick={() => window.__openPrivacy && window.__openPrivacy()}>политике конфиденциальности</button>.
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <aside className="calc-prizes-panel">
          <div className="calc-prizes-title">Ваши подарки</div>
          {CALC_PRIZES.map((p) => (
            <div key={p.num}
              className={`calc-prize-card${p.img ? '' : ' calc-prize-card-mocha'}`}
              style={p.img ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.62)), url(${p.img})` } : {}}>
              <span className="calc-prize-num">{p.num}</span>
              <div className="calc-prize-body">
                <div className="calc-prize-t">{p.title}</div>
                <div className="calc-prize-d">{p.desc}</div>
              </div>
            </div>
          ))}
        </aside>

        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Calculator });
