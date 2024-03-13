const { useState, Fragment } = React

export function MailRow({mail,onRemoveEmail}){

function dateMaker(mailDate){
    let date = new Date(mailDate).toLocaleDateString()
    return date
}

return <tr className="mail-row">
    <td>{mail.from}</td>
    <td>{mail.subject}</td>
    <td>{mail.body}</td>
    <td> <button>read</button> <button onClick={()=>onRemoveEmail(mail.id)}>X</button></td>
    <td>{dateMaker(mail.sentAt)}</td>
</tr>




}