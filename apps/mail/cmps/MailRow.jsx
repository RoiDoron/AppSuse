const { useState, Fragment } = React

export function MailRow({ mail, onRemoveEmail }) {

    function dateMaker(mailDate) {
        let date = new Date(mailDate).toLocaleDateString()
        return date
    }

    function ref() {
        return `#/mail/${mail.id}`
    }
    return <a href={ref()} className="mail-row flex space-between">
        <h3>{mail.from}</h3>
        <div>{mail.subject}</div>
        <div>{mail.body}</div>
        <div> <button>read</button> <button onClick={() => onRemoveEmail(mail.id)}>X</button></div>
        <div>{dateMaker(mail.sentAt)}</div>
    </a>




}