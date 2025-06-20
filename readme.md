Music Streaming Web App

A music streaming web app built with React, using a micro frontend setup with Webpack Module Federation, role-based authentication (Admin/User), and deployed on Vercel.

Live Applications
- Main Shell App: https://music-website-main.vercel.app
- Micro Frontend (Library): https://music-library-mfe.vercel.app

How to Run Locally

1. Clone or Download
   git clone https://github.com/chavarahul/music-website.git
   Or download the ZIP and extract it.

2. Setup Main App
   cd music-library-main
   npm install
   npm run dev
   Open: http://localhost:3000

   The main app loads the micro frontend automatically.

Login Credentials (Demo)
| Role  | Username | Password    |
|-------|----------|-------------|
| Admin | Admin    | Admin@123   |
| User  | Test     | Test@123    |

You can sign up as a User with your own credentials. Admin login uses the above credentials.

Micro Frontend Architecture

The app uses Webpack Module Federation to split the music library into a separate micro frontend, allowing independent updates.

Main Shell App (Host)
Loads the MusicLibrary component from the micro frontend.

Configuration:
remotes: {
  music_library: "music_library@https://music-library-mfe.vercel.app/assets/remoteEntry.js"
}

How It Works:
- The main app (host) loads the micro frontend's MusicLibrary component.
- On login, the Home page lazy-loads MusicLibrary with a loading spinner.
- Code: Home.jsx checks for a valid token and redirects to /auth if not logged in.

Micro Frontend App (Music Library)
Exposes the MusicLibrary component.

Configuration:
exposes: {
  './MusicLibrary': './src/MusicLibrary.jsx'
}

How It Works:
- Hosted at https://music-library-mfe.vercel.app.
- The MusicLibrary component (App.jsx) renders the SongList component, which handles song display and admin actions.
- It receives the currentUser from the host to manage role-based features.

Role-Based Authentication (Admin/User)

Authentication uses React Context API and localStorage to manage Admin and User roles with tokens.

How It Works:
- Login:
  - Admin: Uses hardcoded credentials (Admin/Admin@123).
  - User: Checks credentials in localStorage or allows signup.
  - Creates a base64-encoded token with username, role, issued time, and expiry (60 hours).
- Signup: Adds new users to localStorage and logs them in.
- Logout: Clears token and user data.
- Token Check: Validates tokens on load; expired tokens trigger logout.
- Code: AuthContext.js manages login, signup, logout, and stores tokens in localStorage.

Access Rules
- Admin: Can add/delete songs, sees only admin-added songs.
- User: Can view all songs (default + admin-added), cannot add/delete.

Features in Music Library (Micro App)
- View songs with search, sort, and group options.
- Search by title, artist, or album.
- Sort by title, artist, album, or genre.
- Group by genre or artist.
- Add songs (Admin only) via a modal.
- Delete songs (Admin only) with confirmation.
- Responsive UI with Tailwind CSS.
- Code: SongList.jsx manages song data, filters, and admin actions, storing admin-added songs in localStorage.

Tech Stack
| Feature                | Stack/Library                     |
|------------------------|-----------------------------------|
| Frontend Framework     | React.js                          |
| Micro Frontend         | Webpack Module Federation         |
| Routing & Suspense     | React Router DOM, lazy            |
| UI & Styling           | Tailwind CSS                      |
| Authentication         | Context API + localStorage        |
| Deployment             | Vercel                            |
