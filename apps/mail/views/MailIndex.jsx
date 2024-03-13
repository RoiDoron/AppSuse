import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailIndex() {
    const [emails,setEmails] = useState(mailService.query)
    return <div>mail app</div>
}

