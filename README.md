# MovieTime

Welcome to **MovieTime**! This is the final project for Module 4 of HerTech and CodeSpace JavaScript Bootcamp, created by Alejandra, Carol, Sintra, and Tracy.

## Description

MovieTime is a web application that allows users to explore movies currently playing, search by title or genre, mark favorites, and manage their personal profile. The project uses The Movie Database (TMDB) API to fetch up-to-date movie information.

## Main Features

- **User authentication**: Sign up, login, and logout.
- **Profile management**: Edit personal data, change avatar, and select island of residence.
- **Movie listing**: View movies now playing, search by title, and filter by genre.
- **Favorites**: Add or remove favorite movies, sync with backend, and view in profile.
- **Movie details**: Technical information, genres, overview, budget, revenue, and more.
- **Responsive design**: Mobile-first, adapted for mobile and desktop devices.

## Technologies Used

- **Frontend**: JavaScript (ES Modules), HTML5, CSS3 (mobile-first, variables, custom fonts)
- **Framework**: Vite
- **Libraries**: [Toastify-js](https://github.com/apvarun/toastify-js) for notifications
- **APIs**:
  - [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api) for movies info.
  - [MockAPI](https://mockapi.io/) for users and favorites

## Installation & Usage

1. Clone this repository:
   ```bash
   git clone https://github.com/Dubiduby/proyecto-finalmod4.git
   cd proyecto-finalmod4
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root and add your TMDB API key:
   ```env
   VITE_API_KEY=your_tmdb_api_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Environment Variables

- `VITE_API_KEY`: Your TMDB API key. Required for the app to work.

## Project Structure

```
proyecto-finalmod4/
├── index.html
├── package.json
├── src/
│   ├── api/           # API connection logic
│   ├── assets/        # Images, fonts, and CSS styles
│   ├── utils/         # Utilities and helpers
│   ├── views/         # Main views (home, login, signup, profile, movieDetail)
│   ├── main.js        # Main entry point
│   └── router.js      # SPA routing
└── ...
```

## Team

- Alejandra
- Carol
- Sintra
- Tracy

## Project management

Trello — for task planning and tracking (Kanban method)
Discord — for team communication

## License

This project is for educational purposes only.
