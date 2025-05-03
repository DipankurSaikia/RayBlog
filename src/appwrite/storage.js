import { storage } from "./config";
import conf from "../conf/conf";
import { ID } from "appwrite";

const st = {};

const buckets = [
    {
        id: conf.appwriteBucketId1,
        name: "blogImages",
    },
    {
        id: conf.appwriteBucketId2,
        name: "profileImages",
    },
];

buckets.forEach((bucket) => {
    st[bucket.name] = {
        create: (payload,id = ID.unique(), permissions ) =>
            storage.createFile(
                bucket.id,
                id,
                payload,
                permissions
            ),
        update: (id, payload, permissions) =>
            storage.updateFile(
                bucket.id,
                id,
                payload,
                permissions
            ),
        delete: (id) => storage.deleteFile(bucket.id, id),

        list: (queries = []) =>
            storage.listFiles(bucket.id, queries),

        get: (id) => storage.getFile(bucket.id, id),
        getPreview: (id) => storage.getFilePreview(bucket.id, id),
    };
});

export default st;