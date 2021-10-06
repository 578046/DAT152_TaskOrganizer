# DAT152_TaskOrganizer
Exercise on Ajax


# Javascript components

TaskList:

The TaskList component is used to manage tasks, and a possible view is shown in the illustration
below.
<BODY>
 <!-- The task list -->
 <TASK-LIST></TASK-LIST>
</BODY>
The TASK-LIST tag creates an instance of a JavaScript class, named TaskList in this text.

The Tasklist API:

    - enableaddtask() - Enables New Task button.
    
    - addtaskCallback() - Will write text in the browser console when the user clicks the New task button. (Does not modify the view).
    
    - changestatusCallback() - Will write a text in the browser console when the user selects a different status and approves the change. The text will contain the id of the                                    task and the selected status. (Does not modify the view).
    
    - deletetaskCallback() - will write a text in the browser console when the user clicks a delete button and approves the delete action in the confirmation window. The text                                will contain the id of the task to delete. (Does not modify the view).
    
    - noTask() -  lets the controller code inform the TaskList component that there are no tasks in the task list.
    
    - showTask(newtask) - Will add a task to the view.
    
    - updateTask(status) - Will modify the status shown for a task.
    
    - removeTask(1) - Will remove the task with id 1 (Paint roof) from the view.

![image](https://user-images.githubusercontent.com/42578147/136161472-fee375bc-da80-4314-ba61-3f016497986b.png)


TaskBox:

The TaskBox component lets the user add a new task.
<body>
    <!-- The Modal -->
    <task-box></task-box>
</body>


The Taskbox API:

    - show() - Opens (shows) the modal box in the browser window.
    
    - newtaskCallback(callback) - Adds a callback to run at click on the Add task button.
    
    - close() - Removes (hides) the modal box from the view.
    
    - allstatuses - Setter for the list of possible task statuses. (Propetie)
    
![image](https://user-images.githubusercontent.com/42578147/136162253-fecde5f1-356a-4b68-ab24-bf11bf7f596a.png)



