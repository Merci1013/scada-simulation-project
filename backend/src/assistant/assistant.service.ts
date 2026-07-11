// assistant.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssistantService {
  async ask(question: string) {
    const q = question.toLowerCase();

    if (q.includes('capteurs inactifs')) {
      return {
        answer: 'Je vais afficher les capteurs inactifs.',
        action: 'GET_INACTIVE_SENSORS',
      };
    }

    if (q.includes('alarmes critiques')) {
      return {
        answer: 'Je vais afficher les alarmes critiques.',
        action: 'GET_CRITICAL_ALARMS',
      };
    }
    if (q.includes('capteurs actifs')) {
        return {
            answer: 'Voici la liste des capteurs actifs.',
            action: 'GET_ACTIVE_SENSORS',
        };
    }

    return {
      answer:
        "Je peux répondre aux questions sur les capteurs, les alarmes et les mesures SCADA.",
      action: null,
    };
  }
}