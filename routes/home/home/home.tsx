import { getAuth } from "firebase/auth"
import { Animated, FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native"
import { globalStyles, globalTheme } from "../../../components/styles/globalStyles"
import { useHeaderHeight } from '@react-navigation/elements'
import { ClassDisplay } from "../components/classDisplay";
import { ClassData } from "../../../data/types";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient'
import Svg, { Path } from 'react-native-svg'
import { AvoidKeyboardFloating, AvoidKeyboardScrollLayout } from "../../../components/ui/avoidKeyboard";
import { SafeAreaView } from "react-native-safe-area-context";

interface HomeUIProps {
  classes: ClassData[],
  handleClassClick: (classData: ClassData) => void,
  handleCreateClassClick: () => void,
  handleCreateSetClick: () => void
}

const styles = StyleSheet.create({
  floatingMenuButtonContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  floatingMenuButtonText: {
    position: 'absolute', 
    right: '100%', 
    marginRight: globalTheme.spacing / 2
  }
})

export default function HomeUI({ classes, handleClassClick, handleCreateClassClick, handleCreateSetClick }: HomeUIProps) {
  const auth = getAuth();
  const headerHeight = useHeaderHeight();
  const inputContainerRef = useRef<View>(null);
  const [searchBarOffset, setSearchBarOffset] = useState<number | null>(null);

  const [createMenuOpen, setCreateMenuOpen] = useState(false);

  const rotateAnimation = useRef(new Animated.Value(0)).current;


  const rotation = {
    transform: [
      {
        rotate: rotateAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg']
        })
      }
    ]
  };

  const lowerYTranslation = {
    transform: [
      { scale: rotateAnimation }, {
        translateY: rotateAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80]
        })
      }
    ]
  };
  const upperYTranslation = {
    transform: [
      { scale: rotateAnimation }, {
        translateY: rotateAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140]
        })
      }
    ]
  };

  const toggleCreateButton = () => {
    const toValue = createMenuOpen ? 0 : 1;
    Animated.spring(rotateAnimation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setCreateMenuOpen(!createMenuOpen);
  };

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

      <AvoidKeyboardFloating align="flex-end">

        <View style={{ marginRight: globalTheme.spacing, justifyContent: 'center', alignItems: 'center' }}>
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

    </ SafeAreaView>
  );
}

function FloatingCreateButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableHighlight style={[globalStyles.circleButton, globalStyles.shadow]} onPress={() => onPress()}>
      <View style={globalStyles.circleButtonContent}>
        <Svg width={50} height={50} viewBox='0 0 24 24'>
          <Path fill='#000' d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </Svg>
      </View>
    </TouchableHighlight>
  );
}


function PopUpAddSetButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableHighlight style={[globalStyles.circleButton, globalStyles.shadow]} onPress={() => onPress()}>
      <View style={[globalStyles.circleButtonContent, {backgroundColor: "#00ff00"}]}>
        <Svg width={40} height={40} viewBox='0 0 24 24'>
          <Path fill='#000' d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </Svg>
      </View>
    </TouchableHighlight>
  );
}

function PopUpCreateCourseButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableHighlight style={[globalStyles.circleButton, globalStyles.shadow]} onPress={() => onPress()}>
      <View style={[globalStyles.circleButtonContent, {backgroundColor: "#0000ff"}]}>
        <Svg width={40} height={40} viewBox='0 0 24 24'>
          <Path fill='#000' d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </Svg>
      </View>
    </TouchableHighlight>
  );
}