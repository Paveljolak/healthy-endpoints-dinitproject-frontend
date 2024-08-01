import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthHistoryDetailsComponent } from './health-history-details.component';

describe('HealthHistoryDetailsComponent', () => {
  let component: HealthHistoryDetailsComponent;
  let fixture: ComponentFixture<HealthHistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthHistoryDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
