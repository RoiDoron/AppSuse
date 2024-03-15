const { useState, useEffect } = React

import { NoteList } from "../cmps/NoteList.jsx"
import { AddNote } from "../cmps/AddNote.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"

import { noteService } from "../services/note.service.js"

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [filterByMain, setMainFilter] = useState(noteService.getDefaultFilter())
    useEffect(() => {
        loadNotes()
    }, [filterByMain])

    function loadNotes() {
        noteService.query(filterByMain)
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

    function onUpdateNote(noteToUpdate) {
        noteService.save(noteToUpdate)
            .then((savedNote) => {
                console.log('updated')
                setNotes(prevNotes => prevNotes.map(note => note.id === savedNote.id ? savedNote : note))
            })
            .catch(err => {
                console.error('had issues with updating note', err)
            })
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <NoteFilter setMainFilter={setMainFilter} />
            <AddNote loadNotes={loadNotes} />
            <NoteList loadNotes={loadNotes} onRemoveNote={onRemoveNote} onUpdateNote={onUpdateNote} notes={notes} />
        </section>

    )
}
