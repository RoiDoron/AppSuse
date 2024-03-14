const { useState } = React
import { TodoNote } from "./TodoNote.jsx"
import { PinnedNote } from "./PinnedNote.jsx"

export function NotePreview({ note, onUpdateNote, onRemoveNote }) {
    const [color, setColor] = useState('bisque');
    
    function onSetColor(ev) {
        const newColor = ev.target.value
        const updatedStyle = { ...note.style, backgroundColor: newColor }
        const updatedNote = { ...note, style: updatedStyle }
        setColor(newColor)
        onUpdateNote(updatedNote)
    }

    function handleInputChange(ev) {
        const field = ev.target.id
        const value = ev.target.innerText
        note = { ...note, info: { ...note.info, [field]: value } }
        onUpdateNote(note)
    }

    return <div style={note.style} className="note-preview">
        <button className="pinned-note">📌</button>
        {note.info.title && <TodoNote handleInputChange={handleInputChange} title={note.info.title} todos={note.info.todos} />}

        {note.info.txt && <p contentEditable="true" id='txt' onInput={handleInputChange}>{note.info.txt}</p>}
        {note.info.url && <img className="img-preview" src={note.info.url} alt="" />}
        {!!note.info.src && <iframe src={note.info.src}>
        </iframe>}
        <button onClick={() => onRemoveNote(note.id)} className="remove-btn">🗑️</button>
        <input onInput={onSetColor} value={color} type="color"></input>
    </div>
}


