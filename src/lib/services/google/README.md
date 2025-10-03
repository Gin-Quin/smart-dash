# Google OAuth Setup Guide

This module provides minimal Google OAuth authentication to get user email, name, and avatar.

## Setup Instructions

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing one)
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth 2.0 Client ID**
5. Configure the consent screen if prompted
6. Choose **Web application** as the application type
7. Add authorized redirect URIs:
   - Development: `http://localhost:3715/auth/google/callback`
   - Production: `https://yourdomain.com/auth/google/callback`
8. Copy the **Client ID** and **Client Secret**

### 2. Configure Environment Variables

Add these to your `.env` file:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3715/auth/google/callback
```

For production, update `GOOGLE_REDIRECT_URI` to your production URL.

### 3. Enable Required APIs

In Google Cloud Console, enable:
- **Google+ API** (for user profile access)

## Usage

### Frontend: Trigger Login

Add a login button anywhere in your app:

```svelte
<a href="/auth/google">
  <button>Sign in with Google</button>
</a>
```

### OAuth Flow

1. User clicks login → redirects to `/auth/google`
2. User authenticates with Google
3. Google redirects back to `/auth/google/callback`
4. Backend fetches user data: email, name, avatar
5. User is redirected to your app

### Backend: Access User Data

In the callback endpoint (`/auth/google/callback/+server.ts`), you get:

```typescript
const user = await getUserInfo(code);
// user = { email: string, name: string, avatar: string }
```

**TODO**: Implement your own logic to:
- Save user to database
- Create a session/JWT
- Set authentication cookies

## API Reference

### `getAuthorizationUrl(state: string, codeVerifier: string): URL`

Generates the Google OAuth authorization URL.

- **state**: Random string for CSRF protection
- **codeVerifier**: PKCE code verifier for enhanced security
- **Returns**: URL to redirect user to Google login

### `getUserInfo(code: string, codeVerifier: string): Promise<GoogleUser>`

Exchanges authorization code for user information.

- **code**: Authorization code from Google callback
- **codeVerifier**: PKCE code verifier used in authorization
- **Returns**: Object with `{ email, name, avatar }`

### `generateState(): string`

Generates a random state string for CSRF protection.

### `generateCodeVerifier(): string`

Generates a PKCE code verifier for enhanced OAuth security.

### `GoogleUser` Type

```typescript
type GoogleUser = {
  email: string;    // User's email address
  name: string;     // User's full name
  avatar: string;   // URL to user's profile picture
};
```

## Security Notes

- **CSRF Protection**: State parameter validates the callback request
- **PKCE**: Code verifier prevents authorization code interception attacks
- **HttpOnly Cookies**: State and code verifier stored securely
- **Secure Cookies**: Use `secure: true` in production
- **Secret Management**: Never expose Client Secret in frontend code
- **Session Management**: Not included - implement based on your needs

## Next Steps

After getting user data, you should:

1. **Store user in database**:
   ```typescript
   await mainDB.user.upsert({
     where: { email: user.email },
     create: { email: user.email, name: user.name, avatar: user.avatar },
     update: { name: user.name, avatar: user.avatar }
   });
   ```

2. **Create a session**:
   - Use a session library (e.g., `lucia-auth`)
   - Or create your own JWT-based authentication
   - Set secure httpOnly cookies

3. **Protect routes**:
   - Create a middleware to check authentication
   - Redirect unauthorized users to login

## Example: Complete Login Flow

```typescript
// In callback/+server.ts
const user = await getUserInfo(code);

// 1. Save to database
const dbUser = await mainDB.user.upsert({
  where: { email: user.email },
  create: { 
    email: user.email, 
    name: user.name, 
    avatar: user.avatar 
  },
  update: { 
    name: user.name, 
    avatar: user.avatar 
  }
});

// 2. Create session
const sessionId = generateSessionId();
await mainDB.session.create({
  data: {
    id: sessionId,
    userId: dbUser.id,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  }
});

// 3. Set session cookie
cookies.set('session', sessionId, {
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 30 // 30 days
});

// 4. Redirect to app
redirect(302, '/app');
```
