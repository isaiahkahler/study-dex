import { KeyboardAvoidingView, ScrollView, View } from "react-native"
import { useHeaderHeight } from '@react-navigation/elements'
import { globalStyles } from "../styles/globalStyles"
import { ReactNode } from "react";

interface AvoidKeyboardScrollLayoutProps {
  children: ReactNode,
  bottomOffset?: number,
}

export function AvoidKeyboardScrollLayout({ children, bottomOffset }: AvoidKeyboardScrollLayoutProps) {

  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={{
        width: '100%',
        height: '100%',
      }}
      keyboardVerticalOffset={headerHeight}
    >
      <ScrollView style={globalStyles.scrollContainer} contentContainerStyle={globalStyles.scrollContainerContent}>
        <View style={[globalStyles.paddingHorizontal, globalStyles.paddingVertical, { width: '100%', paddingBottom: (bottomOffset || undefined)  }]}>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


interface AvoidKeyboardFloatingProps {
  children: ReactNode,
  bottomOffset?: number,
  giveHeight?: (offset: number) => void
}

export function AvoidKeyboardFloating({ children, bottomOffset, giveHeight }: AvoidKeyboardFloatingProps) {

  const headerHeight = useHeaderHeight();

  return (
    <View style={{ position: 'absolute', height: '100%', width: '100%' }} pointerEvents='box-none'>
      <KeyboardAvoidingView
        behavior={'padding'}
        style={{
          justifyContent: 'flex-end',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}
        keyboardVerticalOffset={headerHeight + (bottomOffset || 0)}
        pointerEvents='box-none'
      >
        <View style={{ alignItems: 'center' }} pointerEvents={'box-none'}>
          <View pointerEvents='auto' onLayout={(event) => { giveHeight && giveHeight(event.nativeEvent.layout.height + (bottomOffset || 0)) }}>
            {children}
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}