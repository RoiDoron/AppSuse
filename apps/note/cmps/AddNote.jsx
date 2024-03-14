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
                <button onClick={() => onChangeCmp('NoteTxt')}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path></svg></button>
                <button onClick={() => onChangeCmp('NoteImg')}>🖼️</button>
                <button onClick={() => onChangeCmp('NoteTodos')}>📝</button>
                <button onClick={() => onChangeCmp('NoteVideo')}>📺</button>
            </div>

        </section>
    )
}

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