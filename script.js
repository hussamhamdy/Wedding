// EDIT HERE: change the values below to customize the invitation.
const weddingConfig = {
  groomName: "Hussam",
  brideName: "Nagah",

  weddingDate: "2026-11-20T17:00:00+02:00",
  weddingEnd: "2026-11-20T19:59:00+02:00",
  timeZone: "Africa/Cairo",

  venueName: "Family Park",
  venueAddress: "Family Park - Gate 3 - El-Rehab",
  googleMapsUrl: "https://maps.app.goo.gl/wuj5d2P1hxW4KHtNA",
  publicUrl: "",

  whatsappNumber: "201025825046",

  dressCode: "Formal / Elegant",
  showDressCode: true,
  enableMusic: false,
  musicFile: "assets/music/FlyMe.mp3",

  gallery: [
    {
      src: "assets/images/photo1.jpg",
      alt: "Elegant wedding detail placeholder"
    },
    {
      src: "assets/images/photo2.jpg",
      alt: "Romantic floral wedding placeholder"
    },
    {
      src: "assets/images/photo3.jpg",
      alt: "Soft wedding celebration placeholder"
    }
  ]
};

const translations = {
  en: {
    pageTitle: "{groomName} & {brideName} | Wedding Invitation",
    metaDescription:
      "Together with their families, {groomName} and {brideName} invite you to celebrate their wedding.",
    heroEyebrow: "Wedding Invitation",
    heroCopy: "Together with our families, we invite you to celebrate our wedding.",
    invitationEyebrow: "With love and joy",
    invitationTitle: "You are warmly invited",
    invitationMessage:
      "We would be honored to have you with us as we begin this new chapter and celebrate an evening full of love, family, and beautiful memories.",
    countdownEyebrow: "Counting down",
    countdownTitle: "Until we celebrate",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    passedMessage: "Our wedding day has arrived. Thank you for celebrating with us.",
    detailsEyebrow: "Wedding details",
    detailsTitle: "The celebration",
    dateLabel: "Date",
    timeLabel: "Time",
    venueLabel: "Venue",
    openLocation: "Open Location",
    addCalendar: "Add to Calendar",
    galleryEyebrow: "A little glimpse",
    galleryTitle: "Our moments",
    dressEyebrow: "Dress code",
    dressNote: "A refined evening look is warmly appreciated.",
    rsvpEyebrow: "RSVP",
    rsvpTitle: "Will you celebrate with us?",
    rsvpCopy:
      "Please confirm your attendance through WhatsApp so we can prepare a beautiful evening for you.",
    confirmAttendance: "Confirm Attendance",
    shareInvitation: "Share Invitation",
    shareCopied: "Invitation link copied.",
    footerMessage: "We can't wait to celebrate with you.",
    musicOff: "Music",
    musicOn: "Playing",
    calendarDescription:
      "Wedding celebration for {groomName} and {brideName}. We would be honored to celebrate with you.",
    whatsappMessage: "Hi {groomName}, I'd be happy to attend the wedding.",
    locale: "en-US"
  },
  ar: {
    pageTitle: "دعوة زفاف {groomName} و {brideName}",
    metaDescription: "يتشرف {groomName} و {brideName} بدعوتكم لحضور حفل زفافهما.",
    heroEyebrow: "دعوة زفاف",
    heroCopy: "مع عائلتينا، يسعدنا دعوتكم لمشاركتنا فرحة زفافنا.",
    invitationEyebrow: "بكل الحب والسعادة",
    invitationTitle: "نتشرف بحضوركم",
    invitationMessage:
      "نتشرف بدعوتكم لمشاركتنا أجمل لحظات حياتنا والاحتفال معنا بيوم زفافنا وسط الأهل والأحباب.",
    countdownEyebrow: "العد التنازلي",
    countdownTitle: "حتى نحتفل معكم",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثواني",
    passedMessage: "لقد وصل يوم زفافنا. شكرًا لمشاركتكم فرحتنا.",
    detailsEyebrow: "تفاصيل الزفاف",
    detailsTitle: "موعد الاحتفال",
    dateLabel: "التاريخ",
    timeLabel: "الوقت",
    venueLabel: "المكان",
    openLocation: "فتح الموقع",
    addCalendar: "إضافة للتقويم",
    galleryEyebrow: "لمحة بسيطة",
    galleryTitle: "لحظاتنا",
    dressEyebrow: "الملابس",
    dressNote: "إطلالة رسمية وأنيقة تسعدنا.",
    rsvpEyebrow: "تأكيد الحضور",
    rsvpTitle: "هل ستشاركوننا الفرحة؟",
    rsvpCopy: "يرجى تأكيد الحضور عبر واتساب حتى نستعد لاستقبالكم بأجمل صورة.",
    confirmAttendance: "تأكيد الحضور",
    shareInvitation: "مشاركة الدعوة",
    shareCopied: "تم نسخ رابط الدعوة.",
    footerMessage: "ننتظر الاحتفال معكم بكل حب.",
    musicOff: "الموسيقى",
    musicOn: "تعمل الآن",
    calendarDescription: "حفل زفاف {groomName} و {brideName}. يسعدنا حضوركم ومشاركتكم فرحتنا.",
    whatsappMessage: "مرحبًا {groomName}، يسعدني حضور حفل الزفاف.",
    locale: "ar-EG"
  }
};

