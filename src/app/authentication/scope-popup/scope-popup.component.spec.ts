import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScopePopupComponent } from './scope-popup.component';


describe('ScopePopupComponent', () => {
  let component: ScopePopupComponent;
  let fixture: ComponentFixture<ScopePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScopePopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
