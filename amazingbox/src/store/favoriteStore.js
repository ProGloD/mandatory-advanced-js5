import { BehaviorSubject } from "rxjs";

export const favorite$ = new BehaviorSubject(JSON.parse(window.localStorage.getItem('favorite') ||
  '[]'));

export function updateFavorite(newFavorite) {
  if (!newFavorite) {
    window.localStorage.removeItem('favorite');
  } else {
      window.localStorage.setItem('favorite', JSON.stringify(newFavorite));
  }

  favorite$.next(newFavorite);
}