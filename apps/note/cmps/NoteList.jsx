import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote, onUpdateNote }) {
    const pinnedNotes = notes.filter(note => note.isPinned === true)
    // Filter non-pinned notes
    const nonPinnedNotes = notes.filter(note => note.isPinned !== true)

    return (
        <div>
            {/* Section for pinned notes */}
            {pinnedNotes.length > 0 && (
                <section>
                    <h2>Pinned Notes</h2>
                    <ul className="note-list clean-list">
                        {pinnedNotes.map(note => (
                            <li className="note-li" key={note.id}>
                                <NotePreview
                                    onRemoveNote={onRemoveNote}
                                    onUpdateNote={onUpdateNote}
                                    note={note}
                                ></NotePreview>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Section for all non-pinned notes */}
            {nonPinnedNotes.length > 0 && (
                <section>
                    <h2>All Notes</h2>
                    <ul className="note-list clean-list">
                        {nonPinnedNotes.map(note => (
                            <li className="note-li" key={note.id}>
                                <NotePreview
                                    onRemoveNote={onRemoveNote}
                                    onUpdateNote={onUpdateNote}
                                    note={note}
                                ></NotePreview>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    )
}
