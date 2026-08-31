import { SUPABASE } from "./supabase.mjs";

export async function fetchAllArticles() {
  const { data, error } = await SUPABASE
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function fetchSingleArticleById(articleId) {
  const { data, error } = await SUPABASE
    .from("articles")
    .select("*")
    .eq("id", articleId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function createArticle(articleData) {
  const { data, error } = await SUPABASE
    .from("articles")
    .insert(articleData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateArticleById(articleId, articleData) {
  const { data, error } = await SUPABASE
    .from("articles")
    .update(articleData)
    .eq("id", articleId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteArticle(articleId) {
  const { error } = await SUPABASE
    .from("articles")
    .delete()
    .eq("id", articleId);

  if (error) {
    throw error;
  }

  return true;
}

export async function fetchArticlesByUser(userId) {
  const { data, error } = await SUPABASE
    .from("articles")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}