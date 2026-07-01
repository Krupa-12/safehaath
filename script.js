// =========================
// Theme Toggle
// =========================

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
});

// =========================
// Language Selector (basic placeholder)
// =========================

const languageSelect = document.getElementById("languageSelect");

languageSelect.addEventListener("change", (e) => {
    alert("Language changed to: " + e.target.value + "\n(Translation system not implemented yet)");
});

// =========================
// Voice Button (basic demo)
// =========================

const voiceBtn = document.getElementById("voiceBtn");

voiceBtn.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
        alert("Speech not supported in your browser");
        return;
    }

    const msg = new SpeechSynthesisUtterance(
        "Stay safe from cyber fraud. Never share OTP or UPI PIN."
    );

    speechSynthesis.speak(msg);
});

// =========================
// Smooth scroll (extra enhancement)
// =========================

document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// =========================
// Quiz System
// =========================

const questions = [
    {
        q: "What should you do if someone asks for your OTP?",
        options: ["Share it", "Never share it", "Send screenshot", "Ignore bank"],
        answer: 1
    },
    {
        q: "What is phishing?",
        options: ["Fishing game", "Fake messages to steal data", "Bank app", "Antivirus"],
        answer: 1
    },
    {
        q: "What is safest password practice?",
        options: ["Use name", "Reuse password", "Strong unique password", "123456"],
        answer: 2
    }
];

let currentQ = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const progressBar = document.getElementById("quizProgress");
const questionNumber = document.getElementById("questionNumber");
const totalQuestions = document.getElementById("totalQuestions");

totalQuestions.textContent = questions.length;

function loadQuestion() {
    const q = questions[currentQ];

    questionEl.textContent = q.q;
    optionsEl.innerHTML = "";

    q.options.forEach((opt, index) => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = opt;

        div.onclick = () => {
            document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
            div.classList.add("selected");

            if (index === q.answer) {
                score++;
            }
        };

        optionsEl.appendChild(div);
    });

    questionNumber.textContent = currentQ + 1;

    let progress = ((currentQ + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";
    progressBar.textContent = Math.round(progress) + "%";
}

nextBtn.addEventListener("click", () => {
    if (currentQ < questions.length - 1) {
        currentQ++;
        loadQuestion();
    } else {
        showResult();
    }
});

prevBtn.addEventListener("click", () => {
    if (currentQ > 0) {
        currentQ--;
        loadQuestion();
    }
});

function showResult() {
    document.getElementById("scoreText").textContent =
        `${score} / ${questions.length}`;

    const modal = new bootstrap.Modal(document.getElementById("resultModal"));
    modal.show();
}

document.getElementById("restartQuiz").addEventListener("click", () => {
    currentQ = 0;
    score = 0;
    loadQuestion();
    bootstrap.Modal.getInstance(document.getElementById("resultModal")).hide();
});

// Init quiz
loadQuestion();

// =========================
// Contact form
// =========================

document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    e.target.reset();
});
// Register Service Worker

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}