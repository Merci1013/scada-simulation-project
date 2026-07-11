import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AssistantService {
  private readonly http = inject(HttpClient);

  askAssistant(question: string) {
    return this.http.post<{
      answer: string;
      action: string | null;
    }>(
      'http://localhost:3000/api/assistant/ask',
      { question },
    );
  }
}