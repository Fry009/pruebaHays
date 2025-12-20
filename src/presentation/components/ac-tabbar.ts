import './ac-icon';

import { css,html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { IconName } from './ac-icon';

type TabItem = { label: string; icon: IconName; path: string };

const tabs: TabItem[] = [
  { label: 'Hoy', icon: 'home', path: '/' },
  { label: 'Jobs', icon: 'briefcase', path: '/jobs' },
  { label: 'KPIs', icon: 'graph', path: '/kpis' },
  { label: 'Perfil', icon: 'user', path: '/profile' }
];

@customElement('ac-tabbar')
export class AcTabbar extends LitElement {
  static properties = {
    activePath: { type: String }
  };

  declare activePath: string;

  constructor() {
    super();
    this.activePath = '/';
  }

  static styles = css`
    :host {
      pointer-events: none;
    }
    nav {
      position: fixed;
      bottom: 12px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      pointer-events: auto;
      z-index: 40;
    }
    .bar {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      background: var(--surface);
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
      backdrop-filter: blur(18px);
      border-radius: 999px;
      padding: 8px;
      min-width: 320px;
      max-width: 420px;
    }
    button {
      border: none;
      background: transparent;
      border-radius: 999px;
      padding: 8px 6px;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      color: var(--text-muted);
      font-weight: 600;
      font-size: 12px;
      transition: transform 0.15s ease, background 0.2s ease;
    }
    button.active {
      background: linear-gradient(120deg, var(--primary-start), var(--primary-end));
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 8px 18px rgba(14, 165, 233, 0.28);
    }
  `;

  private navigate(path: string) {
    this.dispatchEvent(new CustomEvent('navigate', { detail: path }));
  }

  render() {
    return html`
      <nav aria-label="Bottom navigation">
        <div class="bar">
          ${tabs.map(
            (tab) => html`<button
              class=${this.activePath === tab.path ? 'active' : ''}
              @click=${() => this.navigate(tab.path)}
            >
              <ac-icon
                .name=${tab.icon}
                size="18"
                color=${this.activePath === tab.path ? '#fff' : 'var(--muted)'}
              ></ac-icon>
              <span>${tab.label}</span>
            </button>`
          )}
        </div>
      </nav>
    `;
  }
}
