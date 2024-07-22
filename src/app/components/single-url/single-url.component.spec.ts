import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUrlComponent } from './single-url.component';

describe('SingleUrlComponent', () => {
  let component: SingleUrlComponent;
  let fixture: ComponentFixture<SingleUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleUrlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
