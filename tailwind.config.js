import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				},
				colorBackgroundMain: {
					DEFAULT: "var(--color-background-main)",
					foreground: "var(--color-background-main-foreground)"
				},
				colorBackgroundSecondary: {
					DEFAULT: "var(--color-background-secondary)",
					foreground: "var(--color-background-secondary-foreground)"
				},
				colorBackgroundThird: {
					DEFAULT: "var(--color-background-third)",
					foreground: "var(--color-background-third-foreground)"
				},
				colorBackgroundGrey: {
					DEFAULT: "var(--color-background-grey)",
					foreground: "var(--color-background-grey-foreground)"
				},
				colorAccentMain: {
					DEFAULT: "var(--color-accent-main)",
					foreground: "var(--color-accent-main-foreground)"
				},
				colorAccentSecondary: {
					DEFAULT: "var(--color-accent-secondary)",
					foreground: "var(--color-accent-secondary-foreground)"
				},
				colorAccentWhiteblack: {
					DEFAULT: "var(--color-accent-whiteblack)",
					foreground: "var(--color-accent-whiteblack-foreground)"
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	},
};

export default config;
