import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUrlModalComponent } from './add-url-modal.component';

describe('AddUrlModalComponent', () => {
  let component: AddUrlModalComponent;
  let fixture: ComponentFixture<AddUrlModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUrlModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUrlModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
