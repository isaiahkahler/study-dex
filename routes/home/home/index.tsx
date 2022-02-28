import HomeUI from './home'
import { SafeAreaView, Text, TouchableHighlight, View } from 'react-native'
import { globalStyles, globalTheme } from '../../../components/styles/globalStyles'
import Svg, { Path } from 'react-native-svg'
import { useLayoutEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { HomeProps } from '..'
import { ClassData } from '../../../data/types'
import { useStore } from '../../../data/store'

const testingClasses = [
  {
    id: 'test',
    isPublic: true,
    lessons: [
      {
        id: 'fdsfds',
        name: 'L18',
        order: 0,
        sets: [
          {
            id: 'jnennk',
            body: 'body of a set',
            category: 'grammar',
            name: 'Set Title',
            order: 0,
            relatedIDs: []
          }
        ]
      },
      {
        id: 'fds3d',
        name: 'L17',
        order: 0,
        sets: [
          {
            id: 'cdsjjc',
            body: 'body of a set 2',
            category: 'grammar',
            name: 'Set Title 2',
            order: 0,
            relatedIDs: []
          }
        ]
      },
    ],
    name: "ASIANLAN 226",
    setCategories: ['grammar', 'vocab', 'kanji', 'random', 'dog', 'honey', 'toes', 'sweat', 'water', 'word', 'plant', 'jeans', 'snow', 'tampon', 'greg', 'no', 'sure'],
    color: "#e579f6"
  },
  { id: 'test2', isPublic: true, lessons: [], name: "EECS 376 - Foundations of Computer Science", setCategories: [] },
  { id: 'test3', isPublic: true, lessons: [], name: "EECS 376", setCategories: [] },
  { id: 'test4', isPublic: true, lessons: [], name: "Big thicc Class", setCategories: [] },
  { id: 'test5', isPublic: true, lessons: [], name: "AMCULT 214 - APIA", setCategories: [] },
  { id: 'test6', isPublic: true, lessons: [], name: "yassss", setCategories: [] }
];


export function HomeContainer({ navigation, route }: HomeProps) {
  const user = useStore(state => state.user);

  const classes = useStore(state => state.classes);
  const localClasses = useStore(state => state.localClasses);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderProfileButton onPress={() => navigation.navigate('Profile')} />
    });
  }, [navigation]);


  const handleClassClick = (classData: ClassData) => {
    navigation.push('Class', { data: classData });
  }

  const handleCreateClassClick = () => {
    navigation.navigate('CreateClass');
  };
  const handleCreateSetClick = () => {};

  // todo: add an error view or something
  if (!user) return <View />;

  return (
      <HomeUI
        handleCreateClassClick={handleCreateClassClick}
        handleCreateSetClick={handleCreateSetClick}
        handleClassClick={handleClassClick}
        classes={user.isAnonymous ? localClasses : classes === null ? [] : classes}
      />
  )
}


function HeaderProfileButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableHighlight style={globalStyles.circleButton} onPress={() => onPress()}>
      <View style={[globalStyles.circleButtonContent, { backgroundColor: globalTheme.darkGrey }]}>
        <Svg width={30} height={30} viewBox='0 0 24 24'>
          <Path fill='#000' d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
        </Svg>
      </View>
    </TouchableHighlight>
  );
}