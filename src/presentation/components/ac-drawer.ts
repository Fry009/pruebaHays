import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './ac-icon';
import './ac-chip';

type DrawerItem = {
  label: string;
  icon: string;
  path: string;
  badge?: string;
};

const items: DrawerItem[] = [
  { label: 'Inicio', icon: 'home', path: '/' },
  { label: 'Jobs', icon: 'briefcase', path: '/jobs' },
  { label: 'KPIs', icon: 'graph', path: '/kpis', badge: '12' },
  { label: 'Mercado', icon: 'bolt', path: '/leads', badge: '10' },
  { label: 'Historial', icon: 'bookmark', path: '/history' },
  { label: 'Clientes', icon: 'user', path: '/clients' },
  { label: 'Insignias', icon: 'star', path: '/profile' },
  { label: 'Ajustes', icon: 'shield', path: '/profile' },
  { label: 'Invitar amigos', icon: 'sparkle', path: '/profile' },
  { label: 'Premium', icon: 'trophy', path: '/premium' },
  { label: 'Ayuda', icon: 'info', path: '/help' }
];

@customElement('ac-drawer')
export class AcDrawer extends LitElement {
  static properties = {
    open: { type: Boolean },
    persistent: { type: Boolean },
    activePath: { type: String }
  };

  declare open: boolean;
  declare persistent: boolean;
  declare activePath: string;

  constructor() {
    super();
    this.open = false;
    this.persistent = false;
    this.activePath = '/';
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
    .drawer {
      width: 260px;
      height: 100vh;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(240, 249, 255, 0.92));
      backdrop-filter: blur(16px);
      border-right: 1px solid var(--card-border);
      box-shadow: var(--card-shadow);
      transform: translateX(-110%);
      transition: transform 0.25s ease;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 50;
      display: flex;
      flex-direction: column;
    }
    .drawer.open {
      transform: translateX(0);
    }
    .header {
      padding: 20px 16px 12px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .header img {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    }
    .items {
      padding: 8px 8px 16px;
      display: grid;
      gap: 4px;
      overflow-y: auto;
      flex: 1;
    }
    button.item {
      width: 100%;
      border: none;
      background: transparent;
      border-radius: 14px;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--text-strong);
      transition: background 0.15s ease, transform 0.1s ease;
    }
    button.item:hover {
      background: rgba(14, 165, 233, 0.08);
    }
    button.item.active {
      background: linear-gradient(135deg, rgba(14, 165, 233, 0.16), rgba(56, 189, 248, 0.14));
      box-shadow: 0 12px 24px rgba(14, 165, 233, 0.08);
    }
    .footer {
      padding: 12px 16px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: var(--text-muted);
    }
    @media (min-width: 900px) {
      .drawer {
        position: sticky;
        top: 0;
        transform: translateX(0);
      }
    }
  `;

  private emitNavigate(path: string) {
    this.dispatchEvent(new CustomEvent('navigate', { detail: path }));
  }

  render() {
    return html`
      <aside class="drawer ${this.open || this.persistent ? 'open' : ''}">
        <div class="header">
          <img src="https://i.pravatar.cc/120?img=47" alt="avatar" />
          <div>
            <p class="text-sm text-slate-500">Plan FREE</p>
            <p class="font-semibold text-slate-900">Ana Campos</p>
            <div class="flex items-center gap-4 text-xs text-slate-600">
              <span class="flex items-center gap-1">
                <ac-icon name="star" size="14" color="#f59e0b"></ac-icon> 4.5
              </span>
              <span>35</span>
            </div>
          </div>
        </div>
        <div class="items">
          ${items.map(
            (item) => html`
              <button
                class="item ${this.activePath === item.path ? 'active' : ''}"
                @click=${() => this.emitNavigate(item.path)}
              >
                <span class="flex items-center gap-2">
                  <ac-icon name=${item.icon as any} size="18"></ac-icon>
                  ${item.label}
                </span>
                ${item.badge
                  ? html`<span class="px-2 py-1 text-xs rounded-full bg-rose-100 text-rose-600 font-semibold">
                      ${item.badge}
                    </span>`
                  : html`<ac-icon name="chevron-right" size="14" color="#94a3b8"></ac-icon>`}
              </button>
            `
          )}
        </div>
        <div class="footer">
          <span>v1.0.0 beta</span>
          <button class="text-sky-600 border-none bg-transparent" @click=${() => this.emitNavigate('/logout')}>
            Salir
          </button>
        </div>
      </aside>
    `;
  }
}
