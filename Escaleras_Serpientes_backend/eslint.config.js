export default [
  {
    ignores: ['node_modules/**', 'coverage/**', '__tests__/**', '*.test.js', 'babel.config.js'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    rules: {
      // Airbnb base rules - estilo de codificación
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': 'error',
      'no-console': 'off', // Permitir console en servidor
      'eol-last': 'error',
      'no-trailing-spaces': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-blocks': 'error',
      'keyword-spacing': 'error',
      'space-infix-ops': 'error',
      'no-multiple-empty-lines': ['error', { 'max': 1 }],
      'padded-blocks': ['error', 'never'],
      'space-before-function-paren': ['error', 'never'],
      'func-call-spacing': ['error', 'never'],
    },
  },
];
