<template>
  <div class="settings-container rounded-3 shadow-sm">
    <div v-if="!user" class="text-center py-5">
      <h2 class="fw-bold mb-3">You are not logged in</h2>
      <p class="text-muted mb-4">Please log in to access your settings.</p>
      <router-link :to="{ name: 'Login', params: {} }" class="btn btn-primary">
        Go to Login
      </router-link>
    </div>

    <div v-else>
      <div class="user-info d-flex align-items-center">
        <div class="position-relative me-4">
          <img
            :src="avatarPreview || 'https://via.placeholder.com/150'"
            alt="User Avatar"
            class="user-avatar rounded-circle border border-2 border-primary"
            style="width: 150px; height: 150px; object-fit: cover"
          />
          <!-- <button
          @click="openAvatarUpload"
          class="btn btn-sm btn-primary position-absolute bottom-0 end-0 rounded-circle"
          style="width: 40px; height: 40px"
        >
          <i class="material-symbols-rounded">edit</i>
        </button> -->
        </div>
        <div class="user-details">
          <h2 class="fw-bold mb-1">{{ user.displayName }}</h2>
          <p class="text-muted mb-3">{{ user.email }}</p>
          <div class="d-flex gap-2">
            <button @click="openAvatarUpload" class="btn btn-outline-primary">
              Change Avatar
            </button>
            <button @click="handleLogout" class="btn btn-danger">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
    <input
      type="file"
      ref="avatarInput"
      @change="handleAvatarChange"
      accept="image/*"
      class="d-none"
    />
  </div>
</template>

<script>
import { useAuth } from "@/composables/useAuth";
import { ref, computed } from "vue";
import { useStore } from "@/composables/useStore";

export default {
  setup() {
    const { getUser, signOut } = useAuth();
    const { uploadAvatar } = useStore();
    const { user } = getUser();
    const avatarInput = ref(null);
    const avatarPreview = computed(() => user.value?.photoURL || null);

    const openAvatarUpload = () => {
      avatarInput.value.click();
    };

    const handleLogout = () => {
      signOut();
    };

    const handleAvatarChange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const croppedImage = await cropImage(file, 256, 256);
        avatarPreview.value = URL.createObjectURL(croppedImage);
        const fileExtension = file.name.split(".").pop();
        const newFileName = `avatar.${fileExtension}`;
        const renamedFile = new File([croppedImage], newFileName, {
          type: croppedImage.type,
        });
        uploadAvatar(renamedFile);
      }
    };

    const cropImage = (file, width, height) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = width;
            canvas.height = height;

            const aspectRatio = img.width / img.height;
            let newWidth = width;
            let newHeight = height;
            let offsetX = 0;
            let offsetY = 0;

            if (aspectRatio > 1) {
              newWidth = height * aspectRatio;
              offsetX = (newWidth - width) / 2;
            } else {
              newHeight = width / aspectRatio;
              offsetY = (newHeight - height) / 2;
            }

            ctx.drawImage(img, -offsetX, -offsetY, newWidth, newHeight);
            canvas.toBlob(resolve, "image/jpeg", 0.8);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    };

    return {
      user,
      avatarInput,
      avatarPreview,
      openAvatarUpload,
      handleAvatarChange,
      handleLogout,
    };
  },
};
</script>
