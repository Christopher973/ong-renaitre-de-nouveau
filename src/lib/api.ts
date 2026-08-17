const API_URL = import.meta.env.VITE_API_URL || "https://api.renaitredenouveau.org";

const TOKEN_KEY = "ong_admin_token";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string | null) =>
  t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY);

const request = async (path: string, options: { method?: string; body?: any; auth?: boolean } = {}) => {
  const { method = "GET", body, auth = false } = options;
  const headers: Record<string, string> = {};
  if (body && !(body instanceof FormData)) headers["Content-Type"] = "application/json";
  if (auth) headers["Authorization"] = `Bearer ${getToken()}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Erreur réseau.");
  return data;
};

export const imgUrl = (path: string | null) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return API_URL + path;
};

export const authApi = {
  login: (email: string, password: string) =>
    request("/api/auth/login", { method: "POST", body: { email, password } }),
};

export const newsApi = {
  list: () => request("/api/news"),
  create: (formData: FormData) => request("/api/news", { method: "POST", body: formData, auth: true }),
  update: (id: number, formData: FormData) => request(`/api/news/${id}`, { method: "PUT", body: formData, auth: true }),
  remove: (id: number) => request(`/api/news/${id}`, { method: "DELETE", auth: true }),
};

export const videosApi = {
  list: () => request("/api/videos"),
  create: (data: any) => request("/api/videos", { method: "POST", body: data, auth: true }),
  update: (id: number, data: any) => request(`/api/videos/${id}`, { method: "PUT", body: data, auth: true }),
  remove: (id: number) => request(`/api/videos/${id}`, { method: "DELETE", auth: true }),
};

export const projectsApi = {
  list: () => request("/api/projects"),
  create: (formData: FormData) => request("/api/projects", { method: "POST", body: formData, auth: true }),
  update: (id: number, formData: FormData) => request(`/api/projects/${id}`, { method: "PUT", body: formData, auth: true }),
  remove: (id: number) => request(`/api/projects/${id}`, { method: "DELETE", auth: true }),
};

export const teamApi = {
  list: () => request("/api/team"),
  create: (formData: FormData) => request("/api/team", { method: "POST", body: formData, auth: true }),
  update: (id: number, formData: FormData) => request(`/api/team/${id}`, { method: "PUT", body: formData, auth: true }),
  remove: (id: number) => request(`/api/team/${id}`, { method: "DELETE", auth: true }),
};

export type Zone = {
  id: number;
  country: string;
  prepositional_phrase: string;
  city: string | null;
  address: string;
  description: string | null;
  map_url: string;
  order_index: number;
};

export const zonesApi = {
  list: (): Promise<Zone[]> => request("/api/zones"),
  create: (data: Partial<Zone>) => request("/api/zones", { method: "POST", body: data, auth: true }),
  update: (id: number, data: Partial<Zone>) => request(`/api/zones/${id}`, { method: "PUT", body: data, auth: true }),
  remove: (id: number) => request(`/api/zones/${id}`, { method: "DELETE", auth: true }),
};
