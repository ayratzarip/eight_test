# Learning Platform Frontend

A Next.js application with authentication powered by NextAuth.js.

## Features

- Public home page
- Protected lessons page
- Google authentication
- User profiles
- Responsive design using shadcn/ui components

## Setup

1. Install dependencies:

```bash
npm install
npm install next-auth --save
```

2. Make sure your `.env.local` file has the required environment variables:

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-random-secret
```

3. For demonstration purposes, you can use the following credentials:
   - Email: user@example.com
   - Password: password

4. Run the development server:

```bash
npm run dev
```

## Pages

- `/` - Public home page
- `/lessons` - Protected lessons page (requires authentication)
- `/auth/signin` - Sign-in page

## Technologies Used

- Next.js 13
- NextAuth.js
- Prisma
- PostgreSQL
- Tailwind CSS
- shadcn/ui

## Authentication Flow

1. Users can access the home page without authentication
2. When a user tries to access the `/lessons` page, they are redirected to the sign-in page if not authenticated
3. After successful authentication, users are redirected to the `/lessons` page
4. Users can sign out from the header dropdown menu