import conf from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    // have to keep account prop only
    // we first have to make endpoint and setpoint in the client before making the account
    account;

    constructor(setPoint, endPoint){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account (this.client);
    }

    async createAccount(email, password, name) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                // call another method
                return this.login({email, password})
                // as account is made im directly calling logIn so he gets loggedIn
            }
            else {
                return userAccount
            }
        } 
        catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } 
        catch (error) {
            throw error;    
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } 
        catch (error) {
            throw error;    
        }
        return null
        // null in case both try catch fails
    }

    async getCurrentUSer() {
        try {
            return await this.account.get()
        } 
        catch (error) {
            throw error;    
        }
        return null 
        // in case try and catch both not able to return something
    }

    
}

const authService = new AuthService()

export default authService;



// this is complete backend
// if later want to change the service of backend 
// simply change my this file
// frontend only gonna call the methods i declare here but never knows what happening behind the scenes