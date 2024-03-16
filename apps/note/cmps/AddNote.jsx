const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

import { noteService } from "../services/note.service.js"

export function AddNote({ loadNotes }) {
    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    const cmps = ['NoteTxt', 'NoteImg', 'NoteTodos', 'NoteVideo']
    const [cmpInput, setCmpInput] = useState('NoteTxt')
    const params = useParams()

    useEffect(() => {
        saveMailnote(params)
    }, [params])

    function saveMailnote(params) {
        console.log(params)
        if (!params.title) return
        noteService.save(params)
            .then(savedNote => {
                console.log('savedNote', savedNote)
                loadNotes()
                setNewNote(noteService.getEmptyNote())
            })
    }

    function handleChange({ target }) {
        const field = target.id
        let value = target.value
        console.log(field)
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
        console.log('---',newNote)
    }

    useEffect(() => {
        console.log('===',newNote)
        setNewNote(newNote)
    }, [newNote])

    function onSaveNote(ev) {
        console.log(ev.target)
        ev.preventDefault()
        console.log('newNote', newNote)
        if(!newNote.title && !newNote.txt && !newNote.url && !newNote.src) return
        noteService.save(newNote)
            .then(savedNote => {
                console.log('savedNote', savedNote)
                loadNotes()
                setNewNote(noteService.getEmptyNote())
            })
    }

    function onChangeCmp(type) {
        setCmpInput(type)
        // setNewNote(noteService.getEmptyNote())
    }

    return (
        <section className="add-note">
            <form className="note-form" onSubmit={onSaveNote}>
                <DynamicCmp cmpType={cmpInput} handleChange={handleChange} />
            <div className="search-bar">
                <button className="input-type" onClick={() => onChangeCmp('NoteTxt')}><i className="far fa-sticky-note " aria-hidden="true"></i></button>
                <button className="input-type" onClick={() => onChangeCmp('NoteImg')}><i className="far fa-images " aria-hidden="true"></i></button>
                <button className="input-type" onClick={() => onChangeCmp('NoteTodos')}><i className="far fa-list-alt " aria-hidden="true"></i></button>
                <button className="input-type" onClick={() => onChangeCmp('NoteVideo')}><i className="fab fa-youtube active " aria-hidden="true"></i></button>
            </div>
            </form>

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
    return <input className="input-add-note" type="text" onChange={props.handleChange} id="txt" placeholder="Enter new note here..." />
}

function NoteImg(props) {
    return <input className="input-add-note" type="text" onChange={props.handleChange} id="url" placeholder="Enter image url..." />
}

function NoteTodos(props) {
    return <input className="input-add-note" type="text" onChange={props.handleChange} id="title" placeholder="Enter ',' after every todo..." />
}

function NoteVideo(props) {
    return <input className="input-add-note" type="text" onChange={props.handleChange} id="src" placeholder="Enter video src..." />
}