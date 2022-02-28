const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
    alias({
        '@views': 'src/views',
        '@components': 'src/components',
        '@config': 'src/config',
        '@hooks': 'src/hooks',
        '@layouts': 'src/layouts',
        '@state': 'src/state',
        '@styles': 'src/styles',
        '@utils': 'src/utils',
        '@constants': 'src/constants',
        '@api': 'src/api',
        '@routes': 'src/routes',
        '@services': 'src/services',
        '@themes': 'src/themes'
    })(config);

    return config;
};