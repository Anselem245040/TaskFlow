# TaskFlow API Documentation

## Base URL
<!-- `http://localhost:3000` (Default) -->

## Authentication (`/auth`)
- `POST /auth/login`: Authenticate user and return tokens.
- `POST /auth/signup`: Register a new user.
- `POST /auth/refresh`: Refresh access token using refresh token.
- `DELETE /auth/me`: Deactivate current user account.

## Rooms (`/rooms`)
- `POST /rooms`: Create a new room.
- `GET /rooms/:roomId`: Get detailed information about a room.
- `GET /rooms/:userId/rooms`: Get all rooms a user belongs to.
- `POST /rooms/:roomId/invite`: Invite a user to a room via email.
- `POST /rooms/:roomId/accept-invite`: Accept a room invitation with a code.
- `POST /rooms/:roomId/decline-invite`: Decline a room invitation.
- `GET /rooms/:roomId/participants`: List all members in a room.
- `DELETE /rooms/:roomId/members/:userId`: Remove a member (Owner only).
- `DELETE /rooms/:roomId/leave`: Leave a room.
- `PATCH /rooms/:roomId/transfer-ownership`: Transfer ownership to another member.

## Tasks (`/task`)
- `POST /task/rooms/:roomId`: Create a task in a room.
- `PATCH /task/rooms/:roomId/assign`: Assign a task to a member.
- `GET /task/rooms/:roomId`: List all tasks in a room.
- `PATCH /task/:taskId`: Update task details.
- `GET /task/:roomId/:taskId`: Get task details.
- `DELETE /task/:roomId/:taskId`: Delete a task.

## Users (`/users`)
- `GET /users/me`: Get current user profile.
- `PATCH /users/me`: Update user profile components.
- `POST /users`: Create a user (internal/signup).

## Security
Most routes (except `/auth/login`, `/auth/signup`, and `/auth/refresh`) require a valid JWT Bearer Token in the `Authorization` header.
