
export function NotePreview({note}){
    return <div className="note-preview">
        <h1>{note.info.title}</h1>
        <p>{note.info.txt}</p>
        <img src={note.info.url} alt="" />
    </div>
}


// contentEditable="true"