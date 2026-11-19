import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	...tsPlugin.configs['flat/recommended'],
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				parser: tsParser
			}
		},
		rules: {
			'svelte/valid-compile': ['error', { ignoreWarnings: true }],
			'svelte/require-each-key': 'off',
			'svelte/no-navigation-without-resolve': 'off'
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'package/', 'src/lib/paraglide/', '.eslintrc.cjs']
	}
];
