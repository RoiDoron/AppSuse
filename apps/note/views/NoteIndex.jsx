const { useState, useEffect } = React
// const { Link } = ReactRouterDOM
import { NoteList } from "../cmps/NoteList.jsx"

import { noteService } from "../services/note.service.js"

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes(){
        noteService.query()
        .then((notes) => {
            setNotes(notes)
        })
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <NoteList notes={notes} />
        </section>

    )
}
