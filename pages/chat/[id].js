import React from 'react'
import Head from 'next/head'
import classes from './id.module.scss'
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen/ChatScreen'
import { db , auth } from '../../fireBase'
import getEmail from '../../components/utils/getEmail'
import { useAuthState } from 'react-firebase-hooks/auth';

const EachChat = ({ messages , chat }) => {
        
    const [user] = useAuthState(auth)

    let userName = getEmail(chat.users , user)[0]
    userName = userName[0].toUpperCase() + userName.substring(1)
    

    return (
        <div className={classes.mainChatContainer}>
            <Head>
                <title >Chat with {userName.substring(0, userName.lastIndexOf("@"))}  </title>
            </Head>

            <Sidebar />

            <div className={classes.chatContainer}>
                <ChatScreen chat={chat} messages={messages}/>
            </div>

        </div>
    )
}

export default EachChat

export async function getServerSideProps(context) {
    const ref = db.collection('chats').doc(context.query.id)

    const messageRes = await ref.collection('messages').orderBy('timestamp' , 'asc').get()

    const messages = messageRes.docs.map(doc => ({
        id : doc.id,
        ...doc.data()
        })
    ).map( mes => ({
        ...mes,
        timestamp : mes.timestamp.toDate().getTime()
    }))


    const chatRes  = await ref.get()

    const chat = await {
        id : chatRes.id,
        ...chatRes.data()
    }
    

    return {
        props : {
            messages : JSON.stringify(messages),
            chat : chat
        }
    }

}
