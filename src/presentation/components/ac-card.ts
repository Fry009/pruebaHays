import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ac-card')
export class AcCard extends LitElement {
  static properties = {
    variant: { type: String }
  };

  declare variant: 'default' | 'glass' | 'soft' | 'hero';

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
      background: var(--surface);
      border: 1px solid var(--border);
      box-shadow: var(--shadow-soft);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      color: var(--text);
    }
    .soft {
      background: var(--surface-strong);
      border: 1px solid var(--border);
      box-shadow: var(--shadow-soft);
      color: var(--text);
    }
    .default {
      background: var(--surface-strong);
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
      color: var(--text);
    }
    .hero {
      background: linear-gradient(120deg, var(--primary-start), var(--primary-end));
      border: 1px solid color-mix(in srgb, var(--primary-end) 30%, transparent 70%);
      box-shadow: 0 22px 60px rgba(14, 165, 233, 0.22);
      color: white;
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
