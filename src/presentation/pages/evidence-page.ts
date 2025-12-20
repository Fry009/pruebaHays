import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseComponent } from '../components/base';
import { getEvidence } from '../state/store';
import '../components/ac-card';

@customElement('evidence-page')
export class EvidencePage extends BaseComponent {
  @property({ type: String }) declare jobId: string;
  @state() declare before: string[];
  @state() declare after: string[];

  async connectedCallback() {
    super.connectedCallback();
    this.jobId = this.jobId || window.location.pathname.split('/').pop() || '';
    this.before = [];
    this.after = [];
    const evidence = await getEvidence(this.jobId);
    this.before = evidence?.beforePhotos || [];
    this.after = evidence?.afterPhotos || [];
  }

  render() {
    return html`
      <section class="space-y-3 pb-20">
        <h2 class="text-xl font-bold">Evidencias</h2>
        <ac-card>
          <h3 class="font-semibold mb-2">Antes</h3>
          <div class="grid grid-cols-3 gap-2">
            ${this.before.map((src) => html`<img class="rounded-lg" src=${src} alt="antes" />`)}
          </div>
        </ac-card>
        <ac-card>
          <h3 class="font-semibold mb-2">Después</h3>
          <div class="grid grid-cols-3 gap-2">
            ${this.after.map((src) => html`<img class="rounded-lg" src=${src} alt="después" />`)}
          </div>
        </ac-card>
      </section>
    `;
  }
}
