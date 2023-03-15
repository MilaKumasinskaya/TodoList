import React, {FC} from 'react';
import {TaskType} from "./App";


export type FilterValuesType = 'All' | 'Active' | 'Completed'

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
}


const TodoList: React.FC<TodoListPropsType> = (props: TodoListPropsType) => {
    let isAllTasksDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone !== true) {
            isAllTasksDone = false
            break;
        }
    }
    console.log(isAllTasksDone);

    const todoClasses = isAllTasksDone ? "todolist" : "todolist-empty"

    const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => {
                    props.removeTask(task.id)
                }}>x
                </button>
            </li>
        )
    })

    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeTodoListFilter('All')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeTodoListFilter('Active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeTodoListFilter('Completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;