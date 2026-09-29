import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, query, checkConnection } from './client.js';
import {
  MOCK_SCHEMES,
  MOCK_HOSPITALS,
  MOCK_TREATMENTS,
  MOCK_HOSPITAL_TREATMENTS,
  MOCK_BED_STATUS,
  MOCK_REVIEWS
} from '../data/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedDatabase() {
  console.log('🔄 Checking database connection...');
  const connected = await checkConnection();
  if (!connected) {
    throw new Error('Could not connect to PostgreSQL database. Make sure container or RDS is running.');
  }

  console.log('📦 Initializing Relational Database Schema...');
  const schemaPath = path.join(__dirname, '..', 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  // Execute schema DDL
  await query(schemaSql);
  console.log('✅ Schema tables initialized.');

  // 1. Seed Users
  const userCountRes = await query('SELECT COUNT(*) FROM users');
  if (parseInt(userCountRes.rows[0].count, 10) === 0) {
    console.log('🌱 Seeding demo users...');
    await query(`
      INSERT INTO users (id, name, email, role, avatar)
      VALUES 
        ('u1', 'Dr. Rajesh Sharma', 'admin@healthconnect.org', 'admin', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150'),
        ('u2', 'Ramesh Kumar', 'user@healthconnect.org', 'user', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150')
      ON CONFLICT (id) DO NOTHING
    `);
  }

  // 2. Seed Schemes
  const schemeCountRes = await query('SELECT COUNT(*) FROM schemes');
  if (parseInt(schemeCountRes.rows[0].count, 10) === 0) {
    console.log(`🌱 Seeding ${MOCK_SCHEMES.length} schemes...`);
    for (const s of MOCK_SCHEMES) {
      await query(`
        INSERT INTO schemes (
          id, code, name, short_name, coverage_limit, currency, government_level,
          state, description, eligibility_criteria, eligibility, official_website,
          helpline_number, cashless, pre_existing_conditions_covered, family_floater
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        ON CONFLICT (id) DO NOTHING
      `, [
        s.id,
        s.code,
        s.name,
        s.short_name || s.code,
        s.coverage_limit || 0,
        s.currency || 'INR',
        s.government_level,
        s.state || null,
        s.description || '',
        JSON.stringify(s.eligibility_criteria || {}),
        s.eligibility || '',
        s.official_website || null,
        s.helpline_number || null,
        s.cashless ?? true,
        s.pre_existing_conditions_covered ?? true,
        s.family_floater ?? true
      ]);
    }
    console.log(`✅ Schemes seeded.`);
  }

  // 3. Seed Hospitals
  const hospCountRes = await query('SELECT COUNT(*) FROM hospitals');
  if (parseInt(hospCountRes.rows[0].count, 10) === 0) {
    console.log(`🌱 Seeding ${MOCK_HOSPITALS.length} hospitals...`);
    for (const h of MOCK_HOSPITALS) {
      await query(`
        INSERT INTO hospitals (
          id, name, address, city, state, pincode, latitude, longitude,
          contact_number, email, website, image, is_nabh, is_nabl,
          total_beds, icu_beds, specialties, emergency_24x7, ambulance_available,
          rating, review_count, established_year, schemes_accepted, facilities,
          consulting_fee, checkup_fee
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8,
          $9, $10, $11, $12, $13, $14,
          $15, $16, $17, $18, $19,
          $20, $21, $22, $23, $24,
          $25, $26
        ) ON CONFLICT (id) DO NOTHING
      `, [
        h.id,
        h.name,
        h.address,
        h.city,
        h.state,
        h.pincode,
        h.latitude,
        h.longitude,
        h.contact_number,
        h.email,
        h.website || null,
        h.image || null,
        h.is_nabh ?? false,
        h.is_nabl ?? false,
        h.total_beds || 0,
        h.icu_beds || 0,
        h.specialties || [],
        h.emergency_24x7 ?? true,
        h.ambulance_available ?? true,
        h.rating || 0.0,
        h.review_count || 0,
        h.established_year || null,
        h.schemes_accepted || [],
        h.facilities || [],
        h.consulting_fee || 0,
        h.checkup_fee || 0
      ]);
    }
    console.log(`✅ Hospitals seeded.`);
  }

  // 4. Seed Treatments
  const treatCountRes = await query('SELECT COUNT(*) FROM treatments');
  if (parseInt(treatCountRes.rows[0].count, 10) === 0) {
    console.log(`🌱 Seeding ${MOCK_TREATMENTS.length} treatments...`);
    for (const t of MOCK_TREATMENTS) {
      await query(`
        INSERT INTO treatments (id, code, name)
        VALUES ($1, $2, $3)
        ON CONFLICT (id) DO NOTHING
      `, [t.id, t.code, t.name]);
    }
    console.log(`✅ Treatments seeded.`);
  }

  // 5. Seed Hospital Treatments
  const hospTreatCountRes = await query('SELECT COUNT(*) FROM hospital_treatments');
  if (parseInt(hospTreatCountRes.rows[0].count, 10) === 0) {
    console.log(`🌱 Seeding ${MOCK_HOSPITAL_TREATMENTS.length} hospital treatments...`);
    for (const ht of MOCK_HOSPITAL_TREATMENTS) {
      await query(`
        INSERT INTO hospital_treatments (hospital_id, treatment_id, estimated_cost, scheme_covered, scheme_coverage_limit)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (hospital_id, treatment_id) DO NOTHING
      `, [ht.hospital_id, ht.treatment_id, ht.estimated_cost, ht.scheme_covered, ht.scheme_coverage_limit]);
    }
    console.log(`✅ Hospital Treatments seeded.`);
  }

  // 6. Seed Bed Statuses
  const bedCountRes = await query('SELECT COUNT(*) FROM bed_statuses');
  if (parseInt(bedCountRes.rows[0].count, 10) === 0) {
    console.log(`🌱 Seeding ${MOCK_BED_STATUS.length} bed statuses...`);
    for (const bs of MOCK_BED_STATUS) {
      await query(`
        INSERT INTO bed_statuses (hospital_id, available_icu, available_general, available_maternity, last_updated)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (hospital_id) DO NOTHING
      `, [bs.hospital_id, bs.available_icu, bs.available_general, bs.available_maternity, bs.last_updated]);
    }
    console.log(`✅ Bed Statuses seeded.`);
  }

  // 7. Seed Reviews
  const reviewCountRes = await query('SELECT COUNT(*) FROM reviews');
  if (parseInt(reviewCountRes.rows[0].count, 10) === 0) {
    console.log(`🌱 Seeding ${MOCK_REVIEWS.length} reviews...`);
    for (const r of MOCK_REVIEWS) {
      await query(`
        INSERT INTO reviews (id, hospital_id, user_id, rating, title, body, verified, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO NOTHING
      `, [r.id, r.hospital_id, r.user_id, r.rating, r.title, r.body, r.verified ?? true, r.created_at]);
    }
    console.log(`✅ Reviews seeded.`);
  }

  console.log('🎉 Relational Database setup & seed complete!');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedDatabase()
    .then(() => {
      console.log('Seeding process finished.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seeding error:', err);
      process.exit(1);
    });
}
