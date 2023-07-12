import { useEffect, useState } from 'react';
import { TransferFund } from '../components/TransferFund';
import { transferCoins, addMove } from '../store/actions/user.actions';
import MovesList from '../components/MovesList';
import { contactService } from '../services/contact.service';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';


export function ContactDetails(props) {
  const [contact, setContact] = useState(null);
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const { balance } = user

  useEffect(() => {
    console.log('loading contacts...');
    loadContact();
  }, [params.id]);

  async function loadContact() {
    try {
      console.log('loading....:');
      const contact = await contactService.getContactById(params.id);
      setContact(contact);
    } catch (error) {
      console.log('error:', error);
    }
  }

  function onBack() {
    navigate('/contacts')
  }

  function onTransferCoins(amount, contact) {
    if (!amount) return;
    dispatch(transferCoins(amount, contact));
  }

  function filterMoves() {
    return user.moves.filter((move) => move.toId === contact._id).splice(0, 5);
  }

  if (!contact) return <div>Loading...</div>;
  return (
    <section className='contact-details'>
      <button onClick={onBack} className="btn-back">Back</button>
      <img src={`https://robohash.org/${contact._id}`} />
      <section>
        <h1>name: {contact.name}</h1>
      </section>
      <section>
        <p>phone: {contact.phone}</p>
      </section>
      <section>
        <p>email: {contact.email}</p>
      </section>
      <TransferFund contact={contact} maxCoins={balance} onTransferCoins={onTransferCoins} />
      <MovesList title={'Your Moves:'} moves={filterMoves()} />
    </section>
  );
}

