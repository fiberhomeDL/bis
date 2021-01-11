const path = require('path');

module.exports = {
    configureWebpack: config => {
        return {
            resolve: {
                alias: {
                    '@c': path.resolve(__dirname, './src/components/'),
                    '@css': path.resolve(__dirname, './src/assets/css'),
                    '@img': path.resolve(__dirname, './src/assets/img'),
                    '@js': path.resolve(__dirname, './src/assets/js')
                }
            }
        };
    }
};
