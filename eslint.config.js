import typescript from '@typescript-eslint/parser';
import astroParser from 'astro-eslint-parser';
import astroPlugin from 'eslint-plugin-astro';

export default [
  // Global configuration
  {
    languageOptions: {
      parser: typescript,
      parserOptions: {
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    }
  },

  // Plugin configuration
  {
    plugins: {
      astro: astroPlugin
    }
  },

  // Astro recommended configuration
  ...astroPlugin.configs.recommended,

  // Astro files specific configuration
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: typescript,
        extraFileExtensions: ['.astro']
      }
    },
    rules: {
      // Add your custom rules here
      "astro/no-set-html-directive": "error"
    }
  }
];