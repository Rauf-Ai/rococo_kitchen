/* global React, smoothScrollTo, IconStar, IconYandex, IconArrowR, IconArrowUR, IconChevD, IconCheck, IconGift, IconTg, IconPin */
const { useState: useS3, useRef: useR3 } = React;

// ===== Reviews =====
const REVIEWS = [
  {
    name: 'Михаил Шитов', age: 'Реутов',
    text: 'Вообще в начале относился с недоверием, потому что сколько раз уже меня "кидали" то на деньги, то на сроки. Поэтому мне было бы сложно как-то поменять. Но эта компания справилась) Серьезно выполнили всё без изъянов. И с деньгами вышло всё нормально, да и привезли даже чуть раньше чем в договоре. В общем свою оценку вы точно оправдали 😊 Работают сверх хорошо! Рекомендую.',
    stars: 5, initials: 'МШ',
  },
  {
    name: 'Кирилл Ручкин', age: 'Коммунарка',
    text: 'Отличная компания, свои обязательства выполняет в совершенстве. Кухня у нас ввиду размеров получилась маленькая, но стильная. Заказ привезли даже немного раньше срока. Собирали кухню Леонид и Игорь, договорились с ними, тоже сделали всё в срок. В общем всё сделали оперативно и качественно. По цене не знаю — вроде нормальная. Поэтому огромное спасибо всему коллективу, 5 звезд.',
    stars: 5, initials: 'КР',
  },
  {
    name: 'Арслан', age: 'Москва',
    text: 'Хотим больше всего поблагодарить дизайнера, да и остальные тоже постарались, но стиль кухни это же основа с чего всё начинается — поэтому от меня и от супруги большой поклон, за красивую современную кухню. Очень стильно стала смотреться кухня. Есть желание ещё спальню обновить, чтобы всё было по фэншую так сказать)) В общем однозначно вам 5 звёзд ставим без сомнений. Лучшие!',
    stars: 5, initials: 'А',
  },
  {
    name: 'Елена Викторовна', age: '54 года',
    text: 'Очень довольна работой ребят! Заказывала кухню в новую квартиру, сначала боялась что не впишется в нишу — но дизайнер Анна всё точно просчитала, до миллиметра. Привезли как договаривались, монтажники вежливые, обувь снимали, мусор после себя весь убрали. Цена — да, не самая низкая, но за такое качество я готова доплатить. Уже соседям рекомендую!',
    stars: 5, initials: 'ЕВ',
  },
  {
    name: 'Дмитрий', age: '32 года',
    text: 'Брал кухню в рассрочку, всё оформили онлайн, никаких очередей. Делали мне угловую с островом, фасады мдф эмаль — выглядит дорого. Из косяков: один доводчик через месяц начал подклинивать, написал в чат — приехали бесплатно поменяли за 2 дня. Гарантию реально соблюдают, респект.',
    stars: 5, initials: 'Д',
  },
  {
    name: 'Анастасия', age: '29 лет',
    text: 'Долго выбирали между разными компаниями, остановились на Rococo по совету подруги. Не пожалели ниразу! Дизайнер сделала 3д проект, мы несколько раз правили, никто не нервничал, всё переделывали без проблем. Сделали ровно в срок, 16 дней. Получилось именно как на картинке. Спасибо большое!!!',
    stars: 5, initials: 'А',
  },
];

function ReviewCard({ r }) {
  return (
    <article className="rev-card">
      <div className="rev-card-head">
        <div className="rev-ava">{r.initials}</div>
        <div>
          <div className="rev-name">{r.name}</div>
          <div className="rev-sub">{r.age}</div>
        </div>
        <div className="rev-stars">
          {Array.from({length: r.stars}).map((_, k) => <IconStar key={k} size={14}/>)}
        </div>
      </div>
      <p className="rev-text">{r.text}</p>
      <a className="rev-link" href="https://yandex.ru/maps/org/rokoko_mebel/223566568852/" target="_blank" rel="noopener">Яндекс Карты →</a>
    </article>
  );
}

