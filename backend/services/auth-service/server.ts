import express from 'express';
import cors from 'cors';
import { query } from '../../database/client.js';

const app = express();
const PORT = process.env.AUTH_SERVICE_PORT || 5004;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    service: 'auth-service',
    tier: 'Tier 2 (Microservices Architecture)',
    endpoints: ['POST /auth/login', 'POST /auth/signup', '/health']
  });
});

// Health check
app.get('/health', async (req, res) => {
  try {
    const dbRes = await query('SELECT COUNT(*) FROM users');
    res.json({
      status: 'ok',
      service: 'auth-service',
      total_users: parseInt(dbRes.rows[0].count, 10),
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', service: 'auth-service', error: error.message });
  }
});

// POST /auth/login
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const userRes = await query('SELECT id, name, email, role, avatar FROM users WHERE email = $1', [email.toLowerCase()]);
    let user;

    if (userRes.rows.length > 0) {
      user = userRes.rows[0];
    } else {
      // Auto-provision demo user if valid email format
      const userId = `usr_${Date.now()}`;
      const defaultName = email.split('@')[0].replace('.', ' ');
      const formattedName = defaultName.charAt(0).toUpperCase() + defaultName.slice(1);
      const insertRes = await query(
        'INSERT INTO users (id, name, email, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, avatar',
        [userId, formattedName, email.toLowerCase(), 'user']
      );
      user = insertRes.rows[0];
    }

    const token = `jwt_token_${user.id}_${Date.now()}`;
    res.json({ user, token });
  } catch (error: any) {
    console.error('[Auth Service] Login error:', error);
    res.status(500).json({ message: 'Authentication failed', error: error.message });
  }
});

// POST /auth/signup
app.post('/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existing = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const userId = `usr_${Date.now()}`;
    const insertRes = await query(
      'INSERT INTO users (id, name, email, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, avatar',
      [userId, name, email.toLowerCase(), 'user']
    );

    const user = insertRes.rows[0];
    const token = `jwt_token_${user.id}_${Date.now()}`;
    res.status(201).json({ user, token });
  } catch (error: any) {
    console.error('[Auth Service] Signup error:', error);
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
});

export function startAuthService(port = PORT) {
  return app.listen(port, () => {
    console.log(`🔐 Auth & Identity Microservice running on port ${port}`);
  });
}

if (process.argv[1] && process.argv[1].endsWith('auth-service/server.ts')) {
  startAuthService();
}

export default app;
