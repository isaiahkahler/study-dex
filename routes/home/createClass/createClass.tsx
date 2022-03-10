import { User } from "firebase/auth"
import { PropsWithChildren, useEffect, useState } from "react"
import { Controller, useController, useForm } from "react-hook-form"
import { Switch, Text, TextInput, TouchableHighlight, View } from "react-native"
import Svg, { Path } from "react-native-svg"
import { getColor, getDarkColor, getLightColor } from "../../../components/styles/colors"
import { globalStyles, globalTheme } from "../../../components/styles/globalStyles"
import { Chip } from "../../../components/ui/chip"
import { ClassData } from "../../../data/types"
import { AvoidKeyboardFloating, AvoidKeyboardScrollLayout } from "../../../components/ui/avoidKeyboard"
import { SafeAreaView } from "react-native-safe-area-context";

interface CreateClassUIProps {
  user: User,
  onSubmit: (data: CreateClassInputs) => void,
  initialData?: ClassData,
  editMode?: boolean
}

export interface CreateClassInputs {
  name: string,
  categories?: string[],
  isPublic?: boolean,
  color?: string,
  school?: string
}

export function CreateClassUI({ user, onSubmit, initialData, editMode }: CreateClassUIProps) {

  const [categories, setCategories] = useState<string[]>(initialData ? initialData.setCategories : []);
  const [categoryInput, setCategoryInput] = useState('');

  const { formState, setValue, control, watch, handleSubmit } = useForm<CreateClassInputs>({
    defaultValues: initialData ? {
      name: initialData.name,
      categories: initialData.setCategories,
      isPublic: initialData.isPublic,
      color: initialData.color,
      school: initialData.school
    } : {
      name: '',
      categories: [],
      isPublic: !user.isAnonymous
    }
  });

  const categoriesController = useController({
    name: 'categories',
    control: control,
    rules: { required: false }
  });
  const isPublicController = useController({
    name: 'isPublic',
    control: control,
    rules: {
      required: false,
      validate: (value) => (value !== undefined && value !== null),
    }
  });
  const colorController = useController({
    name: 'color',
    control: control,
    rules: { required: false }
  });

  const nameError = formState.errors.name?.type === 'required';
  const publicDisabled = user.isAnonymous;
  const watchName = watch('name');
  const watchSchool = watch('school');
  const [bottomScrollOffset, setBottomScrollOffset] = useState(0);

  const saveButtonEnabled = editMode ? formState.isDirty : !!watchName;

  useEffect(() => {
    if(watchSchool === '') {
      setValue('school', undefined);
    }
  }, [watchSchool])

  useEffect(() => {
    categoriesController.field.onChange(categories);
  }, [categories]);

  const handleSubmitCategory = (category: string) => {
    if (category === '') {
      setCategoryInput('');
      return;
    }
    if (categories.includes(category)) {
      setCategoryInput('');
      return;
    }
    setCategoryInput('');
    setCategories([...categories, category]);
  }

  return (
    <SafeAreaView style={globalStyles.safeAreaContainer} edges={['bottom', 'left', 'right']} >
      <AvoidKeyboardScrollLayout bottomOffset={bottomScrollOffset}>

        <Text style={globalStyles.p}>Class/Course Name*</Text>

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

        <View>
          <TextInput
            style={[
              globalStyles.textInput,
              globalStyles.p,
            ]}
            value={categoryInput}
            onSubmitEditing={(event) => handleSubmitCategory(event.nativeEvent.text.trim())}
            onEndEditing={(event) => handleSubmitCategory(event.nativeEvent.text.trim())}
            onChangeText={text => setCategoryInput(text)}
            placeholder="vocab, notes, readings..." />
          <View style={{ position: 'absolute', right: 0, marginRight: 10, marginTop: 10 }}>
            <Svg viewBox="0 0 24 24" width={30} height={30}>
              <Path fill="#000" d="M19,7V11H5.83L9.41,7.41L8,6L2,12L8,18L9.41,16.58L5.83,13H21V7H19Z" />
            </Svg>
          </View>
        </View>

        <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
          {categories.map((category, index) => <Text
            key={category}
            style={{
              marginBottom: globalTheme.spacing / 2,
              marginRight: globalTheme.spacing / 2
            }} >
            <Chip index={index} text={category} onClose={() => setCategories([...categories].filter(_cat => _cat !== category))} />
          </Text>
          )}
        </View>

        <Text style={globalStyles.p}>Course Color</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: globalTheme.spacing, marginTop: globalTheme.spacing / 4 }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(colorIndex => {
            const color = getColor(colorIndex);
            const underlayColor = getDarkColor(colorIndex);

            return <TouchableHighlight
              key={colorIndex}
              style={{
                width: 40,
                height: 40,
                backgroundColor: color,
                borderWidth: colorController.field.value === color ? 5 : 0,
                borderColor: '#000'
              }}
              underlayColor={underlayColor}
              onPress={() => colorController.field.value === color ? colorController.field.onChange('') : colorController.field.onChange(color)}>
              <View></View>
            </TouchableHighlight>;
          })}
        </View>

        <Text style={globalStyles.p}>School Name</Text>

        <Controller control={control} name='school' render={({ field: { onChange, onBlur, value } }) =>
          <TextInput style={[globalStyles.textInput, globalStyles.p, { marginVertical: 0 }]} value={value} onChangeText={onChange} onBlur={onBlur} placeholder='"University of Michigan"' />
        } />

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: globalTheme.spacing,
        }}>
          <Text style={[globalStyles.p, { color: publicDisabled ? globalTheme.darkerGrey : undefined, }]}>
            Make this course public?*
          </Text>
          <Switch value={isPublicController.field.value} disabled={publicDisabled} onValueChange={() => { isPublicController.field.onChange(!isPublicController.field.value) }} />
        </View>

        {!publicDisabled && <Text>Anyone can view this course.</Text>}

        {publicDisabled && <Text>You need an account to make your courses public. Sign up for free.</Text>}

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