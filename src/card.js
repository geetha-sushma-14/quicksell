import IconDot from './images/3 dot menu.svg';
import './card.css'
const Card = ({ ticket }) => (
    <div className="card">
      <div className='ticked-id'>
        <h4 style={{ margin: 0 , color:'grey'}}>{ticket.id}</h4>
      </div>
      <h3 style={{ margin: '10px 0' , fontSize:'15px'}}>{ticket.title}</h3>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <img src={IconDot} alt="Action icon 1" style={{ width: '20px', marginLeft: '0px', marginRight:'5px' }} />
        <span className='ticket-tag'>
          <div className='dot'></div>
          {ticket.tag[0]}
        </span>
      </div>
    </div>
  );

  export default Card;