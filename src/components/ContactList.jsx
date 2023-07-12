import { ContactPreview } from "./ContactPreview";
import {memo} from 'react'


function _ContactList({ contacts, onRemoveContact}) {
    console.log('Robot is changed')
    return (
        <section className="clean-list">
            {contacts.map(contact =>
               <li key={contact._id}>
               <ContactPreview  contact={contact} onRemoveContact={onRemoveContact}/>
               </li>
            )}
        </section>
    )
}


export const ContactList = memo(_ContactList)