import './ac-icon';
import './ac-chip';

import { css,html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { IconName } from './ac-icon';

type DrawerItem = {
  label: string;
  icon: IconName;
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
      background: linear-gradient(
        180deg,
        var(--surface-strong),
        color-mix(in srgb, var(--surface) 86%, white 14%)
      );
      backdrop-filter: blur(16px);
      border-right: 1px solid var(--border);
      box-shadow: var(--shadow);
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
    .plan {
      font-size: 12px;
      color: var(--muted);
      margin: 0;
    }
    .name {
      margin: 2px 0 0;
      font-weight: 800;
      font-size: 14px;
      color: var(--text);
    }
    .meta-row {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12px;
      color: var(--muted);
      margin-top: 6px;
    }
    .meta-star {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #f59e0b;
      font-weight: 700;
    }
    .item-left {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-weight: 650;
    }
    .count {
      padding: 4px 8px;
      font-size: 12px;
      border-radius: 999px;
      background: color-mix(in srgb, #fda4af 22%, var(--surface) 78%);
      color: #be123c;
      font-weight: 800;
      border: 1px solid color-mix(in srgb, #fda4af 35%, transparent 65%);
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
      color: var(--text);
      transition: background 0.15s ease, transform 0.1s ease;
    }
    button.item:hover {
      background: color-mix(in srgb, var(--accent) 10%, transparent 90%);
    }
    button.item.active {
      background: linear-gradient(
        135deg,
        color-mix(in srgb, var(--primary0) 16%, transparent 84%),
        color-mix(in srgb, var(--primary1) 16%, transparent 84%)
      );
      box-shadow: var(--shadow-soft);
    }
    .footer {
      padding: 12px 16px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: var(--muted);
    }
    .logout {
      border: none;
      background: transparent;
      color: var(--accent-strong);
      cursor: pointer;
      font-weight: 700;
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
            <p class="plan">Plan FREE</p>
            <p class="name">Ana Campos</p>
            <div class="meta-row">
              <span class="meta-star">
                <ac-icon name="star" size="14" color="#f59e0b"></ac-icon>
                4.5
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
                <span class="item-left">
                  <ac-icon .name=${item.icon} size="18"></ac-icon>
                  ${item.label}
                </span>
                ${item.badge
                  ? html`<span class="count">${item.badge}</span>`
                  : html`<ac-icon name="chevron-right" size="14" color="#94a3b8"></ac-icon>`}
              </button>
            `
          )}
        </div>
        <div class="footer">
          <span>v1.0.0 beta</span>
          <button class="logout" @click=${() => this.emitNavigate('/logout')}>
            Salir
          </button>
        </div>
      </aside>
    `;
  }
}
