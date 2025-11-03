module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'prefer-destructuring': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],  
    // ignorerar alla conlose.log.
    '@typescript-eslint/no-explicit-any': 'warn', 
    // gör att det felet blir till varning isället eftersom jag anvönder "any" 
  },
};
