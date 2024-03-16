import { mailService } from "../services/mail.service.js"


const { useState, useEffect } = React
const { Link, useSearchParams, useParams } = ReactRouterDOM

export function EmailCompose({ onSendMail }) {
    const [email, setEmail] = useState({ to: '', subject: '', body: '' })

    function send(ev) {
        ev.preventDefault()
        mailService.sendingEmail(email)
            .then((mail) => showSuccessMsg(`email removed successfully (${mail.id})`))
        onSendMail()
    }

    const params = useParams()
    useEffect(() => {
        sendNote()

    }, [params])
    function sendNote() {
        if (!params) return params = ''

        console.log('hi');
        if (params.text === 'undefined') params.text = ''
        if (params.url === 'undefined') params.url = ''
        if (params.src === 'undefined') params.src = ''
        if (params.title === 'undefined') params.title = ''
        let value = (params.url+params.text+params.src?params.url+params.text+params.src:'')
        setEmail(prevEmail => ({ ...prevEmail, body:value}))
        


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
            setEmail(prevEmail => ({ ...prevEmail, [field]: value }))
        } else {
            console.log(field, value);
            setEmail(prevEmail => ({ ...prevEmail, [field]: value }))
        }


    }
console.log(params.text);
    return <section className="mail-compose">
        <div className="compose-header flex space-between">
            <h4>New Massage</h4>
            <Link to="/mail"> <button onClick={() => onSendMail()}>X</button></Link>
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

                value={params.title}
                name="subject"
                onChange={handleChange}
            />
            <textarea
                className="body-input"
                type="text"
                name="body"
                onChange={handleChange}
                value={email.body}
            />
            <div className="form-submit-btn">
                <button className="send-btn">send</button>
            </div>
        </form>



    </section>
}