import { ColorValue } from "react-native"

export interface ClassData {
  name: string,
  id: string,
  color: ColorValue,
  lessons: LessonData[],
  isPublic: boolean,
  setCategories: string[]
}

export interface LessonData {
  name: string,
  id: string,
  order: number,
  sets: SetData[]
}

export interface SetData {
  name: string,
  id: string,
  order: number,
  category: string,
  body: string,
  relatedIDs: string[]
}