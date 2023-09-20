module.exports = {
	env: {
		browser: true,
		node: true,
		es2022: true,
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
	extends: [
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'airbnb',
		'airbnb/hooks',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	rules: {
		'no-tabs': 0,
		'react/react-in-jsx-scope': 0,
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-props-no-spreading': 0,
		'react/require-default-props': 0,
		'import/prefer-default-export': 0,
		'no-console': 'off',
		'@typescript-eslint/no-unused-vars': [
			2,
			{
				args: 'all',
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
				destructuredArrayIgnorePattern: '^_',
				ignoreRestSiblings: false,
			},
		],
		'no-await-in-loop': 'off',
		'no-restricted-syntax': 'off',
		'prettier/prettier': 'error',
		indent: 'off',
	},
	overrides: [
		{
			files: ['**/*.ts?(x)'],
			rules: {
				'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
				'import/extensions': [
					'error',
					'ignorePackages',
					{
						ts: 'never',
						tsx: 'never',
					},
				],
			},
			indent: 'off',
		},
		{
			files: ['**/*.tsx'],
			settings: {
				settings: {
					react: {
						version: '18.2.0',
					},
				},
			},
		},
	],
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},
	},
};
