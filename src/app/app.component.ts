import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './core/material/material.module';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FintualService } from './core/services/http/fintual.service';
import { Fund } from './shared/interfaces/Fund';

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
  funds: string[] = [
    "Very Conservative Streep", //id 15077
    "Conservative Clooney", //id 188
    "Moderate Pit", //id 187
    "Risky Norris" //id 186
  ];
  //fundTypes!: Fund[];
  date_range: Date[] = [new Date(), new Date()];

  constructor(
    private fb: FormBuilder,
    private fintualService: FintualService
  ) {

  }

  ngOnInit(): void {
    //TODO: update funds with the values from fintual service
    //this.fundTypes = this.fintualService.getFundTypes();

    this.filterForm = this.fb.group({
      fund_type: [[this.funds[0]], Validators.required],
      date_start: [this.date_range[0], Validators.required],
      date_end: [this.date_range[1], Validators.required]
    });
  }

  cleanFilters() {
    this.filterForm.reset();
  }

}
