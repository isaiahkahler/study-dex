import { ScrollView, Text, TextInput, TouchableHighlight, View } from "react-native"
import { useStyles, useTheme } from "../../../components/styles/globalStyles"
import { ClassData } from "../../../data/types"
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { useState } from "react"


export function ClassUI({ data }: { data: ClassData }) {

  const [display, setDisplay] = useState(0);

  const globalTheme = useTheme();
  const globalStyles = useStyles(globalTheme);

  return (<ScrollView style={globalStyles.scrollContainer} contentContainerStyle={globalStyles.scrollContainerContent}>
    <View style={[globalStyles.marginVertical, globalStyles.maxWidth, { width: '100%' }]}>
      <TextInput style={[
        globalStyles.textInput,
        globalStyles.p,
        globalStyles.marginHorizontal,
        { marginTop: 0 }
      ]}
        placeholder={`Search all of ${data.name}`}
      />
      <SegmentedControl
        values={['Lesson', 'Categories', 'Chronological']}
        style={[globalStyles.marginHorizontal, { marginBottom: globalTheme.spacing }]}
        selectedIndex={display}
        onChange={(event) => setDisplay(event.nativeEvent.selectedSegmentIndex)}
      />

      {data.lessons.map(lesson => <TouchableHighlight key={lesson.id} style={[globalStyles.card, globalStyles.shadow]}>
        <View style={globalStyles.cardContentContainer}>
          <View style={globalStyles.cardContent}>
            <Text style={globalStyles.h2}>{lesson.name}</Text>
          </View>
        </View>
      </TouchableHighlight>)}


    </View>
  </ScrollView>
  );
}