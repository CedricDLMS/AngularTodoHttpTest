import { Task } from "../models/task.model";
import { iTask } from "../interface/task.interface";
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({
    providedIn : 'root',
})

export default class TaskService{
    http = inject(HttpClient);
    tasksHttp = signal<iTask[]>([]);
    readonly url = "http://localhost:3000/tasks";

    Tasks : Task[] = [];
    constructor(){}

    createTask(title : string) : void{
        const task = new Task(title);
        task.id = this.Tasks.length + 1;
        this.Tasks.push(task);
    }
    deleteTask(id : number){
        const index = this.Tasks.findIndex( p => p.id == id);
        if(index !== -1){
            this.Tasks.splice(index,1);
        }else{
            console.error("not found index");
            throw new Error("Not found index");
        }
    }

    getTask() : Observable<iTask[]>{
        return this.http.get<iTask[]>(this.url).pipe(
            tap(Task => this.tasksHttp.set(Task))
          );
    }
    createTaskHttp(title : string) : Observable<iTask>{
        const newTask = { title };
        
        return this.http.post<iTask>(this.url, newTask).pipe(
            tap(task => {
                console.log(task);
                this.tasksHttp.update(tasks => [...tasks, task]);
            })
        );
    }
}