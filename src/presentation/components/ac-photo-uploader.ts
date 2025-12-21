import './ac-icon';

import imageCompression from 'browser-image-compression';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('ac-photo-uploader')
export class AcPhotoUploader extends LitElement {
  static properties = {
    label: { type: String }
  };

  declare label: string;
  @state() declare loading: boolean;

  constructor() {
    super();
    this.label = 'Subir foto';
    this.loading = false;
  }

  static styles = css`
    :host {
      display: inline-block;
    }
    label {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border: 1px dashed color-mix(in srgb, var(--primary1) 65%, transparent 35%);
      border-radius: 14px;
      cursor: pointer;
      font-weight: 700;
      color: var(--accent-strong);
      background: color-mix(in srgb, var(--surface) 70%, white 30%);
      box-shadow: var(--shadow-soft);
      backdrop-filter: blur(10px);
      user-select: none;
    }
    input {
      display: none;
    }
  `;

  private async onChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.loading = true;
    const compressed = await imageCompression(file, { maxSizeMB: 0.4, maxWidthOrHeight: 1280 });
    const base64 = await imageCompression.getDataUrlFromFile(compressed);
    this.dispatchEvent(new CustomEvent('photo', { detail: base64 }));
    this.loading = false;
  }

  render() {
    return html`<label>
      <ac-icon name="plus" size="16" color="var(--accent-strong)"></ac-icon>
      ${this.loading ? 'Cargando…' : this.label}
      <input type="file" accept="image/*" @change=${this.onChange} />
    </label>`;
  }
}
