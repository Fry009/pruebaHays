import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from './base';

@customElement('ac-button')
export class AcButton extends BaseComponent {
  @property({ type: String }) declare variant: 'primary' | 'ghost';
  @property({ type: Boolean, reflect: true }) declare disabled: boolean;

  constructor() {
    super();
    this.variant = 'primary';
    this.disabled = false;
  }

  static styles = css`
    :host button {
      width: 100%;
      border-radius: 14px;
      padding: 12px 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: transform 0.1s ease;
    }
    :host button:active {
      transform: translateY(1px);
    }
    :host([disabled]) button {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .primary {
      background: linear-gradient(120deg, var(--accent), var(--accent-strong));
      color: white;
    }
    .ghost {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(0, 0, 0, 0.08);
      color: inherit;
    }
  `;

  render() {
    return html`<button class=${this.variant} ?disabled=${this.disabled}>
      <slot></slot>
    </button>`;
  }
}
