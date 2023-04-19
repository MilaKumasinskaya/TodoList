import React, {ChangeEvent, KeyboardEvent, FC, useRef, useState} from 'react';
import {TaskType} from "./App";


export type FilterValuesType = 'All' | 'Active' | 'Completed'

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}


const TodoList: React.FC<TodoListPropsType> = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>('')

    // const addTaskInputRef = useRef<any>(null)

    let isAllTasksDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone !== true) {
            isAllTasksDone = false
            break;
        }
    }


    const todoClasses = isAllTasksDone ? "todolist" : "todolist-empty"
    const maxTitleLength = 20
    const recommendedTitleLength = 10
    const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTaskHandler = () => props.removeTask(task.id)

        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>x
                </button>
            </li>
        )
    })
    const isAddTaskNotPossible: boolean = title.length === 0 || title.length > maxTitleLength
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
        // if(addTaskInputRef.current) {
        //     props.addTask(addTaskInputRef.current.value)
        //     addTaskInputRef.current.value = ''
        // }
    }
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined
        : (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()
    const longTitleWarning = (title.length > recommendedTitleLength && title.length <= maxTitleLength) &&
        <div style={{color: "hotpink"}}>Title should be shorter!</div>
    const longTitleError = title.length > maxTitleLength && <div style={{color: "red"}}>Title is too long!</div>
    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder='enter task title'
                    value={title}
                    onChange={setLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                    /*   e.currentTarget === input  */
                    // ref={addTaskInputRef}
                />
                <button
                    disabled={isAddTaskNotPossible}
                    onClick={addTaskHandler}>+
                </button>
                {longTitleWarning}
                {longTitleError}
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
}

export default TodoList;