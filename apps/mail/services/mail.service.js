import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const KEY_EMAIL = 'emailDB'

_createEmails()


export const mailService = {
    query,
    getById,
    save,
    getDefaultFilter,
    remove,
    sendingEmail
}


function query(filterBy) {
    console.log(filterBy);
    
    return storageService.query(KEY_EMAIL)
    .then((emails) => {
        if (filterBy.stat) {
            const regex = new RegExp(filterBy.stat, 'i')
            emails = emails.filter(mail => regex.test(mail.stat))
        }
        return emails
    })
}

function getById(emailId) {
    return storageService.get(KEY_EMAIL, emailId)
}

function remove(emailId) {
    return storageService.remove(KEY_EMAIL, emailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(KEY_EMAIL, email)
    } else {
        return storageService.post(KEY_EMAIL, email)
    }
}

function getDefaultFilter() {
    return { stat:'inbox'}
}

function _createEmails() {
    
    let emails = utilService.loadFromStorage(KEY_EMAIL)
    console.log(emails);
    if (!emails || !emails.length) {
        emails =[]

        emails.push(_createEmail('Miss you!', 'Would love to catch up sometimes', false, 1551133930594, null, 'momo@momo.com', 'user@appsus.com','inbox'))
        emails.push(_createEmail('Hi roi',
            'Do you now how to use React? we are interesting on hiring you. please contact me! yuval HR google',
            false,
            1551133930594,
            null,
            'yuval_hiring@gmail.com',
            'user@appsus.com','inbox'))
        emails.push(_createEmail('Miss you!',
            'Would love to catch up sometimes',
            false,
            1651133930594,
            null,
            'momo@momo.com',
            'user@appsus.com','inbox'))
        emails.push(_createEmail('Miss you!',
            'Would love to catch up sometimes',
            false,
            1651133930594 + 500000,
            null,
            'momo@momo.com',
            'user@appsus.com','trash'))
        emails.push(_createEmail('Miss you!',
            'Would love to catch up sometimes',
            false,
            1651133930594 + 500000,
            null,
            'momo@momo.com',
            'user@appsus.com','send'))
            utilService.saveToStorage(KEY_EMAIL,emails)
    }
    return emails
}

function sendingEmail(email){
const mail = _createEmail()
mail.to = email.to
mail.body = email.body
mail.subject = email.subject

storageService.post(KEY_EMAIL, mail)
}

function _createEmail(subject, body, isRead = false, sentAt = Date.now(), removedAt, from = loggedInUser.email, to,stat='send') {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead,
        sentAt,
        removedAt: null,
        from,
        to,
        stat

    }
}

function _saveEmailToStorage() {
    storageService.save(KEY_EMAIL, gEmail)
}

const gEmail = {
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
}



const gSendEmail = [{
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'user@appsus.com',
    to: 'momo@momo.com'
},{
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'user@appsus.com',
    to: 'momo@momo.com'
},{
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'user@appsus.com',
    to: 'momo@momo.com'
}]