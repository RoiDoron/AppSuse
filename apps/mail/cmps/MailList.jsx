const { useState, useEffect } = React

import { MailRow } from "./MailRow.jsx";


export function MailList({ emails, onRemoveEmail, onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function handleChange(ev) {
        let { value, name: field, type } = ev.target
        if (type === 'number') value = +value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    const { desc } = filterByToEdit
    return <section className="emails-section">

        <input
            type="text"
            name="desc"
            value={desc}
            onChange={handleChange}
            placeholder="Search"

        />
        <div className="mail-list-header"></div>
        <section className="mail-list-container">

            {
                emails.map(mail =>
                    <MailRow mail={mail}
                        onRemoveEmail={onRemoveEmail}
                        key={mail.id}
                    />)
            }
        </section>
        <div className="mail-list-footer"></div>
    </section>
}
