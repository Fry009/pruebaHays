import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ac-skeleton')
export class AcSkeleton extends LitElement {
  static properties = {
    width: { type: Number },
    height: { type: Number },
    radius: { type: Number }
  };

  declare width: number;
  declare height: number;
  declare radius: number;

  constructor() {
    super();
    this.width = 100;
    this.height = 16;
    this.radius = 12;
  }

  static styles = css`
    :host {
      display: inline-block;
    }
    .block {
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.6), rgba(240, 249, 255, 0.9), rgba(255, 255, 255, 0.6));
      background-size: 200% 100%;
      animation: shimmer 1.4s ease-in-out infinite;
    }
    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `;

  render() {
    return html`<div class="block" style=${`width:${this.width}px;height:${this.height}px;border-radius:${this.radius}px;`}></div>`;
  }
}
