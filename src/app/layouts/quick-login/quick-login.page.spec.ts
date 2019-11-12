import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickLoginPage } from './quick-login.page';

describe('QuickLoginPage', () => {
  let component: QuickLoginPage;
  let fixture: ComponentFixture<QuickLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
