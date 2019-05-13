import { BehaviorSubject } from "rxjs";

export const path$ = new BehaviorSubject(
  window.localStorage.getItem("path") || ""
);

export function updatePath(newPath) {
  if (!newPath) {
    window.localStorage.removeItem("path");
  } else {
    window.localStorage.setItem("path", newPath);
  }

  path$.next(newPath);
}
