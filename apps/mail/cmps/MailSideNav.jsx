const { useState, useEffect } = React

export function MailSideNav({onInbox,onSendMail,onSends,onTrash, setShowMail}) {
const [classInbox,setClassInbox] = useState('active-side')
const [classTrash,setClassTrash] = useState('')
const [classSends,setClassSends] = useState('')


        function onClickInbox() {
            onInbox()
            setClassInbox('active-side')
            setClassSends('')
            setClassTrash('')
            setShowMail(false)
        }
        
        function onClickTrash() {
            onTrash()
            setClassInbox('')
            setClassSends('')
            setClassTrash('active-side')
            setShowMail(false)
        }
        
        function onClickSends() {
            onSends()
            setClassInbox('')
            setClassSends('active-side')
            setClassTrash('')
            setShowMail(false)
        }
    return <div className="mail-side-nav">


        <div className="mail-side-nav-compose" onClick={() => onSendMail()}><img src="https://www.gstatic.com/images/icons/material/system_gm/2x/create_black_24dp.png" />Compose</div>
        <ul className="clean-list flex">
        <li className={`side-nav ${classInbox}`} onClick={onClickInbox} ><i className="side-nav-icon fas fa-inbox"></i> Inbox</li>
        <li className={`side-nav ${classSends}`} onClick={onClickSends} > <i className="side-nav-icon fas fa-paper-plane"></i> Sent</li>
        <li className={`side-nav ${classTrash}`} onClick={onClickTrash}> <i className="side-nav-icon fas fa-trash"></i> Trash</li>
        </ul>
    </div>
}