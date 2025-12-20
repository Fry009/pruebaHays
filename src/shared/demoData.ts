import { Badge, CheckInSession, Evidence, KPI, Lead, ServiceJob, Client, Employee } from '@core/entities/types';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

const badges: Badge[] = [
  { id: 'fast', label: 'Rápido', description: 'Termina a tiempo', color: 'green' },
  { id: 'trust', label: 'Confiable', description: 'Sin incidencias', color: 'blue' },
  { id: 'mentor', label: 'Mentor', description: 'Ayuda a otros', color: 'yellow' }
];

const employees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Ana Campos',
    avatar: 'https://i.pravatar.cc/150?img=47',
    level: 3,
    ratingAvg: 4.7,
    badges,
    premiumStatus: 'FREE'
  }
];

const clients: Client[] = [
  { id: 'cli-1', name: 'Familia García', address: 'C/ Mayor 12, Madrid', notes: 'Perro pequeño' },
  { id: 'cli-2', name: 'Oficina Centro', address: 'Gran Vía 23, Madrid', notes: 'Reponer café' },
  { id: 'cli-3', name: 'Clínica Norte', address: 'Av. Norte 8, Madrid', notes: 'Zona esteril' },
  { id: 'cli-4', name: 'Reforma Ático', address: 'C/ Serrano 88, Madrid', notes: 'Pintura reciente' },
  { id: 'cli-5', name: 'Coworking Sur', address: 'Paseo Sur 3, Madrid', notes: 'Prioridad salas' }
];

const jobs: ServiceJob[] = Array.from({ length: 10 }).map((_, idx) => ({
  id: `job-${idx + 1}`,
  clientId: clients[idx % clients.length].id,
  employeeId: 'emp-1',
  type: idx % 3 === 0 ? 'oficina' : idx % 2 === 0 ? 'obra' : 'hogar',
  scheduledAt: dayjs().add(idx - 2, 'day').toISOString(),
  status: idx < 3 ? 'done' : idx === 8 ? 'canceled' : 'pending',
  price: 35 + idx * 5,
  durationEstimate: 60 + idx * 10,
  notes: idx === 2 ? 'Revisar cristales' : ''
}));

const evidences: Evidence[] = jobs.slice(0, 5).map((job) => ({
  jobId: job.id,
  beforePhotos: [`https://picsum.photos/seed/${job.id}-before/200`],
  afterPhotos: [`https://picsum.photos/seed/${job.id}-after/200`],
  checklist: [
    { id: 'floor', label: 'Suelos', done: true, required: true },
    { id: 'bath', label: 'Baños', done: job.id !== 'job-2', required: true },
    { id: 'kitchen', label: 'Cocina', done: true }
  ],
  comments: 'Sin incidencias'
}));

const sessions: CheckInSession[] = jobs.slice(0, 3).map((job, i) => ({
  jobId: job.id,
  startedAt: dayjs(job.scheduledAt).toISOString(),
  endedAt: dayjs(job.scheduledAt).add(80 + i * 5, 'minute').toISOString(),
  timerEvents: [
    { label: 'start', startedAt: dayjs(job.scheduledAt).toISOString() },
    { label: 'stop', startedAt: dayjs(job.scheduledAt).toISOString(), endedAt: dayjs(job.scheduledAt).add(80 + i * 5, 'minute').toISOString() }
  ]
}));

const kpis: KPI[] = [
  {
    employeeId: 'emp-1',
    period: 'week',
    jobsDone: 5,
    avgTime: 78,
    avgRating: 4.7,
    recurringRate: 0.4,
    cancellations: 1,
    revenue: 380,
    distanceKm: 24
  }
];

const leads: Lead[] = [
  {
    id: uuid(),
    source: 'Portal Limpio',
    url: 'https://example.com/oportunidad-1',
    title: 'Limpieza semanal piso 90m2',
    location: 'Madrid',
    price: 55
  },
  {
    id: uuid(),
    source: 'Ofertas Oficinas',
    url: 'https://example.com/oficina-2',
    title: 'Oficina 300m2',
    location: 'Madrid Centro',
    price: 210
  }
];

export default {
  employees,
  clients,
  jobs,
  evidences,
  sessions,
  kpis,
  leads
};
