import { LeadRepository } from '@core/ports/repositories';
import { Lead } from '@core/entities/types';
import { db } from '../storage/dexieClient';

export class LocalLeadRepository implements LeadRepository {
  async list(): Promise<Lead[]> {
    return db.leads.toArray();
  }

  async save(lead: Lead): Promise<void> {
    await db.leads.put(lead);
  }
}
