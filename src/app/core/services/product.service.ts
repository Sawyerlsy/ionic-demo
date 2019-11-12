import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from 'src/app/shared';
import { environment } from 'src/environments/environment';
import { LogService } from './log.service';

/**
 * Product Service
 * @author Sawyer
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private logService: LogService) { }

  /**
   * find product by keywords
   */
  findProducts(keywords: string): Observable<Product[]> {
    if (!keywords.trim()) {
      return of([]);
    }

    return this.http.get<Product[]>(`${environment.baseUrl}/products?keywords=${keywords}`)
      .pipe(catchError(this.handleError('findProducts', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any) => {
      console.error(error);
      this.logService.logError(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
