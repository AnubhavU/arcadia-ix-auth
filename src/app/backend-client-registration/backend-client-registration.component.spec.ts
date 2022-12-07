import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendClientRegistrationComponent } from './backend-client-registration.component';

describe('BackendClientRegistrationComponent', () => {
  let component: BackendClientRegistrationComponent;
  let fixture: ComponentFixture<BackendClientRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendClientRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendClientRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
