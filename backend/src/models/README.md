# src/models/

Mongoose schemas and models that map application entities to MongoDB collections.

Each model defines the shape, validation, indexes, and behavior (instance methods, statics, hooks) for a collection. Business logic should stay in services; models own data structure and integrity.

## Contents at time of initialization

- `README.md` - This file.

## Planned models

- `User.model.js` - User accounts (name, email, password hash, role, avatar).
- `Course.model.js` - Courses (title, description, instructor, category, lessons, enrollment count).
- `Assignment.model.js` - Assignments (course, title, description, due date, attachments).
- `Submission.model.js` - Student submissions against assignments.
- `Enrollment.model.js` - Tracks which students are enrolled in which courses.
- `Token.model.js` - Refresh tokens / password-reset tokens for revocation support.

## Conventions

- Schemas enable timestamps and use strict mode.
- Email fields must be unique and lowercased; passwords are hashed with `bcrypt` before save (via pre-save hook or in service — choose one consistently).
- Sensitive fields (e.g., password hashes) are excluded from JSON serialization via `toJSON`/`select: false`.