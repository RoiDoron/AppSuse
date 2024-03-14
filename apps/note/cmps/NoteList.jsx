import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote, onUpdateNote }) {
    return <ul className="note-list clean-list">
        {
            notes.map(note => <li className="note-li" key={note.id}>
                <NotePreview onRemoveNote={onRemoveNote} onUpdateNote={onUpdateNote} note={note} ></NotePreview>
            </li>)
        }
    </ul>
}
