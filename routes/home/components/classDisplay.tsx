import { StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { globalStyles, globalTheme } from "../../../components/styles/globalStyles"
import { ClassData } from "../../../data/types"

interface ClassDisplayProps {
  classData: ClassData,
  onPress: () => void,
}

export function ClassDisplay({ classData, onPress }: ClassDisplayProps) {
  return (
    <TouchableHighlight style={[
      styles.card,
      globalStyles.shadow,
      classData.color ? { backgroundColor: classData.color } : undefined
    ]}
      onPress={onPress}
    >
      <View style={styles.cardContentContainer}>
        <View style={styles.cardContent}>
          <Text style={globalStyles.h2}>{classData.name}</Text>
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
    alignSelf: 'stretch'
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
    flexDirection: 'row'
  }
})