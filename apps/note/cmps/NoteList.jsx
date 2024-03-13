import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote }) {
    return <ul className="note-list clean-list">
{
    notes.map(note => <li className="note-li" key={note.id}>
        <NotePreview note={note} />
        <div className="note-actions">
            <button onClick={() => onRemoveNote(note.id)} className="remove-btn">🗑️</button>
            </div>
    </li>)
}
    </ul>
}
