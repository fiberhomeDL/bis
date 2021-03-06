const path = require('path');

module.exports = {
    devServer: {
        publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
        proxy: {
            '/graphql': {
                target: 'http://192.168.1.148:12800',
                pathRewrite: {
                    '^/graphql' : '/graphql'
                }
            }
        }
    },
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
