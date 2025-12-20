import './components';
import './styles/tokens.css';
import './styles/tailwind.css';
import './components/ac-app-shell';

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { AcToast } from './components/ac-toast';
import { createRouter } from './router';
import {
  AppState,
  clearError,
  getState,
  initStore,
  subscribe,
  syncNow
} from './state/store';

@customElement('app-root')
export class AppRoot extends LitElement {
  @state() declare syncing: boolean;
  @state() declare error?: string;
  @state() declare path: string;
  @state() declare appState?: AppState;
  @state() declare drawerOpen: boolean;
  private lastTheme?: string;
  private lastAccent?: string;

  constructor() {
    super();
    this.syncing = false;
    this.error = undefined;
    this.path = window.location.pathname;
    this.drawerOpen = false;
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
      this.applyTheme(s.settings);
      if (s.error) {
        (this.querySelector('#toast') as AcToast | null)?.show(s.error, 'error');
        clearError();
      }
    });
    this.applyTheme(getState().settings);
    window.addEventListener('vaadin-router-location-changed', () => {
      this.path = window.location.pathname;
    });
  }

  private applyTheme(settings: { theme: string; accent: string }) {
    if (this.lastTheme === settings.theme && this.lastAccent === settings.accent) return;
    this.lastTheme = settings.theme;
    this.lastAccent = settings.accent;
    document.documentElement.setAttribute('data-theme', settings.theme === 'dark' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    document.documentElement.classList.remove('theme-ocean', 'theme-forest', 'theme-sunset');
    document.documentElement.classList.add(`theme-${settings.accent}`);
  }

  private headerTitle(path: string) {
    if (path.startsWith('/leads')) return 'Mercado';
    if (path.startsWith('/kpis')) return 'KPIs';
    if (path.startsWith('/jobs')) return 'Jobs';
    if (path.startsWith('/profile')) return 'Perfil';
    if (path.startsWith('/premium')) return 'Premium';
    if (path.startsWith('/help')) return 'Ayuda';
    return 'Clean Today';
  }

  private go(path: string) {
    window.history.pushState({}, '', path);
    this.path = path;
    this.drawerOpen = false;
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    const title = this.headerTitle(this.path);
    return html`
      <ac-app-shell
        class="app-shell"
        .drawerOpen=${this.drawerOpen}
        .activePath=${this.path}
        @drawer-toggle=${(e: CustomEvent<boolean>) => (this.drawerOpen = e.detail)}
        @navigate=${(e: CustomEvent<string>) => this.go(e.detail)}
      >
        <header class="sticky top-0 z-20 pt-3 pb-2">
          <div
            class="glass flex items-center justify-between rounded-2xl px-4 py-3"
          >
            <div class="flex items-center gap-2">
              <button
                class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition"
                aria-label="Abrir menú"
                @click=${() => (this.drawerOpen = true)}
              >
                <ac-icon name="menu" size="20" color="var(--accent-strong)"></ac-icon>
              </button>
              <div
                class="w-7 h-7 rounded-full flex items-center justify-center"
                style="background: linear-gradient(135deg, var(--primary-start), var(--primary-end)); box-shadow: 0 12px 26px rgba(14,165,233,0.22);"
                aria-hidden="true"
              >
                <ac-icon name="sparkle" size="16" color="#fff"></ac-icon>
              </div>
              <span class="text-base font-extrabold text-strong">${title}</span>
            </div>
            <div class="flex items-center gap-2">
              <button class="icon-btn" title="Notificaciones" aria-label="Notificaciones">
                <ac-icon name="bell" size="18" color="var(--accent-strong)"></ac-icon>
              </button>
              <button
                class="px-3 py-2 rounded-full text-white font-semibold"
                style="background: linear-gradient(120deg, var(--primary-start), var(--primary-end)); box-shadow: 0 14px 32px rgba(14,165,233,0.22);"
                @click=${syncNow}
              >
                ${this.syncing ? 'Sincronizando' : 'Conectar'}
              </button>
            </div>
          </div>
        </header>
        <main id="router-outlet" class="pb-28"></main>
      </ac-app-shell>
      <ac-toast id="toast" .message=${this.error ?? ''} variant="error"></ac-toast>
    `;
  }
}
