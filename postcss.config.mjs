import { createRequire } from 'module';

const require = createRequire(import.meta.url);



export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
