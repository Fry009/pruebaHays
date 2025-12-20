import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ac-modal')
export class AcModal extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    title: { type: String }
  };

  declare open: boolean;
  declare title: string;

  constructor() {
    super();
    this.open = false;
    this.title = '';
  }

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 40;
    }
    :host([open]) {
      display: flex;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(4px);
    }
    .modal {
      background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
      padding: 20px;
      border-radius: 18px;
      width: min(480px, 92vw);
      max-height: 90vh;
      overflow: auto;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    button {
      border: none;
      background: transparent;
      font-size: 18px;
      cursor: pointer;
      padding: 4px;
    }
  `;

  private close() {
    this.dispatchEvent(new CustomEvent('close'));
    this.open = false;
  }

  render() {
    return html`
      <div class="modal">
        <header>
          <h3>${this.title}</h3>
          <button aria-label="Cerrar" @click=${this.close}>
            <ac-icon name="close"></ac-icon>
          </button>
        </header>
        <slot></slot>
      </div>
    `;
  }
}
