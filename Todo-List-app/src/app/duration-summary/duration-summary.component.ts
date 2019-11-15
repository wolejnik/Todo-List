import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../shared/task-list/task-list.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-duration-summary',
  templateUrl: './duration-summary.component.html',
  styleUrls: ['./duration-summary.component.scss']
})
export class DurationSummaryComponent implements OnInit {

  todoTasks: Task[];
  sumEgz = 0;
  sumPrj = 0;
  sumDom = 0;
  sumPoz = 0;

  constructor(
    private taskService: TaskListService
  ) { }

  ngOnInit() {
    this.init();
  }

  async init() {
    await this.taskService.getTasks().subscribe(t => {
      this.todoTasks = t.map(item => {
        return {
          taskID: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Task;
      });
      this.sumEgz = 0;
      this.sumPrj = 0;
      this.sumDom = 0;
      this.sumPoz = 0;
      this.todoTasks.forEach(task => {
        if(task.category === 'Egzamin'){
          this.sumEgz += task.duration;
          console.log('Egz', this.sumEgz);
        } else if (task.category === 'Projekt') {
          this.sumPrj += task.duration;
          console.log('Prj', this.sumPrj);
        }  else if (task.category === 'Obowiązki domowe') {
          this.sumDom += task.duration;
          console.log('Dom', this.sumDom);
        }else if (task.category === 'Pozostałe zadania'){
          this.sumPoz += task.duration;
          console.log('Poz', this.sumPoz);
        }
      })
    });
  }

}
