import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { globalStyles, globalTheme } from "../../../components/styles/globalStyles"
import { Chip } from "../../../components/ui/chip"
import { ClassData } from "../../../data/types"

interface ClassDisplayProps {
  classData: ClassData,
  onPress: () => void,
}

export function ClassDisplay({ classData, onPress }: ClassDisplayProps) {
  console.log('class color:', classData.color)
  return (
    <TouchableHighlight style={[
      styles.card,
      globalStyles.shadow,
    ]}
      onPress={onPress}
    >
      <View style={[
        styles.cardContentContainer,
        classData.color ? { backgroundColor: classData.color } : { backgroundColor: globalTheme.darkGrey }
      ]}>
        <View style={[
          styles.cardContent,
          {backgroundColor:'rgba(255,255,255,0.4)'}
        ]} >
          <Text style={globalStyles.h2}>{classData.name}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {classData.setCategories.map((category, index) => <Chip key={category} index={index} text={category} onPress={() => {}} />)}
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: globalTheme.borderRadius,
    marginHorizontal: globalTheme.spacing,
    marginBottom: globalTheme.spacing,
    alignSelf: 'stretch',
  },
  cardContent: {
    backgroundColor: '#fff',
    borderRadius: globalTheme.borderRadius,
    paddingHorizontal: globalTheme.spacing,
    paddingVertical: globalTheme.spacing / 2,
    flexGrow: 1
  },
  cardContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: globalTheme.borderRadius,
  }
})