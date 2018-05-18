import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDropDownComponent } from './order-drop-down.component';

describe('OrderDropDownComponent', () => {
  let component: OrderDropDownComponent;
  let fixture: ComponentFixture<OrderDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
