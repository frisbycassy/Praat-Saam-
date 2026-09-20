# Praat Saam! - Leer Afrikaans

A gamified website to help Grade 4 learners practise Afrikaans First
Additional Language (CAPS-aligned), with levels, badges and everyday
lessons. Every screen shows Afrikaans first, with an English translation
underneath.

## Running it on your own computer

1. Open a terminal in this folder.
2. Install the project's dependencies (only needed once, or after pulling
   new changes that add a package):

   ```bash
   npm install
   ```

3. Start the local development server:

   ```bash
   npm run dev
   ```

4. Open the web address it prints (usually `http://localhost:5173`) in
   your browser.

## Project structure

- `src/pages` - one file per screen (Welcome, Login, Dashboard, Lesson...)
- `src/components` - small reusable pieces (Button, Card, BilingualText...)
- `src/data` - the CAPS curriculum map, lesson content, badges and levels
- `src/context` - shared app state (who's logged in, points/badges/streak)
- `src/lib/supabaseClient.js` - connection to the login/database service
  (not yet configured - see project notes)

## Current status

Login and progress-saving currently use the browser's local storage as a
placeholder, so the whole app is testable without any account setup.
Swapping this for real accounts (via Supabase) is a planned next step.
