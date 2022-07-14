import create from 'zustand';

interface UIStore {
  sidebarIsOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarIsOpen: true,
  openSidebar: () => set(() => ({ sidebarIsOpen: true })),
  closeSidebar: () => set(() => ({ sidebarIsOpen: false })),
}));
