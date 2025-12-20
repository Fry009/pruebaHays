import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '../components/base';
import '../components/ac-card';
import '../components/ac-chip';
import '../components/ac-progress';
import '../components/ac-icon';
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
    return html`
      <section class="space-y-4 fade-up">
        <ac-card>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-wide text-slate-500">Ruta del día</p>
              <h2 class="text-xl font-extrabold text-slate-900">Servicios</h2>
              <p class="text-sm text-slate-600">
                Optimiza tu ruta, detecta tiempos muertos y cumple checklist.
              </p>
            </div>
            <ac-chip color="blue">Hoy</ac-chip>
          </div>
        </ac-card>

        <div class="grid gap-3">
          ${sorted.map((job) => {
            const statusColor =
              job.status === 'done' ? 'green' : job.status === 'in_progress' ? 'blue' : 'amber';
            return html`
              <ac-card>
                <div class="flex justify-between items-start gap-3">
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <span class="pill text-xs bg-white/70 border border-white/40">
                        ${dayjs(job.scheduledAt).format('DD MMM · HH:mm')}
                      </span>
                      <ac-chip color=${statusColor as any}>${job.status}</ac-chip>
                    </div>
                    <p class="text-lg font-bold capitalize">${job.type}</p>
                    <p class="text-sm text-slate-600">Estimado: ${job.durationEstimate} min</p>
                    <p class="text-sm font-semibold text-emerald-600">€${job.price.amount}</p>
                  </div>
                  <button
                    class="text-[var(--accent-strong)] font-semibold flex items-center gap-1"
                    @click=${() => (window.location.href = `/jobs/${job.id}`)}
                  >
                    Detalle
                    <ac-icon name="chevron-right" size="14"></ac-icon>
                  </button>
                </div>
                <div class="mt-3">
                  <ac-progress value=${Math.min(100, job.status === 'done' ? 100 : 30)}></ac-progress>
                </div>
              </ac-card>
            `;
          })}
        </div>
      </section>
    `;
  }
}
