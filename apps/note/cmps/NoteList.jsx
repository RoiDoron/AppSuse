

export function NoteList({ notes }) {
    return <ul className="not-list">
{
    notes.map(note => <li key={note.id}>
        {note.title}
    </li>)
}
    </ul>
}
