import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRouter } from './router';
import './components';
import './styles/tailwind.css';
import { clearError, getState, initStore, subscribe, syncNow } from './state/store';

@customElement('app-root')
export class AppRoot extends LitElement {
  @state() declare syncing: boolean;
  @state() declare error?: string;

  constructor() {
    super();
    this.syncing = false;
    this.error = undefined;
  }

  protected createRenderRoot() {
    return this;
  }

  async firstUpdated() {
    await initStore();
    const outlet = this.querySelector('#router-outlet');
    if (outlet) createRouter(outlet);
    subscribe((s) => {
      this.syncing = s.syncing;
      this.error = s.error;
      if (s.error) {
        (this.querySelector('#toast') as any)?.show(s.error, 'error');
        clearError();
      }
    });
    const settings = getState().settings;
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    document.documentElement.classList.add(`theme-${settings.accent}`);
  }

  render() {
    return html`
      <header
        class="sticky top-0 z-30 border-b border-slate-200/60 backdrop-blur-xl"
        style="background: linear-gradient(90deg, rgba(14,165,233,0.16), rgba(94,234,212,0.12));"
      >
        <div class="px-4 py-3 flex items-center justify-between app-shell">
          <div class="font-bold text-lg flex items-center gap-2">
            <span class="text-xl">🧼</span> Clean Today
          </div>
          <div class="flex items-center gap-2">
            <button class="text-sky-700 font-semibold" @click=${syncNow}>
              ${this.syncing ? 'Sincronizando...' : 'Conectar/Sync'}
            </button>
            <button class="text-slate-500 text-xl">⋮</button>
          </div>
        </div>
      </header>
      <main id="router-outlet" class="app-shell pb-20"></main>
      <ac-toast id="toast" .message=${this.error ?? ''} variant="error"></ac-toast>
    `;
  }
}
