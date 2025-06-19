
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#4A90E2',
					50: '#E8F2FF',
					100: '#D1E6FF',
					200: '#A3CCFF',
					300: '#75B3FF',
					400: '#4A90E2',
					500: '#2E7BD6',
					600: '#1F5FAD',
					700: '#154584',
					800: '#0C2B5B',
					900: '#051132',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#50E3C2',
					50: '#E8FDF9',
					100: '#D1FAF3',
					200: '#A3F5E7',
					300: '#75F0DB',
					400: '#50E3C2',
					500: '#2BD6A9',
					600: '#1FAB87',
					700: '#158065',
					800: '#0A5543',
					900: '#032A21',
					foreground: '#FFFFFF'
				},
				destructive: {
					DEFAULT: '#FF6B6B',
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: '#F5F7FA',
					foreground: '#6B7280'
				},
				accent: {
					DEFAULT: '#F8FAFC',
					foreground: '#1F2937'
				},
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#1F2937'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				'arabic': ['Tajawal', 'IBM Plex Arabic', 'Cairo', 'Arial', 'sans-serif'],
				'sans': ['Tajawal', 'Inter', 'system-ui', 'sans-serif']
			},
			borderRadius: {
				lg: '12px',
				md: '8px',
				sm: '6px'
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-up': 'slide-up 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
