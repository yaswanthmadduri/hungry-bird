import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndconditionsComponent } from './terms-andconditions.component';

describe('TermsAndconditionsComponent', () => {
  let component: TermsAndconditionsComponent;
  let fixture: ComponentFixture<TermsAndconditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsAndconditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndconditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
