export type Project = {
  id: number;
  name: string;
  description: string;
};

const BASE = "http://localhost:8000";

export async function listProjects(token: string): Promise<Project[]> {
  const res = await fetch(`${BASE}/projects/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to load projects");
  }

  return res.json();
}

export async function createProject(
  token: string,
  name: string,
  description: string
): Promise<Project> {
  const res = await fetch(`${BASE}/projects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, description }),
  });

  if (!res.ok) {
    throw new Error("Failed to create project");
  }

  return res.json();
}
