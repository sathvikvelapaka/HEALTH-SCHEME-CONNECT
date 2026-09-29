import express from 'express';
import cors from 'cors';
import { query } from '../../database/client.js';

const app = express();
const PORT = process.env.HOSPITAL_SERVICE_PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    service: 'hospital-service',
    tier: 'Tier 2 (Microservices Architecture)',
    endpoints: ['/hospitals', '/hospitals/:id', '/hospitals/:id/beds', '/hospitals/:id/treatments', '/health']
  });
});

// Health check
app.get('/health', async (req, res) => {
  try {
    const dbRes = await query('SELECT 1');
    res.json({
      status: 'ok',
      service: 'hospital-service',
      database: dbRes ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', service: 'hospital-service', error: error.message });
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
    review_count: parseInt(row.review_count, 10) || 0,
    consulting_fee: parseInt(row.consulting_fee, 10) || 0,
    checkup_fee: parseInt(row.checkup_fee, 10) || 0,
    established_year: row.established_year ? parseInt(row.established_year, 10) : null,
    is_nabh: Boolean(row.is_nabh),
    is_nabl: Boolean(row.is_nabl),
    emergency_24x7: Boolean(row.emergency_24x7),
    ambulance_available: Boolean(row.ambulance_available),
    schemes_accepted: Array.isArray(row.schemes_accepted) ? row.schemes_accepted : [],
    facilities: Array.isArray(row.facilities) ? row.facilities : [],
    specialties: Array.isArray(row.specialties) ? row.specialties : [],
  };
}

// GET /hospitals - Search and filter hospitals
app.get('/hospitals', async (req, res) => {
  try {
    const { city, schemeCode } = req.query;
    let sql = 'SELECT * FROM hospitals WHERE 1=1';
    const params: any[] = [];

    if (city && typeof city === 'string' && city.trim() !== '') {
      params.push(city.trim().toLowerCase());
      sql += ` AND LOWER(city) = $${params.length}`;
    }

    if (schemeCode && typeof schemeCode === 'string' && schemeCode.trim() !== '' && schemeCode.toUpperCase() !== 'ALL') {
      params.push(schemeCode.trim().toUpperCase());
      sql += ` AND $${params.length} = ANY(schemes_accepted)`;
    }

    sql += ' ORDER BY rating DESC';

    const result = await query(sql, params);
    res.json(result.rows.map(formatHospital));
  } catch (error: any) {
    console.error('[Hospital Service] Error fetching hospitals:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// GET /hospitals/:id - Get hospital details
app.get('/hospitals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM hospitals WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.json(formatHospital(result.rows[0]));
  } catch (error: any) {
    console.error(`[Hospital Service] Error fetching hospital ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// GET /hospitals/:id/beds - Get bed status
app.get('/hospitals/:id/beds', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM bed_statuses WHERE hospital_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.json({
        hospital_id: id,
        available_icu: 12,
        available_general: 45,
        available_maternity: 8,
        last_updated: new Date().toISOString()
      });
    }
    const bs = result.rows[0];
    res.json({
      ...bs,
      available_icu: parseInt(bs.available_icu, 10) || 0,
      available_general: parseInt(bs.available_general, 10) || 0,
      available_maternity: parseInt(bs.available_maternity, 10) || 0,
    });
  } catch (error: any) {
    console.error(`[Hospital Service] Error fetching beds for ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// GET /hospitals/:id/treatments - Get treatments with pricing
app.get('/hospitals/:id/treatments', async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
      SELECT 
        t.id, t.code, t.name,
        ht.estimated_cost, ht.scheme_covered, ht.scheme_coverage_limit
      FROM hospital_treatments ht
      JOIN treatments t ON ht.treatment_id = t.id
      WHERE ht.hospital_id = $1
      ORDER BY t.name ASC
    `;
    const result = await query(sql, [id]);
    const formatted = result.rows.map(row => ({
      treatment: {
        id: row.id,
        code: row.code,
        name: row.name
      },
      details: {
        hospital_id: id,
        treatment_id: row.id,
        estimated_cost: parseInt(row.estimated_cost, 10) || 0,
        scheme_covered: Boolean(row.scheme_covered),
        scheme_coverage_limit: parseInt(row.scheme_coverage_limit, 10) || 0
      }
    }));
    res.json(formatted);
  } catch (error: any) {
    console.error(`[Hospital Service] Error fetching treatments for ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// GET /hospitals/:id/reviews - Get reviews for a hospital
app.get('/hospitals/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT * FROM reviews WHERE hospital_id = $1 ORDER BY created_at DESC',
      [id]
    );
    res.json(result.rows);
  } catch (error: any) {
    console.error(`[Hospital Service] Error fetching reviews for ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


export function startHospitalService(port = PORT) {
  return app.listen(port, () => {
    console.log(`🏥 Hospital & Bed Microservice running on port ${port}`);
  });
}

if (process.argv[1] && process.argv[1].endsWith('hospital-service/server.ts')) {
  (async () => {
    try {
      const { seedDatabase } = await import('../../database/seed.js');
      await seedDatabase();
    } catch (err: any) {
      console.log('[Hospital Service] DB check/seed note:', err.message);
    }
    startHospitalService();
  })();
}


export default app;
