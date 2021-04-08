import React from 'react'
import styled from 'styled-components'
import TrackChangesOutlinedIcon from '@material-ui/icons/TrackChangesOutlined';
import TextsmsIcon from '@material-ui/icons/Textsms';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { fade , makeStyles } from '@material-ui/core/styles';
import {IconButton , InputBase} from '@material-ui/core'
import Button from '@material-ui/core/Button';

import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import { auth, db } from '../fireBase'
import Chat from './ChatList/ChatList'


const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: 150,
        backgroundColor: '#f9f9f9',
        '&:hover': {
          backgroundColor: '#f3eaff',
        },
        margin: '15px auto',
        width: '95%',
        border: '1px solid ',
        
        textAlign:'center',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: '95%',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '80%',
          '&:focus': {
            width: '90%',
          },
        },
      },
    }));
    


const Sidebar = () => {

  const [user] = useAuthState(auth)
  const userChatRef = db.collection('chats').where('users' , 'array-contains' , user.email)

  const [chatsSnapShot] = useCollection(userChatRef)


    const createChat = () => {
        const input = prompt('Please enter an email address for the user you wish to chat')

        if(!input) return

        if(validateEmail && input !== user.email){
          db.collection('chats').add({
            users : [user.email , input]
          })
        }
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // const chatAlreadyExists = (resEmail) => (
    //   !!(chatsSnapShot && chatsSnapShot.docs.find(
    //     (chat) => 
    //      chat.data().users.find((user) => user === resEmail)?.length > 0
    //   ))
    // )



    const classes = useStyles();

    return (
        <SidebarContainer>

            <Header >
                <IconButton onClick={() => auth.signOut()} > 
                    <AvatarHolder>
                      <img src={user.photoURL} style={{width:'100%' , height:'100%' , borderRadius:'50%'}}/>
                    </AvatarHolder>    
                </IconButton>


                <IconHolder >
                    <IconButton > <TrackChangesOutlinedIcon /> </IconButton>
                    <IconButton > <TextsmsIcon /> </IconButton>
                    <IconButton > <MoreVertIcon />  </IconButton>
                </IconHolder>
            </Header>


            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search For a Chat !"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
          </div>

            <Button variant="contained" color="default" 
                    style={{ textAlign:'center' , width:'100%', color: 'white', background:'#0d5d60' , height:60, fontSize:17 , marginBottom:20}}
                    onClick={createChat}>
                Start A New Chatting!
            </Button>


            {
              chatsSnapShot && chatsSnapShot.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
              ))
            }
            
        </SidebarContainer>
    )
}

export default Sidebar



const SidebarContainer = styled.div`
background : #eee;
overflow-y : scroll;
height: 90vh;
flex:0.45;
border-right: 1px solid whitesmoke;

::-webkit-scrollbar{ display : none}

scrollbar-width : none;
-ms-overflow-style:none;

`

const Header = styled.div`
display: flex;
position:sticky;
justify-content: space-between;
padding : 15px;
border-bottom : 2px solid cadetblue;
`

const AvatarHolder = styled.div`
height : 50px;
width : 50px;
border-radius : 50%;
padding:1px;
border : 2px dotted brown;
`
const IconHolder = styled.div`
cursor: pointer;
display : flex;
align-items : center;

    :hover{
        opacity: 0.8;
    }
`