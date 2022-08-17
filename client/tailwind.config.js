const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		screens: {
			xs: '20em',
			sm: '35em',
			md: '48em',
			lg: '64em',
			xl: '80em',
			xxl: '96em',
		},
		colors: {
			transparent: 'transparent',
			blue: colors.blue,
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			red: colors.red,
		},
		extend: {
			keyframes: {
				ripple: {
					'0%': { opacity: 1, transform: 'scale(0)' },
					'100%': { opacity: 0, transform: 'scale(2)' },
				},
			},
		},
	},
};
// require('@tailwindcss/_forms')
