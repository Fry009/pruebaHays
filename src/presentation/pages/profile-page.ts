import '../components/ac-badge';
import '../components/ac-button';
import '../components/ac-card';
import '../components/ac-chip';
import '../components/ac-icon';

import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { v4 as uuid } from 'uuid';

import { BaseComponent } from '../components/base';
import { getState, setAccent, startTrial, subscribe, toggleTheme, upgrade } from '../state/store';

@customElement('profile-page')
export class ProfilePage extends BaseComponent {
  @state() declare employee: ReturnType<typeof getState>['employee'];
  @state() declare flags: ReturnType<typeof getState>['flags'];
  @state() declare settings: ReturnType<typeof getState>['settings'];
  @state() declare referral: string;

  private unsub?: () => void;

  connectedCallback(): void {
    super.connectedCallback();
    const state = getState();
    this.employee = state.employee;
    this.flags = state.flags;
    this.settings = state.settings;
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

  private themeLabel() {
    return this.settings.theme === 'dark' ? 'Oscuro' : 'Claro';
  }

  private badgeTone(color: string): 'green' | 'blue' | 'yellow' {
    if (color === 'blue' || color === 'yellow') return color;
    return 'green';
  }

  render() {
    const plan = this.flags?.plan ?? 'FREE';
    const accent = this.settings.accent;
    return html`
      <section class="space-y-3 fade-up max-w-[520px] mx-auto">
        <ac-card variant="glass">
          <div class="flex items-center gap-3">
            <img class="w-14 h-14 rounded-full" src=${this.employee?.avatar} alt="avatar" />
            <div class="flex-1">
              <p class="font-extrabold text-strong">${this.employee?.name ?? '—'}</p>
              <p class="text-xs text-muted">
                Nivel ${this.employee?.level ?? '—'} · ${this.employee?.ratingAvg ?? '—'}★
              </p>
            </div>
            <ac-chip color="blue">${plan}</ac-chip>
          </div>
          <div class="mt-3 flex gap-2 flex-wrap">
            ${this.employee?.badges.map(
              (badge) =>
                html`<ac-badge .label=${badge.label} .color=${this.badgeTone(badge.color)}></ac-badge>`
            )}
          </div>
        </ac-card>

        <ac-card variant="glass">
          <h3 class="font-semibold">Premium</h3>
          <p class="text-sm text-muted mt-1">
            Desbloquea exportar PDF, historial de clientes, KPIs avanzados, ranking y smart tips.
          </p>
          <div class="grid grid-cols-2 gap-2 mt-3">
            <ac-button block @click=${() => upgrade('PRO_EMPLOYEE')}>Activar PRO</ac-button>
            <ac-button block variant="ghost" @click=${startTrial}>Probar 7 días</ac-button>
          </div>
        </ac-card>

        <ac-card variant="glass">
          <div class="flex items-center justify-between">
            <span class="font-semibold">Tema</span>
            <button class="chip-btn" @click=${toggleTheme}>${this.themeLabel()}</button>
          </div>
          <div class="mt-3">
            <p class="text-sm text-muted mb-2">Colores</p>
            <div class="flex gap-2">
              <button
                class="chip-btn ${accent === 'ocean' ? 'selected' : ''}"
                @click=${() => setAccent('ocean')}
              >
                Océano
              </button>
              <button
                class="chip-btn ${accent === 'forest' ? 'selected' : ''}"
                @click=${() => setAccent('forest')}
              >
                Bosque
              </button>
              <button
                class="chip-btn ${accent === 'sunset' ? 'selected' : ''}"
                @click=${() => setAccent('sunset')}
              >
                Atardecer
              </button>
            </div>
          </div>
        </ac-card>

        <ac-card variant="glass">
          <div class="flex items-center gap-3">
            <div class="icon-btn" aria-hidden="true">
              <ac-icon name="sparkle" size="18" color="var(--accent-strong)"></ac-icon>
            </div>
            <div>
              <p class="font-semibold">Invita amigos</p>
              <p class="text-sm text-muted">Comparte y consigue 20% OFF en Premium.</p>
            </div>
          </div>
          <div class="mt-3 flex items-center gap-2">
            <code
              class="px-3 py-2 rounded-xl border text-sm font-semibold"
              style="border-color: var(--border); background: var(--surface-strong); color: var(--text);"
              >${this.referral}</code
            >
            <button
              class="px-3 py-2 rounded-full text-white font-bold shadow active:scale-95 transition"
              style="background: linear-gradient(120deg, var(--primary-start), var(--primary-end));"
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
