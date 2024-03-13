import { MailRow } from "./MailRow.jsx";


export function MailList({emails,onRemoveEmail}) {

    return <table className="email-table">
        <thead>
            <tr>
                <th>im am head</th>
            </tr>
        </thead>
        <tbody>
            {
                emails.map(mail=>
                <MailRow mail={mail}
                onRemoveEmail={onRemoveEmail}
                key={mail.id}
                />)
            }
        </tbody>

    </table>
}
