import { HomeContainer } from './home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Profile } from './profile'
import { ClassScreen } from './class'
import { ClassData } from '../../data/types'
import { CreateClass } from './createClass'
import { CreateClassInputs } from './createClass/createClass'


type HomeStackParamList = {
  Home: undefined,
  Profile: undefined,
  Class: { data: ClassData },
  CreateClass: { initialData?: ClassData, editMode?: boolean } | undefined
  // Verify: { number: string }
}


export type HomeProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;
export type ProfileProps = NativeStackScreenProps<HomeStackParamList, 'Profile'>;
export type ClassProps = NativeStackScreenProps<HomeStackParamList, 'Class'>;
export type CreateClassProps = NativeStackScreenProps<HomeStackParamList, 'CreateClass'>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function Home() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" options={{ headerTitle: 'All Courses', headerLargeTitle: true }} component={HomeContainer} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Class" component={ClassScreen} />
        <Stack.Screen name="CreateClass" component={CreateClass} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

