import { Component, Input } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-quota-chart',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './quota-chart.component.html',
  styleUrl: './quota-chart.component.css'
})
export class QuotaChartComponent {
  @Input() data: ChartDataset<'line', { x: string, y: number }[]>[] = [];
  @Input() timeUnit: 'day' | 'month' | 'year' = 'day';

  get chartData() {
    return {
      datasets: this.data
    };
  }

  get chartOptions(): ChartOptions<'line'> {
    return {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: this.timeUnit,
            tooltipFormat: 'MMM d, yyyy',
            displayFormats: {
              day: 'MMM d',
              month: 'MMM yyyy',
              year: 'yyyy'
            }
          },
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Price'
          }
        }
      }
    }
  };
}
