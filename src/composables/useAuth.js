import { firebaseAuth } from "@/configs/firebase";
import { ref } from "vue";
// import { useRouter } from "vue-router";

// const router = useRouter();

const signInError = ref(null);
const signUpError = ref(null);
const isPending = ref(false);
const user = ref(firebaseAuth.currentUser);

export function useAuth() {
  return {
    signInError,
    signUpError,
    isPending,
    signIn,
    signUp,
    signOut,
    getUser,
    user,
  };
}

firebaseAuth.onAuthStateChanged(function (_user) {
  if (_user) user.value = _user;
});

export function getUser() {
  return { user };
}

async function signOut() {
  try {
    await firebaseAuth.signOut();

    return null;
  } catch (err) {
    console.log(err.message);
  }
}

async function signIn(email, password) {
  signInError.value = null;
  isPending.value = true;

  try {
    await firebaseAuth.signInWithEmailAndPassword(email, password);
    // router.push({ name: "Home", params: {} });
  } catch (err) {
    signInError.value = err.message;
  } finally {
    isPending.value = false;
  }
}

async function signUp(fullname, email, password) {
  signUpError.value = null;
  isPending.value = true;

  try {
    const response = await firebaseAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    await firebaseAuth.currentUser.updateProfile({ displayName: fullname });

    if (!response) console.log("Can not create a new user");

    return response;
  } catch (err) {
    signUpError.value = err.message;
  } finally {
    isPending.value = false;
  }
}
