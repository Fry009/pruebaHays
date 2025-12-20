import Dexie, { Table } from 'dexie';
import {
  CheckInSession,
  Client,
  Employee,
  Evidence,
  KPI,
  Lead,
  PendingOperation,
  ServiceJob
} from '@core/entities/types';

export class AppDatabase extends Dexie {
  jobs!: Table<ServiceJob, string>;
  employees!: Table<Employee, string>;
  clients!: Table<Client, string>;
  sessions!: Table<CheckInSession, string>;
  evidences!: Table<Evidence, string>;
  kpis!: Table<KPI, number>;
  outbox!: Table<PendingOperation, string>;
  leads!: Table<Lead, string>;
  settings!: Table<{ id: string; value: unknown }, string>;

  constructor() {
    super('clean-today-db');
    this.version(1).stores({
      jobs: 'id, employeeId, status',
      employees: 'id',
      clients: 'id',
      sessions: 'jobId',
      evidences: 'jobId',
      kpis: '++id, employeeId',
      outbox: 'id, type',
      leads: 'id',
      settings: 'id'
    });
  }
}

export const db = new AppDatabase();
