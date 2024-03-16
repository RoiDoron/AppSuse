const { useState, useEffect, useRef } = React

export function TodoNote({ handleInputChange, title, todos }) {
    const userTodos = title.split(',')
    const [isDone, setIsDone] = useState(false)
    const dynClass = isDone ? 'far fa-check-square' : 'far fa-square'

    return (<div className="TodoNote">
        <h1 suppressContentEditableWarning={true} contentEditable={true} >Todos list:</h1>
        <ul>
            {userTodos.map((todo, index) => (
                <li suppressContentEditableWarning={true} contentEditable={true} key={index}> <i onClick={() => setIsDone(!isDone)} className={`${dynClass}`} aria-hidden="true"></i> {todo}</li>
            ))}
        </ul>
    </div>
    )
}


