import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('ac-toast')
export class AcToast extends LitElement {
  static properties = {
    message: { type: String },
    variant: { type: String }
  };

  declare message: string;
  declare variant: 'info' | 'error' | 'success';
  @state() declare visible: boolean;

  constructor() {
    super();
    this.message = '';
    this.variant = 'info';
    this.visible = false;
  }

  static styles = css`
    :host {
      position: fixed;
      bottom: 18px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 50;
      display: block;
    }
    .toast {
      padding: 12px 16px;
      border-radius: 12px;
      background: linear-gradient(120deg, var(--primary0), var(--primary1));
      color: white;
      min-width: 240px;
      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.25);
      opacity: 0;
      transform: translateY(12px);
      transition: all 0.2s ease;
    }
    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }
    .error {
      background: var(--danger);
    }
    .success {
      background: #22c55e;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.message) this.show(this.message, this.variant);
  }

  show(message: string, variant: 'info' | 'error' | 'success' = 'info') {
    this.message = message;
    this.variant = variant;
    this.visible = true;
    setTimeout(() => (this.visible = false), 2800);
  }

  render() {
    return html`<div class="toast ${this.variant} ${this.visible ? 'show' : ''}">
      ${this.message}
    </div>`;
  }
}
