import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../fireBase';
import classes from './Message.module.scss'
import moment from 'moment';

const Message = ({user , message}) => {
    
    const [loggedUser] = useAuthState(auth)
    
    const typeOfUser = user === loggedUser.email ? 'sender' : 'reciver'

    return (
        <div className={`${typeOfUser == 'sender' ? classes.sender : classes.reciver} ${classes.messageElem}`}>
            <p>{message.message} 
            <span className={classes.time}>{message.timestamp ? moment(message.timestamp).format('LT') : '...'} </span>
            </p>
        </div>
    )
}

export default Message
