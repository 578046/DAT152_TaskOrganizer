/**
 * 
	DAT152 Advanced Web Applications
	Exercise on Ajax
	
	TaskBox:
	- The TaskBox component lets the user add a new task.
	- The TaskBox component have the following methods:
		- show() - Opens (shows) the modal box in the browser window.
		- newtaskCallback(callback) - Adds a callback to run at click on the Add task button.
  		- close() - Removes (hides) the modal box from the view.
	- The TaskBox component should have the following propeties:
		- allstatuses - Setter for the list of possible task statuses.
		
		
	@author Silja Stubhaug Torkildsen
 */


"use strict";

console.log("Taskbox");
export default class TaskBox extends HTMLElement {
	
	_cssfile = "style.css";
	
	constructor() {
		super();
		
		
		// Get the modal
		this.modalBox;
		//Get the button that opens the modal
		this.addNewTaskBtn;
		
		
		this._shadow = this.attachShadow({ mode: 'closed' });
		this._createLink();
		this._createHTML();
		
		
		const btn = this._shadow.querySelector("button");
		

		btn.addEventListener("click", () => {
			const modal = this._shadow.querySelector(".modalBox");
			console.log(btn);
			console.log(modal);
			const input = modal.getElementsByTagName("input")[0].value;
			
			const status = modal.getElementsByTagName("select")[0].value;
			
			const task = {title: input, status: status};

			this.onSubmit(task);
		}, true);
		
		
		
		
		const close = this._shadow.querySelector(".close");
		close.addEventListener("click", () => {
			this.close();
		}, true); 
		
	}
	
	//Link to css file
	
	_createLink() {
        const link = document.createElement('link');

        // Use directory of script as directory of CSS file
        const path = import.meta.url.match(/.*\//)[0];
        link.href = path.concat(this._cssfile);
        link.rel = "stylesheet";
        link.type = "text/css";
        this._shadow.appendChild(link);
        return link;
    } 

	//TaskBox content
	_createHTML() {
		const content = `
		
			<div class="modalBox-content">
				<span class="close">&times;</span>
				<table>
                	<tr><th>Title:</th><td><input type="text" size="25" maxlength="80"/></td></tr>
                	<tr><th>Status:</th><td><select></select></td></tr>
            	</table>
            	<p><button class="delBtn" type="submit">Add task</button></p>
			</div>

        `;

		const wrapper = document.createElement('div');
        wrapper.classList = "modalBox";
		console.log(this._shadow.querySelector(".modalBox"));
        wrapper.id = "taskbox";
		wrapper.insertAdjacentHTML('beforeend', content);
        this._shadow.appendChild(wrapper);
		this.spanClose = this._shadow.querySelector(".close");
		this.modalBox = wrapper;
		return wrapper;
	
	}
	
	//Opens (shows) the modal box in the browser window.
	show() {
		this._shadow.querySelector(".modalBox").style.display = "block";
	}
    
	//Adds a callback to run at click on the Add task button.
	newtaskCallback(callback) {
		this.onSubmit = callback;
	}
	
	set allstatuses(statuses) {
		this.statuses = statuses;
		
		const modal = this._shadow.querySelector(".modalBox");
		
		const select = modal.getElementsByTagName("select")[0];
		
		this.statuses.map(status => {
			const stat = document.createElement("option");
			stat.setAttribute("value", status);
			
			stat.innerText = status;
			select.appendChild(stat);
		});
	}
	
	//Removes (hides) the modal box from the view.
	close() {
		this._shadow.querySelector(".modalBox").style.display = "none";
	}
	
}

customElements.define('task-box', TaskBox);

