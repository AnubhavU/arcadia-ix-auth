import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendClientComponent } from './backend-client.component';

describe('BackendClientComponent', () => {
  let component: BackendClientComponent;
  let fixture: ComponentFixture<BackendClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
