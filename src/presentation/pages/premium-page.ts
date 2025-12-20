import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '../components/base';
import '../components/ac-card';
import '../components/ac-icon';
import { startTrial, upgrade, getState, subscribe } from '../state/store';

@customElement('premium-page')
export class PremiumPage extends BaseComponent {
  @state() declare plan: string;
  private unsub?: () => void;

  connectedCallback(): void {
    super.connectedCallback();
    this.plan = getState().settings.plan;
    this.unsub = subscribe((s) => (this.plan = s.settings.plan));
  }

  disconnectedCallback(): void {
    this.unsub?.();
  }

  render() {
    return html`
      <section class="space-y-4">
        <ac-card>
          <div class="flex items-start gap-3">
            <ac-icon name="trophy" size="28" color="#f59e0b"></ac-icon>
            <div>
              <p class="text-sm text-slate-500">Prueba Premium</p>
              <h2 class="text-xl font-bold text-slate-900">Limpia como un Pro</h2>
              <p class="text-sm text-slate-600">Desbloquea KPIs avanzados, ranking y priorización de leads.</p>
            </div>
          </div>
          <ul class="mt-3 text-sm text-slate-700 space-y-1">
            <li class="flex items-center gap-2"><ac-icon name="check" size="16"></ac-icon> KPIs avanzados y ranking</li>
            <li class="flex items-center gap-2"><ac-icon name="check" size="16"></ac-icon> Historial de clientes + notas</li>
            <li class="flex items-center gap-2"><ac-icon name="check" size="16"></ac-icon> Prioridad en Mercado</li>
            <li class="flex items-center gap-2"><ac-icon name="check" size="16"></ac-icon> Informe PDF firmado</li>
          </ul>
          <div class="flex gap-2 mt-4">
            <button
              class="flex-1 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 text-white font-semibold shadow"
              @click=${startTrial}
            >
              Probar 7 días
            </button>
            <button
              class="flex-1 px-4 py-3 rounded-full bg-slate-900 text-white font-semibold"
              @click=${() => upgrade('PRO_EMPLOYEE')}
            >
              Mejorar ahora
            </button>
          </div>
          <p class="text-xs text-slate-500 mt-2">Invita a 3 amigos para un 20% OFF extra.</p>
        </ac-card>
      </section>
    `;
  }
}
