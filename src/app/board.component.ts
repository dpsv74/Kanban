import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { LaneComponent } from './lane.component';
import { Lane } from './types';
import { Task } from './task.interface';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, LaneComponent],
  template: `
    <div class="board">
      <app-lane
        *ngFor="let lane of lanes"
        [lane]="lane"
        [connectedTo]="getConnectedLists()"
        (dropped)="drop($event)">
      </app-lane>
    </div>
  `
})
export class BoardComponent {
  lanes: Lane[] = [
    {
      title: 'Todo',
      id: 'todo',
      tasks: [
        { id: '1', text: 'Learn Angular', votes: 0, likes: 0 },
        { id: '2', text: 'Create a Kanban Board', votes: 0, likes: 0 },
        { id: '3', text: 'Master Drag and Drop', votes: 0, likes: 0 }
      ]
    },
    {
      title: 'In Progress',
      id: 'inProgress',
      tasks: [
        { id: '4', text: 'Working on Project', votes: 0, likes: 0 },
        { id: '5', text: 'Implementing Features', votes: 0, likes: 0 }
      ]
    },
    {
      title: 'Done',
      id: 'done',
      tasks: [
        { id: '6', text: 'Setup Development Environment', votes: 0, likes: 0 },
        { id: '7', text: 'Initial Project Structure', votes: 0, likes: 0 }
      ]
    }
  ];

  getConnectedLists(): string[] {
    return this.lanes.map(lane => lane.id);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}