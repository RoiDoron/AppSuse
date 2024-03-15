const { useState, useEffect } = React
const { Link, useSearchParams, Outlet } = ReactRouterDOM

import { EmailCompose } from "../cmps/EmailCompose.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailSideNav } from "../cmps/MailSideNav.jsx"

import { eventBusService, showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"
import { MailDetails } from "./MailDetails.jsx"


export function MailIndex() {
    const [emails, setEmails] = useState(null)
    const [readMailCount, setReadMailsCount] = useState(null)
    const [mailToShow, setMailToShow] = useState(null)
    const [showMail, setShowMail] = useState(false)
    const [sendingMail, setSendingMail] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())


    useEffect(() => {
        loadEmails()
        unreadMailCount()
    }, [filterBy])

    function loadEmails() {
        mailService.query(filterBy)
            .then((emails) => {
                setEmails(emails)

            })
    }

    function onSetFilter(fieldsToUpdate) {
        console.log('fieldsToUpdate', fieldsToUpdate)

        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function onRemoveEmail(mail) {
        const emailId = mail.id
        if (mail.stat === 'inbox') {
            mail.stat = 'trash'
            mailService.save(mail)
                .then(() => {
                    loadEmails()
                    showSuccessMsg('Email moved to trash')
                })
                .catch((err) => {
                    console.log('Had issues removing car', err)
                    showErrorMsg(`Could not remove (${emailId})`)
                })
        } else
            mailService.remove(emailId)
                .then(() => {
                    setEmails((prevEmail) => prevEmail.filter(email => email.id !== emailId))
                    showSuccessMsg(`email removed successfully (${emailId})`)
                })
                .catch((err) => {
                    console.log('Had issues removing car', err)
                    showErrorMsg(`Could not remove (${emailId})`)
                })
    }

    function onSendMail() {
        setSendingMail(!sendingMail)

    }

    function onInbox() {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, stat: 'inbox' }))
    }

    function onSends() {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, stat: 'sent' }))
    }

    function onTrash() {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, stat: 'trash' }))
    }

    function unreadMailCount() {
        let counter = 0
        console.group('hi')

        mailService.query({ stat: 'inbox', desc: '' })
            .then(mails =>{

                mails.forEach(email => {
                    if (email.stat === 'inbox') {
                        email.isRead ? '' : counter++
                    }
                })
                setReadMailsCount(counter)
            })
    }


    if (!emails) return <div>loading...</div>
    const { stat, desc } = filterBy
    return <section className="emails-index flex ">
        <MailSideNav
            readMailCount={readMailCount}
            setShowMail={setShowMail}
            onSendMail={onSendMail}
            onInbox={onInbox}
            onSends={onSends}
            onTrash={onTrash}
        />
        {!showMail &&
            <MailList
            unreadMailCount={unreadMailCount}
                setMailToShow={setMailToShow}
                setShowMail={setShowMail}
                onSetFilter={onSetFilter}
                filterBy={{ desc }}
                emails={emails}
                onRemoveEmail={onRemoveEmail}
            />
        } {showMail &&
            <MailDetails onRemoveEmail={onRemoveEmail} setShowMail={setShowMail} mailToShow={mailToShow} />
        }
        {sendingMail &&
            <EmailCompose onSendMail={onSendMail} />

        }
    </section>
}

