import {
	defineConfig,
	presetAttributify,
	presetTypography,
	presetWind,
	transformerDirectives
} from 'unocss';

import RadixColors from './radix-colors-tailwind';

// https://github.com/unocss/unocss
// https://github.com/unocss/unocss/blob/main/packages/preset-mini/src/_theme/colors.ts

const config = defineConfig({
	presets: [
		presetWind(),
		presetAttributify({}), // not working
		// https://github.com/unocss/unocss/blob/6a81c62a7603606b117cdc9c02447b8ec1bac4fc/packages/preset-typography/src/preflights/default.ts#L27
		presetTypography({
      cssExtend: {
				'h1,h2,h3,h4,h5,h6': {
					color: 'var(--un-prose-headings)',
					'font-weight': '600',
					'line-height': 1.35,
				},
				'p,ul,ol,pre': {
					margin: '0.5em 0',
					'line-height': 1.25,
				},
				blockquote: {
					margin: '1em 0',
				},
				h1: {
					margin: '0.5rem 0', // h1 is always at the top of the page, so only margin 1 * root font size
					'font-size': '2.25em',
				},
				h2: {
					margin: '1em 0 .5em',
					'font-size': '1.75em',
				},
				h3: {
					margin: '0.5em 0 .5em',
					'font-size': '1.375em',
				},
				h4: {
					margin: '0.5em 0',
					'font-size': '1.125em',
				},
				'figure,picture': {
					margin: '1em 0',
				},
				pre: {
					padding: '0.25rem 0.5rem',
				},
      },
		}),
		// presetWebFonts({
		// 	fonts: {
		// 		sans: 'Noto Sans:400,600,700',
		// 		serif: 'Caudex:400,700',
		// 		// mono: 'DM Mono',
		// 	},
		// }),
	],
	transformers: [transformerDirectives()],
	shortcuts: {
		'border-sep': 'border-darkgray-2',
		'flex-center': 'flex items-center justify-center',
	},

	theme: {
		// define css vars for both sets of colors
		// connect specific vars to the colors we'll use
		// https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette
		colors: {
			...RadixColors,
		},
		container: { // not sure if this works here
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
		// https://github.com/unocss/unocss/blob/6a81c62a7603606b117cdc9c02447b8ec1bac4fc/packages/preset-mini/src/_theme/font.ts
		// https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
		lineHeight: {
			none: '1',
			tight: '1.1',
			snug: '1.15',
			normal: '1.25',
			relaxed: '1.5',
			loose: '1.75',
		},
		borderWidth: {
			DEFAULT: '1px',
			0: '0',
			2: '0px',
			3: '3px',
			4: '4px',
			6: '6px',
			8: '8px',
		},
		strokeWidth: {
			2: '2px',
		},
		divideWidth: {
			DEFAULT: '1px',
			0: '0',
			2: '2px',
			3: '3px',
			4: '4px',
			6: '6px',
			8: '8px',
		},
		outlineWidth: {
			5: '5px',
		},
		// spacing: {
		// 	1: '5px',
		// 	2: '10px',
		// 	3: '20px',
		// 	4: '40px',
		// 	5: '32px',
		// 	6: '48px',
		// },
		breakpoints: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},
		boxShadow: { // some issue, adding new ones doesn't seem to work
			// 'DEFAULT': ['var(--un-shadow-inset) 0 1px 3px 0 rgba(0,0,0,0.1)', 'var(--un-shadow-inset) 0 1px 2px -1px rgba(0,0,0,0.1)'],
			// 'none': '0 0 rgba(0,0,0,0)',
			// 'sm': 'var(--un-shadow-inset) 0 1px 2px 0 rgba(0,0,0,0.05)',
			// 'md': ['var(--un-shadow-inset) 0 4px 6px -1px rgba(0,0,0,0.1)', 'var(--un-shadow-inset) 0 2px 4px -2px rgba(0,0,0,0.1)'],
			// 'lg': ['var(--un-shadow-inset) 0 10px 15px -3px rgba(0,0,0,0.1)', 'var(--un-shadow-inset) 0 4px 6px -4px rgba(0,0,0,0.1)'],
			'xl': ['var(--un-shadow-inset) 0 3px 25px -5px rgba(0,0,0,0.1)', 'var(--un-shadow-inset) 0 4px 5px -6px rgba(0,0,0,0.1)'],
			// '2xl': 'var(--un-shadow-inset) 0 25px 50px -12px rgba(0,0,0,0.25)',
			'inner': 'inset 0 2px 15px 0 rgba(0,0,0,0.85)',
		}
	},
});

export default config;
