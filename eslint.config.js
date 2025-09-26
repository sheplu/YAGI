import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import markdown from '@eslint/markdown';
import myConfig from '@sheplu/eslint-config/src/stylistic.js';
import myEslint from '@sheplu/eslint-config/src/eslint.js';
import stylistic from '@stylistic/eslint-plugin';

// eslint-disable-next-line no-restricted-exports
export default defineConfig([
	{
		'extends': [
			'js/recommended',
			myConfig,
			myEslint,
		],
		'files': [ '**/*.{js,mjs,cjs}' ],
		'languageOptions': {
			globals: globals.node,
		},
		// eslint-disable-next-line object-shorthand
		'plugins': { '@stylistic': stylistic, js },
		'rules': {
		},
	},
	{
		'extends': [ 'markdown/recommended' ],
		'files': [ '**/*.md' ],
		'language': 'markdown/gfm',
		'plugins': { markdown },
	},
]);
