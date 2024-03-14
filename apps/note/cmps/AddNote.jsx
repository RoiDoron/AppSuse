const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

export function AddNote({ loadNotes }) {
    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    const cmps = ['NoteTxt', 'NoteImg', 'NoteTodos', 'NoteVideo']
    const [cmpInput, setCmpInput] = useState('NoteTxt')
    function handleChange({ target }) {
        const field = target.id

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

    useEffect(() => {
        console.log(cmpInput)
    }, [cmpInput])


    function onChangeCmp(type) {
        setCmpInput(type)
        setNewNote(noteService.getEmptyNote())
    }

    return (
        <section className="add-note">
            <form onSubmit={onSaveNote}>
                <DynamicCmp cmpType={cmpInput} handleChange={handleChange} />
            </form>
            <div>
                <button onClick={() => onChangeCmp('NoteTxt')}><i class="far fa-sticky-note " aria-hidden="true"></i></button>
                <button onClick={() => onChangeCmp('NoteImg')}><i class="far fa-images " aria-hidden="true"></i></button>
                <button onClick={() => onChangeCmp('NoteTodos')}><i class="far fa-list-alt " aria-hidden="true"></i></button>
                <button onClick={() => onChangeCmp('NoteVideo')}><i class="fab fa-youtube active " aria-hidden="true"></i></button>
            </div>

        </section>
    )
}

<i class="far fa-sticky-note " aria-hidden="true"></i>

function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'NoteTxt':
            return <NoteTxt {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteTodos':
            return <NoteTodos {...props} />
        case 'NoteVideo':
            return <NoteVideo {...props} />
    }
}

function NoteTxt(props) {
    return <input type="text" onInput={props.handleChange} id="txt" placeholder="Enter new note here..." />
}

function NoteImg(props) {
    return <input type="text" onInput={props.handleChange} id="url" placeholder="Enter image url..." />
}

function NoteTodos(props) {
    return <input type="text" onInput={props.handleChange} id="title" placeholder="Enter Todo title..." />
}

function NoteVideo(props) {
    return <input type="text" onInput={props.handleChange} id="src" placeholder="Enter video src..." />
}