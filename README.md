# ⛵ Sailing Quiz Application

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

A modern, interactive web application for sailing theory exam preparation. Built with vanilla JavaScript, this application provides a realistic quiz experience with timer, randomized questions, progress tracking, and detailed results analysis.

**✨ Zero Dependencies | 📱 Fully Responsive | 🚀 Ready to Use**

---

## 📋 Table of Contents

- [Features](#-features)
- [Download from GitHub](#-download-from-github)
- [How to Run](#-how-to-run)
  - [Method 1: Python HTTP Server](#method-1-python-http-server-recommended)
  - [Method 2: Docker](#method-2-docker)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Technologies](#-technologies)
- [Browser Compatibility](#-browser-compatibility)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Features

- ✅ **Random Selection** - 30 different questions per test (randomly selected from pool)
- ✅ **60-Minute Timer** - Visual countdown with warning when time is running low
- ✅ **Randomized Questions & Answers** - Different experience every time
- ✅ **Progress Tracking** - Visual progress bar showing completion status
- ✅ **Navigation System** - Previous/Next buttons to review answers
- ✅ **Auto-Save Answers** - Answers saved during navigation
- ✅ **Automatic Grading** - 80% passing threshold
- ✅ **Detailed Results** - Side-by-side comparison of your answers vs. correct answers
- ✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ✅ **Warning Prompt** - Prevents accidental page refresh during active quiz
- ✅ **Sailboat Logo** - Custom SVG graphics with smooth animations
- ✅ **Unlimited Practice** - Take the test as many times as you want

---

## 📥 Download from GitHub

If you don't have the project yet, download it from GitHub:

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/SailTestingApp.git

# Navigate to the project directory
cd SailTestingApp
```

Or download as ZIP:
1. Go to the GitHub repository page
2. Click the green "Code" button
3. Select "Download ZIP"
4. Extract the ZIP file to your desired location

---

## 🚀 How to Run

### Method 1: Python HTTP Server (Recommended)

**Prerequisites:** Python 3.x (pre-installed on macOS/Linux)

```bash
# Navigate to the public directory
cd SailTestApplication/public

# Start the server
python3 -m http.server

# Open your browser at: http://localhost:8000
```

**To stop:** Press `Ctrl+C`

---

### Method 2: Docker

**Prerequisites:** Docker Desktop installed and running

```bash
# Navigate to the SailTestApplication directory
cd SailTestApplication

# Build and start the container
docker-compose up -d

# Open your browser at: http://localhost:8080
```

**To stop:**
```bash
docker-compose down
```

**Useful Docker commands:**
```bash
# View logs
docker-compose logs -f

# Rebuild after changes
docker-compose up -d --build

# Remove everything (container, images, volumes)
docker-compose down -v
```

---

## 📁 Project Structure

```
SailTestingApp/
├── SailTestApplication/
│   ├── public/                # Frontend application
│   │   ├── index.html         # Main HTML file
│   │   ├── css/
│   │   │   └── style.css      # Application styles
│   │   ├── js/
│   │   │   └── app.js         # Application logic (Vanilla JS)
│   │   └── data/
│   │       └── quiz_data.json # 120+ quiz questions
│   ├── docs/
│   │   └── SailBook.txt       # Source sailing theory material
│   ├── Dockerfile             # Docker image configuration
│   ├── docker-compose.yml     # Docker Compose setup
│   ├── .dockerignore          # Docker ignore patterns
│   ├── .gitignore             # Git ignore patterns
│   ├── LICENSE                # MIT License
│   └── README.md              # This file
```

**File Sizes:**
- Frontend files: ~40 KB
- Quiz data: ~50 KB (120 questions)
- Documentation: ~348 KB (SailBook.txt)
- Total: ~365 KB

---

## ⚙️ Configuration

### Modifying Quiz Settings

Edit `public/data/quiz_data.json`:

```json
{
  "quiz_title": "Τεστ Γνώσεων Ιστιοπλοΐας",
  "time_limit_seconds": 3600,    // 60 minutes (in seconds)
  "passing_score": 24,             // 24/30 = 80%
  "total_questions": 30,          // Questions shown per test
  "questions": [...]              // questions in pool
}
```

### Adding/Editing Questions

Question format:
```json
{
  "id": 1,
  "question": "Τι σημαίνει ο ναυτικός όρος «αβάρα»;",
  "options": [
    "Απώθησε, σπρώξε",
    "Τέντωσε, σφίξε",
    "Κατέβασε τα πανιά",
    "Άφησε, λύσε τα σχοινιά"
  ],
  "correct_answer_index": 0
}
```

- `id`: Unique question identifier
- `question`: The question text
- `options`: Array of 4 possible answers
- `correct_answer_index`: Index (0-3) of the correct answer

### Customizing Styles

Edit `public/css/style.css` to customize:
- Color scheme
- Typography
- Layout and spacing
- Responsive breakpoints
- Animations

---

## 💻 Technologies

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox/Grid
- **Vanilla JavaScript (ES6+)** - No frameworks required
- **SVG** - Custom vector graphics

### Tools
- **Python 3** - Local HTTP server for development

---

## 🌐 Browser Compatibility

Tested and working on:

- ✅ **Chrome/Edge** (v90+)
- ✅ **Firefox** (v88+)
- ✅ **Safari** (v14+)
- ✅ **Opera** (v76+)

**Requirements:**
- JavaScript must be enabled
- Modern browser (released after 2020)
- Minimum screen width: 320px (mobile-friendly)

---

## 🎓 Quiz Rules

- **Duration:** 60 minutes (3600 seconds)
- **Question Pool:** 120+ questions available
- **Questions Per Test:** 10 (randomly selected from pool)
- **Passing Score:** 8 correct answers (80%)
- **Question Order:** Randomized for each session
- **Answer Options:** Randomized for each session
- **Navigation:** Allowed (Previous/Next buttons)
- **Time Warning:** Visual indicator when ≤5 minutes remain
- **Practice Mode:** Unlimited retakes with different questions

---

## Troubleshooting

### Quiz Data Not Loading

**Solutions:**
1. Make sure you're in the `public` directory
2. Don't open `index.html` directly - use an HTTP server
3. Check browser console (F12) for errors
4. Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)

### Blank Page

**Solutions:**
1. Open DevTools (F12) and check Console for errors
2. Clear browser cache and hard refresh
3. Try a different browser

### Greek Text Not Displaying Correctly

**Solutions:**
1. Ensure all files are saved as UTF-8 encoding
2. Hard refresh the browser
3. Check that `style.css` loads successfully (Network tab in DevTools)

---

**Good luck with your sailing exams! ⛵**

---

## 🔗 Quick Links

- **Run:** Execute `python3 -m http.server` in the `public` folder
- **Questions:** View `public/data/quiz_data.json`
- **Styles:** Edit `public/css/style.css`
- **Logic:** Edit `public/js/app.js`
