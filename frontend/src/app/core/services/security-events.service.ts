import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SecurityEvent } from '../models/security-event.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SecurityEventsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/security-events`;

  findAll(): Observable<SecurityEvent[]> {
    return this.http.get<SecurityEvent[]>(this.baseUrl);
  }
}