import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '../components/base';
import '../components/ac-card';
import '../components/ac-badge';
import '../components/ac-button';
import '../components/ac-tabs';
import { getState, setAccent, subscribe, toggleTheme, upgrade } from '../state/store';

@customElement('profile-page')
export class ProfilePage extends BaseComponent {
  @state() declare employee: ReturnType<typeof getState>['employee'];
  @state() declare flags: ReturnType<typeof getState>['flags'];
  @state() declare settings: ReturnType<typeof getState>['settings'];

  private unsub?: () => void;

  connectedCallback(): void {
    super.connectedCallback();
    this.employee = getState().employee;
    this.flags = getState().flags;
    this.settings = getState().settings;
    this.unsub = subscribe((s) => {
      this.employee = s.employee;
      this.flags = s.flags;
      this.settings = s.settings;
    });
  }

  disconnectedCallback(): void {
    this.unsub?.();
  }

  render() {
    return html`
      <section class="p-4 pb-24 space-y-3">
        <ac-card>
          <div class="flex items-center gap-3">
            <img class="w-14 h-14 rounded-full" src=${this.employee?.avatar} alt="avatar" />
            <div>
              <p class="font-bold">${this.employee?.name}</p>
              <p class="text-xs text-slate-500">Nivel ${this.employee?.level} · ⭐ ${this.employee?.ratingAvg}</p>
            </div>
            <span class="ml-auto text-sm text-sky-500">${this.flags?.plan}</span>
          </div>
          <div class="mt-3 flex gap-2 flex-wrap">
            ${this.employee?.badges.map(
              (badge) => html`<ac-badge label=${badge.label} color=${badge.color as any}></ac-badge>`
            )}
          </div>
        </ac-card>
        <ac-card>
          <h3 class="font-semibold mb-2">Premium</h3>
          <p class="text-sm text-slate-500">
            Desbloquea exportar PDF, historial clientes, KPIs avanzados, ranking y smart tips.
          </p>
          <div class="flex gap-2 mt-3">
            <ac-button @click=${() => upgrade('PRO_EMPLOYEE')}>Activar Pro</ac-button>
            <ac-button variant="ghost" @click=${() => upgrade('PRO_TEAM')}>Pro Equipo</ac-button>
          </div>
        </ac-card>
        <ac-card>
          <div class="flex items-center justify-between">
            <span>Tema</span>
            <button class="text-sky-500" @click=${toggleTheme}>${this.settings.theme}</button>
          </div>
          <div class="mt-3">
            <p class="text-sm text-slate-500 mb-2">Colores</p>
            <div class="flex gap-2">
              ${['ocean', 'forest', 'sunset'].map(
                (theme) => html`<button
                  class="px-3 py-2 rounded-xl border ${this.settings.accent === theme
                    ? 'border-sky-500'
                    : 'border-slate-200'}"
                  @click=${() => setAccent(theme as any)}
                >
                  ${theme}
                </button>`
              )}
            </div>
          </div>
        </ac-card>
      </section>
      <ac-tabs value="profile"></ac-tabs>
    `;
  }
}
