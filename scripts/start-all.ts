import path from 'path';
import { createServer as createViteServer } from 'vite';
import { seedDatabase } from '../backend/database/seed.js';
import { startHospitalService } from '../backend/services/hospital-service/server.js';
import { startSchemeService } from '../backend/services/scheme-service/server.js';
import { startReviewService } from '../backend/services/review-service/server.js';
import { startAuthService } from '../backend/services/auth-service/server.js';
import { startAiService } from '../backend/services/ai-service/server.js';
import { startGateway } from '../backend/services/gateway/server.js';

async function bootstrap() {
  console.log('===========================================================');
  console.log('  🏥 STARTING 3-TIER HEALTH SCHEME CONNECT SYSTEM');
  console.log('===========================================================\n');

  // --- TIER 3: DATABASE TIER ---
  console.log('[Tier 3 - Data Tier] Initializing PostgreSQL Relational DB...');
  try {
    await seedDatabase();
    console.log('[Tier 3 - Data Tier] ✅ PostgreSQL Database connected & verified.\n');
  } catch (err: any) {
    console.error('[Tier 3 - Data Tier] ⚠️ Database setup error:', err.message);
    console.error('Make sure the PostgreSQL container is running:');
    console.error('docker start health-scheme-postgres\n');
  }

  // --- TIER 2: APPLICATION / MICROSERVICES TIER ---
  console.log('[Tier 2 - Microservices] Starting domain microservices...');
  const hospitalServer = startHospitalService(5001);
  const schemeServer = startSchemeService(5002);
  const reviewServer = startReviewService(5003);
  const authServer = startAuthService(5004);
  const aiServer = startAiService(5005);
  const gatewayServer = startGateway(8000);
  console.log('[Tier 2 - Microservices] ✅ API Gateway & 5 Microservices live.\n');

  // --- TIER 1: PRESENTATION TIER (FRONTEND SPA) ---
  console.log('[Tier 1 - Presentation] Launching Vite React 19 Frontend on Port 3000...');
  const projectRoot = process.cwd();
  const vite = await createViteServer({
    root: projectRoot,
    configFile: path.resolve(projectRoot, 'vite.config.ts'),
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    appType: 'spa'
  });
  await vite.listen();
  console.log('[Tier 1 - Presentation] ✅ Frontend SPA running on http://localhost:3000\n');

  console.log('===========================================================');
  console.log('  🎉 ALL 3 TIERS ACTIVELY RUNNING');
  console.log('===========================================================');
  console.log('🖥️  TIER 1 (Presentation):  http://localhost:3000 (React SPA)');
  console.log('🌐  TIER 2 (API Gateway):    http://localhost:8000/api (Aggregated)');
  console.log('    ├── Hospitals Service:  http://localhost:5001');
  console.log('    ├── Schemes Service:    http://localhost:5002');
  console.log('    ├── Reviews Service:    http://localhost:5003');
  console.log('    ├── Auth Service:       http://localhost:5004');
  console.log('    └── AI Service:         http://localhost:5005');
  console.log('🗄️  TIER 3 (Database):       localhost:5432 (PostgreSQL)');
  console.log('===========================================================\n');

  const shutdown = () => {
    console.log('\nShutting down all microservices gracefully...');
    hospitalServer.close();
    schemeServer.close();
    reviewServer.close();
    authServer.close();
    aiServer.close();
    gatewayServer.close();
    vite.close();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

bootstrap().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
