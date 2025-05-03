import { databases } from "./config";
import conf from "../conf/conf";
import { ID } from "appwrite";

const db = {};

const collections = [
    {
        dbId: conf.appwriteDatabaseId,
        id: conf.appwriteCollectionId1,
        name: "articles",
    },
    {
        dbId: conf.appwriteDatabaseId,
        id: conf.appwriteCollectionId2,
        name: "userProfile",
    },
];

collections.forEach((col) => {
    db[col.name] = {
        create: (payload, id = ID.unique(), permissions) =>
            databases.createDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permissions
            ),
        update: (id, payload, permissions) =>
            databases.updateDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permissions
            ),
        delete: (id) => databases.deleteDocument(col.dbId, col.id, id),

        list: (queries = []) =>
            databases.listDocuments(col.dbId, col.id, queries),

        get: (id) => databases.getDocument(col.dbId, col.id, id),
    };
});

export default db;