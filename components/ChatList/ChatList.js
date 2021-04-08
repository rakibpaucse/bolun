import React from 'react'
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
// import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import classes from './Chatlist.module.scss'
import getEmail from '../utils/getEmail'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth , db } from '../../fireBase'
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router'


const ChatList = ( {id , users} ) => {

    const router = useRouter()
    const [user] = useAuthState(auth)
    
    const [chatmateSnapShot] = useCollection(
        db.collection("user").where("email" , "==" , getEmail(users , user.email))
    )

// const chatPerson = null
    const chatPerson =  chatmateSnapShot?.docs?.[0]?.data() 

    

const enterChat = () => {
    router.push(`/chat/${id}`)
}

    return (
        <div className={classes.mainContainer} onClick={enterChat}>
            {
                chatPerson ? <img src={chatPerson.photoUrl} className={classes.avatar} /> :  <AccountCircleTwoToneIcon className={classes.avatar} />
            }
            
            <p>{getEmail(users , user.email)}</p>
        </div>
    )
}

export default ChatList
