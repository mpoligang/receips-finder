import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleWithBackNavigationComponent } from './title-with-back-navigation.component';

describe('TitleWithBackNavigationComponent', () => {
  let component: TitleWithBackNavigationComponent;
  let fixture: ComponentFixture<TitleWithBackNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleWithBackNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleWithBackNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
