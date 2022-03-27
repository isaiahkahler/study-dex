import { getAuth } from "firebase/auth"
import { Text, TouchableHighlight, View } from "react-native"
import { useStyles, useTheme } from "../../../components/styles/globalStyles"


export default function ProfileUI () {

  const globalTheme = useTheme();
  const globalStyles = useStyles(globalTheme);

  const auth = getAuth();

  return (
    <View style={globalStyles.container}>
      <Text>profile</Text>
      <TouchableHighlight style={globalStyles.button} onPress={() => {
        auth.signOut();
      }}>
        <View style={globalStyles.buttonContent}>
          <Text style={globalStyles.buttonText}>Sign Out</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}