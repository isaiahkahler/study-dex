import { getAuth } from "firebase/auth"
import { Animated, Easing, FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native"
import { useStyles, useTheme } from "../../../components/styles/globalStyles"
import { useHeaderHeight } from '@react-navigation/elements'
import { ClassDisplay } from "../components/classDisplay"
import { ClassData } from "../../../data/types"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { LinearGradient } from 'expo-linear-gradient'
import Svg, { Path } from 'react-native-svg'
import { AvoidKeyboardFloating, AvoidKeyboardScrollLayout } from "../../../components/ui/avoidKeyboard"
import { SafeAreaView } from "react-native-safe-area-context"
import { getColor } from "../../../components/styles/colors"
// import { MaterialCommunityIcons } from '@expo/vector-icons'

interface HomeUIProps {
  classes: ClassData[],
  handleClassClick: (classData: ClassData) => void,
  handleCreateClassClick: () => void,
  handleCreateSetClick: () => void
}

const makeStyles = (globalTheme: any) => StyleSheet.create({
  floatingMenuButtonContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  floatingMenuButtonText: {
    position: 'absolute',
    right: '100%',
    marginRight: globalTheme.spacing / 2,
    backgroundColor: "rgba(255,255,255,0.5)",
    shadowRadius: 10,
    // textShadowColor: 'rgba(255,255,255,1)',
    shadowOpacity: 1,
    shadowColor: 'rgba(255,255,255,1)',
  }
})

export default function HomeUI({ classes, handleClassClick, handleCreateClassClick, handleCreateSetClick }: HomeUIProps) {

  const globalTheme = useTheme();
  const globalStyles = useStyles(globalTheme);
  const auth = getAuth();
  const headerHeight = useHeaderHeight();
  const [searchBarOffset, setSearchBarOffset] = useState<number | null>(null);


  return (
    <SafeAreaView style={[globalStyles.safeAreaContainer, { flex: 1, marginTop: headerHeight }]} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={headerHeight} style={{ flex: 1 }}>
        <View style={{ backgroundColor: globalTheme.grey }}>
          <View style={[
            globalStyles.paddingHorizontal,
            { position: 'absolute', zIndex: 2, width: '100%' }
          ]}>
            <TextInput style={[
              globalStyles.textInput,
              globalStyles.p,
              globalStyles.shadow,
              { margin: 0, marginTop: globalTheme.spacing }
            ]}
              placeholder="Search all courses and categories"
              onLayout={event => {
                setSearchBarOffset(event.nativeEvent.layout.height + globalTheme.spacing);
              }}
            />
          </View>

          <FlatList style={{ height: '100%' }}
            data={classes}
            renderItem={(_class) => <ClassDisplay classData={_class.item} onPress={() => handleClassClick(_class.item)} />}
            ListHeaderComponent={<View />}
            ListHeaderComponentStyle={searchBarOffset ? { paddingTop: searchBarOffset + globalTheme.spacing } : undefined}
          >
          </FlatList>

          {classes.length === 0 && <View style={{ position: 'absolute', width: '100%', height: '100%', flex: 1, justifyContent: 'center' }}>
            <Text style={[globalStyles.p, { textAlign: 'center' }]}>To create a class, click the + button.</Text>
          </View>}

        </View>
      </KeyboardAvoidingView>


      <FloatingButtonArea />

    </ SafeAreaView>
  );
}


function FloatingButtonArea() {
  const buttonAnimation = useRef(new Animated.Value(0)).current;
  const [openState, setOpenState] = useState(false);
  const globalTheme = useTheme();
  const globalStyles = useStyles(globalTheme);
  const styles = makeStyles(globalTheme);

  const rotation = {
    transform: [
      {
        rotate: buttonAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg']
        })
      }
    ]
  };

  const lowerYTranslation = {
    transform: [
      {
        translateY: buttonAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80]
        })
      }
    ],
    opacity: buttonAnimation
  };
  const upperYTranslation = {
    transform: [
      {
        translateY: buttonAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140]
        })
      }
    ],
    opacity: buttonAnimation
  };

  const toggleCreateButton = () => {
    const toValue = openState ? 0 : 1;
    Animated.spring(buttonAnimation, {
      toValue,
      useNativeDriver: true,
    }).start();

    setOpenState(!openState);
  };


  return (
    <AvoidKeyboardFloating align="flex-end">

      <View style={{ marginRight: globalTheme.spacing, justifyContent: 'center', alignItems: 'center', zIndex: 200 }}>
        <Animated.View style={[styles.floatingMenuButtonContainer, upperYTranslation]}>
          <Text style={[globalStyles.buttonText, styles.floatingMenuButtonText]}>create new set</Text>
          <PopUpAddSetButton onPress={() => { }} />
        </Animated.View>

        <Animated.View style={[styles.floatingMenuButtonContainer, lowerYTranslation]}>
          <Text style={[globalStyles.buttonText, styles.floatingMenuButtonText]}>create new course</Text>
          <PopUpCreateCourseButton onPress={() => { }} />
        </Animated.View>

        <Animated.View style={[rotation]}>
          {/* <FloatingCreateButton onPress={handleCreateClassClick} /> */}
          <FloatingCreateButton onPress={toggleCreateButton} />
        </Animated.View>
      </View>

    </AvoidKeyboardFloating>
  );
}

function FloatingCreateButton({ onPress }: { onPress: () => void }) {
  const globalTheme = useTheme();
  const globalStyles = useStyles(globalTheme);
  return (
    <TouchableHighlight style={[globalStyles.circleButton, globalStyles.shadow]} onPress={() => onPress()}>
      <View style={globalStyles.circleButtonContent}>
        <Svg width={50} height={50} viewBox='0 0 24 24'>
          <Path fill={globalTheme.textColor} d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </Svg>
      </View>
    </TouchableHighlight>
  );
}


function PopUpAddSetButton({ onPress }: { onPress: () => void }) {
  const globalTheme = useTheme();
  const globalStyles = useStyles(globalTheme);
  return (
    <TouchableHighlight style={[globalStyles.circleButton, globalStyles.shadow]} onPress={() => onPress()}>
      <View style={[globalStyles.circleButtonContent, { backgroundColor: getColor(8) }]}>
        <View style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={35} height={35} viewBox='0 0 24 24'>
            <Path fill={globalTheme.textColor} d="M5,3C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3H5M5,5H19V19H5V5M7,7V9H17V7H7M7,11V13H17V11H7M7,15V17H14V15H7Z" />
          </Svg>
        </View>
      </View>
    </TouchableHighlight>
  );
}

function PopUpCreateCourseButton({ onPress }: { onPress: () => void }) {
  const globalTheme = useTheme();
  const globalStyles = useStyles(globalTheme);
  return (
    <TouchableHighlight style={[globalStyles.circleButton, globalStyles.shadow]} onPress={() => onPress()}>
      <View style={[globalStyles.circleButtonContent, { backgroundColor: getColor(0) }]}>
        <View style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={35} height={35} viewBox='0 0 24 24'>
            <Path fill={globalTheme.textColor} d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z" />
          </Svg>
        </View>
      </View>
    </TouchableHighlight>
  );
}