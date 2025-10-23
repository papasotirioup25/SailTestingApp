# ⛵ Sailing Quiz Application

![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green.svg)

A modern, standalone web application designed to simulate sailing theory exam tests. Built with vanilla JavaScript, this application provides an interactive quiz experience with timer, progress tracking, and detailed results analysis.

**✨ Zero Dependencies | 🐳 Docker Ready | 📱 Fully Responsive | 🚀 Production Ready**

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
  - [Option 1: Docker (Recommended)](#option-1-docker-recommended)
  - [Option 2: Local Development](#option-2-local-development)
- [Development](#development)
- [Quiz Configuration](#quiz-configuration)
- [PDF to JSON Converter](#pdf-to-json-converter)
- [Technologies](#technologies)
- [Browser Compatibility](#browser-compatibility)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Features

- **Large Question Pool** - 120+ questions in database
- **Random Selection** - 10 different questions per test (randomly selected)
- **60-Minute Timer** with visual countdown
- **Randomized Questions & Answers** for each quiz session
- **Progress Bar** to track completion
- **Navigation System** (Previous/Next buttons)
- **Auto-Save Answers** during navigation
- **Automatic Grading** with 80% passing threshold (8/10)
- **Detailed Results** with answer comparison
- **Responsive Design** for mobile and desktop
- **Warning Prompt** before page refresh during active quiz
- **Sailboat Logo** with custom SVG graphics
- **Unlimited Practice** - Different questions every time you restart

## 📁 Project Structure

```
sailing-quiz/
├── public/                    # Frontend application files
│   ├── index.html            # Main HTML file
│   ├── css/
│   │   └── style.css         # Application styles
│   ├── js/
│   │   └── app.js            # Application logic (Vanilla JS)
│   └── data/
│       └── quiz_data.json    # Quiz questions and configuration
├── scripts/                   # Utility scripts
│   ├── pdf_to_json.py        # PDF to JSON converter
│   └── requirements.txt      # Python dependencies
├── docs/                      # Documentation files
│   └── SailBook.txt          # Source sailing theory material
├── Dockerfile                # Docker image configuration
├── docker-compose.yml        # Docker Compose configuration
├── .dockerignore             # Docker ignore patterns
├── .gitignore               # Git ignore patterns
└── README.md                # This file
```

## 🚀 Quick Start

### Option 1: Docker (Recommended)

The easiest way to run the application without installing anything locally.

#### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

#### Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd sailing-quiz
```

2. **Build and run with Docker Compose**

```bash
docker-compose up -d
```

This will:
- Build the Docker image
- Start the container in detached mode
- Expose the application on port 8080

3. **Access the application**

Open your browser and navigate to:
```
http://localhost:8080
```

4. **Stop the application**

```bash
docker-compose down
```

#### Alternative: Using Docker directly

```bash
# Build the image
docker build -t sailing-quiz .

# Run the container
docker run -d -p 8080:80 --name sailing-quiz-app sailing-quiz

# Stop the container
docker stop sailing-quiz-app

# Remove the container
docker rm sailing-quiz-app
```

### Option 2: Local Development

Run the application without Docker using a simple HTTP server.

#### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Python 3.x (for running local server)

#### Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd sailing-quiz
```

2. **Navigate to the public directory**

```bash
cd public
```

3. **Start a local web server**

Using Python 3:
```bash
python -m http.server 8000
```

Or using Python 2:
```bash
python -m SimpleHTTPServer 8000
```

Alternatively, using Node.js:
```bash
npx http-server -p 8000
```

4. **Access the application**

Open your browser and navigate to:
```
http://localhost:8000
```

> **Note**: You can also open `index.html` directly in your browser, but using a local server is recommended for proper CORS handling and file loading.

## 🛠️ Development

### Modifying Quiz Settings

Edit `public/data/quiz_data.json`:

```json
{
  "quiz_title": "Sailing Theory Quiz",
  "time_limit_seconds": 3600,    // Change exam duration (in seconds)
  "passing_score": 8,             // Change passing threshold (8/10 = 80%)
  "total_questions": 10,          // Questions shown per test
  "questions": [...]              // 120+ questions in pool
}
```

### Adding/Editing Questions

The quiz data follows this structure:

```json
{
  "id": 1,
  "question": "What is the bow of a boat?",
  "options": [
    "Back part",
    "Front part",
    "Left side",
    "Right side"
  ],
  "correct_answer_index": 1
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
- Layout
- Responsive breakpoints

## 🐍 PDF to JSON Converter

A Python script is provided to convert PDF quiz files into JSON format.

### Prerequisites

```bash
cd scripts
pip install -r requirements.txt
```

### Usage

```bash
python pdf_to_json.py input.pdf output.json
```

### Example

```bash
python pdf_to_json.py sailing_questions.pdf ../public/data/quiz_data.json
```

### Expected PDF Format

The script expects questions in this format:

```
1. What is the bow of the boat?
A) Back part
B) Front part
C) Left side
D) Right side
Answer: B

2. What does "port" mean?
...
```

> **Note**: The parsing logic may need adjustments based on your specific PDF format.

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
- **Python 3** - PDF processing (pdfminer.six)

## 🌐 Browser Compatibility

Tested and working on:

- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Opera (v76+)

## 🎓 Quiz Rules

- **Duration**: 60 minutes (3600 seconds)
- **Question Pool**: 120+ questions available
- **Questions Per Test**: 10 (randomly selected from pool)
- **Passing Score**: 8 correct answers (80%)
- **Question Order**: Randomized for each session
- **Answer Options**: Randomized for each session
- **Navigation**: Allowed (Previous/Next buttons)
- **Time Warning**: Visual indicator when ≤5 minutes remain
- **Practice Mode**: Unlimited retakes with different questions each time

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

1. **Add more questions** to the quiz database
2. **Improve UI/UX** design and responsiveness
3. **Add features** like:
   - PDF export of results
   - Question categories/topics
   - Multiple quiz sets
   - User authentication and progress tracking
   - Difficulty levels
   - Multi-language support

### Steps to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This application is provided for educational purposes. The question material is based on the Thessaloniki Nautical Club sailing theory book.

## 🙏 Acknowledgments

- Question material provided by the **Thessaloniki Nautical Club** (Ναυτικός Όμιλος Θεσσαλονίκης)
- Built as a Proof of Concept (POC) for sailing exam preparation

## 📞 Support

For issues, questions, or suggestions:
1. Open an issue on GitHub
2. Check existing documentation
3. Review the source code comments

---

**Good luck with your sailing exams! ⛵**

*Made with passion for sailing and education*
