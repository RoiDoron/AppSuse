import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailIndex() {
    const [emails, setEmails] = useState(null)

    useEffect(() => {
        loadEmails()
    }, [])

    function loadEmails() {
        console.log(mailService.query());
        mailService.query()
            .then((emails) => {
                setEmails(emails)
            })
    }

    function onRemoveEmail(emailId){
        mailService.remove(emailId)
        .then(() => {
            setEmails((prevEmail) => prevEmail.filter(email => email.id !== emailId))
            // showSuccessMsg(`email removed successfully (${emailId})`)
        })
        .catch((err) => {
            console.log('Had issues removing car', err)
            // showErrorMsg(`Could not remove (${emailId})`)
        })
    }

    if (!emails) return <div>loading...</div>
    console.log(emails);
    return <section className="emails-index flex justify-between ">
        <div>hi im filter and nav</div>
        <MailList 
        emails={emails}
        onRemoveEmail={onRemoveEmail}
        />
    </section>
}

