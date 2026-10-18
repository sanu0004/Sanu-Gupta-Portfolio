// ---------- Typed text ----------
if (typeof Typed !== "undefined" && document.querySelector(".text")) {
  new Typed(".text", {
    strings: [
      "Data Analyst",
      "Power BI Developer",
      "Machine Learning Specialist",
      "Data Visualization Specialist",
    ],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
  });
}

// ---------- Skills Filter ----------
const filterBtns = document.querySelectorAll(".filter-btn");
const skillCards = document.querySelectorAll(".skill-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    skillCards.forEach((card) => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ---------- Project demo links ----------
const DEMO_URLS = {
  "Build GPT From Scratch": "https://dl-project-gamma.vercel.app/",
  "Movie Recommendation System": "https://movie-recommender-system-sepia-zeta.vercel.app/",
  "Diabetes Prediction": "https://diabetes-prediction-mu-five.vercel.app/",
  "Heart-Disease-Prediction": "https://heart-vercel-eyaj.vercel.app/",
  "Indian_Election": "https://indian-election-ui.vercel.app",
  "Clinical-Trial": "https://clinical-trial-seven.vercel.app/",
  "House Price Prediction (Boston-Housing)": "https://boston-house-price-theta.vercel.app/#0.257,0,9.69,0,0.538,6.208,77.5,3.207,5,330,19.05,391.44,11.36",
  "Cricket_IPL_Stats": "https://ipl-stats-ruby.vercel.app/",
  "Road-Accident-Severity-Prediction": "https://road-accident-severity-prediction-six.vercel.app/",
};

document.querySelectorAll(".project-card").forEach((card) => {
  const heading = card.querySelector("h3");
  const demoBtn = card.querySelector(".demo-btn");
  if (!heading || !demoBtn) return;

  const title = heading.textContent.trim();
  const url = demoBtn.getAttribute("data-demo") || DEMO_URLS[title] || "";
  if (url) {
    demoBtn.href = url;
  } else {
    demoBtn.classList.add("disabled");
    demoBtn.removeAttribute("target");
    demoBtn.title = "Live demo coming soon";
    demoBtn.addEventListener("click", (e) => e.preventDefault());
  }
});

// ---------- Resume popup ----------
const resumeBtn = document.getElementById("resumeBtn");
const resumeModal = document.getElementById("resumeModal");
const resumeClose = document.querySelector(".resume-close");

function closeResume() {
  resumeModal.style.display = "none";
  document.body.style.overflow = "auto";
}

if (resumeBtn && resumeModal) {
  resumeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    resumeModal.style.display = "block";
    document.body.style.overflow = "hidden";
  });

  if (resumeClose) resumeClose.addEventListener("click", closeResume);

  window.addEventListener("click", (e) => {
    if (e.target === resumeModal) closeResume();
  });
}

// ---------- Contact form ----------
const contactForm = document.getElementById("contactForm");

// 1. Create a free form at https://formspree.io
// 2. Copy its endpoint and paste it here (looks like https://formspree.io/f/abcdwxyz)
const FORMSPREE_URL = "https://formspree.io/f/xdekvbyq";

if (contactForm) {
  const submitBtn = contactForm.querySelector('button[type="submit"], input[type="submit"]');

  // Status line under the form (created here, so no HTML change is needed)
  let statusEl = document.getElementById("formStatus");
  if (!statusEl) {
    statusEl = document.createElement("p");
    statusEl.id = "formStatus";
    statusEl.setAttribute("role", "status");
    statusEl.style.marginTop = "12px";
    contactForm.appendChild(statusEl);
  }
  const setStatus = (text, color) => {
    statusEl.textContent = text;
    statusEl.style.color = color || "inherit";
  };

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Safe reads: a missing field gives "" instead of crashing the handler
    const val = (id) => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : "";
    };

    const payload = {
      name: val("name"),
      email: val("email"),
      subject: val("subject") || "Portfolio contact message",
      message: val("message"),
    };

    if (FORMSPREE_URL.includes("YOUR_FORM_ID")) {
      setStatus("Form is not set up yet: add your Formspree endpoint in main.js.", "#d9534f");
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    setStatus("Sending…", "#888");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("Thank you! Your message has been sent.", "#28a745");
        contactForm.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = data.errors && data.errors.length
          ? data.errors.map((er) => er.message).join(", ")
          : "Something went wrong. Please try again.";
        setStatus(msg, "#d9534f");
      }
    } catch (err) {
      setStatus("Network error. Please check your connection and try again.", "#d9534f");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

// ---------- Resume download ----------
const resumeDownload = document.getElementById("resumeDownload");

if (resumeDownload) {
  resumeDownload.addEventListener("click", () => {
    const pdfUrl = "Sanu_Resume.pdf";

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Sanu_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
