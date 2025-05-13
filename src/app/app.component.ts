import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './core/material/material.module';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FundService } from './core/services/http/fund.service';
import { FundLite } from './shared/interfaces/Fund';
import { QuotaLite } from './shared/interfaces/Quota';
import { QuotaChartComponent } from './components/quota-chart/quota-chart.component';
import { ChartDataset } from 'chart.js';

type TimeUnit = 'day' | 'month' | 'year';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MaterialModule, QuotaChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  title = 'Información Histórica Fondos Fintual';
  filterForm!: FormGroup;
  // TODO: make sure this is being obtained from the api instead
  fundTypes!: FundLite[];
  date_range: Date[] = [new Date(), new Date()];
  timeUnit: TimeUnit = 'day';
  chartSeries: ChartDataset<'line', { x: string, y: number }[]>[] = [];

  constructor(
    private fb: FormBuilder,
    private fundService: FundService
  ) {

  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private getTimeUnit(dateStart: string, dateEnd: string): TimeUnit {
    const start = new Date(dateStart);
    const end = new Date(dateEnd);
    const diffInDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays < 31) {
      return 'day';
    } else if (diffInDays < 365) {
      return 'month';
    } else {
      return 'year';
    }
  }

  private groupByTimeUnit(data: QuotaLite[], unit: TimeUnit): { x: string, y: number }[] {
  const groups: { [key: string]: QuotaLite[] } = {};

  for (const entry of data) {
    let key: string;

    if (unit === 'day') {
      key = entry.date; // already 'YYYY-MM-DD'
    } else if (unit === 'month') {
      key = entry.date.slice(0, 7); // 'YYYY-MM'
    } else {
      key = entry.date.slice(0, 4); // 'YYYY'
    }

    if (!groups[key]) groups[key] = [];
    groups[key].push(entry);
  }

  return Object.entries(groups).map(([key, entries]) => {
    const avg = entries.reduce((sum, e) => sum + e.price, 0) / entries.length;

    // Use first of the month/year as x label
    const x = unit === 'day' ? key : unit === 'month' ? `${key}-01` : `${key}-01-01`;

    return { x, y: avg };
  });
}


  private async retrieveQuotas(): Promise<void> {
    const formValue = this.filterForm.value;
    const funds: FundLite[] = formValue.fund_type;

    const dateStart: string = this.formatDate(formValue.date_start);
    const dateEnd: string = this.formatDate(formValue.date_end);

    this.timeUnit = this.getTimeUnit(dateStart, dateEnd);

    const datasets = await Promise.all(
      funds.map(async (fund: FundLite) => {
        const rawData: QuotaLite[] = (await this.fundService.getQuotas(fund.id, dateStart, dateEnd));
        const cleaned = rawData.filter(q => q.date && q.price != null);
        const grouped = this.groupByTimeUnit(cleaned, this.timeUnit);
        console.log(grouped);
        return {
          label: fund.name,
          data: grouped,
          fill: false,
          tension: 0.1,
        } as ChartDataset<'line', { x: string, y: number }[]>;
      })
    );

    this.chartSeries = datasets;
    console.log('Final chartSeries', JSON.stringify(this.chartSeries, null, 2));

  }

  ngOnInit(): void {
    this.fundService.getFundTypes().then(types => {
      this.fundTypes = types;

      this.filterForm = this.fb.group({
      fund_type: [[this.fundTypes[0]], Validators.required],
      date_start: [this.date_range[0], Validators.required],
      date_end: [this.date_range[1], Validators.required]
      });

      this.retrieveQuotas();
    })
  }

  onSubmit(): void {
    if(this.filterForm.invalid) {
      this.filterForm.markAllAsTouched();
      return;
    }
    this.retrieveQuotas();
  }

  cleanFilters(): void {
    this.filterForm.reset();
  }

}
