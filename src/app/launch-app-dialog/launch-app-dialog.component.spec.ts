import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchAppDialogComponent } from './launch-app-dialog.component';

describe('LaunchAppDialogComponent', () => {
  let component: LaunchAppDialogComponent;
  let fixture: ComponentFixture<LaunchAppDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaunchAppDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchAppDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
