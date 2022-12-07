import { Injectable } from "@angular/core";

@Injectable()

export class LocalStorageService {
    [x: string]: any;
    constructor() { }

    setToStorage(key: any, value: any) {
        let ixAuthServer: any = JSON.parse(localStorage.getItem('ixauthServer'));
        if (!ixAuthServer) {
            ixAuthServer = {};
        }
        ixAuthServer[key] = value;
        localStorage.setItem('ixauthServer', JSON.stringify(ixAuthServer));
    }

    getFromStorage(key: any) {
        let ixAuthServer: any = JSON.parse(localStorage.getItem('ixauthServer'));
        if (ixAuthServer && ixAuthServer.hasOwnProperty(key)) {
            const val = ixAuthServer[key];
            return val;
        } else {
            return '';
        }
    }

    clear() {
        const temp = {};
        localStorage.setItem('ixauthServer', JSON.stringify(temp));
    }

    remove(key: any) {
        let ixAuthServer: any = JSON.parse(localStorage.getItem('ixauthServer'));
        if (ixAuthServer && ixAuthServer.hasOwnProperty(key)) {
            delete ixAuthServer[key];
            localStorage.setItem('ixauthServer', JSON.stringify(ixAuthServer));
        } 
    }

}
