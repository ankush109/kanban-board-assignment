# Kanban-board 

Note : if your using the live version the backend requests are slow as its deployed on a free server so the first time it will take time then it would work normally !

Dark Mode : 

![](https://github.com/ankush109/kanban-board-assignment/blob/main/client/assets/dark-mode-ui.png)

Light Mode : 

![](https://github.com/ankush109/kanban-board-assignment/blob/main/client/assets/light-mode-ui.png)

Task Info Modal (dark) :

![](https://github.com/ankush109/kanban-board-assignment/blob/main/client/assets/dark-task-info.png)

Task Info Modal (light) :

![](https://github.com/ankush109/kanban-board-assignment/blob/main/client/assets/light-task-info.png)


Edit Task Modal (light) :

![](https://github.com/ankush109/kanban-board-assignment/blob/main/client/assets/edit-task-light.png)


Edit Task Modal (dark) :

![](https://github.com/ankush109/kanban-board-assignment/blob/main/client/assets/edit-task-dark.png)

Add Task Modal (light) :

![](https://github.com/ankush109/kanban-board-assignment/blob/main/client/assets/add-task-light.png)


## Running with Docker

The entire App can be run with a single command: (make sure docker is installed and running in background)

```sh
docker-compose up
```

Features : 
 
1. Drag and drop task to different column (without any library)
2. Theme Toggle (dark / light)
3. Search functionality 
4. Add/Edit/Delete task 
5. Add/Delete comment to a task 
6. Undo a deleted task 
7. Fully responsive UI 
8. Backend with database setup to store the tasks along with their comments .
9. No UI library used 
10. Docker setup to run the entire app with just one command ( includes setting up the db ) 
11. Have used good pratices like  React Query and Mutation hooks to cache data effeciently .
12. Used Context Api to store things in localstorage like  the theme and task which is to be undo after delete 












