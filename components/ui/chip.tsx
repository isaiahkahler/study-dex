import { LinearGradient } from "expo-linear-gradient";
import { PropsWithChildren } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { getColor, getDarkColor, getLightColor } from "../styles/colors";
import { useStyles, useTheme } from "../styles/globalStyles";


interface ChipProps {
  index?: number,
  text: string,
  onClose?: () => void,
  onPress?: () => void,
}

export function Chip({ index, text, onClose, onPress }: ChipProps) {
  const globalTheme = useTheme();
  const globalStyles = useStyles(globalTheme);
  const backgroundColor = getLightColor(index);
  const textColor = getDarkColor(index);
  // console.log(`index ${index} color ${backgroundColor}`)

  return (
    <Text style={{ padding: 0, marginTop: globalTheme.spacing / 2, marginRight: globalTheme.spacing / 2 }}>
      <TouchableHighlight
        style={[
          globalStyles.shadow,
          {
            borderRadius: 100,
            backgroundColor: backgroundColor,
            padding: 0,
            margin: 0,
          }]}
        onPress={onPress}
        underlayColor='rgba(0,0,0,0.2)'
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: globalTheme.spacing / 3,
          paddingVertical: globalTheme.spacing / 4,
          paddingRight: !!onClose ? globalTheme.spacing / 2 : undefined
        }}>
          {onClose && <TouchableHighlight
            onPress={() => onClose()}
            style={{
              marginRight: globalTheme.spacing / 4,
              borderRadius: 100
            }}
            underlayColor='rgba(0,0,0,0.2)'
          >
            <Svg width={28} height={28} viewBox='0 0 24 24'>
              <Path fill={textColor} d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
            </Svg>
          </TouchableHighlight>
          }
          <View>
            <Text style={{ color: textColor, fontSize: 18, fontWeight: '500' }}>
              {text}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </Text>
  );
}
