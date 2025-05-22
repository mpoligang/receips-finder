import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationItemComponent } from './preparation-item.component';

describe('PreparationItemComponent', () => {
  let component: PreparationItemComponent;
  let fixture: ComponentFixture<PreparationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreparationItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreparationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
