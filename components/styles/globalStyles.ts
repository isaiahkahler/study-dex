import { ColorSchemeName, StyleSheet, useColorScheme } from "react-native"
import { Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export interface GlobalTheme {
  spacing: number, 
  grey: string,
  darkGrey: string,
  darkerGrey: string,
  accent: string,
  darkAccent: string,
  warningColor: string,
  borderRadius: number,
  textColor: string,
  baseColor: string
}

export function useTheme() {
  const colorScheme = useColorScheme();

  return {
    spacing: 20,
    grey: colorScheme === 'light' ? '#f2f2f6' : '#414142',
    darkGrey: colorScheme === 'light' ? '#e3e3e8' : '#2c2c2e', // 343436
    darkerGrey: colorScheme === 'light' ? '#aaaaaa' : '#1f1f1f',
    accent: '#ffc964',
    darkAccent: '#ff881a',
    warningColor: '#cc0f35',
    borderRadius: 10,
    textColor: colorScheme === 'light' ? '#000' : "#fff",
    baseColor:  colorScheme === 'light' ? '#fff' : "#000",
  }
  
}

export function useStyles(globalTheme: GlobalTheme) {
  return StyleSheet.create({
    h1: {
      fontSize: 35,
      fontWeight: 'bold',
      color: globalTheme.textColor
    },
    h2: {
      fontSize: 30,
      fontWeight: 'bold',
      color: globalTheme.textColor
    },
    p: {
      fontSize: 20,
      color: globalTheme.textColor
    },
    smallP: {
      fontSize: 15,
      color: globalTheme.textColor
    },
    container: {
      flex: 1,
      backgroundColor: globalTheme.baseColor,
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
      color: globalTheme.textColor
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
      color: globalTheme.textColor
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
}

