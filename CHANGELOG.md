# Changelog

All notable changes to the AspirasiKu project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-XX

### Added
- Initial release of AspirasiKu platform
- User registration and authentication system
- Role-based access control (pengguna vs peninjau)
- Post creation with 10 categorized types with emoticons
- Comment system with anonymous posting option
- Upvote/downvote functionality for posts and comments
- Report system for inappropriate content
- Admin panel for content moderation (peninjau only)
- Password visibility toggle across all forms
- Responsive design with modern UI/UX
- Category filtering and sorting options
- Profile management and settings
- JWT-based authentication
- PostgreSQL/MySQL database support

### Features
- **Authentication**: Secure login/register with JWT tokens
- **Content Management**: Create, edit, delete posts and comments
- **Moderation**: Admin panel for content review and management
- **Interaction**: Vote and report system for community moderation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Role Management**: Separate permissions for users and reviewers

### Technical Stack
- **Frontend**: React.js 18.2.0, Tailwind CSS 3.3.0, React Router 6.x
- **Backend**: Node.js 18.x, Express.js 4.x, Sequelize ORM 6.x
- **Database**: PostgreSQL 15.x (MySQL support available)
- **Authentication**: JWT with bcrypt password hashing

### Security
- Password hashing with bcrypt
- JWT token-based authentication
- Role-based authorization middleware
- Input validation and sanitization
- CORS protection
- Environment variable configuration

### Documentation
- Comprehensive README.md
- API documentation
- User role documentation
- Installation and setup guides
- Contributing guidelines

## [Unreleased]

### Planned Features
- Email notifications for post responses
- Advanced search functionality
- File attachment support for posts
- Real-time notifications
- Mobile app development
- Advanced analytics dashboard
- Multi-language support (Indonesian/English)

---

For more details about specific features and implementations, see the [README.md](README.md) file.
