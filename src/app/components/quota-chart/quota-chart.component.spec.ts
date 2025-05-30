import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotaChartComponent } from './quota-chart.component';

describe('QuotaChartComponent', () => {
  let component: QuotaChartComponent;
  let fixture: ComponentFixture<QuotaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotaChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
