import React, { useState } from "react";

const API_BASE = "http://localhost:8000";

type Project = {
  id: number;
  name: string;
  description: string;
};

function App() {
  // Auth state
  const [email, setEmail] = useState("lisa@example.com");
  const [password, setPassword] = useState("supersecret");
  const [token, setToken] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<string>("Not logged in");

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  // AI state
  const [prompt, setPrompt] = useState("");
  const [aiReply, setAiReply] = useState("");

  async function handleRegister() {
    try {
      setAuthStatus("Registering...");
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Register failed: ${res.status} ${text}`);
      }

      setAuthStatus("Registered successfully. You can now log in.");
    } catch (err: any) {
      console.error(err);
      setAuthStatus(err.message ?? "Register failed");
    }
  }

  async function handleLogin() {
    try {
      setAuthStatus("Logging in...");
      const body = new URLSearchParams({
        username: email,
        password: password,
      }).toString();

      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Login failed: ${res.status} ${text}`);
      }

      const data = await res.json();
      setToken(data.access_token);
      setAuthStatus("Logged in");
    } catch (err: any) {
      console.error(err);
      setAuthStatus(err.message ?? "Login failed");
      setToken(null);
    }
  }

  async function loadProjects() {
    if (!token) {
      setAuthStatus("Need to log in first.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/projects/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Load projects failed: ${res.status} ${text}`);
      }

      const data: Project[] = await res.json();
      setProjects(data);
    } catch (err: any) {
      console.error(err);
      setAuthStatus(err.message ?? "Could not load projects");
    }
  }

  async function createProject() {
    if (!token) {
      setAuthStatus("Need to log in first.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/projects/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: projectName,
          description: projectDescription,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Create project failed: ${res.status} ${text}`);
      }

      // Add created project to list
      const created: Project = await res.json();
      setProjects((prev) => [...prev, created]);
      setProjectName("");
      setProjectDescription("");
    } catch (err: any) {
      console.error(err);
      setAuthStatus(err.message ?? "Could not create project");
    }
  }

  async function sendPrompt() {
    if (!token) {
      setAuthStatus("Need to log in first.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`AI call failed: ${res.status} ${text}`);
      }

      const data = await res.json();
      setAiReply(data.reply ?? "");
    } catch (err: any) {
      console.error(err);
      setAiReply(err.message ?? "AI call failed");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "#f9fafb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
        SaaS Starter Template
      </h1>
      <p style={{ marginBottom: "1.5rem", opacity: 0.8 }}>
        Auth + Projects + AI Playground
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
          alignItems: "flex-start",
        }}
      >
        {/* Auth card */}
        <div
          style={{
            background: "#111827",
            borderRadius: "0.75rem",
            border: "1px solid #1f2937",
            padding: "1.25rem",
          }}
        >
          <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Auth</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "0.5rem 0.75rem",
                borderRadius: "0.375rem",
                border: "1px solid #374151",
                background: "#020617",
                color: "#f9fafb",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "0.5rem 0.75rem",
                borderRadius: "0.375rem",
                border: "1px solid #374151",
                background: "#020617",
                color: "#f9fafb",
              }}
            />

            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button
                onClick={handleRegister}
                style={{
                  padding: "0.4rem 0.8rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  background: "#4b5563",
                  color: "#f9fafb",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                Register
              </button>
              <button
                onClick={handleLogin}
                style={{
                  padding: "0.4rem 0.8rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  background: "#2563eb",
                  color: "#f9fafb",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                Login
              </button>
            </div>

            <div style={{ marginTop: "0.75rem", fontSize: "0.85rem" }}>
              <strong>Status:</strong> {authStatus}
            </div>

            {token && (
              <div
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.75rem",
                  wordBreak: "break-all",
                  opacity: 0.8,
                }}
              >
                <strong>Token:</strong> {token}
              </div>
            )}
          </div>
        </div>

        {/* Projects card */}
        <div
          style={{
            background: "#111827",
            borderRadius: "0.75rem",
            border: "1px solid #1f2937",
            padding: "1.25rem",
          }}
        >
          <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Projects</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <input
              type="text"
              placeholder="Project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              style={{
                padding: "0.5rem 0.75rem",
                borderRadius: "0.375rem",
                border: "1px solid #374151",
                background: "#020617",
                color: "#f9fafb",
              }}
            />
            <input
              type="text"
              placeholder="Project description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              style={{
                padding: "0.5rem 0.75rem",
                borderRadius: "0.375rem",
                border: "1px solid #374151",
                background: "#020617",
                color: "#f9fafb",
              }}
            />
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button
                onClick={createProject}
                style={{
                  padding: "0.4rem 0.8rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  background: "#10b981",
                  color: "#022c22",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                Create
              </button>
              <button
                onClick={loadProjects}
                style={{
                  padding: "0.4rem 0.8rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  background: "#4b5563",
                  color: "#f9fafb",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                Refresh list
              </button>
            </div>
          </div>

          <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
            {projects.length === 0 ? (
              <p style={{ opacity: 0.8 }}>No projects yet.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {projects.map((p) => (
                  <li
                    key={p.id}
                    style={{
                      padding: "0.5rem 0",
                      borderBottom: "1px solid #1f2937",
                    }}
                  >
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <div style={{ opacity: 0.8 }}>{p.description}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* AI Playground card */}
        <div
          style={{
            background: "#111827",
            borderRadius: "0.75rem",
            border: "1px solid #1f2937",
            padding: "1.25rem",
          }}
        >
          <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
            AI Playground
          </h2>

          <textarea
            placeholder="Ask the AI engine something..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #374151",
              background: "#020617",
              color: "#f9fafb",
              resize: "vertical",
            }}
          />
          <button
            onClick={sendPrompt}
            style={{
              marginTop: "0.5rem",
              padding: "0.4rem 0.8rem",
              borderRadius: "0.375rem",
              border: "none",
              background: "#6366f1",
              color: "#eef2ff",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            Send to AI
          </button>

          {aiReply && (
            <div
              style={{
                marginTop: "0.75rem",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #1f2937",
                background: "#020617",
                fontSize: "0.9rem",
              }}
            >
              <strong>AI reply:</strong>
              <div style={{ marginTop: "0.25rem" }}>{aiReply}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
