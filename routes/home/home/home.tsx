import { getAuth } from "firebase/auth"
import { SafeAreaView, FlatList, ScrollView, Text, TextInput, TouchableHighlight, View } from "react-native"
import { globalStyles, globalTheme } from "../../../components/styles/globalStyles"
import { useHeaderHeight } from '@react-navigation/elements'
import { ClassDisplay } from "../components/classDisplay";
import { ClassData } from "../../../data/types";
import { useLayoutEffect, useRef, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient'
import Svg, { Path } from 'react-native-svg'

interface HomeUIProps {
  classes: ClassData[],
  handleClassClick: (classData: ClassData) => void,
  handleCreateClassClick: () => void,
  handleCreateSetClick: () => void
}

export default function HomeUI({ classes, handleClassClick, handleCreateClassClick, handleCreateSetClick }: HomeUIProps) {
  const auth = getAuth();
  const height = useHeaderHeight();
  const inputContainerRef = useRef<View>(null);
  const [searchBarOffset, setSearchBarOffset] = useState<number | null>(null);


  return (
    <SafeAreaView style={globalStyles.safeAreaContainer}>
      <View style={{ width: '100%', backgroundColor: globalTheme.grey, height: '100%' }}>
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

        {/* {classes.map(_classData => <ClassDisplay key={_classData.id} classData={_classData} onPress={() => handleClassClick(_classData)} />)} */}

        <FlatList style={[
          {
            height: '100%',
          },

        ]}
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

      <View style={{ flex: 1 }}>
        <LinearGradient colors={['rgba(242,242,246,0)', 'rgba(242,242,246,1)']} style={{ height: globalTheme.spacing, position: 'absolute', bottom: 0, width: '100%', left: -globalTheme.spacing / 2 }} />
        <FloatingCreateButton onPress={handleCreateClassClick} />
      </View>
    </ SafeAreaView>
  );
}





function FloatingCreateButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableHighlight style={[globalStyles.circleButton, globalStyles.shadow, { position: 'absolute', bottom: globalTheme.spacing, right: globalTheme.spacing }]} onPress={() => onPress()}>
      <View style={globalStyles.circleButtonContent}>
        <Svg width={50} height={50} viewBox='0 0 24 24'>
          <Path fill='#000' d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </Svg>
      </View>
    </TouchableHighlight>
  );
}
