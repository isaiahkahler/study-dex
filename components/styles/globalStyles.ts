import { StyleSheet } from "react-native";

export const globalTheme = {
  spacing: 20,
  grey: '#f5f5f5',
  darkGrey: '#ddd',
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
  p: {
    fontSize: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    backgroundColor: '#fff',
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
    borderRadius: globalTheme.borderRadius
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  circleButton: {
    borderRadius: 100,
    aspectRatio: 1,
    backgroundColor: globalTheme.grey,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleButtonContent: {
    backgroundColor: globalTheme.darkGrey,
    padding: 5,
    borderRadius: 100,
    color: globalTheme.accent
  },
  textInput: {
    backgroundColor: globalTheme.grey,
    borderRadius: globalTheme.borderRadius,
    marginVertical: globalTheme.spacing,
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
  }
});