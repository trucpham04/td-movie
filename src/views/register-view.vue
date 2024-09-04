<template>
  <div class="px-5 mx-auto" style="max-width: 32rem">
    <form action="" @submit.prevent="onSubmit" novalidate>
      <div class="mb-3" :class="fullnameChecked ? 'was-validated' : ''">
        <label class="form-label" for="fullname-input">Full name</label>
        <input
          v-model="fullname"
          class="form-control"
          type="text"
          name=""
          @keyup="fullnameChecked = true"
          required
          autofocus
          id="fullname-input"
        />
      </div>

      <div class="mb-3" :class="emailChecked ? 'was-validated' : ''">
        <label class="form-label" for="email-input">Email</label>
        <input
          v-model="email"
          class="form-control"
          type="email"
          required
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          @keyup="emailChecked = true"
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
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$"
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
          <div class="invalid-feedback">
            Password must have a minimum of 8 characters, including lowercase
            letters, uppercase letters, and numbers.
          </div>
        </div>
        <div class="form-text text-center text-danger">
          {{ signUpError ? signUpError : "" }}
        </div>
      </div>

      <div class="mb-3">
        <button
          type="submit"
          class="btn btn-primary btn-lg w-100 mt-4"
          style="height: 48px"
          :disabled="isPending"
        >
          Sign up{{ isPending ? "..." : "" }}
        </button>
      </div>
      <div class="text-center">
        <span>
          Already have an account?
          <router-link :to="{ name: 'Login', params: {} }" class="m-1">
            Sign in
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

    const { signUpError, isPending, signUp } = useAuth();

    const fullnameChecked = ref(false);
    const emailRegex = new RegExp("[^@\\s]+@[^@\\s]+\\.[^@\\s]+");
    const emailChecked = ref(false);
    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$"
    );
    const passwordChecked = ref(false);
    const fullname = ref(null);
    const email = ref(null);
    const password = ref(null);

    if (firebaseAuth.currentUser) {
      router.push({ name: "Home", params: {} });
    }

    const isShowPassword = ref(false);

    function toggleShowPassword() {
      isShowPassword.value = !isShowPassword.value;
    }

    async function onSubmit() {
      fullnameChecked.value = true;
      emailChecked.value = true;
      passwordChecked.value = true;

      if (emailRegex.test(email.value) && passwordRegex.test(password.value)) {
        await signUp(fullname.value, email.value, password.value);

        if (!signUpError.value) router.push({ name: "Home", params: {} });
      } else {
        console.log("Info is invalid.");
      }
    }

    return {
      isShowPassword,
      toggleShowPassword,
      fullname,
      fullnameChecked,
      email,
      emailChecked,
      password,
      passwordChecked,
      isPending,
      signUpError,
      onSubmit,
    };
  },
};
</script>

<style></style>
