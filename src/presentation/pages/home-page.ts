import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '../components/base';
import '../components/ac-card';
import '../components/ac-chip';
import '../components/ac-icon';
import '../components/ac-skeleton';
import { subscribe, startCheckIn, getState } from '../state/store';
import dayjs from 'dayjs';

@customElement('home-page')
export class HomePage extends BaseComponent {
  @state() declare now: Date;
  @state() declare loading: boolean;
  @state() declare jobs: ReturnType<typeof getState>['jobs'];

  private unsub?: () => void;

  connectedCallback(): void {
    super.connectedCallback();
    this.now = new Date();
    this.loading = false;
    this.jobs = getState().jobs;
    this.unsub = subscribe((s) => (this.jobs = s.jobs));
  }

  disconnectedCallback(): void {
    this.unsub?.();
  }

  private nextJobs() {
    return this.jobs
      .filter((job) => dayjs(job.scheduledAt).isAfter(dayjs().subtract(1, 'day')))
      .slice(0, 4);
  }

  render() {
    const todayJobs = this.nextJobs();
    const tip =
      todayJobs.length > 0 && todayJobs[0].durationEstimate > 80
        ? 'Divide en bloques y añade foto final para cerrar más rápido.'
        : 'Si tardas >90min revisa checklist premium para optimizar.';
    return html`
      <section class="space-y-4 fade-up">
        <ac-card>
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm text-slate-600">Servicios del día</p>
              <h2 class="text-2xl font-extrabold text-slate-900 leading-tight">
                Listos para ti
              </h2>
              <p class="text-sm text-slate-500">Optimiza tu ruta y gana tiempo</p>
            </div>
            <button
              class="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 text-white font-bold shadow hover:scale-95 transition"
              @click=${() => todayJobs[0]?.id && startCheckIn(todayJobs[0].id)}
            >
              Iniciar
            </button>
          </div>
        </ac-card>

        <div class="space-y-3">
          <p class="text-sm font-semibold text-slate-600">Próximos servicios</p>
          ${this.loading
            ? html`<div class="grid gap-2">
                <ac-skeleton width="320" height="80"></ac-skeleton>
                <ac-skeleton width="300" height="80"></ac-skeleton>
              </div>`
            : todayJobs.map(
                (job) => html`
                  <ac-card>
                    <div class="flex justify-between items-start gap-3">
                      <div class="flex flex-col gap-1">
                        <span class="text-xs text-slate-500">${dayjs(job.scheduledAt).format('HH:mm')}</span>
                        <p class="font-semibold text-slate-800 uppercase tracking-wide">
                          ${job.type} · ${job.clientId}
                        </p>
                        <p class="text-xs text-slate-500 flex items-center gap-2">
                          <ac-icon name="map-pin" size="14"></ac-icon>
                          ${Math.round((job.durationEstimate / 60) * 2)} km · ${job.durationEstimate} min
                        </p>
                      </div>
                      <div class="text-right space-y-2">
                        <p class="font-semibold text-emerald-600">€${job.price.amount}</p>
                        <button
                          class="px-3 py-1 rounded-full bg-slate-900 text-white text-sm font-semibold hover:scale-95 transition"
                          @click=${() => (window.location.href = `/jobs/${job.id}`)}
                        >
                          Ver
                        </button>
                      </div>
                    </div>
                  </ac-card>
                `
              )}
        </div>

        <ac-card>
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center shadow"
            >
              <ac-icon name="sparkle" size="18" color="#f97316"></ac-icon>
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-800">Smart tip</p>
              <p class="text-sm text-slate-600">${tip}</p>
            </div>
          </div>
        </ac-card>

        <ac-card>
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm text-slate-500">Información</p>
              <p class="font-semibold text-slate-900">Estás usando la versión gratuita.</p>
              <p class="text-sm text-slate-600">
                Mejora a Premium y desbloquea KPIs avanzados y priorización inteligente.
              </p>
            </div>
            <button
              class="px-4 py-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold shadow hover:scale-95 transition"
              @click=${() => (window.location.href = '/premium')}
            >
              Probar Premium
            </button>
          </div>
        </ac-card>
      </section>
    `;
  }
}
