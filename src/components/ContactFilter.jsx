import React from 'react'
import { useFormRegister } from '../customHooks/useFormRegister'

export function ContactFilter(props) {
    const [register] = useFormRegister({...props.filterBy},props.onChangeFilter)
    
    return (
        <form className='contact-filter'>
            <section>
                <input {...register('txt')}/>
            </section>
        </form>
    )

}