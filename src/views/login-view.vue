<template>
  <div class="px-5 mx-auto" style="max-width: 32rem">
    <form @submit.prevent="onSubmit" novalidate>
      <div class="mb-3" :class="emailChecked ? 'was-validated' : ''">
        <label class="form-label" for="email-input">Email</label>
        <input
          v-model="email"
          class="form-control"
          type="email"
          required
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          @keyup="emailChecked = true"
          autofocus
          name=""
          id="email-input"
        />
        <div class="invalid-feedback">
          Please enter a valid email, ex: example@mail.com
        </div>
      </div>

      <div class="mb-3" :class="passwordChecked ? 'was-validated' : ''">
        <div class="d-flex justify-content-between">
          <label class="form-label" for="password-input">
            <span>Password</span>
          </label>
          <span class="">
            <!-- <router-link to="/">Forgot password?</router-link> -->
            <!-- <a href="#" class="link-primary link-underline-opacity-0">
              Forgot password?
            </a> -->
          </span>
        </div>
        <div class="input-group">
          <input
            v-model="password"
            class="form-control"
            :type="isShowPassword ? 'text' : 'password'"
            required
            @keyup="passwordChecked = true"
            name=""
            id="password-input"
          />
          <span
            class="input-group-text bg-transparent text-secondary"
            @click="toggleShowPassword"
            style="
              cursor: pointer;
              user-select: none;
              border-radius: 0 8px 8px 0;
            "
          >
            <i class="material-symbols-rounded">
              {{ isShowPassword ? "visibility_off" : "visibility" }}
            </i>
          </span>
          <div class="invalid-feedback">Please enter a password.</div>
        </div>
        <div class="form-text text-center text-danger">
          {{ signInError ? signInError : "" }}
        </div>
      </div>

      <div class="mb-3">
        <button
          type="submit"
          class="btn btn-primary btn-lg w-100 mt-4"
          :disabled="isPending"
          style="height: 48px"
        >
          Sign in{{ isPending ? "..." : "" }}
        </button>
      </div>

      <div class="text-center">
        <span>
          Don't have a account?
          <router-link :to="{ name: 'Register', params: {} }" class="m-1">
            Sign up
          </router-link>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { firebaseAuth } from "@/configs/firebase";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";

export default {
  setup() {
    const router = useRouter();
    const { signInError, isPending, signIn } = useAuth();

    const email = ref("");
    const password = ref("");

    const emailRegex = new RegExp("[^@\\s]+@[^@\\s]+\\.[^@\\s]+");
    const emailChecked = ref(false);
    const passwordChecked = ref(false);
    const isShowPassword = ref(false);

    if (firebaseAuth.currentUser) {
      router.push({ name: "Home", params: {} });
    }

    function toggleShowPassword() {
      isShowPassword.value = !isShowPassword.value;
    }

    async function onSubmit() {
      emailChecked.value = true;
      passwordChecked.value = true;

      if (emailRegex.test(email.value)) {
        await signIn(email.value, password.value);

        if (!signInError.value) router.push({ name: "Home", params: {} });
      } else {
        console.log("Info is invalid.");
      }
    }

    return {
      email,
      emailChecked,
      password,
      passwordChecked,
      isShowPassword,
      toggleShowPassword,
      isPending,
      signInError,
      onSubmit,
    };
  },
};
</script>

<style></style>
