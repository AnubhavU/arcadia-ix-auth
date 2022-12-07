import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthTutorialComponent } from './oauth-tutorial.component';

describe('OauthTutorialComponent', () => {
  let component: OauthTutorialComponent;
  let fixture: ComponentFixture<OauthTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OauthTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
