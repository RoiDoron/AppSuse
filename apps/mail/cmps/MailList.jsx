import { MailRow } from "./MailRow.jsx";


export function MailList({emails,onRemoveEmail,stat}) {

    return <section className="emails-section">
        <div className = "emails-section-header">
            <h1>{stat} Messages</h1>
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
