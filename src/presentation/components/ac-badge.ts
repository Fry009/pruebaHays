import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from './base';

@customElement('ac-badge')
export class AcBadge extends BaseComponent {
  @property({ type: String }) declare label: string;
  @property({ type: String }) declare color: 'green' | 'blue' | 'yellow';

  constructor() {
    super();
    this.label = '';
    this.color = 'green';
  }

  static styles = css`
    :host {
      display: inline-block;
    }
    .badge {
      padding: 4px 8px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 700;
      display: inline-flex;
      gap: 4px;
      align-items: center;
    }
    .green {
      background: #dcfce7;
      color: #166534;
    }
    .blue {
      background: #dbeafe;
      color: #1d4ed8;
    }
    .yellow {
      background: #fef9c3;
      color: #854d0e;
    }
  `;

  render() {
    return html`<span class="badge ${this.color}">⭐ ${this.label}</span>`;
  }
}
