import { contactService } from "../../services/contact.service"
import { REMOVE_CONTACT, SET_FILTER_BY, SET_CONTACTS,UPDATE_CONTACT } from "../reducers/contact.reducer"


export function loadContacts() {
    return async (dispatch, getState) => {
        try {
            const contacts = await contactService.getContacts(getState().contactModule.filterBy)
            console.log('contacts:', contacts)
            const action = {
                type: SET_CONTACTS,
                contacts
            }
            dispatch(action)
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeContact(contactId) {
    return async (dispatch) => {
        try {
            await contactService.removeContact(contactId)
            const action = { type: REMOVE_CONTACT, contactId }
            dispatch(action)
            return 'Removed!'
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function saveContact(contact){
    return async (dispatch) => {
        try {
            await contactService.saveContact(contact)
            const action = { type: UPDATE_CONTACT, contact }
            dispatch(action)
            return contact
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function setFilterBy(filterBy) {
    console.log('filterBy:', filterBy)
    return (dispatch) => {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }
}

