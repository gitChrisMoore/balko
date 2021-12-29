### Purpose

Transaction Processor

### Init App

npx create-react-app@latest balko

### NPM (Without MUI)

npm i --save-dev @supabase/supabase-js moment react-router-dom @testing-library/react yup formik nyc eslint eslint-config-prettier eslint-plugin-prettier prettier eslint-plugin-testing-library @testing-library/react-hooks

### ES Lint Setup

npx eslint --init

#### .eslintrc.json

{
"env": {
"browser": true,
"es2021": true
},
"extends": [
"eslint:recommended",
"plugin:react/recommended",
"plugin:prettier/recommended"
],
"parserOptions": {
"ecmaFeatures": {
"jsx": true
},
"ecmaVersion": 13,
"sourceType": "module"
},
"plugins": [
"react",
"testing-library"
],
"rules": {
"react/react-in-jsx-scope": "off"
},
"globals": {
"process": true
}
}

#### .prettierrc

{
"semi": true,
"tabWidth": 4,
"printWidth": 100,
"singleQuote": true,
"trailingComma": "none",
"jsxBracketSameLine": true
}

#### update scripts

"scripts": {
"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test",
"coverage": "react-scripts test --coverage --watchAll",
"eject": "react-scripts eject",
"lint": "eslint .",
"lint:fix": "eslint --fix",
"format": "prettier --write './\*_/_.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc"
},

#### Install Tailwinds

npm install -D tailwindcss postcss autoprefixer tailwindcss-pseudo-elements --save-dev

npx tailwindcss init -p

#### tailwinds.config.js

const plugin = require('tailwindcss/plugin');

module.exports = {
content: ['./src/**/*.{js,jsx,ts,tsx}'],
theme: {
extend: {}
},
plugins: [
require('tailwindcss-pseudo-elements'),
plugin(({ addUtilities }) => {
const newUtilities = {
'.empty-content': {
content: "''"
}
};
addUtilities(newUtilities, {
variants: ['before', 'after']
});
})
]
};
