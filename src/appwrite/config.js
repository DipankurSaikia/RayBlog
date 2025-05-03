import { Client, Databases, Account, Storage} from 'appwrite';
import conf from '../conf/conf';

const client = new Client();

client.setEndpoint(conf.appwriteUrl) // Your API Endpoint
.setProject(conf.appwriteProjectId); 

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client)

export {client,account, databases, storage}



