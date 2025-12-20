import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from './base';

@customElement('ac-card')
export class AcCard extends BaseComponent {
  static properties = {
    variant: { type: String }
  };

  declare variant: 'default' | 'glass' | 'soft';

  constructor() {
    super();
    this.variant = 'glass';
  }

  static styles = css`
    :host {
      display: block;
    }
    .card {
      border-radius: 20px;
      padding: 16px;
      animation: fadeIn 0.25s ease;
    }
    .glass {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      box-shadow: var(--card-shadow);
      backdrop-filter: blur(12px);
    }
    .soft {
      background: #f8fafc;
      border: 1px solid rgba(226, 232, 240, 0.8);
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
    }
    .default {
      background: white;
      border: 1px solid rgba(226, 232, 240, 0.6);
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
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
    return html`<div class="card ${this.variant}"><slot></slot></div>`;
  }
}
