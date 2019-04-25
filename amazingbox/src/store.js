import { BehaviorSubject } from "rxjs";


export const token$ = new BehaviorSubject(window.localStorage.token || null);

export function updateToken(newToken){
    window.localStorage.setItem("token",newToken);
    token$.next(newToken);
}

export function clearToken(){
    window.localStorage.removeItem("token");
    token$.next(null);
}