import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosSystemComponent } from './pos-system.component';

describe('PosSystemComponent', () => {
  let component: PosSystemComponent;
  let fixture: ComponentFixture<PosSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