function Reviews() {
  const [paused, setPaused] = useS3(false);
  const doubled = [...REVIEWS, ...REVIEWS];
  return (
    <section id="reviews" className="rev">
      <div className="wrap">
        <div className="rev-head reveal">
          <div>
            <div className="eyebrow">[08 — ОТЗЫВЫ]</div>
            <h2 className="section-h">Сотни довольных<br/>клиентов рекомендуют нас</h2>
          </div>
        </div>
      </div>

      <div className="rev-ticker-outer"
           onMouseEnter={() => setPaused(true)}
           onMouseLeave={() => setPaused(false)}>
        <div className={`rev-ticker${paused ? ' rev-ticker-paused' : ''}`}>
          {doubled.map((r, i) => <ReviewCard key={i} r={r} />)}
        </div>
      </div>

      <div className="wrap">
        <div className="rev-banner reveal">
          <div className="rev-banner-left">
            <div className="rev-banner-logos">
              <IconYandex size={36}/>
              <IconPin size={22} fill="#BF9F86"/>
            </div>
            <div className="rev-banner-text">
              <div className="rev-banner-h">Яндекс Карты <span className="rev-banner-rate">Рейтинг 4,9 <IconStar size={14} style={{verticalAlign:'-2px'}}/></span></div>
              <div className="rev-banner-sub">250+ отзывов · наведите на карточку, чтобы остановить прокрутку</div>
            </div>
          </div>
          <a className="btn btn-ghost btn-lg" href="https://yandex.ru/maps/org/rokoko_mebel/223566568852/reviews/" target="_blank" rel="noopener">
            Смотреть все отзывы <IconArrowR size={18}/>
          </a>
        </div>
      </div>
    </section>
  );
}

// ===== Privacy Policy Modal =====
const PRIVACY_TEXT = [
  { h: '1. Какие персональные данные я предоставляю', body: 'Имя; номер телефона; адрес электронной почты (если указал); адрес доставки или адрес объекта (для замера); любую иную информацию, которую добровольно укажу в формах на сайте. Компания не требует предоставления паспортных данных, ИНН, СНИЛС, даты рождения или иных чувствительных сведений, если только они не необходимы для выполнения конкретного обязательства (например, для договора рассрочки).' },
  { h: '2. Цели обработки персональных данных', body: 'Расчёт стоимости кухни или шкафа по вашим параметрам; организация бесплатного замера помещения; направление 3D-проекта и коммерческого предложения; связь по телефону, мессенджерам или электронной почте для уточнения деталей заказа; исполнение договора на изготовление и доставку мебели.' },
  { h: '3. Кто обрабатывает данные', body: 'Обработка осуществляется ИП Марков Александр Владимирович самостоятельно. Третьим лицам данные передаются только при необходимости доставки (транспортной компании), обработки платежа (банку или агрегатору), а также в случаях, прямо предусмотренных законодательством РФ.' },
  { h: '4. Срок хранения и отзыв согласия', body: 'Данные хранятся 3 года с момента последнего обращения. Вы вправе отозвать согласие в любой момент, направив письменное уведомление на e-mail: Sanekok8565@mail.ru. После получения уведомления данные будут уничтожены в течение 30 дней.' },
  { h: '5. Отказ от рекламной рассылки', body: 'Вы можете отказаться от рекламных сообщений в любое время: позвонив по тел. 8-915-857-57-84, написав на почту Sanekok8565@mail.ru или нажав «Отписаться» в полученном письме. Отказ не влияет на получение сообщений, связанных с вашим заказом.' },
  { h: '6. Ваши права', body: 'Вы вправе запросить информацию о хранящихся данных; потребовать их исправления, блокировки или уничтожения; обжаловать действия Компании в Роскомнадзоре.' },
  { h: '7. Реквизиты оператора', body: 'ИП Марков Александр Владимирович · ИНН 482113585966 · ОГРН 325480000028801 · Адрес: Липецкая обл., Становлянский район, дер. Петрищево, ул. Воргулина, д. 24 · Телефон: 8-915-857-57-84 · E-mail: Sanekok8565@mail.ru' },
];

