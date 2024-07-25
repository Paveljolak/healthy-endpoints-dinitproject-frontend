import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUrlModalComponent } from './edit-url-modal.component';

describe('EditUrlModalComponent', () => {
  let component: EditUrlModalComponent;
  let fixture: ComponentFixture<EditUrlModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUrlModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUrlModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
