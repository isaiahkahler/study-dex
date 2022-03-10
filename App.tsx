import { StatusBar } from 'expo-status-bar'
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useStore } from './data/store'
import { Home } from './routes/home';
import { Login } from './routes/login';
import firebase from './data/firebase'
import { SplashScreen } from './components/ui/splash';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  const user = useStore(state => state.user);
  const setUser = useStore(state => state.setUser);
  const userLoading = useStore(state => state.userLoading);
  const setUserLoading = useStore(state => state.setUserLoading);
  const auth = getAuth();

  useEffect(() => {
    let unsubscribe = () => {}
    firebase;
    try {
       unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
        console.log('the auth state changed');
        setUser(userAuth);
        setUserLoading(false);
      })
    } catch (e) {
      console.error(e)
    }

    return () => unsubscribe();
  }, [])


  useEffect(() => {
    console.log('is user null?', !!user, userLoading)
    if (user === null) {

    }

  }, [user, userLoading]);

  // if the user is logged in (anonymous or not), return the home screen
  // if not, return the login / start screen

  if (userLoading) return (
    <SplashScreen />
  );

  if (user === null) return (
    <Login />
  );

  return <SafeAreaProvider ><Home /></SafeAreaProvider>
}
