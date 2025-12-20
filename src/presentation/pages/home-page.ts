import '../components/ac-card';
import '../components/ac-icon';
import '../components/ac-skeleton';

import dayjs from 'dayjs';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { BaseComponent } from '../components/base';
import { getState, startCheckIn, subscribe } from '../state/store';

@customElement('home-page')
export class HomePage extends BaseComponent {
  @state() declare loading: boolean;
  @state() declare jobs: ReturnType<typeof getState>['jobs'];
  @state() declare employeeName: string;

  private unsub?: () => void;

  connectedCallback(): void {
    super.connectedCallback();
    this.loading = false;
    const state = getState();
    this.jobs = state.jobs;
    this.employeeName = state.employee?.name ?? 'Fran';
    this.unsub = subscribe((s) => {
      this.jobs = s.jobs;
      this.employeeName = s.employee?.name ?? 'Fran';
    });
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
      <section class="space-y-4 fade-up max-w-[520px] mx-auto">
        <div class="px-1">
          <h1 class="text-2xl font-extrabold text-strong">Hoy, ${this.employeeName}</h1>
          <p class="text-sm text-muted">Servicios del día</p>
        </div>

        <ac-card variant="hero">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-sm text-white/80">Servicios del día listos para ti</p>
              <h2 class="text-2xl font-extrabold leading-tight">Listos para ti</h2>
              <p class="text-sm text-white/80">Optimiza tu ruta y gana tiempo</p>
            </div>
            <button
              class="px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white font-bold shadow backdrop-blur active:scale-95 transition"
              @click=${() => todayJobs[0]?.id && startCheckIn(todayJobs[0].id)}
            >
              <span class="inline-flex items-center gap-2">
                <ac-icon name="bolt" size="16" color="currentColor"></ac-icon>
                Iniciar
              </span>
            </button>
          </div>
        </ac-card>

        <ac-card variant="glass">
          <p class="text-sm font-semibold text-muted mb-2">Próximo servicio</p>
          ${todayJobs[0]
            ? html`
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <p class="text-lg font-bold">
                      ${dayjs(todayJobs[0].scheduledAt).format('HH:mm')} ·
                      ${todayJobs[0].type.toUpperCase()} - ${todayJobs[0].clientId}
                    </p>
                    <p class="text-sm text-muted">${todayJobs[0].price.amount}€ · 2 km</p>
                  </div>
                  <button class="chip-btn" style="box-shadow: var(--shadow-soft);">Ver</button>
                </div>
              `
            : html`<p class="text-sm text-muted">Sin servicios hoy</p>`}
        </ac-card>

        <ac-card variant="glass">
          <p class="text-sm font-semibold text-muted mb-2">Próximos servicios</p>
          ${this.loading
            ? html`
                <div class="grid gap-2">
                  <ac-skeleton width="320" height="80"></ac-skeleton>
                  <ac-skeleton width="300" height="80"></ac-skeleton>
                </div>
              `
            : todayJobs.map(
                (job) => html`
                  <div
                    class="flex justify-between items-center py-2 border-b last:border-none"
                    style="border-color: var(--border);"
                  >
                    <div>
                      <p class="text-xs text-muted">${dayjs(job.scheduledAt).format('HH:mm')}</p>
                      <p class="font-semibold uppercase tracking-wide">${job.type} · ${job.clientId}</p>
                      <p class="text-xs text-muted flex items-center gap-2">
                        <ac-icon name="map-pin" size="14"></ac-icon>
                        ${Math.round((job.durationEstimate / 60) * 2)} km · ${job.durationEstimate}
                        min
                      </p>
                    </div>
                    <div class="text-right space-y-2">
                      <p class="font-semibold" style="color: var(--accent-strong);">${job.price.amount}€</p>
                      <button
                        class="chip-btn"
                        @click=${() => (window.location.href = `/jobs/${job.id}`)}
                      >
                        Ver
                      </button>
                    </div>
                  </div>
                `
              )}
        </ac-card>

        <ac-card variant="glass">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center shadow"
              style="background: linear-gradient(135deg, color-mix(in srgb, var(--primary-start) 35%, white 65%), color-mix(in srgb, var(--primary-end) 35%, white 65%));"
              aria-hidden="true"
            >
              <ac-icon name="sparkle" size="18" color="var(--accent-strong)"></ac-icon>
            </div>
            <div>
              <p class="text-sm font-semibold">Smart tip</p>
              <p class="text-sm text-muted">${tip}</p>
            </div>
          </div>
        </ac-card>

        <ac-card variant="glass">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm text-muted">Información</p>
              <p class="font-semibold">Estás usando la versión gratuita.</p>
              <p class="text-sm text-muted">
                Mejora a Premium y desbloquea KPIs avanzados y priorización inteligente.
              </p>
            </div>
            <button
              class="px-4 py-2 rounded-full text-white font-bold shadow hover:scale-95 transition"
              style="background: linear-gradient(120deg, var(--primary-start), var(--primary-end));"
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
