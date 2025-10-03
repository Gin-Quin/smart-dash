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

## 🧑‍💻 **Code guidelines**

- When using Tailwind classes, use `gap-*` instead of `space-*` for consistent spacing.
- Use `flex` and `flex-col` for vertical layouts, and `flex-row` for horizontal layouts.

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
