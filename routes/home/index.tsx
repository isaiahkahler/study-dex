import HomeUI from './home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SafeAreaView, Text, TouchableHighlight, View } from 'react-native'
import { globalStyles, globalTheme } from '../../components/styles/globalStyles'
import Svg, { Path } from 'react-native-svg'
import { Profile } from './profile'
import { useLayoutEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'


function HomeContainer({ navigation, route }: HomeProps) {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderProfileButton onPress={() => navigation.navigate('Profile')} />
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <HomeUI />
      <View style={{ flex: 1 }}>
        <LinearGradient colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']} style={{ height: globalTheme.spacing, position: 'absolute', bottom: 0, width: '100%', left: -globalTheme.spacing }} />
        <FloatingCreateButton onPress={() => { }} />
      </View>
    </ SafeAreaView>
  )
}

function FloatingCreateButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableHighlight style={[globalStyles.circleButton, { position: 'absolute', bottom: globalTheme.spacing, right: globalTheme.spacing }]} onPress={() => onPress()}>
      <View style={globalStyles.circleButtonContent}>
        <Svg width={50} height={50} viewBox='0 0 24 24'>
          <Path fill='#000' d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </Svg>
      </View>
    </TouchableHighlight>
  );
}

type HomeStackParamList = {
  Home: undefined,
  Profile: undefined
  // Verify: { number: string }
}


function HeaderProfileButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableHighlight style={globalStyles.circleButton} onPress={() => onPress()}>
      <View style={globalStyles.circleButtonContent}>
        <Svg width={30} height={30} viewBox='0 0 24 24'>
          <Path fill='#000' d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
        </Svg>
      </View>
    </TouchableHighlight>
  );
}



export type HomeProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;
export type ProfileProps = NativeStackScreenProps<HomeStackParamList, 'Profile'>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function Home() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" options={{ headerTitle: 'Your Classes', headerLargeTitle: true }} component={HomeContainer} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

