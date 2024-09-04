import { firebaseFirestore } from "@/configs/firebase";
import { useAuth } from "./useAuth";
import { ref } from "vue";

const favoritesMovies = ref(null);
const savedMovies = ref(null);
const { getUser } = useAuth();
const { user } = getUser();

let unsubscribeFavorites = null;
let unsubscribeSaved = null;

export function useFirestore() {
  return {
    favoritesMovies,
    savedMovies,
    addToLibrary,
    removeFromLibrary,
    getFavoritesMovies,
    getSavedMovies,
  };
}

function getFavoritesMovies() {
  return new Promise((resolve, reject) => {
    if (unsubscribeFavorites) {
      unsubscribeFavorites();
    }

    unsubscribeFavorites = firebaseFirestore
      .collection("library")
      .doc(user.value.uid)
      .collection("favorites")
      .onSnapshot(
        (snapshot) => {
          favoritesMovies.value = snapshot.docs;
          resolve();
        },
        (err) => {
          reject(err);
        }
      );

    return () => {
      if (unsubscribeFavorites) {
        unsubscribeFavorites();
        // console.log("Đã dừng việc lắng nghe db.");
      }
    };
  });
}

function getSavedMovies() {
  return new Promise((resolve, reject) => {
    if (unsubscribeSaved) {
      unsubscribeSaved();
    }

    unsubscribeSaved = firebaseFirestore
      .collection("library")
      .doc(user.value.uid)
      .collection("saved")
      .onSnapshot(
        (snapshot) => {
          savedMovies.value = snapshot.docs;
          resolve();
          // console.log("Updated.");
        },
        (err) => {
          reject(err);
        }
      );

    return () => {
      if (unsubscribeSaved) {
        unsubscribeSaved();
        // console.log("Đã dừng việc lắng nghe db.");
      }
    };
  });
}

async function addToLibrary(collection, type, tmdbID, title, poster_url) {
  try {
    await firebaseFirestore
      .collection("library")
      .doc(user.value.uid)
      .collection(collection)
      .add({
        type: type,
        tmdbID: tmdbID,
        title: title,
        poster_url: poster_url,
      });
  } catch (err) {
    console.log(err.message);
  }
}

async function removeFromLibrary(collection, tmdbID) {
  try {
    var query = firebaseFirestore
      .collection("library")
      .doc(user.value.uid)
      .collection(collection)
      .where("tmdbID", "==", tmdbID);

    await query.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  } catch (err) {
    console.log(err.message);
  }
}
