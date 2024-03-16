export function TodoNote({ handleInputChange, title, todos }) {
    const userTodos = title.split(',')

    return (<div className="TodoNote">
        <h1 suppressContentEditableWarning={true} contentEditable={true} >Todos list:</h1>
        <ul>
            {userTodos.map((todo, index) => (
                <li suppressContentEditableWarning={true} contentEditable={true} key={index}>{todo}</li>
            ))}
        </ul>
    </div>
    )
}


