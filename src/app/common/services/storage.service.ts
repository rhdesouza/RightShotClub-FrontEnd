import { Injectable } from "@angular/core";

const TOKEN_WSO2 = 'TOKEN_WSO2';
const TOKEN_SSC = 'TOKEN_SSC';
const ID_TOKEN_CLAINS_OBJ = 'id_token_claims_obj';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    sessionStorage!: WindowSessionStorage;

    constructor() {
    }

    public setTokenWSO2(token: any) {
        sessionStorage.setItem(TOKEN_WSO2, token);
    }

    public getTokenWSO2(): string | null {
        return sessionStorage.getItem(TOKEN_WSO2);
    }

    public setTokenSSC(token: any) {
        sessionStorage.setItem(TOKEN_SSC, token);
    }

    public getTokenSSC(): any {
        return sessionStorage.getItem(TOKEN_SSC);
    }

    public getIdTokenClainsObj(): any {
        let obj = sessionStorage.getItem(ID_TOKEN_CLAINS_OBJ);
        return JSON.parse(obj!);
    }

    public removeSession() {
        sessionStorage.clear();
    }

}