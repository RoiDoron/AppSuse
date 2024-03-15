const { useState } = React

import { TodoNote } from "./TodoNote.jsx"
import { ColorInput } from "./ColorInput.jsx"
import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"

export function NotePreview({ note, onUpdateNote, onRemoveNote, loadNotes }) {
    const [isPinned, setIsPinned] = useState(note.isPinned)

    function changePinnedNote() {
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

    function onDuplicateNote(note) {
        let newNote = { ...note }; // Using the spread operator to create a shallow copy
        console.log(newNote)

        // Generate a new ID for the duplicated note
        newNote.id = ''

        noteService.save(newNote)
            .then(savedNote => {
                console.log('savedNote', savedNote)
                loadNotes()
            })
    }

    return <div style={note.style} className="note-preview">
        <button onClick={changePinnedNote} className="pinned-note"><i class="fas fa-thumbtack" aria-hidden="true"></i></button>
        {note.info.title && <TodoNote handleInputChange={handleInputChange} title={note.info.title} todos={note.info.todos} />}

        {note.info.txt && <p suppressContentEditableWarning={true} contentEditable="true" id='txt' onInput={handleInputChange}>{note.info.txt}</p>}
        {note.info.url && <img className="img-preview" src={note.info.url} alt="" />}
        {!!note.info.src && <iframe className="video-preview" src={note.info.src}>
        </iframe>}
        <button onClick={() => onRemoveNote(note.id)} className="remove-btn">🗑️</button>
        <ColorInput onUpdateNote={onUpdateNote} note={note} />
        <button className="duplicate-btn" onClick={() => onDuplicateNote(note)}><i class="fas fa-paste" aria-hidden="true"></i></button>
    </div>
}


