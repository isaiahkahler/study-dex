import { StyleSheet } from "react-native"
import { Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const globalTheme = {
  spacing: 20,
  // grey: '#f5f5f5',
  grey: '#f2f2f6',
  darkGrey: '#e3e3e8',
  darkerGrey: '#aaaaaa',
  accent: '#ffc964',
  darkAccent: '#ff881a',
  warningColor: '#cc0f35',
  borderRadius: 10
}

export const globalStyles = StyleSheet.create({
  h1: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  p: {
    fontSize: 20
  },
  smallP: {
    fontSize: 15
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeAreaContainer: {
    backgroundColor: globalTheme.grey
  },
  scrollContainer: {
    // backgroundColor: '#fff',
    backgroundColor: globalTheme.grey,
    height: '100%'
  },
  scrollContainerContent: {
    alignItems: 'center'
  },
  caption: {
    fontSize: 12
  },
  button: {
    borderRadius: globalTheme.borderRadius,
    width: '100%',
    marginVertical: globalTheme.spacing / 2
  },
  buttonContent: {
    backgroundColor: globalTheme.accent,
    padding: 7.5,
    borderRadius: globalTheme.borderRadius,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  circleButton: {
    borderRadius: 100,
    // aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleButtonContent: {
    backgroundColor: globalTheme.accent,
    padding: 5,
    borderRadius: 100,
    color: globalTheme.accent
  },
  textInput: {
    backgroundColor: globalTheme.darkGrey,
    borderRadius: globalTheme.borderRadius,
    marginTop: globalTheme.spacing / 4,
    marginBottom: globalTheme.spacing,
    paddingHorizontal: globalTheme.spacing / 2,
    paddingVertical: globalTheme.spacing / 4
  },
  invalidText: {
    borderColor: globalTheme.warningColor,
    borderWidth: 2
  },
  marginVertical: {
    marginVertical: globalTheme.spacing
  },
  marginHorizontal: {
    marginHorizontal: globalTheme.spacing
  },
  paddingVertical: {
    paddingVertical: globalTheme.spacing
  },
  paddingHorizontal: {
    paddingHorizontal: globalTheme.spacing
  },
  maxWidth: {
    maxWidth: windowWidth <= 1000 ? 500 : 700
  },
  shadow: {
    shadowRadius: globalTheme.spacing / 4,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
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
});

