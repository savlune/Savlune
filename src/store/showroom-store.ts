import { create } from 'zustand';

interface ShowroomState {
  selectedSlug: string;
  selectedColorId: string | null;
  setSelectedSlug: (slug: string) => void;
  setSelectedColorId: (colorId: string | null) => void;
}

export const useShowroomStore = create<ShowroomState>((set) => ({
  selectedSlug: 'destinator',
  selectedColorId: null,
  setSelectedSlug: (slug) => set({ selectedSlug: slug, selectedColorId: null }),
  setSelectedColorId: (colorId) => set({ selectedColorId: colorId }),
}));
