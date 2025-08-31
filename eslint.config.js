import js from '@eslint/js';
import globals from 'globals';
import markdown from '@eslint/markdown';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';
import myConfig from '@sheplu/eslint-config/src/stylistic.js';
import myEslint from '@sheplu/eslint-config/src/eslint.js';

export default defineConfig([
	{
		'files': [ '**/*.{js,mjs,cjs}' ],
		'plugins': { js, '@stylistic': stylistic },
		'extends': [
			'js/recommended',
			myConfig,
			myEslint,
		],
		'languageOptions': {
			globals: globals.node,
		},
		'rules': {
		},
	},
	{
		'files': [ '**/*.md' ],
		'plugins': { markdown },
		'language': 'markdown/gfm',
		'extends': [ 'markdown/recommended' ],
	},
]);
