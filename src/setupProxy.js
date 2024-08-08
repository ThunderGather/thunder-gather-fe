import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
    app.use(
        '/api/v1',
        createProxyMiddleware({
            target: 'http://34.71.226.131:8080',
            changeOrigin: true,
        })
    );
}
