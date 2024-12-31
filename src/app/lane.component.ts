import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { TaskComponent } from './task.component';
import { Lane } from './types';
import { Task } from './task.interface';

@Component({
  selector: 'app-lane',
  standalone: true,
  imports: [CommonModule, DragDropModule, TaskComponent],
  template: `
    <div class="swim-lane">
      <h2>{{ lane.title }}</h2>
      <div
        [id]="lane.id"
        cdkDropList
        [cdkDropListData]="lane.tasks"
        [cdkDropListConnectedTo]="connectedTo"
        (cdkDropListDropped)="dropped.emit($event)">
        <div
          *ngFor="let task of lane.tasks; let i = index"
          cdkDrag>
          <app-task
            [task]="task"
            (taskChange)="updateTask(i, $event)">
          </app-task>
        </div>
      </div>
    </div>
  `
})
export class LaneComponent {
  @Input() lane!: Lane;
  @Input() connectedTo: string[] = [];
  @Output() dropped = new EventEmitter<CdkDragDrop<Task[]>>();

  updateTask(index: number, updatedTask: Task): void {
    this.lane.tasks[index] = updatedTask;
  }
}