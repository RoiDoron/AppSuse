import { MailRow } from "./MailRow.jsx";


export function MailList({emails,onRemoveEmail}) {

    return <section className="emails-section">
        <div>
            hi
        </div>
            {
                emails.map(mail=>
                <MailRow mail={mail}
                onRemoveEmail={onRemoveEmail}
                key={mail.id}
                />)
            }
    </section>
}
