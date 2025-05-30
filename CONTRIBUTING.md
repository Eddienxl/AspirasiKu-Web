# Contributing to AspirasiKu

Thank you for your interest in contributing to AspirasiKu! This document provides guidelines and instructions for contributing to the project.

## 🤝 How to Contribute

### 1. Fork the Repository
- Fork the project on GitHub
- Clone your fork locally
- Add the original repository as upstream

```bash
git clone https://github.com/yourusername/aspirasiku.git
cd aspirasiku
git remote add upstream https://github.com/originalowner/aspirasiku.git
```

### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes
- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly

### 4. Commit Your Changes
```bash
git add .
git commit -m "feat: add amazing new feature"
```

### 5. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

## 📝 Code Standards

### Frontend (React.js)
- Use functional components with hooks
- Follow React best practices
- Use Tailwind CSS for styling
- Implement responsive design
- Add PropTypes for component props
- Use meaningful component and variable names

### Backend (Node.js)
- Use async/await for asynchronous operations
- Implement proper error handling
- Follow RESTful API conventions
- Use middleware for authentication and authorization
- Add input validation for all endpoints
- Write clear, descriptive function names

### Database
- Use Sequelize ORM patterns
- Write proper migrations
- Add appropriate indexes
- Follow naming conventions
- Include proper relationships

## 🧪 Testing Guidelines

### Before Submitting PR
- [ ] Test all new features manually
- [ ] Verify responsive design on mobile/tablet/desktop
- [ ] Test authentication and authorization flows
- [ ] Check API endpoints with proper error handling
- [ ] Ensure no console errors in browser
- [ ] Test with different user roles (pengguna/peninjau)

### Testing Checklist
- [ ] Registration and login work correctly
- [ ] Post creation and editing function properly
- [ ] Comment system works as expected
- [ ] Voting system functions correctly
- [ ] Admin panel accessible only to peninjau
- [ ] Password visibility toggle works
- [ ] Category filtering works properly
- [ ] Responsive design is maintained

## 🎨 UI/UX Guidelines

### Design Principles
- Maintain consistent green gradient color scheme
- Follow modern, clean design patterns
- Ensure accessibility standards
- Implement smooth animations and transitions
- Use appropriate spacing and typography
- Maintain visual hierarchy

### Responsive Design
- Mobile-first approach
- Test on various screen sizes
- Ensure touch-friendly interface
- Optimize for performance

## 📋 Pull Request Guidelines

### PR Title Format
```
type(scope): description

Examples:
feat(auth): add password visibility toggle
fix(posts): resolve category filtering issue
docs(readme): update installation instructions
style(ui): improve button hover effects
```

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] Responsive design verified
- [ ] Cross-browser testing done

## Screenshots (if applicable)
Add screenshots of UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated if needed
```

## 🐛 Bug Reports

### Bug Report Template
```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Device: [e.g. Desktop/Mobile]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Feature Description**
Clear description of the proposed feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this feature work?

**Alternatives Considered**
Other solutions you've considered

**Additional Context**
Any other relevant information
```

## 🔧 Development Setup

### Prerequisites
- Node.js 18.x or higher
- PostgreSQL 15.x or MySQL 8.x
- Git

### Local Development
1. Follow installation instructions in README.md
2. Set up development database
3. Configure environment variables
4. Start both frontend and backend servers
5. Test basic functionality

### Code Style
- Use ESLint for JavaScript linting
- Follow Prettier formatting rules
- Use meaningful commit messages
- Keep functions small and focused
- Add JSDoc comments for complex functions

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: [your.email@example.com] for direct contact

### Before Asking for Help
1. Check existing issues and discussions
2. Read the documentation thoroughly
3. Try to reproduce the issue
4. Provide detailed information about your environment

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- CHANGELOG.md for significant contributions
- GitHub contributors page

Thank you for contributing to AspirasiKu! 🎓✨
