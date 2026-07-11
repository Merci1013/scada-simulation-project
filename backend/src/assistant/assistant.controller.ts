// assistant.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AssistantService } from './assistant.service';

@Controller('assistant')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post('ask')
  ask(@Body() body: { question: string }) {
    return this.assistantService.ask(body.question);
  }
}