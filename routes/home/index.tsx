import { HomeContainer } from './home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Profile } from './profile'
import { ClassScreen } from './class'
import { ClassData } from '../../data/types'


type HomeStackParamList = {
  Home: undefined,
  Profile: undefined,
  Class: {data: ClassData}
  // Verify: { number: string }
}


export type HomeProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;
export type ProfileProps = NativeStackScreenProps<HomeStackParamList, 'Profile'>;
export type ClassProps = NativeStackScreenProps<HomeStackParamList, 'Class'>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function Home() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" options={{ headerTitle: 'Your Classes', headerLargeTitle: true }} component={HomeContainer} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Class" component={ClassScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

