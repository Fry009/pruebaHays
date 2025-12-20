import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from './base';

@customElement('ac-chip')
export class AcChip extends BaseComponent {
  @property({ type: String }) declare color: 'blue' | 'green' | 'amber' | 'gray';

  constructor() {
    super();
    this.color = 'blue';
  }

  static styles = css`
    :host {
      display: inline-block;
    }
    .chip {
      padding: 6px 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border: 1px solid rgba(0, 0, 0, 0.06);
    }
    .blue {
      background: #e0f2fe;
      color: #0369a1;
    }
    .green {
      background: #dcfce7;
      color: #16a34a;
    }
    .amber {
      background: #fef3c7;
      color: #b45309;
    }
    .gray {
      background: #e2e8f0;
      color: #1e293b;
    }
  `;

  render() {
    return html`<span class="chip ${this.color}"><slot></slot></span>`;
  }
}
