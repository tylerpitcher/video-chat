import create from 'zustand';

const user = JSON.parse(localStorage.getItem('user'));

const useUserStore = create((set) => ({
  user,
  loading: false,
  darkMode: false,
  setUser: (user) => set(() => ({ user })),
  setLoading: (loading) => set(() => ({ loading })),
  changeMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export default useUserStore;
