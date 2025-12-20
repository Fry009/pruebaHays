import demoData from '@shared/demoData';
import { db } from './dexieClient';

export async function seedDatabase() {
  const count = await db.jobs.count();
  if (count > 0) return;
  await db.transaction(
    'rw',
    db.jobs,
    db.clients,
    db.employees,
    db.evidences,
    db.leads,
    db.sessions,
    db.kpis,
    async () => {
      await db.employees.bulkAdd(demoData.employees);
      await db.clients.bulkAdd(demoData.clients);
      await db.jobs.bulkAdd(demoData.jobs);
      await db.evidences.bulkAdd(demoData.evidences);
      await db.leads.bulkAdd(demoData.leads);
      await db.sessions.bulkAdd(demoData.sessions);
      await db.kpis.bulkAdd(demoData.kpis);
    }
  );
}
