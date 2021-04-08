import React,{useState} from 'react'
import { useRouter } from 'next/router';
import firebase from 'firebase'
import classes from './SendMessage.module.scss'
import EmojiEmotionsTwoToneIcon from '@material-ui/icons/EmojiEmotionsTwoTone';
import InsertPhotoTwoToneIcon from '@material-ui/icons/InsertPhotoTwoTone';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import { IconButton } from '@material-ui/core';
import { db , auth } from '../../fireBase';
import { useAuthState } from 'react-firebase-hooks/auth';


const SendMessage = ({refFuction}) => {
   
    const [user] = useAuthState(auth)
    const router = useRouter()
    const [value, setvalue] = useState('')

const sendMsg = (e) => {

    e.preventDefault();

    db.collection('user').doc(user.uid).set({
        lastSeen : firebase.firestore.FieldValue.serverTimestamp()
    }, {marge : true})

    db.collection('chats').doc(router.query.id).collection('messages').add({
        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
        message : value,
        user : user.email,
        photoURL : user.photoURL
    })

    setvalue('')
    refFuction()
}
    
    return (
        <div className={classes.mainContainer}>
            <div >
                <IconButton >
                    <EmojiEmotionsTwoToneIcon className={classes.icons} fontSize='large' />
                </IconButton>
                <IconButton >
                    <InsertPhotoTwoToneIcon className={classes.icons} fontSize='large'/>    
                </IconButton>
            </div>

            <form onSubmit={sendMsg} className={classes.form}>
                <input type="text"  className={classes.inputField} value={value} onChange={ e => setvalue(e.target.value)}/>
                {/* <button type="submit" hidden disabled={!value} onSubmit={sendMsg}></button> */}
            </form>
             
             <IconButton onClick={(e) => sendMsg(e)}>
                <SendTwoToneIcon className={classes.icons} fontSize='large' />
             </IconButton>
            

        </div>
    )
}

export default SendMessage
