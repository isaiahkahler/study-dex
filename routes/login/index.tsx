import LoginUI from './login'
import VerifyUI from './verify'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAuth, signInAnonymously } from 'firebase/auth';


function LoginContainer({navigation, route}: StartProps) {

  const auth = getAuth();

  const handleAnonymousLogin = () => {
    signInAnonymously(auth);
  };

  const handlePhoneNumberLogin = (number: string) => {
    console.log('phone number login')
  }

  return <LoginUI onAnonymous={handleAnonymousLogin} onPhoneNumber={handlePhoneNumberLogin} />
}


// TODO: add privacy policy and TOS static pages and links

type LoginStackParamList = {
  Start: undefined,
  Verify: { number: string }
}

export type StartProps = NativeStackScreenProps<LoginStackParamList, 'Start'>;
export type VerifyProps = NativeStackScreenProps<LoginStackParamList, 'Verify'>;

const Stack = createNativeStackNavigator<LoginStackParamList>();

export function Login() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name="Start" options={{ headerShown: false }} component={LoginContainer} />
        <Stack.Screen name="Verify" options={{ headerShown: false }} component={VerifyUI} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}