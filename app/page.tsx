"use client";

import { useEffect, useState } from "react";

const projects = [
  {
    name: "GRIG",
    type: "Бюджетный",
    area: "120 м²",
    time: "2 месяца",
    price: "3 900 000 ₽",
    image: "/assets/b77c1f8471be9488.jpg",
    note: "Лаконичный одноэтажный дом для комфортной семейной жизни.",
    gallery: ["/assets/b77c1f8471be9488.jpg", "/assets/1ac4dcd5130e93d5.jpg", "/assets/6e06871f8f0f56a7.jpg"],
    features: ["1 этаж", "3 спальни", "2 санузла", "Терраса"],
  },
  {
    name: "SHERRY",
    type: "Комфорт",
    area: "160 м²",
    time: "3 месяца",
    price: "5 900 000 ₽",
    image: "/assets/sherry-clean.jpg",
    note: "Просторный дом с выразительной архитектурой и большой террасой.",
    gallery: ["/assets/sherry-clean.jpg", "/assets/bda93c2402156afc.JPG", "/assets/c468df4b53a79f01.JPG"],
    features: ["1 этаж", "4 спальни", "2 санузла", "Крытая терраса"],
  },
  {
    name: "GREY GARDENS",
    type: "Бизнес",
    area: "от 240 м²",
    time: "от 5 месяцев",
    price: "от 12 900 000 ₽",
    image: "/assets/1d209c9a43c88fba.jpg",
    note: "Индивидуальная резиденция с панорамным остеклением и приватным двором.",
    gallery: ["/assets/1d209c9a43c88fba.jpg", "/assets/cfbeefaeb008d1c6.jpg", "/assets/30246fa6c41d5d1e.JPG"],
    features: ["2 этажа", "Индивидуальная планировка", "Панорамные окна", "Бассейн"],
  },
];

const steps = [
  ["01", "Знакомство", "Вы рассказываете о будущем доме, участке и пожеланиях."],
  ["02", "Проект", "Обсуждаем планировку, архитектуру и состав работ."],
  ["03", "Смета", "Фиксируем объём, сроки и прозрачную стоимость строительства."],
  ["04", "Согласование", "Финально проходим все детали с профильными специалистами."],
  ["05", "Договор", "Закрепляем результат документально и приступаем к работе."],
];

