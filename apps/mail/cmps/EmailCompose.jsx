

export function EmailCompose({onSendMail}) {
    return <section className="mail-compose">
        <div className="compose-header flex space-between">
            <h2>New Massage</h2>
            <button onClick={()=>onSendMail()}>X</button>
        </div>
        <form className="compose-form">
            <input type="email"/>
            <input type="text" />
            <input type="text" />
            <button className="send-btn">send</button>
        </form>



    </section>
}