import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredAppsComponent } from './registered-apps.component';

describe('RegisteredAppsComponent', () => {
  let component: RegisteredAppsComponent;
  let fixture: ComponentFixture<RegisteredAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