export default function Home() {
  const [filter, setFilter] = useState("Все");
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const visible = filter === "Все" ? projects : projects.filter((p) => p.type === filter);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      ".section h2, .about-copy, .advantages article, .project-card, .turnkey-content > *, .step-grid article, .gallery-grid > div, .contact-copy > *, .contact-form"
    );
    elements.forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${(index % 5) * 80}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px" }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [filter]);

  useEffect(() => {
    document.body.style.overflow = selectedProject || menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject, menuOpen]);

  useEffect(() => {
    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setScrolled(window.scrollY > 18);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const submitLead = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Здравствуйте! Хочу получить расчёт строительства дома.",
      `Имя: ${data.get("name") || "не указано"}`,
      `Телефон: ${data.get("phone") || "не указан"}`,
      `Проект: ${data.get("project") || "ещё выбираю"}`,
    ].join("\n");
    window.open(`https://wa.me/79182422336?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const goToSection = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    setMenuOpen(false);
    setSelectedProject(null);
    window.history.replaceState(null, "", `#${sectionId}`);
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true"><span style={{ transform: `scaleX(${scrollProgress})` }} /></div>
      <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" onClick={(event) => goToSection(event, "top")} aria-label="Elite Stroy — на главную">
          <img className="brand-logo" src="/elite-stroy-logo.png" alt="ELITE STROY — реализуем ваши амбиции" />
        </a>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Основная навигация">
          <a href="#about" onClick={(event) => goToSection(event, "about")}>О компании</a>
          <a href="#projects" onClick={(event) => goToSection(event, "projects")}>Проекты</a>
          <a href="#steps" onClick={(event) => goToSection(event, "steps")}>Как работаем</a>
          <a href="#contacts" onClick={(event) => goToSection(event, "contacts")}>Контакты</a>
        </nav>
        <a className="phone" href="tel:+79182422336">+7 918 242-23-36</a>
        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <span /><span />
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-shade" />
        <div className="hero-orbit" aria-hidden="true" />
        <div className="hero-content">
          <h1>Строим дома,<br />в которые хочется возвращаться</h1>
          <p>Проектирование и строительство частных домов под ключ — от подбора участка до интерьера и благоустройства.</p>
          <div className="hero-actions">
            <a className="button gold" href="#projects" onClick={(event) => goToSection(event, "projects")}>Выбрать проект</a>
            <a className="button ghost" href="#contacts" onClick={(event) => goToSection(event, "contacts")}>Рассчитать стоимость</a>
          </div>
        </div>
        <div className="hero-stats">
          <span><b>от 1,5</b> месяца строительство</span>
          <span><b>10+</b> банков-партнёров</span>
          <span><b>полный цикл</b> под ключ</span>
        </div>
        <a className="hero-scroll" href="#about" onClick={(event) => goToSection(event, "about")} aria-label="Прокрутить к разделу о компании"><span />Листайте</a>
      </section>

      <section className="about section" id="about">
        <div>
          <div className="eyebrow dark">О компании</div>
          <h2>Надёжный подрядчик<br />для важного проекта</h2>
        </div>
        <div className="about-copy">
          <p>ELITE STROY — аккредитованный застройщик. Мы проектируем и строим частные дома, сопровождаем сделку и берём на себя организацию всех этапов.</p>
        </div>
      </section>

      <section className="advantages section">
        <article><span>01</span><h3>Подбор участка</h3><p>Проверим коммуникации, грунты, документы и юридическую чистоту.</p></article>
        <article><span>02</span><h3>Юридическое сопровождение</h3><p>Берём на себя документы, договоры и взаимодействие с банком.</p></article>
        <article><span>03</span><h3>Индивидуальный проект</h3><p>Создаём планировку под ваш образ жизни и особенности участка.</p></article>
        <article><span>04</span><h3>Чёткие сроки</h3><p>Фиксируем график и используем проверенные материалы и решения.</p></article>
      </section>

      <section className="projects section" id="projects">
        <div className="section-head">
          <div><div className="eyebrow dark">Каталог домов</div><h2>Проекты для вашей семьи</h2></div>
          <div className="filters" aria-label="Фильтр проектов">
            {["Все", "Бюджетный", "Комфорт", "Бизнес"].map((item) => (
              <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>
            ))}
          </div>
        </div>
        <div className="project-grid">
          {visible.map((p) => (
            <article className="project-card" key={p.name}>
              <div className="project-image" style={{ backgroundImage: `url(${p.image})` }}>
                <span>{p.type}</span>
              </div>
              <div className="project-info">
                <div><small>Проект</small><h3>{p.name}</h3></div>
                <p>{p.note}</p>
                <div className="project-meta">
                  <span><small>Площадь</small>{p.area}</span>
                  <span><small>Срок</small>{p.time}</span>
                </div>
                <div className="project-bottom"><b>{p.price}</b><button onClick={() => setSelectedProject(p)}>Смотреть проект →</button></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="turnkey">
        <div className="turnkey-visual" aria-label="Этапы полного цикла строительства">
          <div className="blueprint-grid" />
          <div className="cycle-title">
            <span>Полный цикл</span>
            <strong>От идеи<br />до ключей</strong>
          </div>
          <div className="cycle-list">
            <div><b>01</b><span>Проектирование</span></div>
            <div><b>02</b><span>Строительство</span></div>
            <div><b>03</b><span>Инженерия и отделка</span></div>
            <div><b>04</b><span>Благоустройство</span></div>
          </div>
          <div className="blueprint-caption">
            <span>ELITE STROY / ОДНА КОМАНДА</span>
            <b>100%</b>
          </div>
        </div>
        <div className="turnkey-content">
          <div className="eyebrow">Полный цикл</div>
          <h2>Дом под ключ —<br />одна команда</h2>
          <p>От архитектуры и инженерных сетей до чистовой отделки, дизайна интерьера, ландшафта и систем безопасности.</p>
          <ul>
            <li>Архитектурное проектирование</li>
            <li>Строительство и коммуникации</li>
            <li>Ремонт и уникальные интерьеры</li>
            <li>Ландшафтное благоустройство</li>
          </ul>
          <a href="#contacts" className="button gold" onClick={(event) => goToSection(event, "contacts")}>Обсудить будущий дом</a>
        </div>
      </section>

      <section className="steps section" id="steps">
        <div className="section-head"><div><div className="eyebrow dark">Понятный процесс</div><h2>Как мы работаем</h2></div><p>Ведём проект последовательно и держим вас в курсе на каждом этапе.</p></div>
        <div className="step-grid">
          {steps.map(([num, title, text]) => <article key={num}><b>{num}</b><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="gallery section">
        <div className="eyebrow dark">Реализованные объекты</div>
        <h2>Строим с вниманием к деталям</h2>
        <div className="gallery-grid">
          {["/assets/8631b20f7dd77f45.JPG","/assets/30246fa6c41d5d1e.JPG","/assets/d4140a95ec1286d3.JPG"].map((src, i) => <div key={src} style={{backgroundImage:`url(${src})`}} aria-label={`Фотография готового объекта ${i+1}`} />)}
        </div>
      </section>

      <section className="contact section" id="contacts">
        <div className="contact-copy">
          <div className="eyebrow">Бесплатная консультация</div>
          <h2>Рассчитаем ваш дом</h2>
          <p>Расскажите, какой дом вы планируете. Мы свяжемся с вами, уточним детали и подготовим предварительный расчёт.</p>
          <div className="contact-details">
            <a href="tel:+79182422336">+7 (918) 242-23-36</a>
            <a href="mailto:stroy.prof.krd@yandex.ru">stroy.prof.krd@yandex.ru</a>
            <span>Краснодар, ул. Аэродромная, 37, офис 508</span>
            <span>Пн–Пт, 09:00–18:00</span>
          </div>
        </div>
        <form className="contact-form" onSubmit={submitLead}>
          {sent ? <div className="success"><b>Спасибо!</b><p>Заявка подготовлена. Для быстрой связи напишите нам в WhatsApp или позвоните.</p><a className="button gold" href="https://wa.me/79182422336">Написать в WhatsApp</a></div> : <>
            <label>Ваше имя<input required name="name" placeholder="Как к вам обращаться?" /></label>
            <label>Телефон<input required name="phone" type="tel" defaultValue="+7 " placeholder="+7 (___) ___-__-__" /></label>
            <label>Какой дом планируете?<select name="project"><option>Ещё выбираю</option><option>GRIG — 120 м²</option><option>SHERRY — 160 м²</option><option>GREY GARDENS — от 240 м²</option><option>Индивидуальный проект</option></select></label>
            <button className="button gold" type="submit">Получить расчёт</button>
            <small>Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</small>
          </>}
        </form>
      </section>

      <footer>
        <div className="brand footer-brand"><img className="brand-logo" src="/elite-stroy-logo.png" alt="ELITE STROY" /></div>
        <p>Проектирование и строительство частных домов под ключ</p>
        <div><a href="https://t.me/E_S_g_23">Telegram</a><a href="https://wa.me/79182422336">WhatsApp</a><a href="https://www.instagram.com/elite_stroy_group">Instagram</a></div>
      </footer>

      <a className="floating-contact" href="https://wa.me/79182422336" target="_blank" rel="noreferrer" aria-label="Написать ELITE STROY в WhatsApp">
        <span>Написать</span>
        <b>WA</b>
      </a>

      {selectedProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-label={`Проект ${selectedProject.name}`}>
          <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Закрыть">×</button>
          <div className="modal-gallery">
            {selectedProject.gallery.map((src, index) => (
              <div key={src} className={index === 0 ? "modal-main-image" : ""} style={{ backgroundImage: `url(${src})` }} />
            ))}
          </div>
          <div className="modal-copy">
            <div className="eyebrow dark">{selectedProject.type} · готовый проект</div>
            <h2>{selectedProject.name}</h2>
            <p>{selectedProject.note} Проект можно адаптировать под участок, состав семьи и ваши пожелания к отделке.</p>
            <div className="modal-numbers">
              <span><small>Площадь</small><b>{selectedProject.area}</b></span>
              <span><small>Строительство</small><b>{selectedProject.time}</b></span>
              <span><small>Стоимость</small><b>{selectedProject.price}</b></span>
            </div>
            <div className="feature-list">
              {selectedProject.features.map((feature) => <span key={feature}>{feature}</span>)}
            </div>
            <a className="button gold" href="#contacts" onClick={(event) => goToSection(event, "contacts")}>Получить планировку и смету</a>
          </div>
        </div>
      )}
    </main>
  );
}
