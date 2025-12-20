import { ChecklistItem } from '@core/entities/types';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseComponent } from './base';

@customElement('ac-checklist')
export class AcChecklist extends BaseComponent {
  @property({ type: Array }) declare items: ChecklistItem[];

  constructor() {
    super();
    this.items = [];
  }

  static styles = css`
    .item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 0;
      border-bottom: 1px dashed #e2e8f0;
    }
    input {
      width: 18px;
      height: 18px;
    }
  `;

  private toggle(item: ChecklistItem) {
    item.done = !item.done;
    this.dispatchEvent(new CustomEvent('change', { detail: this.items }));
    this.requestUpdate();
  }

  render() {
    return html`${this.items.map(
      (item) => html`<div class="item">
        <input type="checkbox" ?checked=${item.done} @change=${() => this.toggle(item)} />
        <div>
          <p class="font-semibold">${item.label}</p>
          ${item.required ? html`<small class="text-amber-500">Obligatorio</small>` : null}
        </div>
      </div>`
    )}`;
  }
}
