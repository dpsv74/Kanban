import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from './task.interface';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task" [class.editing]="isEditing">
      <div *ngIf="!isEditing" (dblclick)="startEditing()" class="task-content">
        <div class="task-text">{{ task.text }}</div>
        <div class="task-actions">
          <button class="action-btn" (click)="vote(1)" title="Vote Up">
            <span class="glyph">⬆️</span>
            <span class="count">{{ task.votes }}</span>
          </button>
          <button class="action-btn" (click)="like()" title="Like">
            <span class="glyph">👍</span>
            <span class="count">{{ task.likes }}</span>
          </button>
        </div>
      </div>
      <input
        *ngIf="isEditing"
        type="text"
        [(ngModel)]="editText"
        (blur)="saveEdit()"
        (keyup.enter)="saveEdit()"
        (keyup.escape)="cancelEdit()"
        #editInput
      />
    </div>
  `,
  styles: [`
    .task {
      display: flex;
      flex-direction: column;
    }
    .task-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .task-actions {
      display: flex;
      gap: 0.5rem;
      padding-top: 0.5rem;
      border-top: 1px solid #eee;
    }
    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 4px;
    }
    .action-btn:hover {
      background: #f8f9fa;
    }
    .glyph {
      font-size: 1rem;
    }
    .count {
      font-size: 0.875rem;
      color: #666;
    }
    .task input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      font-size: inherit;
    }
    .task.editing {
      padding: 0.5rem;
    }
  `]
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() taskChange = new EventEmitter<Task>();

  isEditing = false;
  editText = '';

  startEditing(): void {
    this.isEditing = true;
    this.editText = this.task.text;
  }

  saveEdit(): void {
    if (this.isEditing && this.editText.trim() !== '') {
      this.task.text = this.editText.trim();
      this.taskChange.emit(this.task);
    }
    this.isEditing = false;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  vote(value: number): void {
    this.task.votes += value;
    this.taskChange.emit(this.task);
  }

  like(): void {
    this.task.likes += 1;
    this.taskChange.emit(this.task);
  }
}