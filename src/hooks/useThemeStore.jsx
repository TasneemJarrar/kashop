import { create } from "zustand";

const useThemeStore = create((set) =>({
  mode: localStorage.getItem('mode') || 'light',

  toggleMode: ()=>{
    set((state)=>{
      const newMode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mode', newMode);
      return { mode: newMode };
    })
  },


}));

export default useThemeStore;