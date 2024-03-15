const { useState } = React
import { TodoNote } from "./TodoNote.jsx"
import { ColorInput } from "./ColorInput.jsx"

export function NotePreview({ note, onUpdateNote, onRemoveNote }) {
    const [isPinned, setIsPinned] = useState(note.isPinned)
    
    function changePinnedNote(){
        setIsPinned(!isPinned)
        const updatedNote = { ...note, isPinned: isPinned }
        onUpdateNote(updatedNote)
    }
    
    function handleInputChange(ev) {
        const field = ev.target.id
        const value = ev.target.innerText
        note = { ...note, info: { ...note.info, [field]: value } }
        onUpdateNote(note)
    }

    return <div style={note.style} className="note-preview">
        <button onClick={changePinnedNote} className="pinned-note"><i class="fas fa-thumbtack" aria-hidden="true"></i></button>
        {note.info.title && <TodoNote handleInputChange={handleInputChange} title={note.info.title} todos={note.info.todos} />}

        {note.info.txt && <p contentEditable="true" id='txt' onInput={handleInputChange}>{note.info.txt}</p>}
        {note.info.url && <img className="img-preview" src={note.info.url} alt="" />}
        {!!note.info.src && <iframe src={note.info.src}>
        </iframe>}
        <button onClick={() => onRemoveNote(note.id)} className="remove-btn">🗑️</button>
        <ColorInput onUpdateNote={onUpdateNote} note={note} />
    </div>
}


