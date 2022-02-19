import { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native";
import { ClassProps } from "..";
import { globalStyles, globalTheme } from "../../../components/styles/globalStyles";
import { ClassUI } from "./class";


export function ClassScreen({ navigation, route }: ClassProps) {

  const { data } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: data.name })
  }, [navigation])

  return (
    <SafeAreaView style={globalStyles.safeAreaContainer}>
      <ClassUI data={data} />
    </SafeAreaView>
  );
}