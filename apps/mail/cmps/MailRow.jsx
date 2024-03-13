import { LongTxt } from "../../../cmps/LongTxt.jsx"

const { useState, Fragment } = React
const { Link } = ReactRouterDOM

export function MailRow({ mail, onRemoveEmail }) {

    function dateMaker(mailDate) {
        let date = new Date(mailDate).toLocaleDateString()
        return date
    }


    return <Link to={`${mail.id}`}>
        <section className="mail-row flex space-between">
            <h3>{mail.from}</h3>
            <div>{mail.subject}</div>
            <div><LongTxt txt={mail.body} /></div>

            <div>
                <div>
                    <button>read</button>
                    <button onClick={() => onRemoveEmail(mail)}>X</button>
                    {dateMaker(mail.sentAt)}</div>
            </div>
        </section>
    </Link>

}