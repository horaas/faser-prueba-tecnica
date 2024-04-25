import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[];
	tareasRemove: Tarea[] = [];
	constructor(
        public service: AppService,
	) { }
	
	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}

	addTask(task: string, time: number) {
		if (task.trim() && time ) {
			this.tareas.push(new Tarea((this.tareas.length + 1), task, time))
		}

		if (!task.trim() || task.length  < 5) {
			alert('Debe tener un valor mayor o igual a 5 caracteres la tareas')
		}
		if (Number(time) === 0) {
			alert('Debe tener un valor mayor a cero el tiempo')
		}
	}

	pruebas(event, index) {
		if (!this.tareasRemove) {
			this.tareasRemove = []
		}
		if (event) {
			this.tareasRemove.push(index)
		} else {
			this.tareasRemove =  this.tareasRemove.filter((result) => {
				return result.id !== index.id
			})
			
		}
	}

	handleRemoveTask() {
		this.tareas = this.tareas.filter((result) => !this.tareasRemove.find((value) => value.id === result.id))
	}
}
