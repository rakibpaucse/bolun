import '../styles/globals.css'
import {useEffect} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth , db} from '../fireBase'
import Login from './login'
import Loading from '../components/Loading/Loading'
import firebase from 'firebase'

function MyApp({ Component, pageProps }) {

  const [user , loding] = useAuthState(auth)

  useEffect(() => {

    if(user){
      db.collection('user').doc(user.uid).set(
      {
        email : user.email,
        lastSeen : firebase.firestore.FieldValue.serverTimestamp(),
        photoUrl : user.photoURL
      },
        {merge : true}
      )
    }

  }, [user])

  if(loding) return <Loading />
  if(!user) return <Login />
  
  return <Component {...pageProps} />
}

export default MyApp
