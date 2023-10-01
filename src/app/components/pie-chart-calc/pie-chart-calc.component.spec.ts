import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartCalcComponent } from './pie-chart-calc.component';

describe('PieChartCalcComponent', () => {
  let component: PieChartCalcComponent;
  let fixture: ComponentFixture<PieChartCalcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PieChartCalcComponent]
    });
    fixture = TestBed.createComponent(PieChartCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
