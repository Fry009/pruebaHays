import { ClientRepository } from '@core/ports/repositories';
import { Client } from '@core/entities/types';
import { db } from '../storage/dexieClient';

export class LocalClientRepository implements ClientRepository {
  async getClient(id: string): Promise<Client | undefined> {
    return db.clients.get(id);
  }

  async list(): Promise<Client[]> {
    return db.clients.toArray();
  }
}
