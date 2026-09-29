import express from 'express';
import cors from 'cors';
import { query } from '../../database/client.js';

const app = express();
const PORT = process.env.SCHEME_SERVICE_PORT || 5002;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    service: 'scheme-service',
    tier: 'Tier 2 (Microservices Architecture)',
    endpoints: ['/schemes', '/schemes/:id', '/schemes/:id/hospitals', '/health']
  });
});

// Health check
app.get('/health', async (req, res) => {
  try {
    const dbRes = await query('SELECT COUNT(*) FROM schemes');
    res.json({
      status: 'ok',
      service: 'scheme-service',
      total_schemes: parseInt(dbRes.rows[0].count, 10),
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', service: 'scheme-service', error: error.message });
  }
});

// GET /schemes - Get all schemes with optional filters
app.get('/schemes', async (req, res) => {
  try {
    const { government_level, state } = req.query;
    let sql = 'SELECT * FROM schemes WHERE 1=1';
    const params: any[] = [];

    if (government_level && typeof government_level === 'string') {
      params.push(government_level);
      sql += ` AND government_level = $${params.length}`;
    }

    if (state && typeof state === 'string') {
      params.push(state);
      sql += ` AND state ILIKE $${params.length}`;
    }

    sql += ' ORDER BY government_level ASC, name ASC';

    const result = await query(sql, params);
    res.json(result.rows);
  } catch (error: any) {
    console.error('[Scheme Service] Error fetching schemes:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// GET /schemes/:id - Get scheme details
app.get('/schemes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM schemes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Scheme not found' });
    }
    res.json(result.rows[0]);
  } catch (error: any) {
    console.error(`[Scheme Service] Error fetching scheme ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

function formatHospital(row: any) {
  if (!row) return null;
  return {
    ...row,
    latitude: parseFloat(row.latitude) || 0,
    longitude: parseFloat(row.longitude) || 0,
    rating: parseFloat(row.rating) || 0,
    total_beds: parseInt(row.total_beds, 10) || 0,
    icu_beds: parseInt(row.icu_beds, 10) || 0,
    available_icu: parseInt(row.available_icu, 10) || 0,
    available_general: parseInt(row.available_general, 10) || 0,
    available_maternity: parseInt(row.available_maternity, 10) || 0,
    review_count: parseInt(row.review_count, 10) || 0,
    consulting_fee: parseInt(row.consulting_fee, 10) || 0,
    checkup_fee: parseInt(row.checkup_fee, 10) || 0,
    schemes_accepted: Array.isArray(row.schemes_accepted) ? row.schemes_accepted : [],
  };
}

function formatScheme(row: any) {
  if (!row) return null;
  return {
    ...row,
    coverage_limit: parseInt(row.coverage_limit, 10) || 0,
  };
}

// GET /schemes/:id/hospitals - Get empanelled hospitals for a scheme
app.get('/schemes/:id/hospitals', async (req, res) => {
  try {
    const { id } = req.params;
    const { city } = req.query;

    const schemeRes = await query('SELECT code FROM schemes WHERE id = $1', [id]);
    if (schemeRes.rows.length === 0) {
      return res.json([]);
    }
    const schemeCode = schemeRes.rows[0].code;

    let sql = `
      SELECT 
        h.*,
        COALESCE(bs.available_icu, 12) as available_icu,
        COALESCE(bs.available_general, 45) as available_general,
        COALESCE(bs.available_maternity, 8) as available_maternity
      FROM hospitals h
      LEFT JOIN bed_statuses bs ON h.id = bs.hospital_id
      WHERE $1 = ANY(h.schemes_accepted)
    `;
    const params: any[] = [schemeCode];

    if (city && typeof city === 'string' && city.trim() !== '') {
      params.push(city.trim().toLowerCase());
      sql += ` AND LOWER(h.city) = $${params.length}`;
    }

    sql += ' ORDER BY h.rating DESC';

    const result = await query(sql, params);
    res.json(result.rows.map(formatHospital));
  } catch (error: any) {
    console.error(`[Scheme Service] Error fetching hospitals for scheme ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

export function startSchemeService(port = PORT) {
  return app.listen(port, () => {
    console.log(`📋 Scheme Catalog Microservice running on port ${port}`);
  });
}

if (process.argv[1] && process.argv[1].endsWith('scheme-service/server.ts')) {
  startSchemeService();
}

export default app;
