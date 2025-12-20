import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '../components/base';
import '../components/ac-card';
import { getState, importLead, subscribe } from '../state/store';

@customElement('leads-page')
export class LeadsPage extends BaseComponent {
  @state() declare leads: ReturnType<typeof getState>['leads'];

  private unsub?: () => void;

  connectedCallback(): void {
    super.connectedCallback();
    this.leads = getState().leads;
    this.unsub = subscribe((s) => (this.leads = s.leads));
  }

  disconnectedCallback(): void {
    this.unsub?.();
  }

  render() {
    return html`<section class="p-4 space-y-3 pb-24">
      <h2 class="text-xl font-bold">Leads externos</h2>
      ${this.leads.map(
        (lead) => html`<ac-card>
          <p class="font-semibold">${lead.title}</p>
          <p class="text-sm text-slate-500">${lead.location} · €${lead.price}</p>
          <div class="flex justify-between items-center mt-2">
            <a class="text-sky-500 text-sm" href=${lead.url} target="_blank">Ver origen</a>
            <button class="text-sky-500" @click=${() => importLead(lead.id, 'cli-1')}>
              Convertir a job
            </button>
          </div>
        </ac-card>`
      )}
    </section>`;
  }
}
