const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { TodoNote } from "./TodoNote.jsx"
import { ColorInput } from "./ColorInput.jsx"
import { MailNote } from "./MailNote.jsx"

import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"

export function NotePreview({ note, onUpdateNote, onRemoveNote, loadNotes }) {
    const [isPinned, setIsPinned] = useState(note.isPinned)

    useEffect(() => {
        loadNotes()
    }, [isPinned])

    function changePinnedNote() {
        setIsPinned(!isPinned)
        const updatedNote = { ...note, isPinned: isPinned }
        // onUpdateNote(updatedNote)
        noteService.save(updatedNote)
            .then(savedNote => {
                console.log('savedNote', savedNote)
                loadNotes()
            })
    }

    function handleInputChange(ev) {
        const field = ev.target.id
        const value = ev.target.innerText
        note = { ...note, info: { ...note.info, [field]: value } }
        onUpdateNote(note)
    }

    function onDuplicateNote(note) {
        let newNote = note.info

        noteService.save(newNote)
            .then(savedNote => {
                console.log('savedNote', savedNote)
                loadNotes()
            })
    }

    return <div style={note.style} className="note-preview">
        <button onClick={changePinnedNote} className="pinned-note"><i class="fas fa-thumbtack" aria-hidden="true"></i></button>
        {(note.info.title && !note.info.txt) && <TodoNote handleInputChange={handleInputChange} title={note.info.title} todos={note.info.todos} />}
        {(note.info.title && note.info.txt) && <MailNote handleInputChange={handleInputChange} title={note.info.title} txt={note.info.txt} />}
        {note.info.txt && <p suppressContentEditableWarning={true} contentEditable="true" id='txt' onInput={handleInputChange}>{note.info.txt}</p>}
        {note.info.url && <img className="img-preview" src={note.info.url} alt="" />}
        {!!note.info.src && <iframe className="video-preview" src={note.info.src}>
        </iframe>}
        <button onClick={() => onRemoveNote(note.id)} className="remove-btn">🗑️</button>
        <ColorInput loadNotes={loadNotes} onUpdateNote={onUpdateNote} note={note} />
        <button className="duplicate-btn" onClick={() => onDuplicateNote(note)}><i class="fas fa-paste" aria-hidden="true"></i></button>
        <Link to={`/mail/${note.info.title}/${note.info.txt}/${encodeURIComponent(note.info.src)}/${encodeURIComponent(note.info.url)}`} className="note-mail-btn fa-regular fa-paper-plane"></Link>

    </div>
}