let activeLanguage = getInitialLanguage();
let countdownTimer;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

document.addEventListener("DOMContentLoaded", () => {
  applyConfiguration();
  buildGallery();
  setupActions();
  setupMusic();
  setupReveals();
  setLanguage(activeLanguage);
  startCountdown();
});

function getInitialLanguage() {
  const saved = localStorage.getItem("weddingLanguage");
  if (saved && translations[saved]) return saved;

  const browserLanguage = navigator.language || "";
  return browserLanguage.toLowerCase().startsWith("ar") ? "ar" : "en";
}

function setLanguage(language) {
  activeLanguage = translations[language] ? language : "en";
  localStorage.setItem("weddingLanguage", activeLanguage);

  const isArabic = activeLanguage === "ar";
  document.documentElement.lang = activeLanguage;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.body.dir = isArabic ? "rtl" : "ltr";

  $$("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = interpolate(t(key));
  });

  $('[data-label="language-current"]').textContent = isArabic ? "AR" : "EN";
  updateDateText();
  updateMetadata();
  updateRsvpLink();
  updateMusicLabel();
}

function applyConfiguration() {
  $$('[data-config="groomName"]').forEach((element) => {
    element.textContent = weddingConfig.groomName;
  });

  $$('[data-config="brideName"]').forEach((element) => {
    element.textContent = weddingConfig.brideName;
  });

  $('[data-config="venueName"]').textContent = weddingConfig.venueName;
  $('[data-config="venueAddress"]').textContent = weddingConfig.venueAddress;
  $('[data-config="dressCodeTitle"]').textContent = weddingConfig.dressCode;

  $("#locationButton").href = weddingConfig.googleMapsUrl;
  $("#dressCodeSection").hidden = !weddingConfig.showDressCode;
}

function updateDateText() {
  const locale = t("locale");
  const start = new Date(weddingConfig.weddingDate);
  const end = new Date(weddingConfig.weddingEnd);

  const dateText = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: weddingConfig.timeZone
  }).format(start);

  const shortDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: weddingConfig.timeZone
  }).format(start);

  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: weddingConfig.timeZone
  });

  $('[data-config="displayDate"]').textContent = dateText;
  $('[data-config="detailDate"]').textContent = dateText;
  $('[data-config="detailTime"]').textContent = `${timeFormatter.format(start)} - ${timeFormatter.format(end)}`;
  $('[data-config="shortDate"]').textContent = shortDate;
}

function buildGallery() {
  const gallery = $("#galleryGrid");
  gallery.innerHTML = "";

  weddingConfig.gallery.forEach((photo, index) => {
    const frame = document.createElement("figure");
    frame.className = "gallery-frame";

    const image = document.createElement("img");
    image.src = photo.src;
    image.alt = photo.alt || "";
    image.loading = index === 0 ? "eager" : "lazy";
    image.decoding = "async";

    frame.append(image);
    gallery.append(frame);
  });
}

