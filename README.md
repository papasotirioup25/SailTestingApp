# ⛵ Sailing Quiz Application

![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green.svg)

A modern, interactive web application for sailing theory exam preparation. Built with vanilla JavaScript, this application provides a realistic quiz experience with timer, randomized questions, progress tracking, and detailed results analysis.

**✨ Zero Dependencies | 🐳 Docker Ready | 📱 Fully Responsive | 🚀 Production Ready**

---

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Technologies](#-technologies)
- [Browser Compatibility](#-browser-compatibility)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Features

- ✅ **120+ Question Database** - Large pool of sailing theory questions
- ✅ **Random Selection** - 10 different questions per test (randomly selected from pool)
- ✅ **60-Minute Timer** - Visual countdown with warning when time is running low
- ✅ **Randomized Questions & Answers** - Different experience every time
- ✅ **Progress Tracking** - Visual progress bar showing completion status
- ✅ **Navigation System** - Previous/Next buttons to review answers
- ✅ **Auto-Save Answers** - Answers saved during navigation
- ✅ **Automatic Grading** - 80% passing threshold (8/10 correct answers)
- ✅ **Detailed Results** - Side-by-side comparison of your answers vs. correct answers
- ✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ✅ **Warning Prompt** - Prevents accidental page refresh during active quiz
- ✅ **Sailboat Logo** - Custom SVG graphics with smooth animations
- ✅ **Unlimited Practice** - Take the test as many times as you want

---

## 🚀 Quick Start

### Method 1: Python HTTP Server (Fastest)

**Prerequisites:** Python 3.x (pre-installed on macOS/Linux)

```bash
# Navigate to the public directory
cd public

# Start the server
python3 -m http.server 3000

# Open your browser to: http://localhost:3000
```

**To stop:** Press `Ctrl+C`

---

### Method 2: Docker (Production Ready)

**Prerequisites:** Docker Desktop installed and running

```bash
# Make sure Docker Desktop is running first!

# Start the application
docker-compose up -d

# Open your browser to: http://localhost:8080

# To stop
docker-compose down
```

**Docker Commands:**
```bash
# View logs
docker-compose logs -f

# Rebuild after changes
docker-compose up -d --build

# Remove everything
docker-compose down -v
```

---

### Method 3: Node.js HTTP Server

**Prerequisites:** Node.js installed

```bash
# Navigate to the public directory
cd public

# Start the server
npx http-server -p 3000

# Open your browser to: http://localhost:3000
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
  "passing_score": 8,             // 8/10 = 80%
  "total_questions": 10,          // Questions shown per test
  "questions": [...]              // 120+ questions in pool
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

## 🚀 Deployment

### Static Hosting (Recommended)

The application is 100% static and works on any static hosting service.

#### GitHub Pages

1. Enable GitHub Pages in repository Settings
2. Select source: `main` branch, `/public` folder
3. Access at: `https://your-username.github.io/repository-name/`

#### Netlify

1. Connect your GitHub repository at netlify.com
2. Build settings:
   - **Base directory:** `public`
   - **Publish directory:** `public`
   - **Build command:** (leave empty)
3. Deploy automatically on every commit

#### Vercel

1. Import your repository at vercel.com
2. Set **Root Directory** to `public`
3. Deploy with one click

#### AWS S3 + CloudFront

```bash
# Upload public folder to S3 bucket
aws s3 sync public/ s3://your-bucket-name/ --delete

# Enable static website hosting in S3 settings
# Set index.html as index document
# Optional: Add CloudFront for CDN
```

### Docker Deployment

#### Docker Hub

```bash
# Build and tag
docker build -t your-username/sailing-quiz:latest .

# Push to Docker Hub
docker login
docker push your-username/sailing-quiz:latest

# Pull and run anywhere
docker pull your-username/sailing-quiz:latest
docker run -d -p 8080:80 your-username/sailing-quiz:latest
```

#### Docker Compose (Production)

```yaml
version: '3.8'
services:
  quiz:
    image: your-username/sailing-quiz:latest
    ports:
      - "80:80"
    restart: unless-stopped
```

### Custom Server

Any web server that can serve static files works:

**Nginx:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/public;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Apache:**
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/public
    <Directory /path/to/public>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

---

## 💻 Technologies

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox/Grid
- **Vanilla JavaScript (ES6+)** - No frameworks required
- **SVG** - Custom vector graphics

### Backend
- **Nginx** (in Docker) - Lightweight web server
- **Static files only** - No backend API required

### Tools
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Python 3** - Local development server

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

## 🔧 Troubleshooting

### Port Already in Use

**Error:** `OSError: [Errno 48] Address already in use`

**Solution:**
```bash
# Use a different port
python3 -m http.server 8888

# Or kill the process using the port
lsof -ti:3000 | xargs kill -9
```

### Docker Daemon Not Running

**Error:** `Cannot connect to the Docker daemon`

**Solution:** Open Docker Desktop and wait for it to fully start

### Quiz Data Not Loading

**Symptoms:** Loading spinner never disappears

**Solutions:**
1. Make sure you're in the `public` directory
2. Don't open `index.html` directly - use an HTTP server
3. Check browser console (F12) for errors
4. Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)

### Blank Page

**Solutions:**
1. Open browser DevTools (F12) and check Console for errors
2. Clear browser cache and hard refresh
3. Try a different browser
4. Verify server is running: `curl http://localhost:3000`

### Greek Text Showing Incorrectly

**Solutions:**
1. Ensure all files are saved as UTF-8 encoding
2. Hard refresh the browser
3. Check that `style.css` loads successfully (Network tab in DevTools)

### Port Conflicts

If port 3000, 8000, or 8080 are in use, try these ports:
- 3001, 8001, 8888, 9000

```bash
python3 -m http.server 8888
```

---

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

### How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit: `git commit -m 'Add some amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Feature Ideas

- Add more questions to the quiz database
- Improve UI/UX design and responsiveness
- Add export results functionality
- Create question categories/topics
- Build multiple quiz sets
- Implement user authentication
- Add progress tracking
- Create difficulty levels
- Support multiple languages
- Build an admin panel for managing questions

### Code Style

- Use consistent indentation (2 spaces)
- Write clear, descriptive variable names
- Add comments for complex logic
- Follow existing code patterns
- Test thoroughly before submitting PR

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The application is provided for educational purposes. The question material is based on sailing theory from the Thessaloniki Nautical Club.

---

## 🙏 Acknowledgments

- **Question Material:** Provided by the Thessaloniki Nautical Club (Ναυτικός Όμιλος Θεσσαλονίκης)
- **Purpose:** Built as a Proof of Concept (POC) for sailing exam preparation
- **Technology Stack:** HTML5, CSS3, Vanilla JavaScript, Docker, Nginx

---

## 📞 Support

For issues, questions, or suggestions:

1. Open an issue on GitHub
2. Check this README for solutions
3. Review the source code comments
4. Check browser console for error messages

---

## 📊 Project Statistics

- **Lines of Code:** ~1,500 (HTML, CSS, JavaScript)
- **Questions:** 120+ in database
- **Questions Per Test:** 10
- **Languages:** Greek (quiz content), English (code/docs)
- **Dependencies:** Zero (pure vanilla JavaScript)
- **Browser Support:** All modern browsers
- **Mobile Friendly:** Yes (fully responsive)

---

**Good luck with your sailing exams! ⛵**

*Made with passion for sailing and education*

---

## 🔗 Quick Links

- **Start Testing:** Run `python3 -m http.server 3000` in the `public` folder
- **View Questions:** Check `public/data/quiz_data.json`
- **Customize Styles:** Edit `public/css/style.css`
- **Modify Logic:** Edit `public/js/app.js`
- **Source Material:** See `docs/SailBook.txt`
