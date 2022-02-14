import { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, View, TouchableHighlight } from "react-native"
import { VerifyProps } from "."
import { globalStyles, globalTheme } from "../../components/styles/globalStyles";
import { If } from '../../components/ui/if'


export default function VerifyUI({route, navigation}: VerifyProps) {
  const [code, setCode] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    console.log('number:', route.params.number);
  }, [route])

  const invalidCode = submitted && code.length < 6;

  return (
    <View style={styles.container} onTouchEnd={(event) => {
      Keyboard.dismiss();
    }}>
      <View style={{ top: -50 }}>
        <Text style={[globalStyles.h1, { textAlign: 'center' }]}>The code, please.</Text>
        <Text style={[globalStyles.p, { textAlign: 'center' }]}>We've sent you a code. Please enter it below.</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }} onTouchEnd={(event) => {
        event.stopPropagation();
      }}>
        <TextInput
          style={[
            globalStyles.h1,
            globalStyles.textInput,
            invalidCode ? globalStyles.invalidText : [],
            {
              width: 250,
              textAlign: 'center',
            }
          ]}
          value={code}
          onChangeText={(text) => setCode(text)}
          textContentType="telephoneNumber"
          keyboardType="number-pad"
        />
      </View>
      <If value={invalidCode}>
        <Text style={[globalStyles.p, { alignItems: 'center', color: globalTheme.warningColor, marginBottom: globalTheme.spacing }]}>Please enter the code.</Text>
      </If>
      <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', padding: globalTheme.spacing }}>
        <TouchableHighlight style={globalStyles.button} onPress={() => {
          setSubmitted(true);
          if(invalidCode) return;
          
        }}>
          <View style={globalStyles.buttonContent}>
            <Text style={globalStyles.buttonText}>continue</Text>
          </View>
        </TouchableHighlight>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});