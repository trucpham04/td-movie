import { firebaseAuth, firebaseStorage } from "@/configs/firebase";
import { useAuth } from "./useAuth";

export function useStore() {
  const { getUser } = useAuth();
  const { user } = getUser();

  async function uploadAvatar(file) {
    const storageRef = firebaseStorage.ref(
      `avatars/${user.value.uid}/${file.name}`
    );
    const uploadTask = await storageRef.put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        firebaseAuth.currentUser.updateProfile({
          photoURL: url,
        });
        // user.value.photoURL = url;
      });
    });

    return uploadTask;
  }

  return {
    uploadAvatar,
  };
}
