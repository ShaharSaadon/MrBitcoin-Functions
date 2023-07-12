import { useEffect, useMemo, useCallback } from 'react';
import { ContactList } from '../components/ContactList.jsx'
import { ContactFilter } from '../components/ContactFilter'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadContacts, removeContact, setFilterBy } from '../store/actions/contact.actions'

export function ContactIndex() {

    const contacts = useSelector((storeState) => storeState.contactModule.contacts)
    const filterBy = useSelector((storeState) => storeState.contactModule.filterBy)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Contacts';
        dispatch(loadContacts())

    }, [])

    const onRemoveContact = useCallback(async (contactId) => {
        try {
            dispatch(removeContact(contactId));
        } catch (error) {
            console.log('error:', error);
        }
    }, []);

    const onChangeFilter = useCallback((filterBy) => {
        dispatch(setFilterBy(filterBy));
        dispatch(loadContacts());
    }, []);

    const bigNum = useMemo(() => {
        let sum = 0
        for (let i = 0; i <= 10 ** 8 * 3; i++) {
            sum += i
        }
        return sum * (contacts?.length || 1)
    }, [contacts?.length])

    if (!contacts) return <div>Loading...</div>
    return (
        <section className='contacts-container'>
            <div className="tools flex justify-center items-center">
                {bigNum}
                <ContactFilter filterBy={filterBy} onChangeFilter={onChangeFilter} />
                <Link to="/contact/edit" class="add-contact">Add contact</Link>
            </div>
            <ContactList contacts={contacts} onRemoveContact={onRemoveContact} />
        </section>
    )

}
