import { User } from "firebase/auth"
import { PropsWithChildren, useEffect, useState } from "react"
import { Controller, useController, useForm } from "react-hook-form"
import { Switch, Text, TextInput, TouchableHighlight, View } from "react-native"
import Svg, { Path } from "react-native-svg"
import { getColor, getDarkColor, getLightColor } from "../../../components/styles/colors"
import { useStyles, useTheme } from "../../../components/styles/globalStyles"
import { Chip } from "../../../components/ui/chip"
import { ClassData } from "../../../data/types"
import { AvoidKeyboardFloating, AvoidKeyboardScrollLayout } from "../../../components/ui/avoidKeyboard"
import { SafeAreaView } from "react-native-safe-area-context";

interface CreateSetUIProps {
  user: User,
  onSubmit: (data: CreateSetInputs) => void,
  initialData?: ClassData,
  editMode?: boolean
}

export interface CreateSetInputs {
  name: string,
}

export function CreateSetUI({ user, onSubmit, initialData, editMode }: CreateSetUIProps) {

  const globalTheme = useTheme();
  const globalStyles = useStyles(globalTheme);
  const [categories, setCategories] = useState<string[]>(initialData ? initialData.setCategories : []);
  const [categoryInput, setCategoryInput] = useState('');

  const { formState, setValue, control, watch, handleSubmit } = useForm<CreateSetInputs>({
    defaultValues: initialData ? {
      name: initialData.name,
    } : {
      name: '',
    }
  });


  const nameError = formState.errors.name?.type === 'required';
  const watchName = watch('name');
  const [bottomScrollOffset, setBottomScrollOffset] = useState(0);
  
  const saveButtonEnabled = editMode ? formState.isDirty : !!watchName;


  return (
    <SafeAreaView style={globalStyles.safeAreaContainer} edges={['bottom', 'left', 'right']} >
      <AvoidKeyboardScrollLayout bottomOffset={bottomScrollOffset}>

        <Text style={globalStyles.p}>Set Type</Text>
        <Text style={globalStyles.p}>Set Name</Text>

        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput style={[
              globalStyles.textInput,
              globalStyles.p,
              nameError && globalStyles.invalidText,
              { marginBottom: 0 }
            ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder='"ENGR 100"' />
          )} />

        {nameError && <Text style={[
          globalStyles.caption,
          { color: globalTheme.warningColor }
        ]}>Course name is required</Text>}

        <Text style={[globalStyles.p, { marginTop: globalTheme.spacing }]}>Categories</Text>

       
      </AvoidKeyboardScrollLayout>

      <AvoidKeyboardFloating bottomOffset={10} giveHeight={(offset) => setBottomScrollOffset(offset)}>
        <CreateButton isEnabled={saveButtonEnabled} onPress={() => {
          handleSubmit(onSubmit)().catch(error => {
            console.error('error submitting:', error)
          })
        }}>
          {editMode ? 'SAVE CHANGES' : 'CREATE'}
        </CreateButton>
      </AvoidKeyboardFloating>
    </SafeAreaView>

  );
}


export function CreateButton({ isEnabled, onPress, children }: PropsWithChildren<{ isEnabled: boolean, onPress: () => void }>) {
  
  const globalTheme = useTheme();
  const globalStyles = useStyles(globalTheme);
  const textColor = isEnabled ? '#000' : '#aaaaaa';
  return (
    <TouchableHighlight
      style={[
        globalStyles.circleButton,
        globalStyles.shadow,
        { aspectRatio: undefined },
      ]}
      onPress={onPress}
      underlayColor="rgba(0,0,0,0.4)"
    >
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: isEnabled ? '#23D160' : globalTheme.darkGrey,
        borderRadius: 100,
        paddingHorizontal: 15,
        paddingVertical: 10
      }}>
        <Text style={{ height: 24, width: 24, marginRight: globalTheme.spacing / 2 }}>
          <Svg height={24} width={24} viewBox="0 0 24 24" >
            <Path fill={textColor} d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
          </Svg>
        </Text>
        <Text style={
          [
            globalStyles.smallP,
            { color: textColor, fontWeight: 'bold' }
          ]
        }>
          {children}
        </Text>
      </View>
    </TouchableHighlight>
  );
}