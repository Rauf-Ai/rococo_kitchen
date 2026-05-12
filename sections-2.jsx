/* global React, smoothScrollTo, IconArrowR, IconArrowUR, IconCheck */
const { useState: useS2, useEffect: useE2, useRef: useR2 } = React;

// ===== About =====
function About() {
  return (
    <section id="about" className="about">
      <div className="wrap">
        <div className="about-shell reveal">
          <div className="about-inner">
            <div className="about-left">
              <div className="about-eyebrow">[О КОМПАНИИ]</div>
              <h2 className="about-title">12 лет создаём<br/>кухни мечты</h2>
              <p className="about-body">
                Собственный цех 20&nbsp;000&nbsp;м² с ЧПУ-станками, штат профессиональных дизайнеров, точность до 1&nbsp;мм. Все материалы — класса E0/E1, срок службы фасадов более 20 лет.
              </p>
              <div className="about-stats-row">
                <div className="about-stat">
                  <div className="about-stat-num">12</div>
                  <div className="about-stat-l">лет<br/>на рынке МО</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-num">2100<span>+</span></div>
                  <div className="about-stat-l">кухонь<br/>под ключ</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-num">20<span>k</span></div>
                  <div className="about-stat-l">м² цех<br/>с ЧПУ</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-num">17</div>
                  <div className="about-stat-l">дней<br/>средний срок</div>
                </div>
              </div>
              <button className="btn about-cta" onClick={() => smoothScrollTo('lead')}>
                Записаться на замер <IconArrowR size={18}/>
              </button>
            </div>
            <div className="about-right">
              <div className="about-video">
                <div className="about-video-inner">
                  <div className="about-video-play">
                    <svg viewBox="0 0 48 48" width="48" height="48" fill="none">
                      <circle cx="24" cy="24" r="23" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
                      <path d="M20 16 L34 24 L20 32 Z" fill="rgba(255,255,255,0.7)"/>
                    </svg>
                  </div>
                  <div className="about-video-label">Видео о производстве<br/>появится здесь</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Stages =====
function Stages() {
  return (
    <section id="stages" className="stages">
      <div className="wrap">
        <div className="reveal">
          <h2 className="section-h">Этапы работы</h2>
          <p className="section-sub">4 простых шага к кухне мечты: от замера до монтажа и гарантии.</p>
        </div>
        <div className="stages-grid">

          {/* 01 — top left, cream */}
          <article className="stage-card stage-cream reveal d1">
            <span className="stage-num-badge">01</span>
            <h3 className="stage-t">Замер дизайнера</h3>
            <p className="stage-body">К вам бесплатно приедет наш дизайнер с образцами фасадов, палитрой расцветок и каталогом фурнитуры. Точно снимет размеры, проконсультирует и поможет подобрать материалы под бюджет.</p>
            <div className="stage-note">Бесплатно при заключении договора</div>
          </article>

          {/* 02 — top right, white */}
          <article className="stage-card stage-white reveal d2">
            <span className="stage-num-badge">02</span>
            <h3 className="stage-t">Дизайн-проект</h3>
            <p className="stage-body">До запуска в производство сделаем 3D-визуализацию с учётом размеров, выбранных материалов и цветов. Вы увидите, как кухня будет выглядеть в вашем помещении, и сможете внести правки.</p>
            <div className="stage-note">Бесплатно при заключении договора</div>
          </article>

          {/* Photo — bottom left */}
          <article className="stage-card stage-photo reveal d3"
            style={{ backgroundImage: 'url(assets/case7-6.jpg)' }} aria-hidden="true"/>

          {/* 03 + 04 — bottom right, stacked */}
          <div className="stages-stack reveal d4">
            <article className="stage-card stage-white">
              <span className="stage-num-badge">03</span>
              <h3 className="stage-t">Производство и монтаж</h3>
              <p className="stage-body">От 10 дней — изготовление на собственном заводе с ЧПУ-станками. Выезжаем на объект и собираем кухню под ключ.</p>
            </article>
            <article className="stage-card stage-cream">
              <span className="stage-num-badge">04</span>
              <h3 className="stage-t">Гарантия 12 месяцев</h3>
              <p className="stage-body">На фасады, кромки и все механизмы — петли, направляющие, доводчики. Если что-то клинит — чиним бесплатно.</p>
            </article>
          </div>

        </div>
      </div>
    </section>
  );
}

// ===== Installment =====
function Installment() {
  const [amount, setAmount] = useS2(250000);
  const months = 10;
  const monthly = Math.round(amount / months / 1000) * 1000;
  return (
    <section id="installment" className="inst">
      <div className="wrap">
        <div className="inst-shell reveal">
          {/* Photo — left, large */}
          <div className="inst-photo">
            <img src="assets/installment-bg.png" alt="Рассрочка на кухню" />
          </div>

          {/* Content — right */}
          <div className="inst-content">
            <div className="eyebrow">[07 — РАССРОЧКА]</div>
            <h2 className="section-h inst-h">Беспроцентная<br/>рассрочка<br/>на 10 месяцев</h2>
            <ul className="inst-bullets">
              <li><IconCheck size={16}/> Без первого взноса и переплат</li>
              <li><IconCheck size={16}/> Одобрение за 10 минут онлайн</li>
              <li><IconCheck size={16}/> Договор в WhatsApp или на почту</li>
            </ul>
            <div className="inst-calc">
              <div className="inst-calc-label">Стоимость кухни</div>
              <div className="inst-calc-amount">{amount.toLocaleString('ru-RU')} ₽</div>
              <input type="range" min="100000" max="500000" step="10000"
                value={amount} onChange={(e) => setAmount(+e.target.value)}
                className="inst-range" />
              <div className="inst-calc-result">
                <div className="inst-calc-num">{monthly.toLocaleString('ru-RU')} ₽</div>
                <div className="inst-calc-sub">в месяц · {months} платежей · переплата 0&nbsp;₽</div>
              </div>
            </div>
            <button className="btn btn-dark btn-lg inst-cta" onClick={() => smoothScrollTo('lead')}>
              Оформить рассрочку <IconArrowR size={18}/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { About, Stages, Installment });
