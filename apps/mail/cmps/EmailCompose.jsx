import { mailService } from "../services/mail.service.js"


const { useState, useEffect } = React
const { Link, useSearchParams, useParams } = ReactRouterDOM

export function EmailCompose({ onSendMail }) {
    const [email, setEmail] = useState({ to: '', subject: '', body: '' })

    function send(ev) {
        ev.preventDefault()
        console.log(email);
        mailService.sendingEmail(email)
        onSendMail()
    }

    let params = useParams()
    sendNote(params)
    function sendNote(params) {
        console.log(params);

        if (!params) params = ''
        if (params.text === 'undefined') params.text = ''
        if (params.url === 'undefined') params.url = ''
        if (params.src === 'undefined') params.src = ''
        if (params.title === 'undefined') params.title = ''
        console.log(params.url);
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }
        if (target.name === 'amount') {
            console.log('hi');
            setEmail(prevEmail => ({ ...prevEmail, [field]: value }))
        } else {
            setEmail(prevEmail => ({ ...prevEmail, [field]: value }))
        }
        console.log(email);

    }

    return <section className="mail-compose">
        <div className="compose-header flex space-between">
            <h4>New Massage</h4>
            <button onClick={() => onSendMail()}>X</button>
        </div>
        <form onSubmit={send} className="compose-form">
            <input
                type="email"
                placeholder="to:"
                name="to"

                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="subject:"

                value={`${params.title? params.title:''}`}
                name="subject"
                onChange={handleChange}
            />
            <textarea
                className="body-input"
                type="text"
                name="body"
                onChange={handleChange}
                value={`${params.text? params.text:''}${params.src? params.src:''}${params.url? params.url:''}`}
            />
            <div className="form-submit-btn">
                <button className="send-btn">send</button>
            </div>
        </form>



    </section>
}