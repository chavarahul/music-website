Music Streaming Web App
A modern music streaming web application built with React, featuring a micro frontend architecture using Webpack Module Federation, role-based authentication (Admin/User), and deployed on Vercel. The app uses localStorage for persistent auth and song management.
🌐 Live Applications

Main Shell App: music-website-main.vercel.app
Micro Frontend (Library): music-library-mfe.vercel.app

📦 How to Run Locally
✅ 1. Clone or Download
git clone https://github.com/chavarahul/music-website.git

Or download the ZIP and extract it.

✅ 2. Setup Main App
cd music-library-main
npm install
npm run dev

Open: http://localhost:3000

The main app automatically fetches the remote micro frontend via Module Federation.
🔐 Login Credentials (Demo)



Role
Username
Password



Admin
Admin
Admin@123


User
Test
Test@123


You can also sign up with your own credentials as a User. Admin access is hardcoded.
🧩 Micro Frontend Architecture
This app uses Webpack Module Federation for independent micro frontend loading.
🏠 Main Shell App (Host)
Loads the remote MusicLibrary from the micro app.
Configuration:
remotes: {
  music_library: "music_library@https://music-library-mfe.vercel.app/remoteEntry.js"
}

🎧 Micro Frontend App (Music Library)
Exposes the MusicLibrary component.
Configuration:
exposes: {
  './MusicLibrary': './src/components/MusicLibrary'
}

On login, the user is redirected to the Home route, where the remote MusicLibrary component is lazy-loaded using React.Suspense.
🔐 Role-Based Authentication (Admin/User)
Implemented using AuthContext and localStorage.

JWT-like tokens: Base64-encoded JSON with iat, exp, username, and role.
Auto logout: Triggers on token expiry.
Context API: Manages login, logout, and signup.

🔑 Access Rules

Admin:
Can add/delete songs.
View only admin-added songs.


User:
Can view both default and admin-added songs.
Cannot add/delete songs.



🎵 Features in Music Library (Micro App)

✅ View all songs (filtered, grouped, sorted).
✅ Add songs (Admin only).
✅ Delete songs (Admin only).
✅ Search by title, artist, album.
✅ Group by genre or artist.
✅ Sort by title, artist, album, or genre.
✅ Responsive and interactive UI with Tailwind CSS.

🧠 Tech Stack



Feature
Stack/Library



Frontend Framework
React.js


Micro Frontend
Webpack Module Federation


Routing & Suspense
React Router DOM, lazy


UI & Styling
Tailwind CSS


Authentication
Context API + localStorage


Deployment
Vercel


