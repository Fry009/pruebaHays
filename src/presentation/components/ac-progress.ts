import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from './base';

@customElement('ac-progress')
export class AcProgress extends BaseComponent {
  @property({ type: Number }) declare value: number;

  constructor() {
    super();
    this.value = 0;
  }

  static styles = css`
    .bar {
      background: #e2e8f0;
      height: 10px;
      border-radius: 10px;
      overflow: hidden;
    }
    .fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent), var(--accent-strong));
      transition: width 0.2s ease;
    }
  `;

  render() {
    return html`<div class="bar"><div class="fill" style="width:${this.value}%"></div></div>`;
  }
}
