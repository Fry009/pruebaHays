import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BaseComponent } from '../components/base';
import '../components/ac-card';
import '../components/ac-badge';
import '../components/ac-button';
import '../components/ac-chip';
import '../components/ac-icon';
import { getState, setAccent, subscribe, toggleTheme, upgrade, startTrial } from '../state/store';
import { v4 as uuid } from 'uuid';

@customElement('profile-page')
export class ProfilePage extends BaseComponent {
  @state() declare employee: ReturnType<typeof getState>['employee'];
  @state() declare flags: ReturnType<typeof getState>['flags'];
  @state() declare settings: ReturnType<typeof getState>['settings'];
  @state() declare referral: string;

  private unsub?: () => void;

  connectedCallback(): void {
    super.connectedCallback();
    this.employee = getState().employee;
    this.flags = getState().flags;
    this.settings = getState().settings;
    this.referral = this.settings.referralCode || uuid().slice(0, 6).toUpperCase();
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
      <section class="space-y-3">
        <ac-card>
          <div class="flex items-center gap-3">
            <img class="w-14 h-14 rounded-full" src=${this.employee?.avatar} alt="avatar" />
            <div>
              <p class="font-bold">${this.employee?.name}</p>
              <p class="text-xs text-slate-500">Nivel ${this.employee?.level} · ${this.employee?.ratingAvg}★</p>
            </div>
            <ac-chip color="blue">${this.flags?.plan ?? 'FREE'}</ac-chip>
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
            <ac-button variant="ghost" @click=${startTrial}>Probar 7 días</ac-button>
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

        <ac-card>
          <div class="flex items-center gap-2">
            <ac-icon name="sparkle" size="20" color="#f59e0b"></ac-icon>
            <div>
              <p class="font-semibold text-slate-800">Invita amigos</p>
              <p class="text-sm text-slate-600">Comparte y consigue 20% OFF Premium.</p>
            </div>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <code class="px-3 py-2 rounded-lg bg-white/70 border">${this.referral}</code>
            <button
              class="px-3 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold"
              @click=${() => navigator.clipboard.writeText(this.referral)}
            >
              Copiar
            </button>
          </div>
        </ac-card>
      </section>
    `;
  }
}
