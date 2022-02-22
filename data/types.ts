import { ColorValue } from "react-native"

export interface ClassData {
  name: string,
  id: string,
  color?: string,
  lessons: LessonData[],
  isPublic: boolean,
  setCategories: string[],
  order: number,
  school?: string
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