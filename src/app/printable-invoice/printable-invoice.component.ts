import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../models/invoice';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'app-printable-invoice',
  templateUrl: './printable-invoice.component.html',
  styleUrls: ['./printable-invoice.component.css']
})
export class PrintableInvoiceComponent implements OnInit{
  invoice: Invoice;
  email: string;

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.email = this.route.snapshot.params['email'];
    console.log('Email:', this.email);



    this.invoiceService.getInvoiceByEmail(this.email).subscribe(
      (data) => {
        console.log('Fetched invoice data:', data);
        this.invoice = data.length > 0 ? data[data.length - 1] : null;
        console.log('Final invoice object:', this.invoice);
      },
      (error) => {
        console.error('Error fetching invoice data:', error);
      }
    );
  }
}
