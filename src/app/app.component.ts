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

  ngOnInit(): void {
    this.fundService.getFundTypes().then(types => {
      this.fundTypes = types;

      this.filterForm = this.fb.group({
      fund_type: [[this.fundTypes[0]], Validators.required],
      date_start: [this.date_range[0], Validators.required],
      date_end: [this.date_range[1], Validators.required]
    });
    })
  }



  cleanFilters() {
    this.filterForm.reset();
  }

}
