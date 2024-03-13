import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM


export function MailDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [mail, setMail] = useState(null)
    const {mailId} = useParams()
    const navigate = useNavigate()

console.log(mailId);

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        setIsLoading(true)
        mailService.getById(mailId)
            .then(mail => setMail(mail))
            .catch(err => {
                console.log('Had issues loading mail', err)
                navigate('/mail')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    if (isLoading) return <div>Loading details..</div>
   

    return <section className="mail-details">
        <Link to="/mail"><button>Go back</button></Link>
        <div className="mail-details-content">
            <div className="content-header">
                <h1>sent from:{mail.from}</h1>
                <h3>sent to:{mail.to}</h3>
                <h4>subject:{mail.subject}</h4>
            </div>
            <div className="content-body">
                <p>{mail.body}</p>
            </div>
        </div>
    </section>

}