/**
 * 
	DAT152 Advanced Web Applications
	Exercise on Ajax
	
	Controller:
	- Testing methods in TaskList
	@author Silja Stubhaug Torkildsen

 */

"use strict";
//import TaskList from './components.js';

console.log("controller");
/**
* Get statuses from server.
*/
async function getStatuses() {
	return new Promise(resolve => {
		fetch("../TaskServices/api/services/allstatuses", {method: "get"})
		.then(res => res.json())
		.then(data => {
			if(data.responseStatus) {
				resolve(data.allstatuses);
			}	
		});	
	})
	
};

/**
* Get tasks from server.
*/
async function getTasks() {
	return new Promise(resolve => {
		fetch("../TaskServices/api/services/tasklist", {method: "get"})
	.then(res => res.json())
	.then(data => {
		if(data.responseStatus) {
			resolve(data.tasks);
		}	
	});	
	});
};

/**
* Post tasks to server.
*/
async function postTask(data) {
	return new Promise(resolve => {
		fetch("../TaskServices/api/services/task", {method: "POST", body: JSON.stringify(data), headers: {"Content-Type": "application/json; charset=utf-8"}})
		.then(res => res.json())
		.then(data => {
			resolve(data);	
		});	
	});
};

/**
* Update task on server.
*/
async function putTask(id, status) {
	return new Promise(resolve => {
		fetch("../TaskServices/api/services/task/" + id, {method: "PUT", body: JSON.stringify({status: status}), headers: {"Content-Type": "application/json; charset=utf-8"}})
		.then(res => res.json())
		.then(data => {
			resolve(data);	
		});	
	});
};

/**
* Delete task on server.
*/
async function deleteTask(id, status) {
	return new Promise(resolve => {
		fetch("../TaskServices/api/services/task/" + id, {method: "DELETE"})
		.then(res => res.json())
		.then(data => {
			resolve(data);	
		});	
	});
};

const tasklist = document.querySelector("task-list");
const taskbox = document.querySelector("task-box");

const statuses = await getStatuses();
const tasks = await getTasks();

tasklist.allstatuses = statuses
taskbox.allstatuses = statuses;
console.log(statuses);
console.log(tasks);
//tasklist._createHTML();



console.log(tasklist._shadow);

tasks.forEach(task => tasklist.showTask(task));	
//tasklist.noTask();


taskbox.newtaskCallback(
	async(task) => {
    	console.log(`New task '${task.title}' with initial status ${task.status} is added by the user.`);
     	const post = await postTask(task);
	 	if(post.responseStatus) {
			console.log(task);
			tasklist.showTask(post.task);
			console.log("Task successfully posted");	
	 	}
    taskbox.close()
});

tasklist.addtaskCallback(
	async() => { console.log("Click event on 'New task button'") 
	taskbox.show();
});



tasklist.deletetaskCallback(
	async(id) => {
		console.log(`Click event on delete button of task ${id}`)
	 	const delTask = await deleteTask(id);
	 	if(delTask.responseStatus) {
			tasklist.removeTask(id);
			console.log("Task successfully removed");
	 	}
	}
);

tasklist.changestatusCallback(
	async(id, newStatus) => {
		console.log(`User chose ${newStatus} for task ${id}`);
		const put = await putTask(id, newStatus);
	 	if(put.responseStatus) {
			let idStatus = {id: id, status: newStatus};
			console.log(newStatus);
			tasklist.updateTask(idStatus);
		}
	}
);

/*** 
tasklist.changestatusCallback = async(id,newStatus) => {
	console.log(`User has approved to change the status of task with id ${id} to ${newStatus}.`);
	 let put = await putTask(id, newStatus);
	 if(put.responseStatus) {
//        let idStatus = {id: id, status: newStatus};
		taskList.updateTask(put.id, put.status);
		console.log("Task successfully updated");
	 }
}*/


/*** 
const tasklist = document.querySelector("task-list");
const taskbox = document.querySelector("task-box");

tasklist.enableaddtask();

taskbox.newtaskCallback(
	async(task) => {
		console.log(`New task '${task.title}' with initial status ${task.status} is added by the user.`);
		tasklist.showTask(task);
		taskbox.close();
	}
);
taskbox.allstatuses = ["WATING", "ACTIVE", "DONE"];
taskbox.show();



tasklist.addtaskCallback(
	async() => { console.log("Click event on 'New task button'") 
	taskbox.show();
});


tasklist.changestatusCallback(
	async(id, newStatus) => {
		console.log(`User chose ${newStatus} for task ${id}`);
		let idStatus = {id: id, status: newStatus};
		tasklist.updateTask(idStatus);
	}
);


tasklist.deletetaskCallback(
	async(id) => {
		console.log(`Click event on delete button of task ${id}`)
	}
);



//tasklist.noTask();


const newtask = {
	"id": 5,
	"title": "Do DAT152 home work",
	"status": "ACTIVE"
};
tasklist.showTask(newtask);


const status = {
	"id": 5,
	"status": "DONE"
};
tasklist.updateTask(status);


//tasklist.removeTask(5);
*/