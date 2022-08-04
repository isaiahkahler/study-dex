import { HomeContainer } from './home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Profile } from './profile'
import { ClassScreen } from './course'
import { ClassData } from '../../data/types'
import { CreateClass } from './createCourse'
import { CreateClassInputs } from './createCourse/createCourse'
import { useColorScheme } from 'react-native'
import { useTheme } from '../../components/styles/globalStyles'
import { CreateSet } from './createSet'


type HomeStackParamList = {
  Home: undefined,
  Profile: undefined,
  Class: { data: ClassData },
  CreateClass: { initialData?: ClassData, editMode?: boolean } | undefined
  CreateSet: { initialData?: ClassData, editMode?: boolean } | undefined
  // Verify: { number: string }
}


export type HomeProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;
export type ProfileProps = NativeStackScreenProps<HomeStackParamList, 'Profile'>;
export type ClassProps = NativeStackScreenProps<HomeStackParamList, 'Class'>;
export type CreateClassProps = NativeStackScreenProps<HomeStackParamList, 'CreateClass'>;
export type CreateSetProps = NativeStackScreenProps<HomeStackParamList, 'CreateSet'>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function Home() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <NavigationContainer theme={{dark: colorScheme === 'dark', colors: {
      primary: theme.accent,
      background: theme.baseColor,
      border: 'none',
      card: colorScheme === 'light' ? "#fff" : '#5a5a5c',
      notification: 'none',
      text: theme.textColor
    }}}>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" options={{ headerTitle: 'All Courses', headerLargeTitle: true }} component={HomeContainer} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Class" component={ClassScreen} />
        <Stack.Screen name="CreateClass" component={CreateClass} />
        <Stack.Screen name="CreateSet" component={CreateSet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

