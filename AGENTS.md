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

## 📁 **File Structure**
```
src/routes/
├── +page.svelte          # Main landing page (implementation)
└── +layout.svelte        # Layout with global style s and favicon
```

## 🎨 **Design Features Implemented**

### **Header Navigation**
- Fixed positioning with scroll behavior
- Glass morphism effect with backdrop blur
- Responsive menu with mobile optimization
- Gradient logo and branding
- Hover state animations

### **Hero Section**
- Gradient background overlay
- AI-powered badge with sparkles icon
- Large headline with gradient text effect
- Call-to-action buttons with icons
- Dashboard preview placeholder

### **Features Grid**
- Three feature cards with icons
- Hover effects and shadow transitions
- Color-coded feature highlights (Blue, Purple, Green)
- Icon-based visual representations

### **How It Works Section**
- Step-by-step process illustration
- Alternating content layout
- Icon-based visual cues
- Clean, professional styling

### **Call-to-Action Section**
- Full-width gradient background
- Prominent CTA buttons
- Supporting descriptive text

### **Footer**
- Multi-column layout
- Social media integration
- Navigation links
- Copyright notice

## 🔧 **Technical Implementation**

### **Component Usage**
- **Button components**: Primary and secondary CTAs with different variants
- **Icon integration**: ArrowRight, Database, Sparkles, BarChart3, etc.
- **Responsive design**: Mobile-first approach with breakpoints
- **CSS animations**: Hover transitions and smooth interactions

### **Styling Approach**
- **Tailwind utility classes**: Extensive use for rapid development
- **Gradient effects**: Blue-purple color scheme throughout
- **Spacing system**: Consistent padding and margins
- **Typography hierarchy**: H1-H2 headings with proper sizing
- **Color tokens**: Use `text-neutral-1000` / `bg-neutral-1000` instead of black, and `text-neutral-0` / `bg-neutral-0` instead of white for theme-aware colors

### **Accessibility Features**
- Semantic HTML structure
- Proper heading hierarchy
- Contrast ratios for text readability
- Keyboard-navigable links

## 🚀 **Performance Considerations**
- Minimal external dependencies
- Lightweight SVG icons from Lucide
- Efficient CSS with utility classes
- No heavy animations or scripts

## 📱 **Responsive Design**
- Mobile-first approach
- Flexible grid layouts
- Scalable typography
- Adaptive spacing

## Specs

### Pricing

- A free plan with 1 maximum dashboard
- A premium plan with unlimited dashboards for €12 per month

The core features of smart-dash are available for every plan:

- Query your database using natural language.
- Visualize data with charts and graphs.

## 🎨 **Theme System**

### **Color Scheme**
The application uses a carefully crafted color scheme:
- **Primary Color**: Blue (`oklch(0.55 0.18 250)` in light mode, `oklch(0.65 0.2 250)` in dark mode)
- **Secondary Color**: Purple (`oklch(0.6 0.2 290)` in light mode, `oklch(0.68 0.22 290)` in dark mode)

### **Dark Theme Support**
The application fully supports both light and dark themes with:
- Automatic detection of system theme preferences
- Manual theme toggle capability
- Theme persistence in localStorage
- FOUC (Flash of Unstyled Content) prevention

### **Theme Implementation**

#### **Color Variables** (`src/app.css`)
All colors are defined using CSS custom properties with OKLCH color space for better perceptual uniformity:
- Light theme colors defined in `:root`
- Dark theme colors defined in `.dark` class
- Separate color values for optimal contrast in each theme

#### **Theme Store** (`src/lib/stores/theme.svelte.ts`)
A Svelte 5 reactive store that manages theme state:
- Uses `$state` rune for reactivity
- Automatically detects system theme preference on first load
- Persists user's theme choice in localStorage
- Provides methods: `theme.current`, `theme.isDark`, `theme.setTheme()`, `theme.toggle()`
- Listens to system theme changes when no manual preference is set

#### **Theme Toggle Component** (`src/lib/components/ThemeToggle.svelte`)
A reusable button component for switching themes:
- Shows Sun icon in dark mode, Moon icon in light mode
- Uses accessible button with proper aria-label
- Can be placed anywhere in the application
- Usage: `<ThemeToggle class="your-classes" />`

#### **FOUC Prevention** (`src/app.html`)
Inline script in HTML head that:
- Runs before page render
- Checks localStorage and system preferences
- Applies dark class to `<html>` element immediately
- Prevents theme flash on page load

### **Using the Theme System**

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
