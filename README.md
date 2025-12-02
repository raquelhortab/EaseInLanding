# Ease In - Landing Page

A modern landing page for the Ease In app built with React and Vite.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**

   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set your email address:
   ```
   VITE_WAITLIST_EMAIL=your-email@example.com
   ```

3. **Add your app screenshot:**

   Place your app screenshot image as `public/screenshot.png`

   You can create the public directory:
   ```bash
   mkdir public
   ```

   Then copy your screenshot:
   ```bash
   cp /path/to/your/screenshot.png public/screenshot.png
   ```

## Development

Run the development server:

```bash
npm run dev
```

Open your browser to the URL shown in the terminal (usually http://localhost:5173)

## Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Features

- **Coming Soon message** - Clean hero section announcing the app
- **App screenshot** - Visual preview of your app (with fallback placeholder)
- **Waitlist button** - Opens user's email client with pre-filled waitlist signup message
- **Multiple pages** - Built-in routing with React Router
- **Download page** - Dedicated page for app downloads (iOS, Android, Desktop)
- **Responsive design** - Works beautifully on desktop and mobile
- **Modern gradient background** - Eye-catching purple gradient design
- **Smooth animations** - Fade-in animations for a polished experience

## Pages

The landing page includes multiple routes:

- `/` - Home page with coming soon message and waitlist signup
- `/download` - Download page with invite code verification system

## Invite Code System

The download page uses an invite code verification system to control access to your app downloads. This provides a secure way to distribute your app during beta or early access phases.

### How It Works

1. Users enter an invite code on the `/download` page
2. The code is hashed and checked against your stored codes
3. If valid, the URLs are decrypted and download buttons appear
4. Users can download for iOS and Android

### Generating New Invite Codes

The helper script reads from your `.env` file to generate all invite codes at once.

1. **Configure your `.env` file** with:
   ```bash
   # Download URLs (same for all codes)
   ANDROID_URL=https://play.google.com/store/apps/details?id=com.easein
   IOS_URL=https://apps.apple.com/app/easein/id123456789

   # Comma-separated invite codes
   CODES=LAUNCH_PARTY_RIKI,VIP_ACCESS_2024,BETA_TESTER_2024
   ```

2. **Run the generator script**:
   ```bash
   node generate-invite-code.js
   ```

3. **Copy the output** into `src/components/InviteCodeGate.jsx` in the `INVITE_DATA` object.

The script will generate encrypted data for all your codes at once, using the same URLs for everyone.

### Security Features

- **Hashed codes**: Only hashes are stored in your code (safe to commit to git)
- **Encrypted URLs**: Download URLs are encrypted using the original invite code as the key
- **Client-side validation**: No backend needed for basic invite code verification
- **Revocable access**: Remove a code's hash from `INVITE_DATA` to revoke access

## Customization

You can customize the landing page by editing:

- `src/App.jsx` - Router configuration and layout structure
- `src/pages/Home.jsx` - Home page content
- `src/pages/Download.jsx` - Download page content
- `src/App.css` - Styling and colors
- `.env` - Email address for waitlist signups
