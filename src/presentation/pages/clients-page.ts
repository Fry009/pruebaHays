import '../components/ac-card';

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { BaseComponent } from '../components/base';

@customElement('clients-page')
export class ClientsPage extends BaseComponent {
  render() {
    return html`
      <section class="space-y-3">
        <ac-card>
          <h2 class="text-xl font-bold">Clientes</h2>
          <p class="text-sm text-slate-600">Listado y notas avanzadas disponible en Premium.</p>
        </ac-card>
      </section>
    `;
  }
}
