import imageCompression from 'browser-image-compression';
import { css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseComponent } from './base';

@customElement('ac-photo-uploader')
export class AcPhotoUploader extends BaseComponent {
  @property({ type: String }) declare label: string;
  @state() declare loading: boolean;

  constructor() {
    super();
    this.label = 'Subir foto';
    this.loading = false;
  }

  static styles = css`
    label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      border: 1px dashed var(--accent);
      border-radius: 12px;
      cursor: pointer;
      font-weight: 600;
      color: var(--accent);
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
      📷 ${this.loading ? 'Cargando...' : this.label}
      <input type="file" accept="image/*" @change=${this.onChange} style="display:none" />
    </label>`;
  }
}
