import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from './base';

@customElement('ac-tabs')
export class AcTabs extends BaseComponent {
  @property({ type: String }) declare value: string;

  constructor() {
    super();
    this.value = '';
  }

  static styles = css`
    nav {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      background: rgba(255, 255, 255, 0.9);
      border-top: 1px solid rgba(148, 163, 184, 0.2);
      padding: 10px 16px;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 40;
      backdrop-filter: blur(14px);
    }
    button {
      border: none;
      background: transparent;
      padding: 8px;
      border-radius: 12px;
      font-size: 12px;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      color: #475569;
      transition: all 0.18s ease;
    }
    button.active {
      background: var(--accent-weak);
      color: var(--accent-strong);
      font-weight: 700;
      transform: translateY(-2px);
    }
  `;

  render() {
    const tabs: { key: string; label: string; icon: string; href: string }[] = [
      { key: 'home', label: 'Hoy', icon: '📅', href: '/' },
      { key: 'jobs', label: 'Jobs', icon: '🧹', href: '/jobs' },
      { key: 'kpis', label: 'KPIs', icon: '📊', href: '/kpis' },
      { key: 'profile', label: 'Perfil', icon: '👤', href: '/profile' }
    ];
    return html`<nav>
      ${tabs.map(
        (tab) => html`<button
          class=${this.value === tab.key ? 'active' : ''}
          @click=${() => {
            window.history.pushState({}, '', tab.href);
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}
        >
          <span>${tab.icon}</span>
          <span>${tab.label}</span>
        </button>`
      )}
    </nav>`;
  }
}
