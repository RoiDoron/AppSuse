const { useState, useEffect } = React
// const { Link } = ReactRouterDOM
import { NoteList } from "../cmps/NoteList.jsx"

import { noteService } from "../services/note.service.js"

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then((notes) => {
                setNotes(notes)
            })
    }
    function onRemoveNote(noteId) {
        console.log(noteId)
        noteService.remove(noteId)
            .then(() => {
                console.log('removed')
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
            })
            .catch((err) => {
                console.error('had issues removing note', err)
            })
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <NoteList onRemoveNote={onRemoveNote} notes={notes} />
        </section>

    )
}
