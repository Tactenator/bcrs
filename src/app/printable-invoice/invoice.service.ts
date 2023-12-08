/**
 * Title: invoice.service.ts
 * Author: William Austin
 * Date: 6 Dec 2023
 * Description: Invoice service
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl = '/api/invoice'; // Update the URL as needed

  constructor(private http: HttpClient) {}

  submitInvoice(email: string, invoiceData: any): Observable<any> {
    const url = `${this.baseUrl}/${email}`;
    return this.http.post(url, invoiceData);
  }

  getInvoiceByEmail(email: string): Observable<any> {
    const url = `${this.baseUrl}/${email}`;
    return this.http.get(url);
  }
}

