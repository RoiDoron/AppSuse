const { useState, useEffect } = React
const { useOutletContext } = ReactRouterDOM

import { MailRow } from "./MailRow.jsx";

export function MailList({toggleMenu,emails, onRemoveEmail, onSetFilter, filterBy, setShowMail, setMailToShow,unreadMailCount }) {
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
    const { desc,isRead } = filterByToEdit

    return <section className="emails-section">
        <i onClick={()=>toggleMenu()} className={`mail-hamburger fas fa-bars`}></i>
        <form onSubmit={onSubmit} className="filter-input">
            <button className="filter-input-btn fa-solid fa-magnifying-glass"></button>
            <input
                type="text"
                name="desc"
                value={desc}
                onChange={handleChange}
                placeholder="Search"

            />
           
            <select className="select-read" onChange={handleChange} name="isRead" id="">
                <option value=""></option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
            
        </form>
            {/* <button onClick={isRead=true}>read</button>
            <button onClick={isRead=false}>unRead</button> */}

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
