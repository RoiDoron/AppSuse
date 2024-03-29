const { useState, useEffect } = React

export function MailSideNav({ onDraft,setMenu, menu, onInbox, onSendMail, onSends, onTrash, setShowMail, readMailCount }) {
    const [classInbox, setClassInbox] = useState('active-side')
    const [classTrash, setClassTrash] = useState('')
    const [classSends, setClassSends] = useState('')
    const [classDraft, setClassDraft] = useState('')

    function onClickInbox() {
        onInbox()
        setClassSends('')
        setClassTrash('')
        setClassDraft('')
        setClassInbox('active-side')
        setMenu('')
        setShowMail(false)

    }

    function onClickTrash() {
        onTrash()
        setClassInbox('')
        setClassSends('')
        setClassDraft('')
        setClassTrash('active-side')
        setMenu('')
        setShowMail(false)
    }

    function onClickSends() {
        onSends()
        setClassInbox('')
        setClassSends('active-side')
        setClassTrash('')
        setMenu('')
        setClassDraft('')
        setShowMail(false)
    }

    function onClickDrafts() {
        setClassInbox('')
        setClassTrash('')
        setClassSends('')
        setClassDraft('active-side')
        setMenu('')
        onDraft()
    }

    return <div className={`mail-side-nav ${menu}`}>


        <div className={`mail-side-nav-compose`} onClick={() => onSendMail()}><img src="https://www.gstatic.com/images/icons/material/system_gm/2x/create_black_24dp.png" />Compose</div>
        <ul className="clean-list flex">
            <li className={`side-nav ${classInbox}`} onClick={onClickInbox} ><i className="side-nav-icon fas fa-inbox"></i> Inbox   {readMailCount}</li>
            <li className={`side-nav ${classSends}`} onClick={onClickSends} > <i className="side-nav-icon fas fa-paper-plane"></i> Sent</li>
            <li className={`side-nav ${classTrash}`} onClick={onClickTrash}> <i className="side-nav-icon fas fa-trash"></i> Trash</li>
            <li className={`side-nav ${classDraft}`} onClick={onClickDrafts}> <i className="side-nav-icon fa-regular fa-file"></i> Drafts</li>
        </ul>
    </div>
}