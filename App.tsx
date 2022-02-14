import { StatusBar } from 'expo-status-bar'
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useStore } from './data/store'
import { Home } from './routes/home';
import { Login } from './routes/login';
import firebase from './data/firebase'


export default function App() {
  const user = useStore(state => state.user);
  const setUser = useStore(state => state.setUser);
  const auth = getAuth();

  useEffect(() => {
    let unsubscribe = () => {}
    firebase;
    try {
       unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
        console.log('the auth state changed:', userAuth);
        setUser(userAuth);
      })
    } catch (e) {
      console.error(e)
    }

    return () => unsubscribe();
  }, [])


  useEffect(() => {
    console.log('is user null?', user)
    if (user === null) {

    }

  }, [user]);

  // if the user is logged in (anonymous or not), return the home screen
  // if not, return the login / start screen

  if (user === null) return (
    <Login />
  );

  return <Home />
}
