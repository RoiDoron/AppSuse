const { useState, useEffect } = React
const { useOutletContext } = ReactRouterDOM
import { MailRow } from "./MailRow.jsx";


export function MailList({ emails, onRemoveEmail, onSetFilter, filterBy, setShowMail, setMailToShow,unreadMailCount }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
    }, [filterByToEdit])


    function handleChange(ev) {
        let { value, name: field, type } = ev.target
        if (type === 'number') value = +value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)

    }
    const { desc } = filterByToEdit
    return <section className="emails-section">
        <form onSubmit={onSubmit} className="filter-input">
            <button className="filter-input-btn fa-solid fa-magnifying-glass"></button>
            <input
                type="text"
                name="desc"
                value={desc}
                onChange={handleChange}
                placeholder="Search"

            />
        </form>

        <section className="mail-list-container">

            {
                emails.map(mail =>
                    <MailRow
                    unreadMailCount={unreadMailCount}
                        setMailToShow={setMailToShow}
                        setShowMail={setShowMail}
                        mail={mail}
                        onRemoveEmail={onRemoveEmail}
                        key={mail.id}
                    />)
            }
        </section>

    </section>
}
