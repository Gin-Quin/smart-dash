# Theme System Usage Guide

This guide explains how to use the theme system in Smart-Dash.

## Overview

Smart-Dash uses a robust theme system with support for both light and dark modes. The theme system is built with:
- **OKLCH color space** for perceptually uniform colors
- **CSS custom properties** for easy theming
- **Svelte 5 reactive stores** for state management
- **LocalStorage persistence** for user preferences
- **System preference detection** for automatic theme selection

## Color Palette

### Primary Color (Blue)
- Light mode: `oklch(0.55 0.18 250)`
- Dark mode: `oklch(0.65 0.2 250)`

### Secondary Color (Purple)
- Light mode: `oklch(0.6 0.2 290)`
- Dark mode: `oklch(0.68 0.22 290)`

## Quick Start

### 1. Adding Theme Toggle to Your Component

```svelte
<script lang="ts">
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<ThemeToggle />
```

You can customize the appearance with Tailwind classes:

```svelte
<ThemeToggle class="ml-4 hover:bg-accent" />
```

### 2. Accessing Theme State

```svelte
<script lang="ts">
  import { theme } from '$lib/stores/theme.svelte';
</script>

<div>
  <p>Current theme: {theme.current}</p>
  <p>Is dark mode: {theme.isDark}</p>
</div>
```

### 3. Reacting to Theme Changes

```svelte
<script lang="ts">
  import { theme } from '$lib/stores/theme.svelte';
</script>

{#if theme.isDark}
  <p>🌙 Dark mode is active</p>
{:else}
  <p>☀️ Light mode is active</p>
{/if}
```

### 4. Programmatically Changing Theme

```svelte
<script lang="ts">
  import { theme } from '$lib/stores/theme.svelte';

  function toggleTheme() {
    theme.toggle();
  }

  function setLightTheme() {
    theme.setTheme('light');
  }

  function setDarkTheme() {
    theme.setTheme('dark');
  }
</script>

<button onclick={toggleTheme}>Toggle Theme</button>
<button onclick={setLightTheme}>Light</button>
<button onclick={setDarkTheme}>Dark</button>
```

## Using Theme Colors in Components

### With Tailwind Classes

All color variables are available through Tailwind utilities:

```svelte
<div class="bg-primary text-primary-foreground">
  Primary colored box
</div>

<div class="bg-secondary text-secondary-foreground">
  Secondary colored box
</div>

<div class="bg-card text-card-foreground border border-border">
  Card with proper theming
</div>
```

### With CSS Variables

You can also use CSS variables directly:

```svelte
<div style="background-color: var(--color-primary); color: var(--color-primary-foreground);">
  Custom styled element
</div>
```

### Available Color Variables

- `background` / `foreground` - Page background and text
- `primary` / `primary-foreground` - Primary actions and buttons
- `secondary` / `secondary-foreground` - Secondary actions
- `muted` / `muted-foreground` - Subtle backgrounds
- `accent` / `accent-foreground` - Highlighted elements
- `destructive` - Error states
- `border` - Border colors
- `input` - Form input borders
- `ring` - Focus rings
- `card` / `card-foreground` - Card backgrounds
- `popover` / `popover-foreground` - Popover backgrounds
- `chart-1` through `chart-5` - Chart colors

## Advanced Usage

### Custom Theme Aware Components

Create components that adapt to the theme:

```svelte
<script lang="ts">
  import { theme } from '$lib/stores/theme.svelte';

  let { title } = $props<{ title: string }>();
</script>

<div class="p-4 rounded-lg transition-colors duration-200
  {theme.isDark ? 'bg-gray-800' : 'bg-gray-100'}">
  <h2>{title}</h2>
</div>
```

### Theme-Specific Images

```svelte
<script lang="ts">
  import { theme } from '$lib/stores/theme.svelte';
  import logoDark from '$lib/assets/logo-dark.svg';
  import logoLight from '$lib/assets/logo-light.svg';
</script>

<img
  src={theme.isDark ? logoDark : logoLight}
  alt="Logo"
/>
```

### Conditional Rendering Based on Theme

```svelte
<script lang="ts">
  import { theme } from '$lib/stores/theme.svelte';
</script>

{#if theme.isDark}
  <!-- Dark mode specific content -->
  <div class="dark-mode-visualization">
    <!-- Complex visualization optimized for dark backgrounds -->
  </div>
{:else}
  <!-- Light mode specific content -->
  <div class="light-mode-visualization">
    <!-- Complex visualization optimized for light backgrounds -->
  </div>
{/if}
```

## System Behavior

### Theme Persistence
- User's theme choice is saved in `localStorage` under the key `'theme'`
- Theme persists across page reloads and browser sessions
- Clearing localStorage will reset to system preference

