/**
 * The four calls the browser makes to Strapi, split out of `strapi.ts` so a
 * client component never pulls the server loaders (and `STRAPI_TOKEN`) in with
 * them. Only the public base URL is referenced here.
 */

const BASE = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}/api/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error?.message ?? `Strapi ${res.status}`);
  }
  return json.data as T;
}

export const subscribeToNewsletter = (email: string, source = "footer") =>
  post<{ id: number }>("newsletter-subscribers", {
    data: { email, source },
  });

export const sendContactMessage = (input: {
  name: string;
  email: string;
  message: string;
  source?: string;
}) => post<{ id: number }>("contact-submissions", { data: input });

/**
 * Location-database gate: ask for an access link.
 *
 * No e-mail is sent yet — the backend has no mail provider — so while
 * `EXPOSE_ACCESS_TOKEN` is on it hands the token straight back, which is what
 * lets the gate be exercised in development. In production the visitor gets
 * `/locations?token=…` in their inbox and the response carries `sent` alone.
 */
export const requestDatabaseAccess = (email: string) =>
  post<{ sent: true; token?: string; link?: string }>(
    "database-access/request",
    { email },
  );

/** Location-database gate: exchange the token from that link. Single-use. */
export const verifyDatabaseAccess = (token: string) =>
  post<{ verified: true; email: string }>("database-access/verify", { token });
