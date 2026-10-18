var typed = new Typed(".text", {
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
  // Skills Filter
const filterBtns = document.querySelectorAll(".filter-btn");
const skillCards = document.querySelectorAll(".skill-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
      // Remove active class from all buttons
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
  // main.js

// Project "Try it" buttons: paste each live deployment URL below (keyed by project title),
// or set data-demo="https://..." on the button in index.html.
// If no live URL is set yet, the button is shown as disabled.
const DEMO_URLS = {
  "Build GPT From Scratch": "https://dl-project-gamma.vercel.app/",
  "Movie Recommendation System": "https://movie-recommender-system-sepia-zeta.vercel.app/",
  "Diabetes Prediction": "https://diabetes-prediction-mu-five.vercel.app/",
  "Heart-Disease-Prediction": "https://heart-vercel-eyaj.vercel.app/",
  "Indian_Election": "https://indian-election-ui.vercel.app/",
  "Clinical-Trial": "",
  "House Price Prediction (Boston-Housing)": "https://boston-house-price-theta.vercel.app/#0.257,0,9.69,0,0.538,6.208,77.5,3.207,5,330,19.05,391.44,11.36",
  "Cricket_IPL_Stats": "https://ipl-stats-ruby.vercel.app/",
  "Road-Accident-Severity-Prediction": "https://road-accident-severity-prediction-six.vercel.app/",
};

document.querySelectorAll(".project-card").forEach((card) => {
  const title = card.querySelector("h3").textContent.trim();
  const demoBtn = card.querySelector(".demo-btn");
  if (!demoBtn) return;

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
  // Resume Popup
const resumeBtn   = document.getElementById("resumeBtn");
const resumeModal = document.getElementById("resumeModal");
const resumeClose = document.querySelector(".resume-close");

resumeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resumeModal.style.display    = "block";
  document.body.style.overflow = "hidden";  // disable background scroll
});

resumeClose.addEventListener("click", () => {
  resumeModal.style.display    = "none";
  document.body.style.overflow = "auto";  // re-enable background scroll
});

window.addEventListener("click", (e) => {
  if (e.target === resumeModal) {
    resumeModal.style.display    = "none";
    document.body.style.overflow = "auto";  // re-enable background scroll
  }
});

  // Contact Form Mail

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name    = document.getElementById("name").value;
    const email   = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const body = `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:sanugupta969@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  });
}


const resumeDownload = document.getElementById("resumeDownload");

if (resumeDownload) {
  resumeDownload.addEventListener("click", () => {
    // Path starts with "/" so it always resolves from the site root on Vercel
    const pdfUrl = "/assets/SanuCV.pdf";

    // Create a temporary link in the SAME page and click it (no popup tab needed)
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "SanuCV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
