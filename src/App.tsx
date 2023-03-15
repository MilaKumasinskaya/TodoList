import React, {useState} from 'react';
import './App.css';
import TodoList, {FilterValuesType} from "./TodoList";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App(): JSX.Element {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML & CSS", isDone: false},
        {id: 2, title: "CSS & SCSS", isDone: true},
        {id: 3, title: "ES6/TS", isDone: true},
        {id: 4, title: "REDUX", isDone: true}
    ])

    const [filter, setFilter] = useState<FilterValuesType>('All')

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForRender: TaskType[] = tasks
    if (filter === 'Active') {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'Completed') {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }


    const removeTask = (taskID: number) => {
        setTasks(tasks.filter((task: TaskType) => task.id !== taskID))
        // console.log(tasks)
    }

    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={tasksForRender} removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}/>

        </div>
    );
}

export default App;
