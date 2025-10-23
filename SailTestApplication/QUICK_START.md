# 🚀 Quick Start Guide - Sailing Quiz Application

## Get Started in 2 Minutes

### Using Docker (Recommended - No Local Installation Required)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sailing-quiz
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Open your browser**
   ```
   http://localhost:8080
   ```

That's it! The application is now running in a Docker container.

### To Stop the Application

```bash
docker-compose down
```

---

## Alternative: Local Development (Without Docker)

If you don't have Docker installed, you can run the application locally:

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sailing-quiz/public
   ```

2. **Start a web server**

   Using Python 3:
   ```bash
   python -m http.server 8000
   ```

   Or using Node.js:
   ```bash
   npx http-server -p 8000
   ```

3. **Open your browser**
   ```
   http://localhost:8000
   ```

---

## Project Structure

```
sailing-quiz/
├── public/                # All frontend files
│   ├── index.html        # Main application
│   ├── css/style.css     # Styles
│   ├── js/app.js         # Application logic
│   └── data/quiz_data.json  # Quiz questions
├── scripts/              # Python utilities
├── docs/                 # Documentation
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose setup
└── README.md           # Full documentation
```

---

## What's Included

- ✅ **120+ sailing theory questions** from Thessaloniki Nautical Club
- ✅ **10 random questions per test** - different every time
- ✅ **60-minute timed quiz** with countdown
- ✅ **Randomized questions & answers** for each session
- ✅ **Progress tracking** and navigation
- ✅ **Automatic grading** with detailed results (8/10 to pass)
- ✅ **Unlimited practice** - new questions each restart
- ✅ **Fully responsive** design for mobile & desktop
- ✅ **No backend required** - runs entirely in browser
- ✅ **Docker support** - zero local dependencies

---

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Customize quiz questions in `public/data/quiz_data.json`
- Modify styles in `public/css/style.css`
- Use `scripts/pdf_to_json.py` to convert PDF questions to JSON

---

**Ready to test your sailing knowledge? ⛵**
