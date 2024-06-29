import eslintPluginSvelte from 'eslint-plugin-svelte';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  // separate into its own object
  {
    ignores: [
      '.svelte-kit/',
      '.svelte-kit/**/*,js',
      '.svelte-kit/output/server/index.js',
      '.vercel/',
      '.yarn/',
      'build/',
      'node_modules/',
      'package/'
    ]
  },
  {
    rules: {
      // override/add rules settings here, such as:
      // 'svelte/rule-name': 'error'
    }
  },
  eslintPluginPrettierRecommended
];
