import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRequestsComponent } from './app-requests.component';

describe('AppRequestsComponent', () => {
  let component: AppRequestsComponent;
  let fixture: ComponentFixture<AppRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
