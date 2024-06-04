import { iTask } from "../interface/task.interface";

export class Task implements iTask{
    id: number = 0;
    title: string;
    state: boolean;
    constructor(title: string){
        this.title = title;
        this.state = false;
    }
}