function PrivacyModal({ onClose }) {
  return (
    <div className="privacy-overlay" onClick={onClose}>
      <div className="privacy-shell" onClick={(e) => e.stopPropagation()}>
        <div className="privacy-head">
          <h3 className="privacy-title">Политика обработки персональных данных</h3>
          <button className="privacy-close" onClick={onClose} aria-label="Закрыть"><IconClose size={20}/></button>
        </div>
        <div className="privacy-body">
          <p className="privacy-intro">Я, заполняя форму на сайте, даю согласие на обработку моих персональных данных Индивидуальному предпринимателю <b>Маркову Александру Владимировичу</b> (ИНН 482113585966, ОГРН 325480000028801).</p>
          {PRIVACY_TEXT.map((sec) => (
            <div key={sec.h} className="privacy-sec">
              <div className="privacy-sec-h">{sec.h}</div>
              <p className="privacy-sec-body">{sec.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function usePrivacyModal() {
  const [open, setOpen] = useS3(false);
  const openFn = React.useCallback(() => setOpen(true), []);
  // Expose globally for calculator (different component tree)
  React.useEffect(() => {
    window.__openPrivacy = openFn;
    return () => { delete window.__openPrivacy; };
  }, [openFn]);
  const modal = open ? <PrivacyModal onClose={() => setOpen(false)} /> : null;
  return [modal, openFn];
}

// ===== Lead form =====
const MONTHS_RU = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const MONTHS_RU_NOM = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];

function Lead() {
  const [data, setData] = useS3({ name: '', phone: '', comment: '' });
  const [sent, setSent] = useS3(false);
  const [privacyModal, openPrivacy] = usePrivacyModal();
  const month = MONTHS_RU[new Date().getMonth()];
  const update = (k) => (e) => setData({ ...data, [k]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!data.name || !data.phone) return;
    setSent(true);
  };
  return (
    <section id="lead" className="lead">
      <div className="wrap">
        <div className="lead-card reveal">
          <div className="lead-left">
            <div className="eyebrow lead-eyebrow">[09 — БЕСПЛАТНЫЙ ЗАМЕР]</div>
            <h2 className="lead-h">Запишитесь<br/>на бесплатный<br/>замер</h2>
            <ul className="lead-bullets">
              <li><span className="lead-bullet-dot"/><span>Бесплатный замер по Москве и&nbsp;МО</span></li>
              <li><span className="lead-bullet-dot"/><span>Консультация и подбор материалов</span></li>
              <li><span className="lead-bullet-dot"/><span>Дизайн-макет мебели в подарок</span></li>
            </ul>
            <div className="lead-promo">
              <div className="lead-promo-l">Скидка до конца {month}</div>
              <div className="lead-promo-num">−15%</div>
            </div>
            <div className="lead-note">
              Данная скидка распространяется на изготовление, доставку и сборку готовой мебели, за исключением столешниц из натурального камня.
            </div>
          </div>
          <div className="lead-right">
            {sent ? (
              <div className="lead-thanks">
                <div className="lead-thanks-icon"><IconGift size={32}/></div>
                <div className="lead-thanks-h">Спасибо, {data.name || 'друг'}!</div>
                <p className="lead-thanks-p">Свяжемся с вами в ближайшее время. Ваши подарки: <b>3D-проект</b>, бесплатный замер и розыгрыш кофемашины.</p>
                <div className="lead-thanks-links">
                  <a className="btn btn-dark" href="https://t.me/rococomeb00" target="_blank" rel="noopener"><IconTg size={16}/> Telegram-канал</a>
                  <a className="btn btn-ghost" href="https://max.ru/id271703624445_biz" target="_blank" rel="noopener">Канал в Max</a>
                </div>
              </div>
            ) : (
              <>
              <form className="lead-form" onSubmit={onSubmit}>
                <label className="lead-field"><span className="lead-field-l">Как вас зовут?</span>
                  <input className="field" type="text" value={data.name} onChange={update('name')} placeholder="Имя" required/></label>
                <label className="lead-field"><span className="lead-field-l">Телефон для связи</span>
                  <input className="field" type="tel" value={data.phone} onChange={update('phone')} placeholder="+7 (___) ___-__-__" required/></label>
                <label className="lead-field"><span className="lead-field-l">Комментарий <em>(необязательно)</em></span>
                  <textarea className="field" rows="3" value={data.comment} onChange={update('comment')} placeholder="Адрес, удобное время для звонка, особенности проекта"/></label>
                <button className="btn btn-primary btn-lg lead-submit" type="submit">
                  Записаться на замер <IconArrowR size={18}/>
                </button>
                <div className="lead-policy">
                  Нажимая на кнопку «Записаться на замер» вы соглашаетесь на обработку персональных данных согласно{' '}
                  <button type="button" className="lead-policy-link" onClick={openPrivacy}>политике конфиденциальности</button>.
                </div>
              </form>
              {privacyModal}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== FAQ =====
const FAQ_DATA = [
  { q: 'Правда ли вы делаете кухню за 17 дней? Не задерживаете?',
    a: 'Да, 17 дней — реальный срок для типовых проектов. Мы работаем на собственном производстве с автоматизированными ЧПУ-станками, поэтому не зависим от внешних поставщиков. Если проект сложный или нестандартный — предупредим сразу и согласуем новые сроки. Задержки бывают крайне редко, и мы всегда компенсируем их скидкой по договору.' },
  { q: 'Что входит в бесплатный 3D-проект?',
    a: 'Мы сделаем 3D-визуализацию вашей будущей кухни или шкафа с реальными размерами и цветами. Вы увидите, как мебель будет выглядеть в вашем помещении до оплаты. Можно бесплатно вносить правки (до 3 итераций). Проект отдаём в формате картинок и PDF.' },
  { q: 'А если мне не понравится дизайн?',
    a: 'Мы переделаем проект бесплатно, пока не попадём в ваш вкус. Штатные дизайнеры подберут стиль, цвет фасадов, фурнитуру. Если после 5 итераций мы не угадали — вы забираете деньги обратно (но такого ни разу не было).' },
  { q: 'У вас есть официальный договор?',
    a: 'Да, заключаем договор с полной спецификацией: цены, сроки, материалы, фурнитура. Второй экземпляр остаётся у вас. Приезжать в офис необязательно — высылаем в WhatsApp или на почту.' },
  { q: 'Даёте ли вы рассрочку?',
    a: 'Да, мы предоставляем беспроцентную рассрочку от банков-партнёров на срок до 10 месяцев. Проценты по рассрочке мы берём на себя.' },
  { q: 'Что именно гарантируете 12 месяцев?',
    a: 'Гарантия распространяется на все механизмы (направляющие, доводчики, петли), фасады и кромки. Если что-то клинит, отклеивается или перестаёт закрываться — мы чиним бесплатно. Не гарантируем только механические повреждения (удары, царапины, заливы водой — это уже страховой случай).' },
];

function FAQ() {
  const [open, setOpen] = useS3(0);
  return (
    <section id="faq" className="faq">
      <div className="wrap">
        <div className="faq-row">
          <div className="faq-left reveal">
            <div className="eyebrow">[10 — ВОПРОСЫ]</div>
            <h2 className="section-h">Частые<br/>вопросы</h2>
            <p className="section-sub">Если вашего вопроса здесь нет — напишите нам в Telegram или закажите обратный звонок.</p>
            <div className="faq-cta">
              <a className="btn btn-dark" href="https://t.me/rococomeb00" target="_blank" rel="noopener"><IconTg size={16}/> Написать в Telegram</a>
            </div>
          </div>
          <div className="faq-list reveal d1">
            {FAQ_DATA.map((item, i) => (
              <div key={i} className={`faq-item ${open === i ? 'faq-open' : ''}`}>
                <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-q-icon"><IconChevD size={20}/></span>
                </button>
                <div className="faq-a-wrap">
                  <div className="faq-a">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Footer =====
function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-shell">
          <div className="ftr-top">
            <div className="ftr-logo">
              <img src="assets/logo.png" alt="Rococo Mebel" className="ftr-logo-img" />
              <div className="ftr-logo-sub">Кухни на заказ · Москва и&nbsp;МО · с&nbsp;2014</div>
            </div>
            <div className="ftr-cols">
              <div className="ftr-col">
                <div className="ftr-col-h">Навигация</div>
                <button className="ftr-link" onClick={() => smoothScrollTo('portfolio')}>Портфолио</button>
                <button className="ftr-link" onClick={() => smoothScrollTo('calculator')}>Калькулятор</button>
                <button className="ftr-link" onClick={() => smoothScrollTo('stages')}>Этапы работы</button>
                <button className="ftr-link" onClick={() => smoothScrollTo('installment')}>Рассрочка</button>
                <button className="ftr-link" onClick={() => smoothScrollTo('faq')}>FAQ</button>
              </div>
              <div className="ftr-col">
                <div className="ftr-col-h">Контакты</div>
                <a className="ftr-link" href="tel:+79779085252">+7 (977) 908-52-52</a>
                <a className="ftr-link" href="https://t.me/rococomeb00" target="_blank" rel="noopener">Telegram-канал</a>
                <a className="ftr-link" href="https://max.ru/id271703624445_biz" target="_blank" rel="noopener">Канал в Max</a>
                <a className="ftr-link" href="https://yandex.ru/maps/org/rokoko_mebel/223566568852/" target="_blank" rel="noopener">Яндекс Карты</a>
              </div>
              <div className="ftr-col ftr-col-addr">
                <div className="ftr-col-h">Адрес</div>
                <div className="ftr-addr">
                  Москва, НАО, район Коммунарка,<br/>проспект Магеллана, 4
                </div>
                <div className="ftr-hours">Пн–Вс · 09:00 – 21:00</div>
              </div>
            </div>
          </div>
          <div className="ftr-bottom">
            <div>© Rococo Mebel, 2014—{new Date().getFullYear()}. Все права защищены.</div>
            <div>Политика конфиденциальности · Договор-оферта</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Reviews, Lead, FAQ, Footer });
