const { useState, useEffect } = React
import { noteService } from "../services/note.service.js"

export function NoteFilter({ setMainFilter }) {
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    console.log(filterBy)

    useEffect(() => {
        setMainFilter(filterBy)
    }, [filterBy])

    function handleTxtChange(ev) {
        console.log(ev.target.value)
        setFilterBy((prevFilterBy) => ({ ...prevFilterBy, txt: ev.target.value }))
    }

    return <form>
        <input className="search-note" type="text" onChange={handleTxtChange} value={filterBy.txt} placeholder="Search note" />
    </form>
}