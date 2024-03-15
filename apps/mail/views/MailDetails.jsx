
const { Link } = ReactRouterDOM


export function MailDetails({ mailToShow, setShowMail, onRemoveEmail }) {
    const mail = mailToShow
    function onRemove(mail){
        setShowMail(false)
        onRemoveEmail(mail)
    }

    return <section className="mail-details">
        <button className="mail-details-btn fa-solid fa-arrow-left" onClick={() => setShowMail(false)}></button>
        <button className="mail-delete-btn fa-regular fa-trash-can" onClick={() => onRemove(mail)}></button>
        <div className="mail-details-content">
            <div className="content-header">
                <h1>sent from:{mail.from}</h1>
                <h3>sent to:{mail.to}</h3>
                <h4>subject:{mail.subject}</h4>
            </div>
            <div className="content-body">
                <p>{mail.body}</p>
            </div>
        </div>
    </section>

}
