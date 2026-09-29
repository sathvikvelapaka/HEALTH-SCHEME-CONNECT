import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.GATEWAY_PORT || 8000;

const HOSPITAL_SERVICE_URL = process.env.HOSPITAL_SERVICE_URL || 'http://localhost:5001';
const SCHEME_SERVICE_URL = process.env.SCHEME_SERVICE_URL || 'http://localhost:5002';
const REVIEW_SERVICE_URL = process.env.REVIEW_SERVICE_URL || 'http://localhost:5003';
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:5004';
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5005';

app.use(cors());

// Global Request Logger
app.use((req, res, next) => {
  console.log(`[API Gateway] ${new Date().toISOString().split('T')[1].slice(0, 8)} ${req.method} ${req.originalUrl}`);
  next();
});

// Root and API Overview
app.get(['/', '/api'], (req, res) => {
  res.json({
    name: 'Health Scheme Connect API Gateway',
    tier: 'Tier 2 (Microservices Architecture)',
    status: 'ACTIVE',
    frontend_url: 'http://localhost:3000',
    documentation: {
      health_check: '/api/health',
      hospitals: '/api/hospitals',
      schemes: '/api/schemes',
      reviews: '/api/reviews/:hospitalId',
      auth: '/api/auth/login',
      ai: '/api/ai/chat'
    }
  });
});

// Aggregated Health Check across all microservices
app.get(['/api/health', '/health'], async (req, res) => {
  const services = [
    { name: 'hospitals', url: `${HOSPITAL_SERVICE_URL}/health` },
    { name: 'schemes', url: `${SCHEME_SERVICE_URL}/health` },
    { name: 'reviews', url: `${REVIEW_SERVICE_URL}/health` },
    { name: 'auth', url: `${AUTH_SERVICE_URL}/health` },
    { name: 'ai', url: `${AI_SERVICE_URL}/health` }
  ];

  const results = await Promise.all(
    services.map(async (s) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        const response = await fetch(s.url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (response.ok) {
          const data = await response.json();
          return { name: s.name, status: 'UP', data };
        }
        return { name: s.name, status: 'DEGRADED', code: response.status };
      } catch (err: any) {
        return { name: s.name, status: 'DOWN', error: err.message };
      }
    })
  );

  const allUp = results.every(r => r.status === 'UP');
  res.status(allUp ? 200 : 207).json({
    status: allUp ? 'HEALTHY' : 'PARTIALLY_DEGRADED',
    gateway: 'UP',
    tier: 'Tier 2 (Microservices Architecture)',
    services: results,
    timestamp: new Date().toISOString()
  });
});

// Proxy routes to dedicated microservices
app.use(createProxyMiddleware({
  target: HOSPITAL_SERVICE_URL,
  changeOrigin: true,
  pathFilter: '/api/hospitals',
  pathRewrite: { '^/api': '' },
}));

app.use(createProxyMiddleware({
  target: SCHEME_SERVICE_URL,
  changeOrigin: true,
  pathFilter: '/api/schemes',
  pathRewrite: { '^/api': '' },
}));

app.use(createProxyMiddleware({
  target: REVIEW_SERVICE_URL,
  changeOrigin: true,
  pathFilter: '/api/reviews',
  pathRewrite: { '^/api': '' },
}));

app.use(createProxyMiddleware({
  target: AUTH_SERVICE_URL,
  changeOrigin: true,
  pathFilter: '/api/auth',
  pathRewrite: { '^/api': '' },
}));

app.use(createProxyMiddleware({
  target: AI_SERVICE_URL,
  changeOrigin: true,
  pathFilter: '/api/ai',
  pathRewrite: { '^/api': '' },
}));

export function startGateway(port = PORT) {
  return app.listen(port, () => {
    console.log(`🌐 API Gateway Microservice running on port ${port}`);
    console.log(`   ├── /api/hospitals -> ${HOSPITAL_SERVICE_URL}`);
    console.log(`   ├── /api/schemes   -> ${SCHEME_SERVICE_URL}`);
    console.log(`   ├── /api/reviews   -> ${REVIEW_SERVICE_URL}`);
    console.log(`   ├── /api/auth      -> ${AUTH_SERVICE_URL}`);
    console.log(`   └── /api/ai        -> ${AI_SERVICE_URL}`);
  });
}

if (process.argv[1] && process.argv[1].endsWith('gateway/server.ts')) {
  startGateway();
}

export default app;
