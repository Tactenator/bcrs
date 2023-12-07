import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrintableInvoiceComponent } from './printable-invoice.component';

describe('InvoiceComponent', () => {
  let component: PrintableInvoiceComponent;
  let fixture: ComponentFixture<PrintableInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintableInvoiceComponent]
    });
    fixture = TestBed.createComponent(PrintableInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
