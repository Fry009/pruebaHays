import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '../components/base';
import '../components/ac-card';
import '../components/ac-button';
import '../components/ac-tabs';
import { subscribe, startCheckIn, getState } from '../state/store';
import dayjs from 'dayjs';

@customElement('home-page')
export class HomePage extends BaseComponent {
  @state() declare now: Date;
  @state() declare jobs: ReturnType<typeof getState>['jobs'];

  private unsub?: () => void;

  connectedCallback(): void {
    super.connectedCallback();
    this.now = new Date();
    this.jobs = getState().jobs;
    this.unsub = subscribe((s) => (this.jobs = s.jobs));
  }

  disconnectedCallback(): void {
    this.unsub?.();
  }

  render() {
    const todayJobs = this.jobs.filter((job) => dayjs(job.scheduledAt).isSame(dayjs(), 'day'));
    const tip =
      todayJobs.length > 0 && todayJobs[0].durationEstimate > 80
        ? 'Tip: divide el servicio en bloques y registra pausas cortas.'
        : 'Tip: si tardas >90min revisa checklist premium para optimizar.';
    return html`
      <section class="p-4 pb-28 space-y-4 fade-up">
        <div
          class="rounded-2xl p-5 text-white"
          style="background: linear-gradient(135deg, #0ea5e9, #22c55e); box-shadow: 0 20px 60px rgba(14,165,233,0.35);"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-xs uppercase tracking-wide opacity-90">Dashboard</p>
              <h2 class="text-2xl font-extrabold">Hoy</h2>
              <p class="text-sm opacity-90">Servicios del día listos para ti</p>
            </div>
            <button
              class="pill bg-white/20 px-3 py-2 text-xs font-bold"
              @click=${() => todayJobs[0]?.id && startCheckIn(todayJobs[0].id)}
            >
              ▶ Iniciar
            </button>
          </div>
        </div>
        <div class="space-y-3">
          ${todayJobs.map(
            (job) => html`<div
              class="rounded-2xl p-4 shadow-lg border border-white/60 bg-white/90 backdrop-blur-md fade-up"
              style="background: linear-gradient(135deg, rgba(34,197,94,0.12), rgba(255,255,255,0.9));"
            >
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-xs text-slate-500">${dayjs(job.scheduledAt).format('HH:mm')}</p>
                  <p class="font-semibold">${job.type.toUpperCase()} - ${job.clientId}</p>
                  <p class="text-xs text-slate-500">€${job.price}</p>
                </div>
                <ac-button style="width:120px" @click=${() => (window.location.href = `/jobs/${job.id}`)}
                  >Ver</ac-button
                >
              </div>
            </div>`
          )}
        </div>
        <div class="glass rounded-2xl p-4">
          <p class="text-sm font-semibold">Smart tip</p>
          <p class="text-sm text-slate-600">${tip}</p>
        </div>
      </section>
      <ac-tabs value="home"></ac-tabs>
    `;
  }
}
