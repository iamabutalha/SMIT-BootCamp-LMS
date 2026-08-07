# src/services/

Business-logic layer that implements reusable operations and data interactions.

Services are called by controllers. They encapsulate complex workflows (multi-step data mutations, hashing, external API calls) and are unit-testable in isolation. Services do NOT send HTTP responses — they return data or throw `apiError`.

## Contents at time of initialization

- `README.md` - This file.

## Planned services

- `auth.service.js` - Token generation/verification, registration, login credential checks.
- `user.service.js` - Profile retrieval/update, account deletion, user listing.
- `course.service.js` - Course CRUD, enrollment, lesson management.
- `email.service.js` - Sending transactional emails via Nodemailer.
- `upload.service.js` - Cloudinary uploads and deletions.
- `password.service.js` - Hashing and comparing passwords with bcryptjs.

## Conventions

- Services are plain async functions/classes; they take plain data and return plain data.
- All thrown errors are `apiError` instances with a status code and message.
- External integrations (email, Cloudinary) live here, not in controllers or models.