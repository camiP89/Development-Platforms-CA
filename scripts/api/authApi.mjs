import { SUPABASE } from "./supabase.mjs";

export async function checkAuth() {
  const {
    data: { user },
  } = await SUPABASE.auth.getUser();

  if (!user) {
    window.location.href = "/account/login.html";
  }

  return user;
}

export async function logout() {
  const { error } = await SUPABASE.auth.signOut();

  if (error) {
    console.error("Error logging out:", error);
    return;
  }

  window.location.href = "/account/login.html";
}
