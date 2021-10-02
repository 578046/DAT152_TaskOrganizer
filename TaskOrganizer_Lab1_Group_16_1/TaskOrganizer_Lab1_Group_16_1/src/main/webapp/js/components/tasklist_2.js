/**
 * 
	DAT152 Advanced Web Applications
	Exercise on Ajax
	
	TaskList:
	- The TaskList component is used to manage tasks.
	- The TaskList class has methods that are intended for the controlling code to set up the view and manage the tasks of the view.
	
	@author Silja Stubhaug Torkildsen

 */


"use strict";


export default class TaskList extends HTMLElement {
	
	
	constructor() {
		super();
		
		this.serverData;
		this.taskNr = 0;
		this.newStatus;
		
		//const shadow = this.attachShadow({ mode: 'closed' });
		//shadow.appendChild(this._createHTML());
		this._shadow = this.attachShadow({ mode: 'closed' });
		this._createHTML();
		
		
		
	}
	
	_createHTML() {
		const wrapper = document.createElement('div');
		const content = `
		
			<p id="serverData">Waiting for server data.</p>
            <button type="button" id="addNewTask" disabled >New Task</button> 
			<br><br> 
			<table>
				<thead>
					<tr>
						<th>Task</th>
						<th>Status</th>
						<th>
							<!-- Modify task-->
						</th>
						<th>
							<!-- Delete task-->
						</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>

        `;
		
		

		wrapper.insertAdjacentHTML('beforeend', content);
        this._shadow.appendChild(wrapper);
		this.serverData = this._shadow.querySelector("#serverData");
		return wrapper;
	}
	
	enableaddtask() {
		this._shadow.querySelector('#addNewTask').disabled = false;
	}
	
	addtaskCallback(callbackFunction) {
        this.addTask = callbackFunction;
        const newTaskBtn = this._shadow.querySelector('#addNewTask');
        newTaskBtn.addEventListener('click', this.addTask);
    }

    changestatusCallback(callbackFunction) {
        this.newStatus = callbackFunction;
    }

    deletetaskCallback(callbackFunction) {
        this.deleteTask = callbackFunction;
    }

	
	/*** 
	addtaskCallback(f) {
		const btn = this._shadow.querySelector('#addNewTask');

		btn.addEventListener('click', f);
	}
	
	
	changestatusCallback(f) {
		f("id", "status");
		this.newStatus = f;
	}

	deletetaskCallback(f) {
		f("id");
	}*/
	
	noTask() {
		const txt = this._shadow.querySelector('#serverData');
		txt.innerText = "No tasks where found!";
		console.log("noTask()");
	}
	
	
	
	showTask(newtask) {
		this.enableaddtask();
		const content = `<tr id="${newtask.id}"> 
						<td>${newtask.title}</td>
						<td id="status">${newtask.status}</td>
						<td>
							<select id="taskStatus" name="taskStatus">
  								<option value="ACTIVE">ACTIVE</option>
  								<option value="WAITING">WAITING</option>
  								<option value="DONE">DONE</option>
							</select>
						</td>
						<td>
							<button type"button" id="remove"> remove </button>
						</td>
						</tr>
					`;
	
		this._shadow.querySelector('tbody').insertAdjacentHTML('afterbegin', content);
		this.taskNr++;
		this.serverData.innerText = "Found " + this.taskNr + " tasks.";
	
		const select = this._shadow.querySelector(`tbody tr[id="${newtask.id}"] select`);
        select.addEventListener("change", (e) => {
            if(window.confirm("Set " + newtask.title + " to " + e.target.value + "?")) {
                this.newStatus(newtask.id, e.target.value);
            }
        }, true);

        const rmBtn = this._shadow.querySelector(`tbody tr[id="${newtask.id}"] button`);
        rmBtn.addEventListener("click", () => {
			if(window.confirm("Delete '" + newtask.title + "'?")) {
				this.deleteTask(newtask.id);	
			}
			
			}, true);
	}

	updateTask(status) {
		console.log(status);
		console.log(this._shadow.querySelector(`tbody tr[id="${status.id}"]`));
		const update = this._shadow.querySelector(`tbody tr[id="${status.id}"]`);
		update.querySelectorAll("td")[1].innerText = status.status;

	}

	removeTask(id) {
		console.log("task removed");
		const tasklist = document.querySelector("task-list");
		const remove = this._shadow.querySelector(`tbody tr[id="${id}"]`);
		this.taskNr--;
		
		if(this.taskNr == 0) {
			tasklist.noTask();
		} else {
			this.serverData.innerText = "Found " + this.taskNr + " tasks.";
		}
		
		remove.remove();

	}
}

customElements.define('task-list', TaskList);