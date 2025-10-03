# Smart-Dash

⚠️ NEVER WRITE TO CLAUDE.md file! It's a symling to AGENTS.md. You should write on AGENTS.md instead. ⚠️

## 🤖 **AI Agent Guidelines**

**IMPORTANT**: Whenever an AI agent makes architectural changes to this project (adding new systems, modifying core infrastructure, changing design patterns, etc.), it **MUST** update this AGENTS.md file with:
- A summary of what was changed
- Why the change was made
- How to use the new system
- Any important technical details

This ensures all agents and developers have up-to-date information about the project architecture.

## 🛠 **Technologies Used**

### **Core Technologies**
- **Svelte 5**: Latest version with runes syntax ($props, reactive declarations)
- **SvelteKit**: Full-stack framework for routing and SSR capabilities
- **TypeScript**: For type safety and better development experience
- **Arctic**: OAuth 2.0 library for handling Google and GitHub authentication

### **Svelte 5 Syntax Guidelines**
- **Event Handlers**: Use `onclick={...}` instead of `on:click={...}` (new Svelte 5 syntax)
  - Example: `<button onclick={() => handleClick()}>Click me</button>`
- **Internationalization (i18n)**: Define component content using the `defineContent` pattern
  - Define content: `const content = defineContent({ en: { ... }})`
  - Access translations: Use the `$` prefix to invoke the store: `$content.myTranslationKey`
  - Example:
    ```svelte
    <script>
    	import { defineContent } from "$lib/i18n/locale";

      const content = defineContent({
        en: { title: "Welcome", subtitle: "Get started" },
      });
    </script>

    <h1>{$content.title}</h1>
    <p>{$content.subtitle}</p>
    ```

### **Styling & UI**
- **TailwindCSS**: Utility-first CSS framework for responsive, modern styling
- **Shadcn-ui**: Component library with pre-built, customizable components
- **Lucide-Svelte**: Beautiful, consistent icon library

### **Key Dependencies**
- **TailwindCSS Classes**: Extensive use for layout, typography, colors, spacing
- **Gradient backgrounds**: Blue-to-purple gradients for modern aesthetic
- **Glass morphism**: Backdrop blur effects for header navigation
- **Responsive breakpoints**: Mobile-first design (sm, md, lg, xl)

## 🧑‍💻 **Code guidelines**

⚠️ IMPORTANT ⚠️

- When using Tailwind classes, use `gap-*` instead of `space-*` for consistent spacing.
- Never use margin, only padding. If you really need margin, then create a parent element with padding instead.
- Use `flex` and `flex-col` for vertical layouts, and `flex-row` for horizontal layouts.
- Never use raw colors like "blue" or "red". Instead, use "neutral", "primary", "secondary", "tertiary", "quaternary", or "quinary". For levels of gray, use neutral. neutral-0 is white, and neutral-1000 is black (inverted for dark mode). Examples: "text-primary" or "bg-secondary-400".
- Use components in `$lib/components`. Never use raw button or input, but rather `<Button>` or `<Input>`.
- For icons, use Lucide icons with `lucide-svelte` library.


## 📁 **File Structure**
```
src/routes/
├── +page.svelte          # Main landing page (implementation)
└── +layout.svelte        # Layout with global style s and favicon
```

## Specs

### Pricing

- A free plan with 1 maximum dashboard
- A premium plan with unlimited dashboards for €12 per month

The core features of smart-dash are available for every plan:

- Query your database using natural language.
- Visualize data with charts and graphs.

## 🎨 **Theme System**

**Toggle theme in any component:**
```svelte
<script>
  import { ThemeToggle } from '$lib/components/ThemeToggle.svelte';
</script>

<ThemeToggle />
```

**Access theme state:**
```svelte
<script>
  import { theme } from '$lib/stores/theme.svelte';
</script>

{#if theme.isDark}
  <p>Dark mode is active</p>
{/if}
```

**Programmatically change theme:**
```svelte
<script>
  import { theme } from '$lib/stores/theme.svelte';

  function switchToLight() {
    theme.setTheme('light');
  }

  function switchToDark() {
    theme.setTheme('dark');
  }
</script>
```

