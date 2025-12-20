import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRouter } from './router';
import './components';
import './styles/tailwind.css';
import {
  AppState,
  clearError,
  getState,
  initStore,
  subscribe,
  syncNow
} from './state/store';
import './components/ac-app-shell';

@customElement('app-root')
export class AppRoot extends LitElement {
  @state() declare syncing: boolean;
  @state() declare error?: string;
  @state() declare path: string;
  @state() declare appState?: AppState;

  constructor() {
    super();
    this.syncing = false;
    this.error = undefined;
    this.path = window.location.pathname;
  }

  protected createRenderRoot() {
    return this;
  }

  async firstUpdated() {
    await initStore();
    const outlet = this.querySelector('#router-outlet');
    if (outlet) createRouter(outlet);
    subscribe((s) => {
      this.appState = s;
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
    window.addEventListener('vaadin-router-location-changed', () => {
      this.path = window.location.pathname;
    });
  }

  private go(path: string) {
    window.history.pushState({}, '', path);
    this.path = path;
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    return html`
      <ac-app-shell
        .activePath=${this.path}
        @navigate=${(e: CustomEvent<string>) => this.go(e.detail)}
      >
        <header class="sticky top-0 z-20 px-4 pt-3 pb-2">
          <div
            class="flex items-center justify-between bg-white/70 border border-white/60 shadow-card rounded-2xl px-4 py-3 backdrop-blur"
          >
            <div class="flex items-center gap-2">
              <ac-icon name="menu" size="20"></ac-icon>
              <div class="flex flex-col">
                <span class="text-xs text-slate-500">Clean Today</span>
                <span class="text-lg font-bold text-slate-900">Hola, ${this.appState?.employee?.name ?? 'Fran'}</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button class="p-2 rounded-full bg-white/90 shadow" title="Notificaciones">
                <ac-icon name="bell" size="18" color="#0ea5e9"></ac-icon>
              </button>
              <button
                class="px-3 py-2 rounded-full text-white font-semibold"
                style="background: linear-gradient(120deg, var(--primary-start), var(--primary-end)); box-shadow: 0 10px 25px rgba(14,165,233,0.25);"
                @click=${syncNow}
              >
                ${this.syncing ? 'Sincronizando' : 'Conectar'}
              </button>
            </div>
          </div>
        </header>
        <main id="router-outlet" class="pb-28 px-4"></main>
      </ac-app-shell>
      <ac-toast id="toast" .message=${this.error ?? ''} variant="error"></ac-toast>
    `;
  }
}
