# 3D Interactive Web Developer Portfolio

A cutting-edge, highly interactive personal portfolio built with Next.js, Framer Motion, and Tailwind CSS. The entire application is immersed in a dynamic 3D spatial environment where elements react to user interactions, making it stand out to recruiters and clients.

## ✨ Features

- **Global 3D Mouse Tracking**: The entire page perspective dynamically shifts based on your mouse movements using Framer Motion springs.
- **Glassmorphic UI & Cybernetics Aesthetics**: Neumorphic elements, glowing cyber-teal/purple accents, and deep dark modes for a premium feel.
- **Dynamic Projects & Certificates**: Data is fetched in real-time from Firebase Firestore, with beautifully animated 3D tilt cards.
- **Custom Admin Uploader**: A built-in floating terminal built for fast `addDoc` operations directly from the site. No need to visit the Firebase Console to add new achievements!
- **Interactive Contact Form**: Fully functional and validates inputs before submitting securely to Firestore.
- **Optimized Performance**: Built on Next.js App Router for optimal speed, zero-flicker rendering, and complete SEO readiness.

## 💻 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS, PostCSS
- **Animations**: Framer Motion
- **Database Backend**: Firebase Firestore

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. **Clone the repository** (if applicable) and navigate to the project root:
   ```bash
   cd e:\portfolio\mypage
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   *or*
   ```bash
   yarn install
   ```

3. **Configure Firebase**:
   Create a `.env.local` file in the root of your project and add your Firebase project keys:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open** `http://localhost:3000` in your browser.

## 🛠️ Database Collections

The portfolio uses the following Firestore collections:
- `projects`: Structure includes `title`, `desc`, `tags`, `githubUrl`, `demoUrl`, `icon`, `bgGradient`.
- `certificates`: Structure includes `title`, `issuer`, `date`, `fileUrl`.
- `contacts`: Structure includes `name`, `email`, `subject`, `message`, `status`, `createdAt`.

**Note on Sorting**: When adding items via the Firebase Console manually, they will instantly appear. The data fetches prioritize displaying content asynchronously.

## 📝 Usage & Admin Dashboard

Click the floating terminal button (bottom-left corner) to activate the **Sys_addDoc()** terminal interface. Through this modal, you can easily upload new `projects` or `certificates` directly into Firestore without ever leaving your site.
