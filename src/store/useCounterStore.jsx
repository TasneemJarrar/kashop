import { create } from "zustand";


const useCounterStore = create((set) =>({
  counter: 0,
  Increment:()=>{
    set((state) => ({
      counter: state.counter + 1
    }))
  }
}));
export default useCounterStore;