const { useState, useEffect, useRef } = React

export function TodoNote({ handleInputChange, title }) {
    const userTodos = title.split(',');
    const [todoStates, setTodoStates] = useState(userTodos.map(() => false));

    const toggleTodo = (index) => {
        const newTodoStates = [...todoStates];
        newTodoStates[index] = !newTodoStates[index];
        setTodoStates(newTodoStates);
    };

    return (
        <div className="TodoNote">
            <h1 suppressContentEditableWarning={true} contentEditable={true}>Todos list:</h1>
            <ul>
                {userTodos.map((todo, index) => (
                    <li className="todo-li" suppressContentEditableWarning={true} contentEditable={true} key={index}>
                        <i onClick={() => toggleTodo(index)} className={`far ${todoStates[index] ? 'fa-check-square' : 'fa-square'}`} aria-hidden="true"></i> {todo}
                    </li>
                ))}
            </ul>
        </div>
    );
}


