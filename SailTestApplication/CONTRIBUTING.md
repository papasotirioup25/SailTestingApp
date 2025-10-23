# Contributing to Sailing Quiz Application

Thank you for your interest in contributing to the Sailing Quiz Application! This document provides guidelines for contributing to the project.

## 🎯 Ways to Contribute

1. **Add Questions** - Expand the quiz database with more sailing theory questions
2. **Fix Bugs** - Report and fix issues you encounter
3. **Improve Documentation** - Enhance README, comments, or add tutorials
4. **Add Features** - Implement new functionality (see feature ideas below)
5. **Improve UI/UX** - Enhance design, accessibility, and user experience
6. **Translate** - Add support for multiple languages

## 🔧 Development Setup

### Prerequisites

- Git
- Modern web browser
- Text editor or IDE
- Docker (optional, for testing containerization)
- Python 3.x (optional, for PDF conversion)

### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/sailing-quiz.git
   cd sailing-quiz
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Run locally**
   ```bash
   cd public
   python -m http.server 8000
   ```

4. **Make your changes**
   - Edit files in `public/` directory
   - Test thoroughly in multiple browsers
   - Ensure responsive design works

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: descriptive commit message"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your feature branch
   - Provide a clear description of changes

## 📝 Commit Message Guidelines

Use clear, descriptive commit messages:

- `Add: new feature or file`
- `Fix: bug description`
- `Update: modification to existing feature`
- `Remove: deleted feature or file`
- `Docs: documentation changes`
- `Style: formatting, no code change`
- `Refactor: code restructuring`
- `Test: adding tests`

Examples:
```
Add: timer pause/resume functionality
Fix: navigation bug on mobile devices
Update: quiz scoring algorithm
Docs: improve README installation steps
```

## 🎨 Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Add meaningful comments for complex sections
- Maintain proper indentation (2 spaces)
- Use kebab-case for IDs and classes

### CSS
- Follow BEM naming convention where applicable
- Group related properties together
- Use CSS variables for colors and common values
- Add comments for complex selectors
- Maintain mobile-first responsive design

### JavaScript
- Use ES6+ features (const, let, arrow functions)
- Add JSDoc comments for functions
- Use meaningful variable and function names
- Handle errors appropriately
- Avoid global variables when possible

Example:
```javascript
/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} - Shuffled copy of the array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    // implementation
    return shuffled;
}
```

## 🧪 Testing Guidelines

Before submitting a PR, test:

1. **Functionality**
   - All quiz features work correctly
   - Timer counts down properly
   - Navigation functions as expected
   - Results display accurately

2. **Browser Compatibility**
   - Chrome/Edge (latest 2 versions)
   - Firefox (latest 2 versions)
   - Safari (latest 2 versions)
   - Mobile browsers (iOS Safari, Chrome Mobile)

3. **Responsive Design**
   - Test on mobile (320px - 767px)
   - Test on tablet (768px - 1024px)
   - Test on desktop (1025px+)

4. **Performance**
   - Page loads quickly
   - No console errors
   - Smooth animations

## 💡 Feature Ideas

Here are some features you could work on:

### Easy
- [ ] Add keyboard shortcuts (arrow keys for navigation)
- [ ] Dark mode toggle
- [ ] Print results functionality
- [ ] Add sound effects (optional, toggleable)
- [ ] Bookmark/flag questions for review

### Medium
- [ ] Multiple quiz categories/topics
- [ ] Question difficulty levels
- [ ] Export results as PDF
- [ ] Import questions from CSV
- [ ] Quiz history and statistics
- [ ] Multiple language support

### Advanced
- [ ] User authentication and profiles
- [ ] Progress tracking across sessions
- [ ] Leaderboard system
- [ ] Study mode (show answers immediately)
- [ ] Timed practice mode (per question)
- [ ] Admin panel for question management

## 📋 Pull Request Checklist

Before submitting your PR, ensure:

- [ ] Code follows the style guidelines
- [ ] All files are in the correct directories
- [ ] No console errors or warnings
- [ ] Tested in multiple browsers
- [ ] Responsive design works on all screen sizes
- [ ] Comments added for complex logic
- [ ] README updated if needed
- [ ] No unnecessary files included
- [ ] Docker build works (if you modified structure)
- [ ] Commit messages are clear and descriptive

## 🐛 Reporting Bugs

When reporting bugs, please include:

1. **Description** - Clear description of the issue
2. **Steps to Reproduce** - How to reproduce the bug
3. **Expected Behavior** - What should happen
4. **Actual Behavior** - What actually happens
5. **Screenshots** - If applicable
6. **Environment**:
   - Browser and version
   - Operating system
   - Screen size (for UI issues)

## ❓ Questions and Support

If you have questions:

1. Check existing issues and pull requests
2. Read the [README.md](README.md) documentation
3. Review the [QUICK_START.md](QUICK_START.md) guide
4. Open a new issue with the `question` label

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You

Your contributions help make this project better for everyone learning sailing theory. Thank you for taking the time to contribute!

---

**Happy Coding! ⛵**
