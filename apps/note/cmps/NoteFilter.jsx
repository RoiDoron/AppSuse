const { useState, useEffect } = React
import { noteService } from "../services/note.service.js"

export function NoteFilter({ setMainFilter }) {
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        setMainFilter(filterBy)
    }, [filterBy])

    function handleTxtChange(ev) {
        setFilterBy((prevFilterBy) => ({ ...prevFilterBy, txt: ev.target.value }))
    }

    return <form>
        <label className="search-focus" htmlFor="input"><span className="fa-solid fa-magnifying-glass"></span></label>
        <input className="search-note" id="input" type="text" onChange={handleTxtChange} value={filterBy.txt} placeholder="Search note" />
    </form>
}