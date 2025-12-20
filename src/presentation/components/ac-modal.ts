import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from './base';

@customElement('ac-modal')
export class AcModal extends BaseComponent {
  @property({ type: Boolean, reflect: true }) declare open: boolean;
  @property({ type: String }) declare title: string;

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
      background: var(--color-surface);
      padding: 20px;
      border-radius: 18px;
      width: min(480px, 92vw);
      max-height: 90vh;
      overflow: auto;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.25);
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
          <button aria-label="Cerrar" @click=${this.close}>✕</button>
        </header>
        <slot></slot>
      </div>
    `;
  }
}
