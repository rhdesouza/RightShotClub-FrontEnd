import { Injectable } from '@angular/core';

const TOKEN = 'TOKEN';
const ROLES = 'ROLES';

@Injectable({
    providedIn: 'root'
})
export class StorageComponent {
    sessionStorage!: WindowSessionStorage;

    constructor() {
    }

    public setToken(token: any) {
        sessionStorage.setItem(TOKEN, `Bearer ${token}`);
    }

    public getToken(): string {
        return sessionStorage.getItem(TOKEN) || '';
    }

    public setRoles(roles: any) {
        sessionStorage.setItem(ROLES, roles);
    }

    public getRoles() {
        return sessionStorage.getItem(ROLES) || '';
    }

    public removeSession() {
        sessionStorage.clear();
    }

}