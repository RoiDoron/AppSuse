import { EmailCompose } from "../cmps/EmailCompose.jsx"
import { MailList } from "../cmps/MailList.jsx"
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

    function onRemoveEmail(emailId) {
        console.log(emailId);
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

    function onInbox(){
        setFilterBy(prevFilterBy=>({...prevFilterBy,stat:'inbox'}))
    }

    function onSends(){
        setFilterBy(prevFilterBy=>({...prevFilterBy,stat:'send'}))
    }

    function onTrash(){
        setFilterBy(prevFilterBy=>({...prevFilterBy,stat:'trash'}))
    }

   
    if (!emails) return <div>loading...</div>
    console.log(emails);
    return <section className="emails-index flex  ">
        <div className="nav-bar">
            <button onClick={() => onSendMail()}>send email</button>
            <button onClick={()=>onInbox()}>inbox</button>
            <button onClick={()=>onSends()}>mail sends</button>
            <button onClick={()=>onTrash()}>trash</button>
        </div>
        <MailList
            emails={emails}
            onRemoveEmail={onRemoveEmail}
        />
        {sendingMail && 
        <EmailCompose onSendMail={onSendMail} />

        }
    </section>
}

