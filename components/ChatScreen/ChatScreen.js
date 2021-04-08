import React,{useRef} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { db , auth } from '../../fireBase'
import { useRouter } from 'next/router';
import classes from './ChatScreen.module.scss'
import SendMessage from '../SendMessage/SendMessage'
import Message from '../Message/Message'
import getEmail from '../utils/getEmail'

import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { IconButton , CardHeader  } from '@material-ui/core';
import { useCollection } from 'react-firebase-hooks/firestore';
import TimeAgo from 'timeago-react';





const ChatScreen = ({chat , messages}) => {

    const [user] = useAuthState(auth)
    const endOfMessageRef = useRef(null)
    const router = useRouter()
    const [messageSnapShot] = useCollection(db.collection('chats').doc(router.query.id)
                                            .collection('messages').orderBy('timestamp' , 'asc'))
    


    const [chatMateSnapShot] = useCollection(db.collection('user').where('email' , '==' , getEmail(chat.users , user)[0]))
    
  const showMessage = () => {
        if(messageSnapShot){
            return messageSnapShot.docs.map(message => (
                <Message key={message.id} user={message.data().user} 
                message = { {...message.data() , timestamp: message.data().timestamp?.toDate().getTime()}}/>
            ))
        }else{
                return JSON.parse(messages).map(mesg => (
                <Message key={mesg.id}  
                user={mesg.user} 
                message = { mesg }/>
            ))
                
            

        }
    }


    const chatMate = chatMateSnapShot && chatMateSnapShot.docs && chatMateSnapShot.docs[0] && chatMateSnapShot.docs[0].data()
    
    const scrollToBottom = () => {
        endOfMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }


    return (
        <div>
                <CardHeader className={classes.header}
                    avatar={
                        chatMate ? 
                        <img src={chatMate?.photoUrl} className={classes.avatar}/>
                     :  <img src='https://i.imgur.com/98bZZyr.jpg' className={classes.avatar}/>

                    }
                    action = {
                        <div className={classes.iconsHolder}>
                            <IconButton > 
                                <AttachFileIcon className={classes.icons}/>
                            </IconButton>
                            <IconButton > 
                                <MoreVertIcon className={classes.icons}/>
                            </IconButton>
                        </div>
                    
                    }
                    
                title={<p  className={classes.title}>{getEmail(chat.users , user)}</p>}
                subheader={<p  className={classes.lastSeen}>
                            {
                                chatMateSnapShot ? 
                                    ( <p> Last active : {' '}
                                        { chatMate?.lastSeen?.toDate() ? 
                                        (<TimeAgo datetime={chatMate?.lastSeen?.toDate()}/>) : "Unavailable"}
                                     </p>) 
                                    :
                                    (<p>Loding Last Active... </p>)

                            }
                            </p>}
      />

                <div className={classes.showMessageContainer}>
                    {showMessage()}
                </div>

                <div ref={endOfMessageRef} />


                    <SendMessage refFuction={scrollToBottom}/>

        </div>
    )
}

export default ChatScreen
