import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '../components/base';
import '../components/ac-card';
import '../components/ac-chip';
import '../components/ac-progress';
import '../components/ac-tabs';
import { getState, subscribe } from '../state/store';
import dayjs from 'dayjs';

@customElement('jobs-page')
export class JobsPage extends BaseComponent {
  @state() declare jobs: ReturnType<typeof getState>['jobs'];

  private unsub?: () => void;

  connectedCallback(): void {
    super.connectedCallback();
    this.jobs = getState().jobs;
    this.unsub = subscribe((s) => (this.jobs = s.jobs));
  }

  disconnectedCallback(): void {
    this.unsub?.();
  }

  render() {
    const sorted = [...this.jobs].sort((a, b) =>
      dayjs(a.scheduledAt).isAfter(dayjs(b.scheduledAt)) ? 1 : -1
    );
    const days = Array.from(
      new Set(sorted.map((job) => dayjs(job.scheduledAt).format('DD MMM')))
    );
    return html`
      <section class="p-4 pb-28 space-y-4 fade-up">
        <div class="glass rounded-2xl p-4">
          <p class="text-xs uppercase tracking-wide text-slate-500 mb-1">Ruta del día</p>
          <h2 class="text-2xl font-extrabold text-slate-900">Servicios</h2>
          <p class="text-sm text-slate-600">
            Optimiza tu ruta, detección de tiempo muerto, recordatorios.
          </p>
          <div class="flex gap-2 mt-3 overflow-x-auto pb-1">
            ${days.map(
              (d) => html`<span
                class="pill px-3 py-2 bg-[var(--accent-weak)] text-[var(--accent-strong)] text-xs"
                >${d}</span
              >`
            )}
          </div>
        </div>
        <div class="grid gap-3">
          ${sorted.map((job, i) => {
            const next = sorted[i + 1];
            const gap =
              next && dayjs(next.scheduledAt).diff(dayjs(job.scheduledAt), 'minute') > 120
                ? dayjs(next.scheduledAt).diff(dayjs(job.scheduledAt), 'minute')
                : 0;
            const statusColor =
              job.status === 'done' ? 'green' : job.status === 'in_progress' ? 'blue' : 'amber';
            return html`<div
              class="rounded-2xl p-4 shadow-lg border border-white/60 bg-white/80 backdrop-blur-md fade-up"
              style="background: linear-gradient(135deg, rgba(14,165,233,0.14), rgba(255,255,255,0.92));"
            >
              <div class="flex justify-between items-start">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="pill text-xs bg-white/70 border border-white/40">
                      ${dayjs(job.scheduledAt).format('DD MMM · HH:mm')}
                    </span>
                    <ac-chip color=${statusColor as any}>${job.status}</ac-chip>
                  </div>
                  <p class="text-lg font-bold mt-2 capitalize">${job.type}</p>
                  <p class="text-sm text-slate-600">Estimado: ${job.durationEstimate} min</p>
                  ${gap
                    ? html`<div class="mt-2 text-xs text-amber-600 font-semibold flex gap-2 items-center">
                        ⏳ Tiempo muerto ${gap}min · sugerir adelantar
                      </div>`
                    : null}
                </div>
                <button
                  class="text-[var(--accent-strong)] font-semibold"
                  @click=${() => (window.location.href = `/jobs/${job.id}`)}
                >
                  Detalle →
                </button>
              </div>
              <div class="mt-3">
                <ac-progress value=${Math.min(100, job.status === 'done' ? 100 : 30)}></ac-progress>
              </div>
            </div>`;
          })}
        </div>
        <div class="glass rounded-2xl p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-wide text-slate-500">Calendario y eventos</p>
              <h3 class="text-lg font-bold">Próximas paradas</h3>
            </div>
            <span class="pill bg-white/80 text-[var(--accent-strong)] text-xs">Nuevo</span>
          </div>
          <div class="mt-3 grid gap-2">
            ${sorted.slice(0, 5).map(
              (job) => html`<div
                class="rounded-xl px-3 py-2 bg-white/70 border border-slate-100 flex items-center justify-between"
              >
                <div>
                  <p class="text-sm font-semibold">${job.type} · ${job.clientId}</p>
                  <p class="text-xs text-slate-500">
                    ${dayjs(job.scheduledAt).format('ddd DD MMM HH:mm')}
                  </p>
                </div>
                <span class="text-xs text-[var(--accent-strong)] font-semibold">Evento</span>
              </div>`
            )}
          </div>
        </div>
      </section>
      <ac-tabs value="jobs"></ac-tabs>
    `;
  }
}