function setupActions() {
  $("#languageToggle").addEventListener("click", () => {
    setLanguage(activeLanguage === "en" ? "ar" : "en");
  });

  $("#calendarButton").addEventListener("click", downloadCalendarInvite);
  $("#shareButton").addEventListener("click", shareInvitation);

  $("#rsvpButton").addEventListener("click", (event) => {
    if (!weddingConfig.whatsappNumber || weddingConfig.whatsappNumber.includes("X")) {
      event.preventDefault();
      alert(activeLanguage === "ar" ? "يرجى إضافة رقم واتساب في script.js" : "Please add a WhatsApp number in script.js");
    }
  });

  updateRsvpLink();
}

function updateRsvpLink() {
  const message = interpolate(t("whatsappMessage"));
  const url = `https://wa.me/${weddingConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
  $("#rsvpButton").href = url;
}

async function shareInvitation() {
  const url = weddingConfig.publicUrl || window.location.href;
  const title = interpolate(t("pageTitle"));
  const text = interpolate(t("metaDescription"));

  try {
    if (navigator.share) {
      await navigator.share({ title, text, url });
      return;
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      alert(t("shareCopied"));
      return;
    }
  } catch (error) {
    console.info("Sharing was cancelled or blocked by the browser.", error);
  }

  window.prompt(t("shareCopied"), url);
}

function setupMusic() {
  const audio = $("#backgroundMusic");
  const button = $("#musicToggle");

  if (!weddingConfig.enableMusic || !weddingConfig.musicFile) return;

  audio.src = weddingConfig.musicFile;
  button.hidden = false;

  button.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
      updateMusicLabel();
    } catch (error) {
      console.info("Music could not start until the browser allows playback.", error);
    }
  });
}

function updateMusicLabel() {
  const audio = $("#backgroundMusic");
  const label = $("#musicToggle [data-i18n]");
  if (!label) return;
  label.textContent = audio.paused ? t("musicOff") : t("musicOn");
}

function setupReveals() {
  const revealItems = $$(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function startCountdown() {
  clearInterval(countdownTimer);

  const update = () => {
    const target = new Date(weddingConfig.weddingDate).getTime();
    const distance = target - Date.now();

    if (distance <= 0) {
      $("#countdownGrid").hidden = true;
      $("#passedMessage").hidden = false;
      clearInterval(countdownTimer);
      return;
    }

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    setCountdownValue("days", Math.floor(distance / day));
    setCountdownValue("hours", Math.floor((distance % day) / hour));
    setCountdownValue("minutes", Math.floor((distance % hour) / minute));
    setCountdownValue("seconds", Math.floor((distance % minute) / second));
  };

  update();
  countdownTimer = setInterval(update, 1000);
}

function setCountdownValue(unit, value) {
  const target = $(`[data-countdown="${unit}"]`);
  target.textContent = String(value).padStart(2, "0");
}

function downloadCalendarInvite() {
  const start = new Date(weddingConfig.weddingDate);
  const end = new Date(weddingConfig.weddingEnd);
  const title = `${weddingConfig.groomName} & ${weddingConfig.brideName} Wedding`;
  const description = interpolate(t("calendarDescription"));
  const location = `${weddingConfig.venueName}, ${weddingConfig.venueAddress}`;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//GitHub Pages//EN",
    "CALSCALE:GREGORIAN",
    `X-WR-TIMEZONE:${escapeIcs(weddingConfig.timeZone)}`,
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding-invitation`,
    `DTSTAMP:${formatUtcDate(new Date())}`,
    `DTSTART:${formatUtcDate(start)}`,
    `DTEND:${formatUtcDate(end)}`,
    `SUMMARY:${escapeIcs(title)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    `LOCATION:${escapeIcs(location)}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "wedding-invitation.ics";
  document.body.append(link);
  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    link.remove();
  }, 0);
}

function formatUtcDate(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapeIcs(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function updateMetadata() {
  const title = interpolate(t("pageTitle"));
  const description = interpolate(t("metaDescription"));

  document.title = title;
  document.querySelector('meta[name="description"]').content = description;
  document.querySelector('meta[property="og:title"]').content = title;
  document.querySelector('meta[property="og:description"]').content = description;
}

function t(key) {
  return translations[activeLanguage][key] || translations.en[key] || key;
}

function interpolate(text) {
  return String(text).replace(/\{(\w+)\}/g, (_, key) => weddingConfig[key] || "");
}
