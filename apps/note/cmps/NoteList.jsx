import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote, onUpdateNote}) {
    return <ul className="note-list clean-list">
{
    notes.map(note => <li className="note-li" key={note.id}>
        <NotePreview onUpdateNote={onUpdateNote} note={note} />
        <div className="note-actions">
            <button onClick={() => onRemoveNote(note.id)} className="remove-btn">🗑️</button>
            </div>
    </li>)
}
    </ul>
}
