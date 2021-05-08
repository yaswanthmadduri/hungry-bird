import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageSignupComponent } from './front-page-signup.component';

describe('FrontPageSignupComponent', () => {
  let component: FrontPageSignupComponent;
  let fixture: ComponentFixture<FrontPageSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontPageSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPageSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
