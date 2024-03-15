export function TodoNote({ handleInputChange, title, todos }) {
    const userTodos = title.split(',')

    return (<div className="TodoNote">
        <h1>Todos list:</h1>
        <ul>
            {userTodos.map((todo, index) => (
                <li contentEditable={true} key={index}>{todo}</li>
            ))}
        </ul>

    </div>
    )
}


