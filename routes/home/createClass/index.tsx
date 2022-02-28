import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useLayoutEffect } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { uid } from "uid";
import { CreateClassProps } from "..";
import { globalStyles, globalTheme } from "../../../components/styles/globalStyles";
import { db } from "../../../data/firebase";
import { useStore } from "../../../data/store";
import { ClassData } from "../../../data/types";
import { CreateClassInputs, CreateClassUI } from "./createClass";

export function CreateClass({ navigation, route }: CreateClassProps) {

  const user = useStore(state => state.user);
  const localClasses = useStore(state => state.localClasses);
  const setLocalClasses = useStore(state => state.setLocalClasses);
  const initialData = route.params?.initialData;
  const editMode = route.params?.editMode;
  const classes = useStore(state => state.classes);

  useLayoutEffect(() => {
    if (!editMode) {
      navigation.setOptions({ headerTitle: 'Create a new course' })
      return;
    }
    if (!initialData) return;
    navigation.setOptions({
      headerTitle: `Edit ${initialData.name}`
    })
  }, [editMode])


  const handleSubmit = (data: CreateClassInputs) => {
    if (!user) return;

    const result: ClassData = {
      id: uid(),
      name: data.name,
      isPublic: data.isPublic ? true : false,
      lessons: [],
      setCategories: data.categories ? data.categories : [],
      color: data.color,
      order: user.isAnonymous ? localClasses.length : classes ? classes.length : 0
    };

    if (editMode && initialData) {
      if (user.isAnonymous) {
        const newClasses = localClasses.map(_class => _class.id === initialData.id ? { ...initialData, ...result } : _class)
        setLocalClasses(newClasses);
      } else {
        // update firestore
      }

      navigation.goBack();
      return;
    }

    if (user.isAnonymous) {
      setLocalClasses([
        ...localClasses,
        result
      ])
    } else {
      setDoc(doc(db, 'users', result.id), result);
    }
    navigation.goBack();
  }

  if (!user) return <View />;

  return (
    <CreateClassUI user={user} onSubmit={handleSubmit} initialData={initialData} editMode={editMode} />
  )

}
