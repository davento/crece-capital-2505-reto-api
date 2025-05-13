import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './core/material/material.module';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FundService } from './core/services/http/fund.service';
import { FundLite } from './shared/interfaces/Fund';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  title = 'Información Histórica Fondos Fintual';
  filterForm!: FormGroup;
  // TODO: make sure this is being obtained from the api instead
  fundTypes!: FundLite[];
  date_range: Date[] = [new Date(), new Date()];

  constructor(
    private fb: FormBuilder,
    private fundService: FundService
  ) {

  }

  private formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
  }

  private retrieveQuotas(): void {
    const formValue = this.filterForm.value;
    const funds = formValue.fund_type;

    const dateStart: string = this.formatDate(formValue.date_start);
    const dateEnd: string = this.formatDate(formValue.date_end);

    for(const fund of funds) {
      this.fundService.getQuotas(fund.id, dateStart, dateEnd).then(quotas => {
        console.log({id: fund.name, quotas_data: quotas});
      });
    }
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
