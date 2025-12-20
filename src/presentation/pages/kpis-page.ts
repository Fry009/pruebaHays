import Chart from "chart.js/auto";
import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { BaseComponent } from "../components/base";
import "../components/ac-kpi-tile";
import "../components/ac-card";
import "../components/ac-icon";
import { computeKpis, getState, subscribe } from "../state/store";

@customElement("kpis-page")
export class KpisPage extends BaseComponent {
  @state() declare kpis: ReturnType<typeof getState>["kpis"];
  @state() declare metric: "jobs" | "revenue" | "rating";
  private chart?: Chart;

  private unsub?: () => void;

  connectedCallback(): void {
    super.connectedCallback();
    this.kpis = getState().kpis;
    this.metric = "jobs";
    this.unsub = subscribe((s) => {
      this.kpis = s.kpis;
      this.renderChart();
    });
    queueMicrotask(() => this.renderChart());
  }

  disconnectedCallback(): void {
    this.unsub?.();
    this.chart?.destroy();
  }

  private async renderChart() {
    const ctx = this.querySelector<HTMLCanvasElement>("#kpi-chart");
    if (!ctx) return;
    if (this.chart) this.chart.destroy();
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#0ea5e9";
    const strong =
      getComputedStyle(document.documentElement).getPropertyValue("--accent-strong").trim() || "#0284c7";
    const labels = this.kpis.map((k) => k.period);
    const data =
      this.metric === "jobs"
        ? this.kpis.map((k) => k.jobsDone)
        : this.metric === "revenue"
          ? this.kpis.map((k) => k.revenue)
          : this.kpis.map((k) => k.avgRating);
    const label =
      this.metric === "jobs" ? "Servicios" : this.metric === "revenue" ? "Ingresos" : "Rating";
    this.chart = new Chart(ctx, {
      type: this.metric === "revenue" ? "bar" : "line",
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            borderColor: accent,
            backgroundColor: this.metric === "revenue" ? strong : accent,
            tension: 0.4,
            fill: this.metric !== "revenue"
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  private async onPeriodChange(period: "week" | "month") {
    await computeKpis(period);
    this.renderChart();
  }

  private onMetricChange(metric: "jobs" | "revenue" | "rating") {
    this.metric = metric;
    this.renderChart();
  }

  render() {
    const latest = this.kpis[this.kpis.length - 1];
    return html`
      <section class="space-y-3">
        <header class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold">KPIs</h2>
            <p class="text-slate-500 text-sm">Panel de seguimiento</p>
          </div>
          <div class="flex gap-1">
            <button class="text-sky-500" @click=${() => this.onPeriodChange("week")}>Semana</button>
            <button class="text-sky-500" @click=${() => this.onPeriodChange("month")}>Mes</button>
          </div>
        </header>
        <div class="flex gap-2">
          ${(["jobs", "revenue", "rating"] as const).map(
            (metric) => html`<button
              class="px-3 py-2 rounded-xl border ${this.metric === metric
                ? "border-sky-500 text-sky-600"
                : "border-slate-200 text-slate-600"}"
              @click=${() => this.onMetricChange(metric)}
            >
              ${metric}
            </button>`
          )}
        </div>
        <div class="grid grid-cols-2 gap-2">
          <ac-kpi-tile label="Jobs" value=${latest?.jobsDone ?? 0}></ac-kpi-tile>
          <ac-kpi-tile label="Tiempo prom." value=${(latest?.avgTime ?? 0).toFixed(0) + "m"}></ac-kpi-tile>
          <ac-kpi-tile label="Ingresos" value=${"EUR " + (latest?.revenue ?? 0)}></ac-kpi-tile>
          <ac-kpi-tile label="Cancelaciones" value=${latest?.cancellations ?? 0}></ac-kpi-tile>
        </div>
        <ac-card>
          <canvas id="kpi-chart" height="160"></canvas>
        </ac-card>
        <ac-card>
          <div class="flex items-center gap-2">
            <ac-icon name="trophy" size="20" color="#f59e0b"></ac-icon>
            <div>
              <p class="font-semibold text-slate-800">Ranking (Premium)</p>
              <p class="text-sm text-slate-600">Desbloquea medallas y retos semanales.</p>
            </div>
          </div>
        </ac-card>
      </section>
    `;
  }
}
