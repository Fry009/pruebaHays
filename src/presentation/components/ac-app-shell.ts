import { html, LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './ac-drawer';
import './ac-tabbar';

@customElement('ac-app-shell')
export class AcAppShell extends LitElement {
  static properties = {
    drawerOpen: { type: Boolean },
    activePath: { type: String }
  };

  declare drawerOpen: boolean;
  declare activePath: string;

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }
    .layout {
      display: grid;
      grid-template-columns: 0fr 1fr;
    }
    .layout.desktop {
      grid-template-columns: 280px 1fr;
    }
    .content {
      position: relative;
      min-height: 100vh;
      background: transparent;
    }
    @media (min-width: 900px) {
      .drawer-overlay {
        display: none;
      }
    }
  `;

  constructor() {
    super();
    this.drawerOpen = false;
    this.activePath = '/';
  }

  private toggleDrawer(open: boolean) {
    this.drawerOpen = open;
    this.dispatchEvent(new CustomEvent('drawer-toggle', { detail: open }));
  }

  render() {
    const isDesktop = window.matchMedia('(min-width: 900px)').matches;
    return html`
      <div class="layout ${isDesktop ? 'desktop' : ''}">
        <ac-drawer
          .open=${this.drawerOpen || isDesktop}
          .persistent=${isDesktop}
          .activePath=${this.activePath}
          @navigate=${(e: CustomEvent<string>) => this.dispatchEvent(new CustomEvent('navigate', { detail: e.detail }))}
          @close=${() => this.toggleDrawer(false)}
        ></ac-drawer>
        <div class="content">
          ${!isDesktop && this.drawerOpen
            ? html`<div class="drawer-overlay fixed inset-0 bg-black/20 backdrop-blur" @click=${() => this.toggleDrawer(false)}></div>`
            : null}
          <slot></slot>
          <ac-tabbar
            .activePath=${this.activePath}
            @navigate=${(e: CustomEvent<string>) => this.dispatchEvent(new CustomEvent('navigate', { detail: e.detail }))}
          ></ac-tabbar>
        </div>
      </div>
    `;
  }
}
