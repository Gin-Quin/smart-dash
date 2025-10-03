# Google OAuth Quick Start

Get users authenticated with Google in 5 minutes.

## 1. Get Google Credentials

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create/select project → **APIs & Services** → **Credentials**
3. Click **Create Credentials** → **OAuth 2.0 Client ID**
4. Application type: **Web application**
5. Add redirect URI: `http://localhost:3715/auth/google/callback`
6. Copy **Client ID** and **Client Secret**

## 2. Configure Environment

Add to `.env`:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3715/auth/google/callback
```

## 3. Add Login Button

```svelte
<script>
  import GoogleLoginButton from '$lib/components/GoogleLoginButton.svelte';
</script>

<GoogleLoginButton />
```

Or use a simple link:

```svelte
<a href="/auth/google">Sign in with Google</a>
```

## 4. Done! 🎉

When users click the button:
- They'll authenticate with Google
- Redirect to `/auth/google/callback`
- You'll receive: `{ email, name, avatar }`

## What's Next?

The callback currently redirects to `/app` with user email in URL (not secure).

**You need to implement**:
1. Save user to database
2. Create session/JWT
3. Set auth cookies

See `src/lib/services/google/README.md` for complete examples.

## File Structure

```
src/
├── lib/
│   ├── services/google/
│   │   ├── index.remote.ts          # OAuth functions
│   │   └── README.md                # Full documentation
│   └── components/
│       └── GoogleLoginButton.svelte # Ready-to-use button
└── routes/
    └── auth/
        ├── google/
        │   ├── +server.ts           # Login endpoint
        │   └── callback/
        │       └── +server.ts       # Callback handler
        └── error/
            └── +page.svelte         # Error page
```

## Troubleshooting

**Error: Missing environment variables**
- Make sure all three env vars are set in `.env`

**Error: redirect_uri_mismatch**
- Add your exact redirect URI to Google Cloud Console
- URI must match exactly (including protocol and port)

**Error: invalid_client**
- Double-check your Client ID and Secret
- Ensure no extra spaces in `.env` file

## Security

✅ CSRF protection (state parameter)  
✅ PKCE (code verifier)  
✅ HttpOnly cookies  
⚠️ Session management not included (implement yourself)