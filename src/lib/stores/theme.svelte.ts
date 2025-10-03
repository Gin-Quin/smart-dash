import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

class ThemeState {
	private _theme = $state<Theme>('light');

	constructor() {
		if (browser) {
			// Check localStorage first
			const stored = localStorage.getItem('theme') as Theme | null;

			// Check system preference if no stored value
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

			this._theme = stored || (prefersDark ? 'dark' : 'light');
			this.applyTheme(this._theme);

			// Listen for system theme changes
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
				if (!localStorage.getItem('theme')) {
					this.setTheme(e.matches ? 'dark' : 'light');
				}
			});
		}
	}

	get current(): Theme {
		return this._theme;
	}

	get isDark(): boolean {
		return this._theme === 'dark';
	}

	setTheme(theme: Theme) {
		this._theme = theme;
		if (browser) {
			localStorage.setItem('theme', theme);
			this.applyTheme(theme);
		}
	}

	toggle() {
		this.setTheme(this._theme === 'light' ? 'dark' : 'light');
	}

	private applyTheme(theme: Theme) {
		if (browser) {
			const root = document.documentElement;
			if (theme === 'dark') {
				root.classList.add('dark');
			} else {
				root.classList.remove('dark');
			}
		}
	}
}

export const theme = new ThemeState();
