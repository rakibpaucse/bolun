import React from 'react'
import Head  from 'next/head'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {auth , provider} from '../fireBase';

const Container = styled.div`
height: 90vh;
width:100%;
`
const LoginContainer = styled.div`
display:grid;
justify-content:center;
align-items:center;

`

const Logo = styled.img`
height: 650px;
width: 650px;

`

const login = () => {

    const loginWithGoogle = () => {
        auth.signInWithPopup(provider).catch(alert)
    }

    return (
        <Container>

            <Head>
               <title>Login</title>
            </Head>
            

            <LoginContainer >
                <Logo src='https://i.imgur.com/98bZZyr.jpg' style={{marginBottom:10}}/>
                 {/* src='https://i.imgur.com/PXNANV5.jpeg'  */}
                 {/* src='https://i.imgur.com/GgYigUD.jpg'  */}
                

                <Button variant="contained" color="default" startIcon={<LockOpenIcon style={{fontSize:40 , color:'#4b2361'}}/>}
                    style={{ margin:'0 auto' , width:'70%', color: '#742578' , fontSize:20 , textTransform:'capitalize' , wordSpacing : 4 , letterSpacing:2}}
                    onClick={loginWithGoogle}
                    >
                    SignIn With Google!
                </Button>     

            </LoginContainer>

        </Container>
    )
}

export default login
