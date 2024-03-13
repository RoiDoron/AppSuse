
export function MailSideNav({onInbox,onSendMail,onSends,onTrash}) {
    return <div className="mail-side-nav">

        <button onClick={() => onSendMail()}>send email</button>
        <ul className="clean-list flex">
        <li className="side-nav" onClick={() => onInbox()} ><i className="side-nav-icon fas fa-inbox"></i> Inbox</li>
        <li className="side-nav" onClick={() => onSends()} > <i className="side-nav-icon fas fa-paper-plane"></i> Sent</li>
        <li className="side-nav" onClick={() => onTrash()}> <i className="side-nav-icon fas fa-trash"></i> Trash</li>
        </ul>
    </div>
}