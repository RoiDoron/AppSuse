import { LongTxt } from "../../../cmps/LongTxt.jsx"
import { mailService } from "../services/mail.service.js"

const { useState, Fragment } = React
const { Link } = ReactRouterDOM

export function MailRow({ mail, onRemoveEmail }) {
    const [isRead, setIsRead] = useState(mail.isRead ? 'read' : '')

    function dateMaker(mailDate) {
        let date = new Date(mailDate).toLocaleDateString()
        return date
    }

    function onReadUnread(mail) {
        mail.isRead = !mail.isRead
        if (mail.read) setIsRead('read')
        if (!mail.read) setIsRead('')
        mailService.save(mail)
    }


    return <Link className={`${isRead}`} to={`${mail.id}`}>
        <section className={`mail-row flex space-between ${isRead}`}>
            <h3>{mail.from}</h3>
            <div>{mail.subject}</div>
            <div><LongTxt txt={mail.body} /></div>

            <div>
                <div>
                    <button onClick={() => onReadUnread(mail)}>read</button>
                    <button onClick={() => onRemoveEmail(mail)}>X</button>
                    {dateMaker(mail.sentAt)}</div>
            </div>
        </section>
    </Link>

}