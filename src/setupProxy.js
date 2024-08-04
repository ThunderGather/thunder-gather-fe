import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://3.34.132.3:8080',
            changeOrigin: true,
        })
    );
};
