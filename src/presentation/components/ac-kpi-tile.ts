import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from './base';

@customElement('ac-kpi-tile')
export class AcKpiTile extends BaseComponent {
  @property({ type: String }) declare label: string;
  @property({ type: String }) declare value: string;
  @property({ type: String }) declare trend: 'up' | 'down' | 'flat';

  constructor() {
    super();
    this.label = '';
    this.value = '';
    this.trend = 'flat';
  }

  static styles = css`
    .tile {
      padding: 14px;
      border-radius: 16px;
      background: #f8fafc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #e2e8f0;
    }
    .value {
      font-size: 22px;
      font-weight: 800;
    }
    .trend {
      font-size: 12px;
      color: var(--accent);
    }
  `;

  render() {
    const trendIcon = this.trend === 'up' ? '⬆' : this.trend === 'down' ? '⬇' : '➖';
    return html`<div class="tile">
      <div>
        <p class="text-sm text-slate-500">${this.label}</p>
        <p class="value">${this.value}</p>
      </div>
      <span class="trend">${trendIcon}</span>
    </div>`;
  }
}
