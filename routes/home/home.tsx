import { getAuth } from "firebase/auth"
import { ScrollView, Text, TouchableHighlight, View } from "react-native"
import { globalStyles, globalTheme } from "../../components/styles/globalStyles"
import Svg, { Path } from 'react-native-svg'
import { useHeaderHeight } from '@react-navigation/elements'

interface HomeUIProps {

}

export default function HomeUI({ }: HomeUIProps) {
  const auth = getAuth();
  const height = useHeaderHeight();

  return (
    <ScrollView style={globalStyles.scrollContainer} contentContainerStyle={globalStyles.scrollContainerContent}>
      <View style={globalStyles.marginVertical}>

        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
        <Text>home page</Text>
      </View>


    </ScrollView>
  );
}


