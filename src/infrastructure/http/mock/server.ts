import { db } from '../../storage/dexieClient';
import demoData from '@shared/demoData';

let enabled = false;

const euro = (amount: number) => ({ amount, currency: 'EUR' as const });

export function setupMockServer() {
  if (enabled || typeof window === 'undefined') return;
  enabled = true;
  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.toString();
    if (url.startsWith('/api/leads')) {
      const method = (init?.method || 'GET').toUpperCase();
      if (method === 'GET') {
        const leads = await db.leads.toArray();
        return new Response(JSON.stringify(leads), { status: 200 });
      }
      if (method === 'POST' && url.endsWith('/refresh')) {
        await db.leads.bulkPut([
          ...demoData.leads,
          {
            id: crypto.randomUUID(),
            source: 'milanuncios',
            title: 'Limpieza express Malasaña',
            description: '2h hoy',
            url: 'https://example.com/lead',
            location: 'Madrid',
            price: euro(55),
            distanceKm: 1.2,
            postedHoursAgo: 1,
            type: 'hogar',
            status: 'unhandled',
            createdAt: new Date().toISOString()
          }
        ]);
        const leads = await db.leads.toArray();
        return new Response(JSON.stringify(leads), { status: 200 });
      }
      const matchAction = url.match(/\/api\/leads\/(.+)\/(save|discard|convert-to-job)/);
      if (method === 'POST' && matchAction) {
        const [, id, action] = matchAction;
        if (action === 'save') await db.leads.update(id, { status: 'saved' });
        if (action === 'discard') await db.leads.update(id, { status: 'discarded' });
        if (action === 'convert-to-job') await db.leads.update(id, { status: 'saved' });
        const lead = await db.leads.get(id);
        return new Response(JSON.stringify(lead), { status: 200 });
      }
    }
    return originalFetch(input, init);
  };
}
