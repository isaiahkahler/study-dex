import { getAuth } from "firebase/auth"
import { FlatList, ScrollView, Text, TextInput, TouchableHighlight, View } from "react-native"
import { globalStyles, globalTheme } from "../../../components/styles/globalStyles"
import { useHeaderHeight } from '@react-navigation/elements'
import { ClassDisplay } from "../components/classDisplay";
import { ClassData } from "../../../data/types";
import { useLayoutEffect, useRef, useState } from "react";

interface HomeUIProps {
  classes: ClassData[],
  handleClassClick: (classData: ClassData) => void
}

export default function HomeUI({ classes, handleClassClick }: HomeUIProps) {
  const auth = getAuth();
  const height = useHeaderHeight();
  const inputContainerRef = useRef<View>(null);
  const [searchBarOffset, setSearchBarOffset] = useState<number | null>(null);


  return (
    // e7ebf3
    // <ScrollView style={globalStyles.scrollContainer} contentContainerStyle={globalStyles.scrollContainerContent}>
    <View style={{ width: '100%', backgroundColor: globalTheme.grey, height: '100%' }}>
      <View style={[
        globalStyles.paddingHorizontal,
        { position: 'absolute', zIndex: 2, width: '100%' }
      ]}>
        <TextInput style={[
          globalStyles.textInput,
          globalStyles.p,
          globalStyles.shadow,
        ]}
          placeholder="Search all classes and categories"
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
    // </ScrollView>
  );
}


