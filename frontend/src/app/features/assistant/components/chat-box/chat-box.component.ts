import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssistantService } from '../../pages/assistant-page/assistant.service';


@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.scss',
})
export class ChatBoxComponent {
  private readonly assistantService = inject(AssistantService);

  question = '';
  answer = '';
  isLoading = false;

  sendQuestion(): void {
    if (!this.question.trim()) {
      return;
    }

    this.isLoading = true;

    this.assistantService.askAssistant(this.question).subscribe({
      next: (response) => {
        this.answer = response.answer;
        this.isLoading = false;
      },
      error: () => {
        this.answer = "Erreur : impossible de contacter l'assistant SCADA.";
        this.isLoading = false;
      },
    });
  }
}