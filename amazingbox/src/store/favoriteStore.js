import { BehaviorSubject } from "rxjs";

export const favorite$ = new BehaviorSubject(window.localStorage.getItem('favorite') ||
  null);

export function updateFavorite(newFavorite) {
  if (!newFavorite) {
    window.localStorage.removeItem('favorite');
  } else {
      const favoriteArr = [...window.localStorage.getItem('favorite'), newFavorite]
      window.localStorage.setItem('favorite', favoriteArr);
  }

  favorite$.next(newFavorite);
}