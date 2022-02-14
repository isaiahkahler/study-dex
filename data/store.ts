import create from 'zustand'
import { User } from 'firebase/auth'
import { ClassData } from './types'

interface Store {
  user: User | null,
  setUser: (user: User | null) => void,
  classes: ClassData[] | null,
  classesLoading: boolean
}

// null values in state means that the data has not yet been loaded

export const useStore = create<Store>(set => ({
  user: null,
  setUser: (_user) => set(state => ({user: _user})),
  classes: null,
  classesLoading: true
}));

