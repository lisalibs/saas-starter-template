const API_BASE = "http://localhost:8000";

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Request failed ${res.status} ${res.statusText} – ${text || "no body"}`
    );
  }

  // 204 No Content
  if (res.status === 204) {
    return undefined as unknown as T;
  }

  return (await res.json()) as T;
}

// -------- AUTH --------

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const body = new URLSearchParams();
  body.append("username", email);
  body.append("password", password);

  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });
}

// -------- PROJECTS --------

export interface Project {
  id: number;
  name: string;
  description: string;
}

export interface ProjectCreate {
  name: string;
  description: string;
}

export async function getProjects(token: string): Promise<Project[]> {
  return apiFetch<Project[]>("/projects/", { method: "GET" }, token);
}

export async function createProject(
  data: ProjectCreate,
  token: string
): Promise<Project> {
  return apiFetch<Project>(
    "/projects/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
    token
  );
}

// -------- AI --------

export interface ChatIn {
  prompt: string;
}

export interface ChatOut {
  reply: string;
}

export async function chatAi(prompt: string, token: string): Promise<ChatOut> {
  return apiFetch<ChatOut>(
    "/ai/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    },
    token
  );
}
