import { create } from "zustand";

type WishlistState = {
	wishlist: Course[];
	addToWishlist: (course: Course) => void;
	removeFromWishlist: (courseId: number) => void;
	isInWishlist: (courseId: number) => boolean;
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
	wishlist: [],
	addToWishlist: (course) => {
		set((state) => ({ wishlist: [...state.wishlist, course] }));
	},
	removeFromWishlist: (courseId) => {
		set((state) => ({ wishlist: state.wishlist.filter((el) => el.id !== courseId) }));
	},
	isInWishlist: (courseId) => get().wishlist.some((el) => el.id === courseId),
}));
