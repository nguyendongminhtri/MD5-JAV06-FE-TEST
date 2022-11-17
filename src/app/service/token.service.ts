import { Injectable } from '@angular/core';
const TOKEN_KEY = 'Token_Key';
const NAME_KEY = 'Name_Key';
const AVATAR_KEY = 'Avatar_Key';
const ROLE_KEY = 'Role_Key';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public roles = [];
  constructor() { }
  public setToken(token: string){
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,token);
  }
  public getToken(): string {
    return window.localStorage.getItem(TOKEN_KEY);
  }
  public setName(name: string){
    window.localStorage.removeItem(NAME_KEY);
    window.localStorage.setItem(NAME_KEY, name)
  }
  public getName(): string {
    return window.localStorage.getItem(NAME_KEY);
  }
  public setAvatar(avatar: string){
    localStorage.removeItem(AVATAR_KEY);
    localStorage.setItem(AVATAR_KEY, avatar);
  }
  public getAvatar(): string{
    return localStorage.getItem(AVATAR_KEY);
  }
  public setRole(roles: string[]){
    localStorage.removeItem(ROLE_KEY);
    localStorage.setItem(ROLE_KEY, JSON.stringify(roles))
  }
  public getRole(): string[]{
    this.roles = [];
    if(this.getToken()){
      JSON.parse(localStorage.getItem(ROLE_KEY)).forEach(role =>{
        this.roles.push(role.authority)
      })
    }
    return this.roles;
  }
}
