export type SignupResult = { ok: boolean; message?: string };

// Isolated so a real email provider (e.g. a form endpoint) can be wired in
// later without touching the component. This stub must NOT claim the email
// was persisted remotely until a provider is connected.
export async function submitSignup(email: string): Promise<SignupResult> {
  const endpoint = process.env.NEXT_PUBLIC_SIGNUP_ENDPOINT;

  if (!endpoint) {
    // No backend configured yet, so acknowledge locally without a remote claim.
    return { ok: true };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      return { ok: false, message: "Something went wrong. Please try again." };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: "Could not reach the server. Try again soon." };
  }
}
