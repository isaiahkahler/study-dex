import { useState } from "react"
import { Keyboard, StyleSheet, Text, TextInput, View, TouchableHighlight, Alert } from "react-native"
import { globalStyles, globalTheme } from "../../components/styles/globalStyles"
import { If } from '../../components/ui/if'

interface LoginUIProps {
  onPhoneNumber: (number: string) => void,
  onAnonymous: () => void
}

// TODO: add loading indicator while waiting for state to update (on successful submit)

export default function LoginUI({ onPhoneNumber, onAnonymous }: LoginUIProps) {
  const [extension, setExtension] = useState('1')
  const [number, setNumber] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const invalidPhone = submitted && number.length < 10;
  const invalidExtension = submitted && extension.length === 0;
  const invalidForm = invalidPhone || invalidExtension;

  return (
    <View style={styles.container} onTouchEnd={(event) => {
      Keyboard.dismiss();
    }}>
      <View style={{ top: -50 }}>
        <Text style={[globalStyles.h1, { textAlign: 'center' }]}>Welcome to Study Index</Text>
        <Text style={[globalStyles.p, { textAlign: 'center' }]}>Enter your phone number to get started.</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }} onTouchEnd={(event) => {
        event.stopPropagation();
      }}>
        <Text style={globalStyles.h1}>+</Text>
        <TextInput style={[
          globalStyles.textInput,
          globalStyles.h1,
          invalidExtension ? globalStyles.invalidText : [],
          {
            width: 50,
            marginRight: globalTheme.spacing,
            textAlign: 'center'
          }
        ]}
          value={extension}
          onChangeText={text => setExtension(text)}
          maxLength={3}
          keyboardType="number-pad"
        />
        <TextInput
          style={[
            globalStyles.h1,
            globalStyles.textInput,
            invalidPhone ? globalStyles.invalidText : [],
            {
              width: 250,
              textAlign: 'center',
            }
          ]}
          value={number}
          onChangeText={(text) => setNumber(text)}
          textContentType="telephoneNumber"
          keyboardType="number-pad"
        />
      </View>
      <If value={invalidPhone}>
        <Text style={[globalStyles.p, { alignItems: 'center', color: globalTheme.warningColor, marginBottom: globalTheme.spacing }]}>Please enter a valid phone number.</Text>
      </If>
      <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', padding: globalTheme.spacing }}>
        <TouchableHighlight style={globalStyles.button} onPress={() => {
          setSubmitted(true);
          if (invalidForm) return;
          onPhoneNumber(number);
        }}>
          <View style={globalStyles.buttonContent}>
            <Text style={globalStyles.buttonText}>send me the code</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={globalStyles.button} onPress={() => {

          Alert.alert('Continue Without an Account?', 'You won\'t be able to access your classes and sets on a different device, but you can always sign up later.', [
            {
              text: 'Go Back',
              onPress: () => {},
              style: 'cancel',
            },
            { text: 'Continue', onPress: () => onAnonymous() },
          ]);
        }}>
          <View style={[globalStyles.buttonContent, { backgroundColor: globalTheme.darkGrey }]}>
            <Text style={[globalStyles.buttonText, { fontWeight: 'normal' }]}>continue without logging in</Text>
          </View>
        </TouchableHighlight>
        <Text style={[globalStyles.caption, globalStyles.marginVertical]}>By continuing you agree to the Terms and Conditions and Privacy Policy.</Text>
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