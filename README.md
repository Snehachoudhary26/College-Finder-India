# 🎓 College Finder India

<div align="center">
<img src="https://img.sanishtech.com/u/e3b8e773a8167cc092f7c5bde92a0ce0.png" width="70%" height="370px" style="object-fit:cover;border-radius:16px;" />



![College Finder India](https://img.shields.io/badge/College%20Finder-India-blue?style=for-the-badge&logo=google-scholar&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)

### 🌐 [Live Demo → college-finder-india-three.vercel.app](https://college-finder-india-three.vercel.app/)

*A production-grade college discovery and decision platform built with Next.js, MongoDB & Tailwind CSS*

</div>

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🔍 **College Listing + Search** | Browse 15+ top Indian colleges with real-time search, location & course filters, and pagination |
| 🏫 **College Detail Page** | Deep-dive into any college — fees, courses, placements, cutoff ranks, and top recruiters |
| ⚖️ **Compare Colleges** | Select 2–3 colleges and compare them side-by-side across all key metrics |
| 🔐 **Auth + Saved Items** | Register, login, and bookmark your favourite colleges — all securely stored per user |

---

## 🖥️ Screenshots

<div align="center">

### 🏠 Home — College Listing
![Home Page](https://img.shields.io/badge/Feature-College%20Listing-blue?style=flat-square)

> Search by name, filter by location and course, paginated results with ratings and fees at a glance

---

### 🏫 College Detail Page
![Detail Page](https://img.shields.io/badge/Feature-College%20Detail-purple?style=flat-square)

> Tabbed layout with Overview, Courses, and Placements — dynamic routing with MongoDB IDs

---

### ⚖️ Compare Colleges
![Compare Page](https://img.shields.io/badge/Feature-Compare%20Colleges-orange?style=flat-square)

> Side-by-side comparison table — fees, placement %, rating, avg package, and more

---

### 🔐 Authentication
![Auth Page](https://img.shields.io/badge/Feature-Auth%20%2B%20Saved-green?style=flat-square)

> Secure register/login with bcrypt password hashing and JWT sessions via NextAuth

</div>

---

## 🛠️ Tech Stack

```
Frontend      →  Next.js 16 + TypeScript + Tailwind CSS
Backend       →  Next.js API Routes (REST)
Database      →  MongoDB Atlas + Mongoose
Auth          →  NextAuth.js + bcryptjs
Deployment    →  Vercel (CI/CD via GitHub)
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home — College listing
│   ├── colleges/[id]/page.tsx      # College detail page
│   ├── compare/page.tsx            # Compare colleges
│   ├── login/page.tsx              # Login page
│   ├── register/page.tsx           # Register page
│   ├── saved/page.tsx              # Saved colleges
│   └── api/
│       ├── colleges/route.ts       # GET all colleges (search + filter)
│       ├── colleges/[id]/route.ts  # GET single college
│       ├── auth/[...nextauth]/     # NextAuth handler
│       ├── register/route.ts       # POST register user
│       └── saved/route.ts          # GET/POST saved colleges
├── lib/
│   └── mongodb.ts                  # MongoDB connection
├── models/
│   ├── College.ts                  # College schema
│   └── User.ts                     # User schema
└── scripts/
    └── seed.ts                     # DB seed script (15 colleges)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### Installation

```bash
# Clone the repository
git clone https://github.com/Snehachoudhary26/College-Finder-India.git
cd College-Finder-India

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your MONGODB_URI, NEXTAUTH_SECRET, NEXTAUTH_URL

# Seed the database
npx tsx src/scripts/seed.ts

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌍 Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

---

## 📊 Database Schema

### College
```ts
{
  name, location, state, fees, rating,
  courses[], placementPercentage, avgPackage,
  description, type, established, cutoffRanks{ JEE, NEET, CAT }
}
```

### User
```ts
{
  name, email, password (hashed), savedColleges[]
}
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/colleges` | List colleges with search, filter, pagination |
| `GET` | `/api/colleges/:id` | Get single college by ID |
| `POST` | `/api/register` | Register new user |
| `POST` | `/api/auth/signin` | Login via NextAuth |
| `GET` | `/api/saved` | Get saved colleges |
| `POST` | `/api/saved` | Toggle save/unsave college |

---

## ⚡ Edge Cases Handled

- ✅ Empty search results with friendly UI
- ✅ Loading states on all async operations
- ✅ Invalid college IDs return 404
- ✅ Unauthenticated users redirected to login
- ✅ Duplicate email registration blocked
- ✅ Paginated API to prevent data overload
- ✅ Compare page limited to max 3 colleges

---

<div align="center">

Built with ❤️ using Next.js + MongoDB · *Part of a Full Stack Developer internship assessment*

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-college--finder--india--three.vercel.app-blue?style=for-the-badge)](https://college-finder-india-three.vercel.app/)

</div>
