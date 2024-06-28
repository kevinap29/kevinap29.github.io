import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const customTheme: CustomThemeConfig = {
	name: 'custom-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		'--theme-font-color-base': 'var(--color-tertiary-900)',
		'--theme-font-color-dark': 'var(--color-tertiary-50)',
		'--theme-rounded-base': '12px',
		'--theme-rounded-container': '24px',
		'--theme-border-base': '2px',
		// =~= Theme On-X Colors =~=
		'--on-primary': 'var(--color-tertiary-900)',
		'--on-secondary': 'var(--color-tertiary-50)',
		'--on-tertiary': 'var(--color-tertiary-50)',
		'--on-success': 'var(--color-tertiary-900)',
		'--on-warning': 'var(--color-tertiary-900)',
		'--on-error': 'var(--color-tertiary-900)',
		'--on-surface': 'var(--color-tertiary-50)',
		// =~= Theme Colors  =~=
		// primary | #F2613F
		'--color-primary-50': '253 231 226', // #fde7e2
		'--color-primary-100': '252 223 217', // #fcdfd9
		'--color-primary-200': '252 216 207', // #fcd8cf
		'--color-primary-300': '250 192 178', // #fac0b2
		'--color-primary-400': '246 144 121', // #f69079
		'--color-primary-500': '242 97 63', // #F2613F
		'--color-primary-600': '218 87 57', // #da5739
		'--color-primary-700': '182 73 47', // #b6492f
		'--color-primary-800': '145 58 38', // #913a26
		'--color-primary-900': '119 48 31', // #77301f
		// secondary | #9B3922
		'--color-secondary-50': '240 225 222', // #f0e1de
		'--color-secondary-100': '235 215 211', // #ebd7d3
		'--color-secondary-200': '230 206 200', // #e6cec8
		'--color-secondary-300': '215 176 167', // #d7b0a7
		'--color-secondary-400': '185 116 100', // #b97464
		'--color-secondary-500': '155 57 34', // #9B3922
		'--color-secondary-600': '140 51 31', // #8c331f
		'--color-secondary-700': '116 43 26', // #742b1a
		'--color-secondary-800': '93 34 20', // #5d2214
		'--color-secondary-900': '76 28 17', // #4c1c11
		// tertiary | #481E14
		'--color-tertiary-50': '228 221 220', // #e4dddc
		'--color-tertiary-100': '218 210 208', // #dad2d0
		'--color-tertiary-200': '209 199 196', // #d1c7c4
		'--color-tertiary-300': '182 165 161', // #b6a5a1
		'--color-tertiary-400': '127 98 91', // #7f625b
		'--color-tertiary-500': '72 30 20', // #481E14
		'--color-tertiary-600': '65 27 18', // #411b12
		'--color-tertiary-700': '54 23 15', // #36170f
		'--color-tertiary-800': '43 18 12', // #2b120c
		'--color-tertiary-900': '35 15 10', // #230f0a
		// success | #219C90
		'--color-success-50': '222 240 238', // #def0ee
		'--color-success-100': '211 235 233', // #d3ebe9
		'--color-success-200': '200 230 227', // #c8e6e3
		'--color-success-300': '166 215 211', // #a6d7d3
		'--color-success-400': '100 186 177', // #64bab1
		'--color-success-500': '33 156 144', // #219C90
		'--color-success-600': '30 140 130', // #1e8c82
		'--color-success-700': '25 117 108', // #19756c
		'--color-success-800': '20 94 86', // #145e56
		'--color-success-900': '16 76 71', // #104c47
		// warning | #FFF455
		'--color-warning-50': '255 253 230', // #fffde6
		'--color-warning-100': '255 253 221', // #fffddd
		'--color-warning-200': '255 252 213', // #fffcd5
		'--color-warning-300': '255 251 187', // #fffbbb
		'--color-warning-400': '255 247 136', // #fff788
		'--color-warning-500': '255 244 85', // #FFF455
		'--color-warning-600': '230 220 77', // #e6dc4d
		'--color-warning-700': '191 183 64', // #bfb740
		'--color-warning-800': '153 146 51', // #999233
		'--color-warning-900': '125 120 42', // #7d782a
		// error | #EE4E4E
		'--color-error-50': '252 228 228', // #fce4e4
		'--color-error-100': '252 220 220', // #fcdcdc
		'--color-error-200': '251 211 211', // #fbd3d3
		'--color-error-300': '248 184 184', // #f8b8b8
		'--color-error-400': '243 131 131', // #f38383
		'--color-error-500': '238 78 78', // #EE4E4E
		'--color-error-600': '214 70 70', // #d64646
		'--color-error-700': '179 59 59', // #b33b3b
		'--color-error-800': '143 47 47', // #8f2f2f
		'--color-error-900': '117 38 38', // #752626
		// surface | #0C0C0C
		'--color-surface-50': '219 219 219', // #dbdbdb
		'--color-surface-100': '206 206 206', // #cecece
		'--color-surface-200': '194 194 194', // #c2c2c2
		'--color-surface-300': '158 158 158', // #9e9e9e
		'--color-surface-400': '85 85 85', // #555555
		'--color-surface-500': '12 12 12', // #0C0C0C
		'--color-surface-600': '11 11 11', // #0b0b0b
		'--color-surface-700': '9 9 9', // #090909
		'--color-surface-800': '7 7 7', // #070707
		'--color-surface-900': '6 6 6' // #060606
	}
};
