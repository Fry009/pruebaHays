import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '../components/base';
import '../components/ac-card';
import '../components/ac-chip';
import '../components/ac-icon';
import '../components/ac-skeleton';
import {
  getState,
  subscribe,
  listLeads,
  refreshLeads,
  saveLead,
  discardLead,
  convertLead
} from '../state/store';

@customElement('leads-page')
export class LeadsPage extends BaseComponent {
  @state() declare leads: ReturnType<typeof getState>['leads'];
  @state() declare loading: boolean;
  @state() declare filters: { status?: string; source?: string; type?: string };

  private unsub?: () => void;

  connectedCallback(): void {
    super.connectedCallback();
    this.leads = getState().leads;
    this.loading = false;
    this.filters = { status: 'unhandled' };
    this.unsub = subscribe((s) => (this.leads = s.leads));
    queueMicrotask(() => listLeads(this.filters));
  }

  disconnectedCallback(): void {
    this.unsub?.();
  }

  private async applyFilters(next: Partial<typeof this.filters>) {
    this.filters = { ...this.filters, ...next };
    this.loading = true;
    await listLeads(this.filters);
    this.loading = false;
  }

  render() {
    return html`
      <section class="space-y-3">
        <header class="flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-500">Mercado</p>
            <h2 class="text-2xl font-bold text-slate-900">Leads externos</h2>
          </div>
          <button
            class="px-3 py-2 rounded-full bg-gradient-to-r from-sky-400 to-emerald-300 text-white font-semibold shadow"
            @click=${refreshLeads}
          >
            Actualizar
          </button>
        </header>

        <div class="sticky top-2 z-10 bg-transparent">
          <div class="flex gap-2 overflow-x-auto pb-1">
            ${['unhandled', 'saved', 'discarded'].map(
              (status) => html`<button
                class="px-3 py-2 rounded-full text-sm font-semibold border ${this.filters.status === status
                  ? 'bg-slate-900 text-white'
                  : 'bg-white/70 text-slate-600'}"
                @click=${() => this.applyFilters({ status })}
              >
                ${status}
              </button>`
            )}
            ${['milanuncios', 'indeed', 'jobtoday', 'domestiko'].map(
              (source) => html`<button
                class="px-3 py-2 rounded-full text-sm font-semibold border ${this.filters.source === source
                  ? 'bg-sky-100 text-sky-700'
                  : 'bg-white/70 text-slate-600'}"
                @click=${() => this.applyFilters({ source })}
              >
                ${source}
              </button>`
            )}
          </div>
        </div>

        ${this.loading
          ? html`<div class="space-y-2">
              <ac-skeleton width="320" height="110"></ac-skeleton>
              <ac-skeleton width="320" height="110"></ac-skeleton>
            </div>`
          : this.leads.map(
              (lead) => html`
                <ac-card>
                  <div class="flex items-start justify-between gap-3">
                    <div class="space-y-1">
                      <div class="flex items-center gap-2">
                        <ac-chip color="gray">${lead.source}</ac-chip>
                        <ac-chip color="blue">${lead.type.toUpperCase()}</ac-chip>
                      </div>
                      <p class="font-semibold text-slate-900">${lead.title}</p>
                      <p class="text-sm text-slate-600">${lead.location}</p>
                      <p class="text-sm font-semibold text-emerald-600">€${lead.price.amount}</p>
                      <p class="text-xs text-slate-500">
                        ${lead.distanceKm} km · hace ${lead.postedHoursAgo} horas
                      </p>
                    </div>
                    <div class="flex flex-col gap-2">
                      <a
                        class="px-3 py-2 rounded-full bg-sky-500 text-white text-sm font-semibold text-center"
                        href=${lead.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Contactar
                      </a>
                      <button
                        class="px-3 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold"
                        @click=${() => convertLead(lead.id)}
                      >
                        Convertir
                      </button>
                      <div class="flex gap-2">
                        <button
                          class="text-xs text-sky-600 font-semibold"
                          @click=${() => saveLead(lead.id)}
                        >
                          Guardar
                        </button>
                        <button
                          class="text-xs text-rose-500 font-semibold"
                          @click=${() => discardLead(lead.id)}
                        >
                          Descartar
                        </button>
                      </div>
                    </div>
                  </div>
                </ac-card>
              `
            )}
      </section>
    `;
  }
}
