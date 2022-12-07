import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredClientComponent } from './registered-client.component';

describe('RegisteredClientComponent', () => {
  let component: RegisteredClientComponent;
  let fixture: ComponentFixture<RegisteredClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