## 🔐 **Google OAuth Authentication System**

**Added**: Minimal Google OAuth 2.0 implementation for SSO authentication

**Why**: To allow users to sign in with Google and retrieve their email, name, and profile picture.

**Location**: `src/lib/services/google/`

### Architecture

The authentication system uses the **Arctic** library for OAuth handling with a simple two-route flow:

1. **Login Route** (`/auth/google`): Initiates OAuth flow
   - Generates CSRF state token
   - Stores state in httpOnly cookie
   - Redirects to Google authorization

2. **Callback Route** (`/auth/google/callback`): Handles OAuth response
   - Validates state token (CSRF protection)
   - Exchanges code for access token
   - Fetches user info (email, name, avatar)
   - Returns `GoogleUser` object

### Required Environment Variables

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3715/auth/google/callback
```

### Usage

**Trigger login from any component:**
```svelte
<a href="/auth/google">
  <button>Sign in with Google</button>
</a>
```

**Access user data in callback:**
```typescript
import { getUserInfo } from "$lib/services/google/index.remote";

const user = await getUserInfo(code);
// Returns: { email: string, name: string, avatar: string }
```

### API Functions

- `getAuthorizationUrl(state: string): URL` - Generates Google OAuth URL
- `getUserInfo(code: string): Promise<GoogleUser>` - Fetches user data from Google

### Security Features

- CSRF protection via state parameter
- HttpOnly cookies for state storage
- Secure cookies in production
- 10-minute state expiration

### Important Notes

⚠️ **The callback endpoint currently does NOT include**:
- Database user storage
- Session management
- Authentication cookies

You must implement these yourself based on your needs. See `src/lib/services/google/README.md` for complete implementation examples.

### Setup Guide

Full setup instructions available at: `src/lib/services/google/README.md`

## 🔐 **GitHub OAuth Authentication System**

**Added**: Minimal GitHub OAuth 2.0 implementation for SSO authentication

**Why**: To allow users to sign in with GitHub and retrieve their email, name, and profile picture.

**Location**: `src/lib/services/github/`

### Architecture

The authentication system uses the **Arctic** library for OAuth handling with a simple two-route flow:

1. **Login Route** (`/auth/github`): Initiates OAuth flow
   - Generates CSRF state token
   - Stores state in httpOnly cookie
   - Redirects to GitHub authorization

2. **Callback Route** (`/auth/github/callback`): Handles OAuth response
   - Validates state token (CSRF protection)
   - Exchanges code for access token
   - Fetches user info (email, name, avatar)
   - Handles private emails by fetching from separate endpoint
   - Returns `GitHubUser` object

### Required Environment Variables

```env
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
```

**Note**: GitHub doesn't require a redirect URI in the client initialization - it's configured in your GitHub OAuth App settings.

### Usage

**Trigger login from any component:**
```svelte
<a href="/auth/github">
  <button>Sign in with GitHub</button>
</a>
```

**Access user data in callback:**
```typescript
import { getUserInfo } from "$lib/services/github/getUserInfo";

const user = await getUserInfo(code);
// Returns: { email: string, name: string, picture: string }
```

### API Functions

- `getAuthorizationUrl(state: string): URL` - Generates GitHub OAuth URL
- `getUserInfo(code: string): Promise<GitHubUser>` - Fetches user data from GitHub

### Security Features

- CSRF protection via state parameter
- HttpOnly cookies for state storage
- Secure cookies in production
- 10-minute state expiration
- Handles private GitHub emails by fetching from `/user/emails` endpoint

### Important Notes

⚠️ **GitHub-specific considerations**:
- GitHub users can set their email as private, so the system fetches from the `/user/emails` endpoint if needed
- Prioritizes primary verified email, falls back to first verified email, then any email
- User's display name falls back to their GitHub username if no name is set

### Implementation Details

The GitHub SSO follows the same pattern as Google OAuth:
- Database user upsert based on email
- Session creation using `createSession` service
- Session token stored in localStorage and redirects to `/app`
