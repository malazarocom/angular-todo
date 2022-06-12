import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.sass']
})
export class ListaComponent implements OnInit {

  mensaje: string;
  fecha: Date;
  gradoImportancia: number;
  tareas: Todo[] = [];
  completadas: Todo[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  crearTarea() {
    this.tareas.push(
      new Todo(this.mensaje, this.fecha, this.gradoImportancia, false)
    );
  }

  borrarDeLista(indice: number) {
    this.tareas.splice(indice, 1);
  }

  borrarDeListaCompletadas(indice: number) {
    this.completadas.splice(indice, 1);
  }

  recibirTareaCompletada(tarea: Todo) {
    if(tarea.completada == false) {
      const testIndex = this.completadas.push(tarea);
      const index = this.tareas.indexOf(tarea, 0);
      this.borrarDeLista(index);
    } else {
      const index = this.completadas.indexOf(tarea, 0);
      this.borrarDeListaCompletadas(index);
    }
  }

}
