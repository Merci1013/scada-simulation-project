import { Component } from '@angular/core';
import { ChatBoxComponent } from '../../components/chat-box/chat-box.component';


@Component({
  selector: 'app-assistant-page',
  standalone: true,
  imports: [ChatBoxComponent],
  templateUrl: './assistant-page.component.html',
  styleUrl: './assistant-page.component.scss',
})
export class AssistantPageComponent {}