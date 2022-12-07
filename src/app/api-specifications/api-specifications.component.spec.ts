import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSpecificationsComponent } from './api-specifications.component';

describe('ApiSpecificationsComponent', () => {
  let component: ApiSpecificationsComponent;
  let fixture: ComponentFixture<ApiSpecificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiSpecificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSpecificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
