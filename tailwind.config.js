module.exports = {
    important: true,
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1c1e26',
                secondary: '#2a2b36',
                blue: '#5c61ed',
                'neutral-green': '#70c0af',
                gray: '#aaaaaf',
                white: '#fff'
            },
            boxShadow: {
                '3xl':'0 0 15px rgba(0,0,0,0.15)'
            },
            borderRadius: {
                half: '50%'
            }
        },
        
    },
    plugins: [],
};
