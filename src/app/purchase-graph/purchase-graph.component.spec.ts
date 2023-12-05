import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseGraphComponent } from './purchase-graph.component';

describe('PurchaseGraphComponent', () => {
  let component: PurchaseGraphComponent;
  let fixture: ComponentFixture<PurchaseGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseGraphComponent]
    });
    fixture = TestBed.createComponent(PurchaseGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
