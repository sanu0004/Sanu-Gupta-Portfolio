// Typing animation (skipped safely if the Typed.js library fails to load)
if (typeof Typed !== "undefined") {
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

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const url = card.getAttribute("data-url");
    if (url) {
      window.open(url, "_blank");
    }
  });
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

  // Contact Form (sends to Formspree, saved in your dashboard + emailed to you)

// 1) Go to https://formspree.io, sign up, click "New Form", and paste your form ID here
const FORMSPREE_URL = "https://formspree.io/f/xdekvbyq";

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  // Small message area under the button (created here so index.html needs no change)
  const statusMsg = document.createElement("p");
  statusMsg.style.cssText = "margin-top:12px;font-size:1.4rem;";
  contactForm.appendChild(statusMsg);

  const submitBtn = contactForm.querySelector('input[type="submit"]');

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      name:    document.getElementById("name").value.trim(),
      email:   document.getElementById("email").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    submitBtn.disabled = true;
    submitBtn.value = "Sending...";
    statusMsg.textContent = "";

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        statusMsg.style.color = "limegreen";
        statusMsg.textContent = "Thank you! Your message has been sent.";
        contactForm.reset();
      } else {
        throw new Error("Server error");
      }
    } catch (err) {
      statusMsg.style.color = "tomato";
      statusMsg.textContent = "Sorry, something went wrong. Please email me directly at sanugupta969@gmail.com";
    } finally {
      submitBtn.disabled = false;
      submitBtn.value = "Submit";
    }
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


// Mobile menu (hamburger)
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
  const icon = menuToggle.querySelector(".menu-icon");

  const closeMenu = () => {
    navbar.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    icon.innerHTML = "&#9776;";
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    icon.innerHTML = isOpen ? "&#10005;" : "&#9776;";
  });

  // Close the menu after tapping any link
  navbar.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
}
