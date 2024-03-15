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
    const [menu, setMenu] = useState('')

    useEffect(() => {
        loadEmails()
        unreadMailCount()
    }, [filterBy])

    function loadEmails() {

        console.log(filterBy);
        mailService.query(filterBy)
            .then((emails) => {
                setEmails(emails)

            })
    }

    function onSetFilter(fieldsToUpdate) {
        console.log('fieldsToUpdate', fieldsToUpdate)

        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
        console.log(filterBy);
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
        setMenu('')

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

        mailService.unreadMail({ stat: 'inbox' })
            .then(mails => {

                mails.forEach(email => {
                    if (email.stat === 'inbox') {
                        email.isRead ? '' : counter++
                    }
                })
                if (counter === 0) counter = ''
                setReadMailsCount(counter)
            })
    }

    function toggleMenu() {
        console.log('hi');
        setMenu(!menu ? 'menu-open' : '')
        console.log(menu);

    }

    if (!emails) return <div>loading...</div>
    const { stat, desc, isRead } = filterBy
    return <section className="emails-index flex ">
        <div onClick={toggleMenu} className={`main-screen ${menu}`}></div>
        <MailSideNav
            setMenu={setMenu}
            toggleMenu={toggleMenu}
            menu={menu}
            readMailCount={readMailCount}
            setShowMail={setShowMail}
            onSendMail={onSendMail}
            onInbox={onInbox}
            onSends={onSends}
            onTrash={onTrash}
        />
        {!showMail &&
            <MailList

                toggleMenu={toggleMenu}
                unreadMailCount={unreadMailCount}
                setMailToShow={setMailToShow}
                setShowMail={setShowMail}
                onSetFilter={onSetFilter}
                filterBy={{ desc, isRead }}
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

