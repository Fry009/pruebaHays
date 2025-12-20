import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './ac-chip';
import './ac-button';

@customElement('ac-list-item')
export class AcListItem extends LitElement {
  static properties = {
    title: { type: String },
    subtitle: { type: String },
    price: { type: String },
    meta: { type: String },
    badge: { type: String },
    cta: { type: String }
  };

  declare title: string;
  declare subtitle: string;
  declare price: string;
  declare meta: string;
  declare badge: string;
  declare cta: string;

  constructor() {
    super();
    this.title = '';
    this.subtitle = '';
    this.price = '';
    this.meta = '';
    this.badge = '';
    this.cta = 'Contactar';
  }

  static styles = css`
    :host {
      display: block;
    }
    .item {
      border-radius: 16px;
      padding: 14px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      box-shadow: 0 12px 30px rgba(14, 165, 233, 0.1);
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .title {
      font-weight: 700;
      color: var(--text-strong);
    }
    .subtitle,
    .meta {
      font-size: 13px;
      color: var(--text-muted);
    }
    .price {
      font-weight: 800;
      color: #dc2626;
    }
    .actions {
      display: flex;
      flex-direction: column;
      gap: 6px;
      align-items: flex-end;
    }
    button.cta {
      border: none;
      border-radius: 12px;
      padding: 8px 12px;
      background: linear-gradient(120deg, var(--primary-start), var(--primary-end));
      color: white;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 8px 18px rgba(14, 165, 233, 0.18);
    }
  `;

  render() {
    return html`
      <div class="item">
        <div class="content">
          <div class="flex items-center gap-2">
            ${this.badge ? html`<ac-chip color="gray">${this.badge}</ac-chip>` : null}
            <span class="title">${this.title}</span>
          </div>
          <span class="subtitle">${this.subtitle}</span>
          <span class="meta">${this.meta}</span>
        </div>
        <div class="actions">
          <span class="price">${this.price}</span>
          <button class="cta" @click=${() => this.dispatchEvent(new CustomEvent('primary'))}>${this.cta}</button>
        </div>
      </div>
    `;
  }
}
