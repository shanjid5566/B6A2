# B2A2 - Vehicle Booking API

Live URL: (https://b2-a2.vercel.app/)

## Features

- User registration & authentication (JWT)
- Create bookings with date ranges and total price calculation
- Role-based booking access (admin sees all, user sees own)
- Prevent overlapping bookings for the same vehicle
- Cancel booking (customers before start date)
- Admin: mark returned and manual auto-return endpoint

## Technology Stack

- Node.js + TypeScript
- Express
- PostgreSQL (pg)
- JWT for authentication

## Setup

1. Clone the repository and change directory:

   git clone : https://github.com/shanjid5566/B6A2.git
   cd B2A2

2. Create a `.env` file with the required variables (example):

   PORT=3000
   DATABASE_URL=postgres://user:pass@host:port/dbname
   USER_SECRET_KEY=your_jwt_secret

3. Install dependencies:

   npm install

4. Run in dev mode:

   npm run dev

5. Build / start (if you add build/start scripts):

   npm run build
   npm start

## API (examples)

- POST /api/v1/auth/login — obtain JWT
- POST /api/v1/bookings — create booking (auth: user)
- GET /api/v1/bookings — list bookings (admin/user roles)
- DELETE /api/v1/bookings/:id — cancel booking (owner before start date or admin)
- POST /api/v1/bookings/:id/return — admin marks returned
- POST /api/v1/bookings/auto-return — admin triggers auto-return for expired bookings

## Notes

- Add your deployment URL to the Live URL section above.
- Ensure your database is reachable and migrations (if any) are applied. The project creates tables on startup via `src/config/db.ts`.

## Contributing

- Open issues and PRs with clear descriptions and reproducible steps.

---

Generated README. Update details (author, description, live URL) as needed.

# B6A2
