import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Task {
  title: string;
  done: boolean;
  priority: 'Low' | 'Medium' | 'High';
  recurring?: 'Daily' | 'Weekly' | 'Monthly';
  dependencies?: string[];
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'TODO-APP';
  tasks: Task[] = [];
  
  newTaskTitle = '';
  newTaskPriority: 'Low' | 'Medium' | 'High' = 'Low';
  newTaskRecurring: 'Daily' | 'Weekly' | 'Monthly' | '' = '';
  newTaskDependencies = [];
  searchTerm = '';

  isPriorityAscending: boolean = true;
  isStatusAscending: boolean = true;

  cerateTask() {
    if (this.newTaskTitle.trim() !== '') {
      this.tasks.push({
        title: this.newTaskTitle,
        done: false,
        priority: this.newTaskPriority,
        recurring: this.newTaskRecurring ? this.newTaskRecurring : undefined,
        dependencies: this.newTaskDependencies.length > 0 ? [...this.newTaskDependencies] : undefined
      });

      // resetting the input fields after adding the task
      this.newTaskTitle = '';
      this.newTaskPriority = 'Low';
      this.newTaskRecurring = '';
      this.newTaskDependencies = [];

      console.log(this.tasks);
    }
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t !== task);
  }

  completeTask(task: Task) {
    if (!this.hasIncompleteDependencies(task)) {
      task.done = !task.done;
    }
  }

  filteredTasks() {
    return this.tasks.filter(task => task.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  sortByPriority() {
    this.tasks.sort((a, b) => {
      const comparison = ['Low', 'Medium', 'High'].indexOf(a.priority) - ['Low', 'Medium', 'High'].indexOf(b.priority);
      return this.isPriorityAscending ? comparison : -comparison;
    });
    this.isPriorityAscending = !this.isPriorityAscending;
  }

  sortByStatus() {
    this.tasks.sort((a, b) => {
      const comparison = Number(a.done) - Number(b.done);
      return this.isStatusAscending ? comparison : -comparison;
    });
    this.isStatusAscending = !this.isStatusAscending;
  }

  hasIncompleteDependencies(task: Task): boolean {
    if (!task.dependencies) return false;
    return task.dependencies.some(dep => !this.tasks.find(t => t.title === dep)?.done);
  }
}
