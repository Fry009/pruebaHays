import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from './base';

@customElement('ac-card')
export class AcCard extends BaseComponent {
  static styles = css`
    :host {
      display: block;
    }
    .card {
      background: var(--color-surface);
      border-radius: 18px;
      padding: 16px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      border: 1px solid rgba(226, 232, 240, 0.8);
      animation: fadeIn 0.25s ease;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  render() {
    return html`<div class="card"><slot></slot></div>`;
  }
}
