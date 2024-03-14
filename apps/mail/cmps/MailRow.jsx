import LongText, { LongTxt, MailLongText } from "../../../cmps/LongTxt.jsx"
import { mailService } from "../services/mail.service.js"

const { useState, Fragment } = React
const { Link } = ReactRouterDOM

export function MailRow({ mail, onRemoveEmail, setShowMail,setMailToShow }) {
    const [isRead, setIsRead] = useState(mail.isRead ? 'read' : '')
    const [isEnvelope, setEnvelope] = useState(mail.isRead ? 'fa-regular fa-envelope-open' : 'fa-regular fa-envelope')
    let event = null

    function dateMaker(mailDate) {
        let date = new Date(mailDate).toLocaleDateString()
        return date
    }

    function onReadUnread(ev, mail) {
        ev.preventDefault()
        mail.isRead = !mail.isRead
        setIsRead(mail.isRead ? 'read' : '')
        setEnvelope(mail.isRead ? 'fa-regular fa-envelope-open' : 'fa-regular fa-envelope')

        console.log(isEnvelope);
        mailService.save(mail)
    }

    function onTrashMail(ev, mail) {
        ev.preventDefault()
        onRemoveEmail(mail)
    }

    function linkClick(mail) {
        setMailToShow(mail)
        setShowMail(true)
    }

    // return <Link onClick={linkClick} className={`mail-link ${isRead}`} to={`${mail.id}`}>
       return <section onClick={()=>linkClick(mail)} className={`mail-row flex space-between ${isRead}`}>
            <h3>{mail.from}</h3>
            <div>{mail.subject}</div>
            <div className="mail-row-body"><LongTxt txt={mail.body} /></div>

            <div>
                <div>
                    <button className={`btn-read ${isEnvelope}`} onClick={(e) => onReadUnread(e, mail)}></button>
                    <button className="btn-trash fa-regular fa-trash-can" onClick={(e) => onTrashMail(e, mail)}></button>
                    {dateMaker(mail.sentAt)}</div>
            </div>
        </section >
    // </Link>

}
