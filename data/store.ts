import create from 'zustand'
import { User } from 'firebase/auth'
import { ClassData } from './types'
import { persist } from "zustand/middleware"
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Store {
  user: User | null,
  setUser: (user: User | null) => void,
  userLoading: boolean,
  setUserLoading: (userLoading: boolean) => void,
  classes: ClassData[] | null,
  classesLoading: boolean,
  localClasses: ClassData[],
  setLocalClasses: (classData: ClassData[]) => void
}

// null values in state means that the data has not yet been loaded

export const useStore = create<Store>(persist<Store>(set => ({
  user: null,
  setUser: (_user) => set(state => ({ user: _user })),
  userLoading: true,
  setUserLoading: (_userLoading) => set(state => ({ userLoading: _userLoading })),
  classes: null,
  classesLoading: true,
  localClasses: [],
  setLocalClasses: (classData) => set(state => ({ localClasses: classData }))
}), {
  name: 'store',
  getStorage: () => AsyncStorage
}));



