# DAT152_TaskOrganizer
Exercise on Ajax

Part one: User interface for tasks
Here in part one you will create a web application that displays tasks and their statuses. Create a new Dynamic Web Project in Eclipse, and name the project for TaskOrganizer. If you use IntelliJ, you answer the assignment by delivering an archive, zip or tar, with the content of the webapp dirctory of module TaskOrganizer, see instructions here.

You should not implement functionality to authenticate users. You can assume that users are authenticated prior to using the TaskOrganizer application.

The user interface is made up of two components, TaskList and TaskBox. The first of these, TaskList was the task of the first JavaScript exercise. The TaskBox component lets the user add a new task.

All components, TaskList and TaskBox, and eventual a common parent component should be created as JavaScript modules.

When the user clicks the button New task of TaskList, the controller code, or parent component should open a modal box where the user can add details of a new task. Create a JavaScript component TaskBox where the user can fill inn the necessary details. You can find instructions on the net on how to create a modal box, e.g. How To Make a Modal Box With CSS and JavaScript. Observe that this howto is made for an older version of JavaScript and does not use make of components. You will need to adapt the code for this exercise and then you should also modernise the code.

As for TaskList, TaskBox should have no knowledge about Ajax.

The illustration below shows a possible modal box for adding a new task.

![image](https://user-images.githubusercontent.com/42578147/135720876-260fdca2-d3b8-41f2-acc8-bbc4614ba22a.png)

An HTML body for the view above, using both TaskList and TaskBox can be:

<body>
    <h1>Tasks</h1>

    <!-- The task list -->
    <task-list></task-list>
        
    <!-- The Modal -->
    <task-box></task-box>
</body>
In the above HTML, the body tag is the parent of the task-list and task-box components. You can chose to put these components into a common parent component, e.g. task-view.

The TaskBox component should have the following methods:

show() - Opens (shows) the modal box in the browser window.
newtaskCallback(callback) - Adds a callback to run at click on the Add task button.
close() - Removes (hides) the modal box from the view.
a
The TaskBox component should have the following propeties:

allstatuses - Setter for the list of possible task statuses.
TaskBox must run the callback method set with newtaskCallback with the new task as parameter.

The modal box should close (hide) if the user clicks the close symbol, or if the close() method is called.

The JavaScript code below demonstrates how to use TaskBox.

const taskbox = document.querySelector("task-box");
taskbox.newtaskCallback(
    (task) => {
        console.log(`New task '${task.title}' with initial status ${task.status} is added by the user.`);
        taskbox.close();
    }
);
taskbox.allstatuses = ["WATING","ACTIVE","DONE"];
taskbox.show();
In part two, the list of possible statuses should be fetched by the controller code, or a common parent from the webserver with Ajax.

Each task will get a unique id that is set by the web server and returned to the application. In part two of this exercise, tasks are stored in a database on the server side, and the id will be equal to the primary key that is chosen by the database.


Part two: Interacting with the server through Ajax
In this part of the exercise you will use the API of TaskList and TaskBox to update the task database on the server through the use of Ajax. The controller code, or a parent component will need to add callbacks to TaskList through the methods addtaskCallback, changestatusCallback and deletetaskCallback, and to TaskBox through method newtaskCallback.

Implement all Ajax functionality described below using the Fetch API. You should not do any changes to TaskList, nor TaskBox from part one. All functionality must be added through the component APIs of TaskList and TaskBox.

The server side application does not include functionality required to update concurrent clients on changes to the database. You can therefore assume that only one client at any time is working with the server database. In a real scenario with concurrent access to data, clients must be informed about changes made by others:

Clients can regulary pull changes from the server with Ajax, or
the server can push changes to the clients using websockets or Server-Sent Events.
The server side part of the application has been made ready for this exercise. You must use this project in your application. The server side application uses JPA to connect to a database with tasks. The Eclipse version uses an embedded Derby database whereas the IntelliJ version requires a running MaraiaDB database set up according to specifications found here.

If anybody of you manages to make IntelliJ work JPA on an embedded Derby database on TomEE, please tell me!

The response documents from the server side application is sent with the following content type:

application/json; charset=utf-8
The following services are available from the server side application:

GET broker/allstatuses
GET broker/tasklist
POST broker/task
PUT broker/task/{id}
DELETE broker/task/{id}
Note: Do not modify the service contacts of the of the provided application. The lecturer will test your solution and the test will fail if the server side API has been changed.

The project TaskDemo expects that the URL to the services of TaskServices is ../TaskServices/broker. Do not modify the URL, or your application will fail when the lecturer test your solution.

Using Eclipse
The Eclipse project TaskServices assume that a web server named TomEE is running on the server, using Apache TomEE Microprofile version 8.0.6. and Java≥11.

[taskservices.zip](https://github.com/578046/DAT152_TaskOrganizer/files/7271629/taskservices.zip) — Eclipse project with the server side part of the application.

[taskdemo.zip](https://github.com/578046/DAT152_TaskOrganizer/files/7271631/taskdemo.zip) — Eclipse project that demonstrates how to use the server side application.

The supplied web server application for Eclipse uses JPA with an embedded Derby database. This can give the error message below. You have most probably then not set up TomEE for Eclipse as described on slides 15 and 16 in the document Choosing an IDE:

SEVERE: ContainerBase.removeChild: destroy: 
org.apache.catalina.LifecycleException: An invalid Lifecycle transition was attempted ([before_destroy]) for component ...
        at org.apache.catalina.util.LifecycleBase.invalidTransition(LifecycleBase.java:401)
        at org.apache.catalina.util.LifecycleBase.destroy(LifecycleBase.java:291)
...
You import an exsisting project to Eclipse with the menu File/Import/General/Existing Projects into Workspace. Select the archive file and click Finish.

Import both projects to Eclipse. For project TaskDemo, select Run As, and then add also the project TaskServices to the web server.

You should not change the Java code of the supplied web server application. If you do, the application will easily fail unless you turn of automatic build in Eclipse and clean the project before a new build.

The Derby database of TaskServices.zip stores the database in memory, and the database is lost when the server is restarted. The application will create an initial database with three tasks. You can modify the application to store the database on disk, and remove the initial tasks. If you modify the application, the application tends to fail unless you turn of automatic build and clean the project before each new build.

You can make the database persistent by modifying the file TaskServices/Java Resources/src/META-INF/resources.xml and update the property jdbcUrl to save to a file on disk.

The database is populated with three tasks in the contextInitialized method of TaskServices/Java Resources/src/hvl.dat152.service/MyContextListener. If you store the database to disk, you can comment out the code that creates the three initial tasks.

Service GET broker/allstatuses
The service retrieves a list of all possible states that a task can have. This list is used to populate the option elements of the Modify select elements.

GET ../TaskServices/broker/allstatuses
An example of JSON that is returned by the service is shown below. The text is formatted for improved readability:

{
    "allstatuses": ["WAITING","ACTIVE","DONE"],
    "responseStatus":true
}
The property responseStatus has value true if the statuses were found in the database, false otherwise. When responseStatus has the value true, the response will also have a property allstatuses with the list of possible task statuses.

Service GET broker/tasklist
The service retrieves a list of all task from the server. This list is used to create the list of tasks that is displayed by GuiHandler.

GET ../TaskServices/broker/tasklist
An example of JSON that is returned by the service is shown below. The text is formatted for improved readability:

{
    "responseStatus":true,
    "tasks":
        [
            {"id":1,"title":"Paint roof","status":"WAITING"},
            {"id":2,"title":"Wash windows","status":"ACTIVE"},
            {"id":3,"title":"Wash floor","status":"DONE"}
        ]
}
The property responseStatus has value true if the statuses were found in the database, false otherwise. When responseStatus has the value true, the response will also have a property tasks with the list of all tasks in the database.

Service POST broker/task
The service adds a task to the database. We add a task to the database with:

POST ../TaskServices/broker/task
The service expects that the data is sent to the server with the following content type:

application/json; charset=utf-8
Data for the new task must be sent as JSON with properties title and status. Below is an example of data that the service will accept:

{
    "title": "Something more to do",
    "status": "WAITING"
}
An example of JSON that is returned by the service is shown below. The text is formatted for improved readability:

{
    "task":
        {
            "id":6,
            "title":"Something more to do",
            "status":"WAITING"
        },
    "responseStatus":true
}
The property responseStatus has value true if the task was added to the database, false otherwise. When status has the value true, the response will also have a property task with properties of the task. The property id corresponds to an unique attribute value that the task has in the database, i.e. its primary key.

Service PUT broker/task/{id}
The service updates the status for a task that already exists in the database. Parameter id specifies what task to update and corresponds to the unique attribute id that we got from the POST request, i.e. the primary key of the task.

We can e.g. update task with id equal to 2:

PUT ../TaskServices/broker/task/2
The service expects that the data is sent to the server with the following content type:

application/json; charset=utf-8
Data for the new status must be sent as JSON with property status. Below is an example of data that the service will accept:

{
    "status": "DONE"
}
An example of JSON that is returned by the service is shown below. The text is formatted for improved readability:

{
    "id":2,
    "status":"DONE",
    "responseStatus":true
}
The property responseStatus has value true if the status of the task was updated in the database, false otherwise. When status has the value true, the response will also have a property status that is the new status of the task. The property id corresponds to the unique attribute that identifies the task.

Service DELETE broker/task/{id}
The service removes a task from the database. Parameter id specifies what task to update and corresponds to the unique attribute id that we got from the POST request, i.e. the primary key of the task.

We can e.g. remove task with id equal to 2:

DELETE ../TaskServices/broker/task/2
An example of JSON that can be returned by the service is shown below. The text is formatted for improved readability:

{
    "id":2,
    "responseStatus":true
}
The property responseStatus has value true if the task was removed from the database, false otherwise. The property id corresponds to the unique attribute that identified the task.

Modifying the view
The POST, DELETE and PUT requests can all update the database stored on the server. If the database was updated, the response parameter responseStatus will have the value true. The view from part one should therefore be modified only after POST, DELETE and PUT requests, and only if responseStatus is true.

Requirements to the application
All the below requirements must be met, or the assignment will be fail.

All functionality of the application must work as specified.
All components, TaskList and TaskBox, and eventual a common parent component must be imported as default JavaScript modules.
The methods that add callbacks to TaskList and TaskBox must only be called from controller code or a common parent component.
addtaskCallback, changestatusCallback, deletetaskCallback and newtaskCallback.
There must be no references to the controller code, or a common parent from TaskList or TaskBox.
There must be no references to TaskList from TaskBox.
There must be no references to TaskBox from TaskList.
All HTML elements of the task list should be created and handled only by the TaskList component.
Neither the controller code, a common parent component, nor TaskBox should refer to any of the HTML elements of the task list.
All event listeneres on the HTML elements of the task list must be handled by the TaskList component.
All HTML elements of the modal window should be handled only by TaskBox component.
Neither the controller code, a common parent compoent, nor TaskList should refer to any of the HTML elements of the modal window.
All event listeneres on the HTML elements of the modal window must be handled by TaskBox.
All access to TaskList, TaskBox and the HTML structures handled by these should be through the component APIs.
TaskList
enableaddtask, noTask, showTask,, updateTask, removeTask addtaskCallback, changestatusCallback and deletetaskCallback.
TaskBox
newtaskCallback, allstatuses, show and close.
No Ajax or use of fetch in TaskList or TaskBox.
All use of Ajax must either be put in a separate class, in the controller code, or in common parent component.
If using a separate class for Ajax, its API should only be used by the controller code or common parent component.
The URLs to the services should be relative paths within the application.
No modifications should be neccessary if moving the application to a different host or if using a gateway server.
No use of data from external sources with innerHTML, outerHTML or insertAdjacentHTML.
No user supplied data or data read from the database.
Any reference to an instance of a class from within the class must use the keyword this.
Try also to follow the below advices.

Do not mix the await and async syntax with the .then(…).catch(…) when using Promises.
The syntax await and async give code that is easier to read.
Do not embed JavaScript code in the HTML code.
Do not use onclick attributes on HTML elements in the HTML code.
Do not put JavaScript inside the <script> tags, but use separate JavaScript files.
All <script> tags should be put in the head of the document.
Attribute type="module" implies defer.
Do not include pure text into the document using innerHTML, outerHTML or insertAdjacentHTML.
These methods can be used to build HTML skeletons, but not for HTML code constructed from data.
There is no need of a separate JavaScript Array to store the task list.
Tasks can be obtained from the HTML table using DOM methods.
DOM methods are usually faster than iterating through an Array.
Both the JavaScript Array and the HTML table must be updated when tasks are modified.
Document your code using e.g. JSDoc.
