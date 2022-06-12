import { animate, state, style, transition, trigger } from '@angular/animations';
import { EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';
import {Todo} from  'src/app/models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass'],
  animations: [
    trigger('animaciones', [
      state('inactive', style({
        transform: 'translateX(-1500px)'
      })),
      // state('active', style({
      //   transform: 'translateX(0px)'
      // })),
      state('inactive2', style({
        transform: 'translateX(0px)'
      })),
      state('inicial2', style({
        transform: 'translateX(0px)'
      })),
      state('final2', style({
        transform: 'translateX(+1500px)'
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('inicial2 => final2', animate('300ms ease-out'))
    ]),
  ]
})
export class TodoComponent implements OnInit {

@Input() tarea: Todo;
@Output() tareaOutput = new EventEmitter<Todo>();

  constructor() { }

  state = 'inactive';

  ngOnInit(): void {
    setTimeout(() => {this.state = 'active'}, 500);
  }
  
  completar() {
    if(this.tarea.completada !== undefined) {
      console.log(this.tarea.completada);
      this.state = 'inicial2';
      setTimeout(() => {
        this.state = 'final2';
      }, 1000)
      setTimeout(() => {
        this.tareaOutput.emit(this.tarea);
        this.tarea.completar();
      }, 2000)
       return;
    }
    this.state = 'inicial';
    setTimeout(() => {
      this.state = 'final';
    }, 1000)
    setTimeout(() => {
      this.tareaOutput.emit(this.tarea);
      this.tarea.completar();
    }, 2000)
  }

  getColor(){
    switch(this.tarea.gradoImportancia) {
      case 1: return '#ff0000';
      case 2: return '#ea631f';
      case 3: return '#eeae38';
      default: return '#57b9b9'
    }
  }

}


