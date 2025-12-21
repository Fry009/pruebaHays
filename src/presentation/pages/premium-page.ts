import '../components/ac-icon';

import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { BaseComponent } from '../components/base';
import { getState, startTrial, subscribe, upgrade } from '../state/store';

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

  private close() {
    window.history.back();
  }

  render() {
    const isPro = this.plan !== 'FREE';
    return html`
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        style="background: rgba(2, 6, 23, 0.18); -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);"
        @click=${this.close}
      >
        <div
          class="relative w-full max-w-[420px] rounded-[26px] border p-5 shadow"
          style="background: linear-gradient(160deg, color-mix(in srgb, var(--surface-strong) 92%, white 8%), var(--surface)); border-color: var(--border); box-shadow: var(--shadow-strong);"
          @click=${(e: Event) => e.stopPropagation()}
        >
          <button class="icon-btn absolute right-4 top-4" aria-label="Cerrar" @click=${this.close}>
            <ac-icon name="close" size="18" color="var(--muted)"></ac-icon>
          </button>

          <div class="flex items-center justify-center">
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center"
              style="background: linear-gradient(135deg, color-mix(in srgb, #fbbf24 40%, white 60%), color-mix(in srgb, #fb7185 35%, white 65%)); box-shadow: 0 18px 40px rgba(251, 113, 133, 0.25);"
              aria-hidden="true"
            >
              <ac-icon name="trophy" size="26" color="#7c2d12"></ac-icon>
            </div>
          </div>

          <div class="mt-4 text-center">
            <h2 class="text-2xl font-extrabold text-strong">Prueba Premium 🚀</h2>
            <p class="text-sm text-muted mt-1">Limpia como un Pro!</p>
          </div>

          <div
            class="mt-4 rounded-2xl border p-4"
            style="background: var(--surface); border-color: var(--border); box-shadow: var(--shadow-soft);"
          >
            <p class="font-semibold">Beneficios</p>
            <ul class="mt-3 space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <ac-icon name="check" size="18" color="var(--accent-strong)"></ac-icon>
                <span>KPIs avanzados y ranking</span>
              </li>
              <li class="flex items-start gap-2">
                <ac-icon name="check" size="18" color="var(--accent-strong)"></ac-icon>
                <span>Historial de clientes + notas privadas</span>
              </li>
              <li class="flex items-start gap-2">
                <ac-icon name="check" size="18" color="var(--accent-strong)"></ac-icon>
                <span>Informes PDF firmados por cliente</span>
              </li>
              <li class="flex items-start gap-2">
                <ac-icon name="check" size="18" color="var(--accent-strong)"></ac-icon>
                <span>Prioridad y filtros avanzados en Mercado</span>
              </li>
            </ul>
          </div>

          <button
            class="mt-4 w-full px-4 py-3 rounded-full text-white font-extrabold shadow active:scale-95 transition"
            style="background: linear-gradient(120deg, var(--primary-start), var(--primary-end)); box-shadow: 0 18px 44px rgba(14,165,233,0.22);"
            @click=${isPro ? this.close : startTrial}
          >
            ${isPro ? '¡Ya eres PRO!' : 'Mejorar ahora →'}
          </button>

          <p class="text-xs text-muted text-center mt-3">Invita a 3 amigos para un 20% OFF +++</p>

          <button
            class="mt-3 w-full px-4 py-3 rounded-full font-bold border active:scale-95 transition"
            style="background: var(--surface-strong); border-color: var(--border); color: var(--text); box-shadow: var(--shadow-soft);"
            @click=${isPro ? this.close : () => upgrade('PRO_EMPLOYEE')}
          >
            Ver plan PRO
          </button>
        </div>
      </div>
    `;
  }
}
