import { Component, OnInit,inject } from '@angular/core';
import TaskService from './Service/task.service';
import { Task } from './models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule,FormsModule, HttpClientModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  providers: [TaskService]
})
export class TaskComponent implements OnInit {
  tasks : Task[] = [];
  newTaskTitle : string = '';


  private taskServiceO = inject(TaskService);
  TasksHttp = this.taskServiceO.tasksHttp;

  ngOnInit() {
    this.taskServiceO.getTask().subscribe();
  }

  createTaskHttp(){
    this.taskServiceO.createTaskHttp(this.newTaskTitle).subscribe(()=>{
      this.newTaskTitle = '';
      this.loadTasks();
    })
  }





  //#region  ancien
  constructor(private taskService: TaskService) {
    this.loadTasks();
  }
  loadTasks(){
    this.tasks = this.taskService.Tasks;
  }

  createTask(){
    this.taskService.createTask(this.newTaskTitle);
    this.newTaskTitle = '';
    this.loadTasks();
  }

  deleteTask(id : number){
    this.taskService.deleteTask(id);
    this.loadTasks();
  }
  //#endregion ancien
}
