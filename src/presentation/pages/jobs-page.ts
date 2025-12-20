import '../components/ac-card';
import '../components/ac-chip';
import '../components/ac-icon';
import '../components/ac-progress';

import dayjs from 'dayjs';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { BaseComponent } from '../components/base';
import { getState, subscribe } from '../state/store';

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
      <section class="space-y-3 fade-up max-w-[520px] mx-auto">
        <ac-card variant="glass">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-wide text-muted">Ruta del día</p>
              <h2 class="text-2xl font-extrabold text-strong">Servicios</h2>
              <p class="text-sm text-muted">
                Optimiza tu ruta, detecta tiempos muertos y cumple checklist.
              </p>
            </div>
            <ac-chip color="blue">Hoy</ac-chip>
          </div>
        </ac-card>

        <div class="grid gap-3">
          ${sorted.map((job) => {
            const statusColor: 'green' | 'blue' | 'amber' =
              job.status === 'done' ? 'green' : job.status === 'in_progress' ? 'blue' : 'amber';
            const when = dayjs(job.scheduledAt).format('DD MMM · HH:mm');
            const progress = Math.min(100, job.status === 'done' ? 100 : job.status === 'in_progress' ? 55 : 25);
            return html`
              <ac-card variant="glass">
                <div class="flex justify-between items-start gap-3">
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <span class="pill text-xs" style="background: var(--surface-strong); border: 1px solid var(--border); color: var(--muted);">
                        ${when}
                      </span>
                      <ac-chip .color=${statusColor}>${job.status}</ac-chip>
                    </div>
                    <p class="text-lg font-bold capitalize">${job.type}</p>
                    <p class="text-sm text-muted">Estimado: ${job.durationEstimate} min</p>
                    <p class="text-sm font-semibold" style="color: var(--accent-strong);">
                      ${job.price.amount}€
                    </p>
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
                  <ac-progress value=${progress}></ac-progress>
                </div>
              </ac-card>
            `;
          })}
        </div>
      </section>
    `;
  }
}
