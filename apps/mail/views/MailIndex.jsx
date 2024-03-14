import { EmailCompose } from "../cmps/EmailCompose.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailSideNav } from "../cmps/MailSideNav.jsx"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailIndex() {
    const [emails, setEmails] = useState(null)
    const [sendingMail, setSendingMail] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        loadEmails()
    }, [filterBy])

    function loadEmails() {
        mailService.query(filterBy)
            .then((emails) => {
                setEmails(emails)
            })
    }

    function onRemoveEmail(mail) {
        const emailId = mail.id
        if (mail.stat === 'inbox') {
            mail.stat = 'trash'
             mailService.save(mail)
             .then(()=>loadEmails())
            
        } else
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

    function onSendMail() {
        setSendingMail(!sendingMail)
        console.log(sendingMail);
    }

    function onInbox() {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, stat: 'inbox' }))
    }

    function onSends() {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, stat: 'send' }))
    }

    function onTrash() {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, stat: 'trash' }))
    }


    if (!emails) return <div>loading...</div>
    const { stat } = filterBy
    console.log(emails);
    return <section className="emails-index flex  ">
        <MailSideNav
            onSendMail={onSendMail}
            onInbox={onInbox}
            onSends={onSends}
            onTrash={onTrash}

        />
        <MailList
            stat={stat}
            emails={emails}
            onRemoveEmail={onRemoveEmail}
        />
        {sendingMail &&
            <EmailCompose onSendMail={onSendMail} />

        }
    </section>
}

