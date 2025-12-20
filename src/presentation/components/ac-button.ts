import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ac-button')
export class AcButton extends LitElement {
  static properties = {
    variant: { type: String },
    disabled: { type: Boolean, reflect: true },
    block: { type: Boolean, reflect: true }
  };

  declare variant: 'primary' | 'ghost' | 'secondary';
  declare disabled: boolean;
  declare block: boolean;

  constructor() {
    super();
    this.variant = 'primary';
    this.disabled = false;
    this.block = false;
  }

  static styles = css`
    :host {
      display: inline-block;
    }
    :host button {
      width: auto;
      border-radius: 999px;
      padding: 12px 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: transform 0.12s ease, box-shadow 0.2s ease, filter 0.2s ease;
    }
    :host([block]) {
      display: block;
    }
    :host([block]) button {
      width: 100%;
    }
    :host button:active {
      transform: translateY(1px) scale(0.99);
    }
    :host([disabled]) button {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .primary {
      background: linear-gradient(120deg, var(--primary0), var(--primary1));
      color: white;
      box-shadow: 0 10px 24px rgba(14, 165, 233, 0.2);
    }
    .primary:hover {
      filter: brightness(1.02);
      box-shadow: 0 14px 30px rgba(14, 165, 233, 0.24);
    }
    .secondary {
      background: white;
      color: var(--text);
      border: 1px solid var(--border);
      box-shadow: var(--shadow-soft);
    }
    .ghost {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text);
    }
  `;

  render() {
    return html`<button class=${this.variant} ?disabled=${this.disabled}>
      <slot></slot>
    </button>`;
  }
}
