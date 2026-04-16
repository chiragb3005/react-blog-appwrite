    import { buildCreateApi } from "@reduxjs/toolkit/query";
    import conf from "../config/config";
    import { Client, ID, Databases, Storage, Query } from "appwrite";

    export class authService{
        client = new Client();
        databases;
        bucket;
        
        constructor(){
            this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.databases = new Databases(this.client)
            this.bucket = new Storage(this.client)
        }

        // for creating an post after login
        async createPost({title, slug, content, featuredImage, status, userId}) {
            try {
                return await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                        userId,
                    }

                )
            } 
            catch (error) {
                throw error;    
            }
        }

        // updating an post
        async updatePost(slug, {title, content, featuredImage, status}) {
            try {
                await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                    }
                )
            } 
            catch (error) {
                throw error;    
            }
        }

        // for deleting a post
        async deletePost(slug) {
            try {
                await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                )
                return true
            } 
            catch (error) {
                console.log("error occured !!!...")  
                return false
            }
        }

        // to get a post on the blog
        async getPost(slug) {
            try {
                await this.databases.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                )
                return true
            } 
            catch (error) {
                console.log("Error Occured !!!... ")
                return false;    
            }
        }

        // making an query to find post who are active
        // status should be active
        async getPosts(queries = [Query.equal('status', 'active')]) {
            try {
                await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    queries,
                )
            } 
            catch (error) {
                console.log("Error Occured !!!...")
                return false;    
            }
        }

        // file uploading service
            async uploadFile(file) {
                try {
                    await this.bucket.createFile(
                        conf.appwriteBucketId,
                        ID.unique,
                        file                
                    )
                    return true 
                } 
                catch (error) {
                    console.log("Error Occured !!!...")
                    return false;    
                }
            }
            // later i have to store and pass this unique id to deleteFile for deleting the post

            // for deleting an file
            async deleteFile(fileId) {
                try {
                    await this.bucket.deleteFile(
                        conf.appwriteBucketId,
                        fileId,
                        // here we are getting file id once someone created an file
                        // after creating unique id will be genereated and then will be use here
                    )
                } 
                catch (error) {
                    console.log("Error Occured !!!...")
                    return false;    
                }
            }

            // for preview of the file
            getFilePreview(fileId){
                return this.bucket.getFilePreview(
                    conf.appwriteBucketId,
                    fileId,
                )
            }
    }

    export const service = new authService;

    export default service;