
export function NotePreview({ note, onUpdateNote }) {
    function handleInputChange(ev) {
        const field = ev.target.id
        const value = ev.target.innerText
        note = { ...note, info: { ...note.info, [field]: value } }
        onUpdateNote(note)
        console.log(note)
    }


    return <div className="note-preview">
        <h1 contentEditable="true" id='title' name='title' onInput={handleInputChange}>{note.info.title}</h1>
        <p contentEditable="true" id='txt' onInput={handleInputChange}>{note.info.txt}</p>
        <img src={note.info.url} alt="" />
    </div>
}

