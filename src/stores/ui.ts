import create from 'zustand';

interface UIStore {
  sidebarIsOpen: boolean;
  orderPreviewIsOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  openOrderPreview: () => void;
  closeOrderPreview: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarIsOpen: false,
  orderPreviewIsOpen: true,
  openSidebar: () => set(() => ({ sidebarIsOpen: true })),
  closeSidebar: () => set(() => ({ sidebarIsOpen: false })),
  closeOrderPreview: () => set(() => ({ orderPreviewIsOpen: false })),
  openOrderPreview: () => set(() => ({ orderPreviewIsOpen: true })),
}));
