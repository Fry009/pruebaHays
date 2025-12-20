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
      padding: 6px 12px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border: 1px solid rgba(255, 255, 255, 0.7);
      box-shadow: 0 10px 30px rgba(14, 165, 233, 0.12);
    }
    .blue {
      background: linear-gradient(180deg, #e0f2fe, #e0f2fecc);
      color: #0369a1;
    }
    .green {
      background: linear-gradient(180deg, #dcfce7, #dcfce7cc);
      color: #16a34a;
    }
    .amber {
      background: linear-gradient(180deg, #fef3c7, #fde68acc);
      color: #b45309;
    }
    .gray {
      background: linear-gradient(180deg, #e2e8f0, #e2e8f0cc);
      color: #1e293b;
    }
  `;

  render() {
    return html`<span class="chip ${this.color}"><slot></slot></span>`;
  }
}
