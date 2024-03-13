const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

export function AddNote({loadNotes}) {
    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    function handleChange({ target }) {
        const field = target.id
        // console.log(field)
        let value = target.value
        console.log(value)
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break
            default:
                break
        }
        // setNewNote(prevNoteToEdit => ({ ...prevNoteToEdit, info: {...newNote.info, [field]: value } }))
        setNewNote(prevNoteToEdit => ({ ...prevNoteToEdit, [field]: value }))
    }
    useEffect(() => {
        console.log(newNote)
    }, [newNote])

    function onSaveNote(ev) {
        ev.preventDefault()
        console.log('newNote', newNote)
        noteService.save(newNote)
            .then(savedNote => {
                console.log('savedNote', savedNote)
                loadNotes()
                setNewNote(noteService.getEmptyNote())
            })


    }

    return (
        <section className="add-note">
            <form onSubmit={onSaveNote}>
                <input type="text" onInput={handleChange} id="txt" placeholder="Enter new note here" />
            </form>

        </section>
    )
}