### System Preference Detection
- On first visit (no localStorage), the app detects the system theme preference
- The app listens for system theme changes and updates automatically (only if user hasn't set a manual preference)
- Manual theme selection overrides system preference

### FOUC Prevention
- An inline script in `app.html` applies the theme before the page renders
- This prevents the "flash" of wrong theme on page load
- Critical for good user experience

## Testing Theme Changes

### In Development

1. Use the ThemeToggle button in your UI
2. Check browser DevTools → Application → Local Storage to see the stored theme
3. Use browser DevTools → Elements to verify the `.dark` class on `<html>` element

### Testing System Preference

1. Clear localStorage: `localStorage.removeItem('theme')`
2. Change your OS theme settings
3. Reload the page - it should match your OS theme
4. The app will continue to follow OS theme changes until you manually select a theme

### Testing Persistence

1. Set a theme using the toggle
2. Reload the page
3. Theme should remain the same
4. Close and reopen the browser
5. Theme should still be preserved

## Best Practices

1. **Always use semantic color variables** instead of hardcoded colors
   - ✅ `class="text-foreground bg-background"`
   - ❌ `class="text-neutral-900 bg-neutral-0"`

2. **Use theme-aware Tailwind utilities** for conditional styling
   - ✅ `class="dark:bg-neutral-800 bg-neutral-0"`
   - ⚠️ Prefer semantic variables when possible

3. **Test both themes** during development
   - Toggle between themes frequently
   - Ensure all components look good in both modes

4. **Consider contrast ratios** for accessibility
   - Dark theme colors are specifically adjusted for readability
   - Don't override with custom colors that may have poor contrast

5. **Use the ThemeToggle component** instead of building your own
   - Maintains consistency across the app
   - Includes proper accessibility features
   - Can be styled with Tailwind classes

## Troubleshooting

### Theme not persisting
- Check browser console for errors
- Verify localStorage is not disabled
- Check if localStorage quota is exceeded

### Flash of wrong theme on load
- Verify the inline script in `app.html` is present
- Check browser console for JavaScript errors
- Ensure the script runs before `%sveltekit.head%`

### Theme toggle not working
- Verify `ThemeToggle` component is imported correctly
- Check that theme store is initialized in root layout
- Look for JavaScript errors in browser console

### Colors not updating
- Ensure you're using the correct CSS variable format: `var(--color-primary)`
- Check that Tailwind is configured to use the theme variables
- Verify the `.dark` class is being applied to `<html>` element

## File Structure

```
src/
├── app.css                          # Theme color definitions
├── app.html                         # FOUC prevention script
├── lib/
│   ├── components/
│   │   └── ThemeToggle.svelte      # Theme toggle button
│   └── stores/
│       └── theme.svelte.ts         # Theme state management
└── routes/
    └── +layout.svelte               # Theme store initialization
```

## API Reference

### Theme Store

```typescript
interface ThemeStore {
  // Current theme ('light' | 'dark')
  current: 'light' | 'dark';

  // Boolean indicating if dark mode is active
  isDark: boolean;

  // Set specific theme
  setTheme(theme: 'light' | 'dark'): void;

  // Toggle between light and dark
  toggle(): void;
}
```

### ThemeToggle Component

```typescript
interface ThemeToggleProps {
  // Optional CSS classes
  class?: string;
}
```

## Examples

### Custom Theme Switcher Dropdown

```svelte
<script lang="ts">
  import { theme } from '$lib/stores/theme.svelte';
  import { Sun, Moon, Monitor } from 'lucide-svelte';
</script>

<select
  value={theme.current}
  onchange={(e) => theme.setTheme(e.currentTarget.value)}
  class="px-3 py-2 border rounded-lg"
>
  <option value="light">☀️ Light</option>
  <option value="dark">🌙 Dark</option>
</select>
```

### Animated Theme Transition

```svelte
<script lang="ts">
  import { theme } from '$lib/stores/theme.svelte';
</script>

<div class="transition-all duration-300 ease-in-out
  {theme.isDark ? 'bg-gray-900 text-white' : 'bg-neutral-0 text-gray-900'}">
  Content with smooth theme transitions
</div>
```

### Theme-Aware Chart

```svelte
<script lang="ts">
  import { theme } from '$lib/stores/theme.svelte';
  import { Chart } from '$lib/components/Chart.svelte';

  // Reactive colors based on theme
  let chartColors = $derived({
    primary: theme.isDark ? '#60A5FA' : '#3B82F6',
    secondary: theme.isDark ? '#A78BFA' : '#8B5CF6',
    grid: theme.isDark ? '#374151' : '#E5E7EB',
  });
</script>

<Chart colors={chartColors} />
```

## Migration Guide

If you have existing components with hardcoded colors:

### Before:
```svelte
<div class="bg-blue-500 text-white">
  Button
</div>
```

### After:
```svelte
<div class="bg-primary text-primary-foreground">
  Button
</div>
```

This ensures your components automatically adapt to both light and dark themes.
