import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../firebase";

export class AuthService {
  auth;
  constructor() {
    this.auth = getAuth();
  }
  async createAccount({ email, password, username }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      await db.collection("users").doc(email).set({
        user_uid: userCredential.user.uid,
        email,
        username,
        Authorized: false,
      });

      return userCredential.user;
    } catch (error) {
      console.log("error at create account ", error);
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password).then(
        (userCredential) => userCredential.user
      );
    } catch (error) {
      console.log(`error at authlogin ${error.message}`);
      throw new Error("Invalid Email or Password");
    }
  }
  async getUserInfo(userEmail) {
    try {
      const userdata = await db.collection("users").doc(userEmail).get();
      return userdata.data();
    } catch (error) {
      console.log("error at getuserinfo ", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
