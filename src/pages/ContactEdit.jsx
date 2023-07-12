import { useEffect, useState } from 'react';
import { contactService } from '../services/contact.service'
import { saveContact } from '../store/actions/contact.actions'
import { useNavigate, useParams } from 'react-router';
import {useForm} from '../customHooks/useForm'


export function ContactEdit(props) {

    const [contact, handleChange,setContact] = useForm(contactService.getEmptyContact())
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() =>{
       loadContact()

    },[])

    async function loadContact(){
        const contactId = params.id
        if (contactId) {
            try {
                const contact = await contactService.getContactById(contactId)
                setContact( contact )
            } catch (error) {
                console.log('error:', error)
            }
        }
    }

    async function onSaveContact(ev) {
        ev.preventDefault()
        try {
            await contactService.saveContact({ ...contact })
            navigate('/contacts')
        } catch (error) {
            console.log('error:', error)
        }
    }


        const { name, email,phone } = contact
        return (
            <section className='contact-edit'>
                <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
                <form onSubmit={onSaveContact} >

                    <label htmlFor="name">name</label>
                    <input value={name} onChange={handleChange} type="text" name="name" id="name" />

                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={handleChange} type="text" name="email" id="email" />
                    
                    <label htmlFor="phone">Phone</label>
                    <input value={phone} onChange={handleChange} type="text" name="phone" id="phone" />


                    <button>Save</button>
                </form>
            </section>
        )
    
}
    