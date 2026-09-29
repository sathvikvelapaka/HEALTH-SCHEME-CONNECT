import express from 'express';
import cors from 'cors';
import { query } from '../../database/client.js';

const app = express();
const PORT = process.env.REVIEW_SERVICE_PORT || 5003;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    service: 'review-service',
    tier: 'Tier 2 (Microservices Architecture)',
    endpoints: ['/reviews/:hospitalId', 'POST /reviews', '/health']
  });
});

// Health check
app.get('/health', async (req, res) => {
  try {
    const dbRes = await query('SELECT COUNT(*) FROM reviews');
    res.json({
      status: 'ok',
      service: 'review-service',
      total_reviews: parseInt(dbRes.rows[0].count, 10),
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', service: 'review-service', error: error.message });
  }
});

// GET /reviews/:hospitalId - Get all verified reviews for a hospital
app.get('/reviews/:hospitalId', async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const result = await query(
      'SELECT * FROM reviews WHERE hospital_id = $1 ORDER BY created_at DESC',
      [hospitalId]
    );
    res.json(result.rows);
  } catch (error: any) {
    console.error(`[Review Service] Error fetching reviews for ${req.params.hospitalId}:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// POST /reviews - Add a new patient review
app.post('/reviews', async (req, res) => {
  try {
    const { hospital_id, user_id, rating, title, body } = req.body;
    if (!hospital_id || !rating || !title || !body) {
      return res.status(400).json({ message: 'Missing required fields: hospital_id, rating, title, body' });
    }

    const reviewId = `rev_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const userId = user_id || 'u2';
    const createdAt = new Date().toISOString();

    const insertRes = await query(`
      INSERT INTO reviews (id, hospital_id, user_id, rating, title, body, verified, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, true, $7)
      RETURNING *
    `, [reviewId, hospital_id, userId, rating, title, body, createdAt]);

    // Recalculate average rating & review count for the hospital
    await query(`
      UPDATE hospitals
      SET 
        review_count = (SELECT COUNT(*) FROM reviews WHERE hospital_id = $1),
        rating = COALESCE((SELECT ROUND(AVG(rating)::numeric, 2) FROM reviews WHERE hospital_id = $1), 4.0)
      WHERE id = $1
    `, [hospital_id]);

    res.status(201).json(insertRes.rows[0]);
  } catch (error: any) {
    console.error('[Review Service] Error creating review:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

export function startReviewService(port = PORT) {
  return app.listen(port, () => {
    console.log(`⭐ Patient Review Microservice running on port ${port}`);
  });
}

if (process.argv[1] && process.argv[1].endsWith('review-service/server.ts')) {
  startReviewService();
}

export default app;
