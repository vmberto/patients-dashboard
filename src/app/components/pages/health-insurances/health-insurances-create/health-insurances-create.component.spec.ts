import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsurancesCreateComponent } from './health-insurances-create.component';

describe('HealthInsurancesCreateComponent', () => {
  let component: HealthInsurancesCreateComponent;
  let fixture: ComponentFixture<HealthInsurancesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthInsurancesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInsurancesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
