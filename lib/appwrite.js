import {
  Account,
  Avatars,
  Client,
  ID,
  Databases,
  Query,
} from "react-native-appwrite";
// import SignIn from "../app/(auth)/sign-in";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.nab.aora",
  projectId: "666800f10039b163ab35",
  databaseId: "666802f2002686a7a8f2",
  userCollectionId: "66680381000275927edd",
  videoCollectionId: "666803af00272cb50432",
  storageId: "666807570039704bb973",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

//function yo revoke all sessions
export const revokeAllSessions = async () => {
  try {
    await account.deleteSessions();
    console.log("All sessions revoked successfully.");
  } catch (error) {
    console.error("Failed to revoke sessions:", error);
  }
};

// Register and Sign in a User
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
  } catch (error) {
    console.log(error);
  }
};
