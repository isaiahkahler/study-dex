import { getAuth } from "firebase/auth"
import { Text, TouchableHighlight, View } from "react-native"
import { globalStyles } from "../../../components/styles/globalStyles"


export default function ProfileUI () {

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