import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseComponent } from '../components/base';
import '../components/ac-card';
import '../components/ac-button';
import '../components/ac-photo-uploader';
import '../components/ac-checklist';
import '../components/ac-timer';
import '../components/ac-modal';
import '../components/ac-icon';
import {
  addEvidence,
  exportPdf,
  getClient,
  getEvidence,
  startCheckIn,
  updateChecklist,
  stopCheckOut,
  subscribe,
  startTrial
} from '../state/store';
import { ChecklistItem, ServiceJob } from '@core/entities/types';
import dayjs from 'dayjs';
import { sanitizeText } from '@shared/sanitize';

@customElement('job-detail-page')
export class JobDetailPage extends BaseComponent {
  @property({ type: String }) declare jobId: string;
  @state() declare job?: ServiceJob;
  @state() declare evidenceChecklist: ChecklistItem[];
  @state() declare timerStart: string;
  @state() declare clientName: string;
  @state() declare showPremium: boolean;

  private unsub?: () => void;

  async connectedCallback() {
    super.connectedCallback();
    this.jobId = this.jobId || window.location.pathname.split('/').pop() || '';
    this.evidenceChecklist = [];
    this.timerStart = '';
    this.clientName = '';
    this.showPremium = false;
    this.unsub = subscribe((s) => {
      this.job = s.jobs.find((j) => j.id === this.jobId);
    });
    const client = this.job?.clientId ? await getClient(this.job.clientId) : undefined;
    this.clientName = client?.name || '';
    const evidence = await getEvidence(this.jobId);
    if (evidence) this.evidenceChecklist = evidence.checklist;
  }

  disconnectedCallback(): void {
    this.unsub?.();
  }

  private onChecklistChange(items: ChecklistItem[]) {
    this.evidenceChecklist = [...items];
    updateChecklist(this.jobId, this.evidenceChecklist);
  }

  private async onAddPhoto(detail: string, type: 'before' | 'after') {
    await addEvidence(this.jobId, detail, type);
  }

  private async onStart() {
    await startCheckIn(this.jobId);
    this.timerStart = new Date().toISOString();
  }

  private async onStop() {
    await stopCheckOut(this.jobId);
  }

  render() {
    if (!this.job) return html`<p class="p-4">Cargando...</p>`;
    return html`
      <section class="space-y-3">
        <header class="flex items-center justify-between">
          <div>
            <p class="text-xs text-slate-500">${dayjs(this.job.scheduledAt).format('DD MMM HH:mm')}</p>
            <h2 class="text-xl font-bold">${this.clientName || this.job.clientId}</h2>
            <p class="text-sm text-slate-500 capitalize">${this.job.type}</p>
          </div>
          <button class="text-sky-500" @click=${() => (this.showPremium = true)}>Premium</button>
        </header>
        <ac-card>
          <div class="flex justify-between items-center gap-3">
            <ac-timer start=${this.timerStart} .running=${true}></ac-timer>
            <div class="space-y-2">
              <ac-button @click=${this.onStart} style="width:150px">Iniciar</ac-button>
              <ac-button variant="ghost" @click=${this.onStop} style="width:150px">Cerrar</ac-button>
            </div>
          </div>
          <p class="mt-2 text-xs text-slate-500">Modo una mano: botones grandes accesibles.</p>
        </ac-card>
        <ac-card>
          <h3 class="font-semibold mb-2">Checklist</h3>
          <ac-checklist
            .items=${this.evidenceChecklist}
            @change=${(e: CustomEvent<ChecklistItem[]>) => this.onChecklistChange(e.detail)}
          ></ac-checklist>
        </ac-card>
        <ac-card class="space-y-2">
          <h3 class="font-semibold mb-2">Evidencias</h3>
          <div class="flex gap-2">
            <ac-photo-uploader
              label="Foto antes"
              @photo=${(e: CustomEvent<string>) => this.onAddPhoto(e.detail, 'before')}
            ></ac-photo-uploader>
            <ac-photo-uploader
              label="Foto después"
              @photo=${(e: CustomEvent<string>) => this.onAddPhoto(e.detail, 'after')}
            ></ac-photo-uploader>
          </div>
          <textarea
            class="w-full mt-3 p-2 border rounded-xl"
            placeholder="Notas"
            @change=${(e: Event) => (this.job!.notes = sanitizeText((e.target as HTMLTextAreaElement).value))}
          ></textarea>
          <button class="text-sky-500" @click=${() => exportPdf(this.jobId)}>Exportar PDF (Pro)</button>
        </ac-card>
      </section>
      <ac-modal .open=${this.showPremium} title="Prueba Premium">
        <div class="space-y-2">
          <p>Desbloquea exportar PDF, KPIs avanzados, ranking y tips smart.</p>
          <ul class="text-sm text-slate-700 space-y-1">
            <li class="flex items-center gap-2"><ac-icon name="check" size="16"></ac-icon> KPIs avanzados y ranking</li>
            <li class="flex items-center gap-2"><ac-icon name="check" size="16"></ac-icon> Prioridad en Mercado</li>
            <li class="flex items-center gap-2"><ac-icon name="check" size="16"></ac-icon> Informe PDF firmado</li>
          </ul>
          <div class="flex gap-2 mt-3">
            <button
              class="flex-1 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 text-white font-semibold shadow"
              @click=${startTrial}
            >
              Probar 7 días
            </button>
            <button class="flex-1 px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-semibold" @click=${() =>
              (this.showPremium = false)}>
              Luego
            </button>
          </div>
        </div>
      </ac-modal>
    `;
  }
}
