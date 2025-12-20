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
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(236, 245, 255, 0.9));
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid rgba(226, 232, 240, 0.8);
      box-shadow: 0 18px 40px rgba(14, 165, 233, 0.12);
    }
    .value {
      font-size: 22px;
      font-weight: 800;
    }
    .trend {
      font-size: 12px;
      color: var(--accent);
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
  `;

  render() {
    const trendIcon = this.trend === 'up' ? 'check' : this.trend === 'down' ? 'x' : 'minus';
    return html`<div class="tile">
      <div>
        <p class="text-sm text-slate-500">${this.label}</p>
        <p class="value">${this.value}</p>
      </div>
      <span class="trend">
        <ac-icon name=${trendIcon as any} size="18"></ac-icon>
      </span>
    </div>`;
  }
}
