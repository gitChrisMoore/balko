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
