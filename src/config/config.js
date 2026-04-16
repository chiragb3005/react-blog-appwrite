const requiredEnv = (key) =>{
    const value = import.meta.env[key]
    if(!value) {
        throw new Error ("problem in fetch of the value")
    }
    return value;
}



const conf = {
    appwriteUrl: requiredEnv(VITE_APPWRITE_URL),
    appwriteProjectId: requiredEnv(VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: requiredEnv(VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: requiredEnv(VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: requiredEnv(VITE_APPWRITE_BUCKET_ID)
}

export default conf;