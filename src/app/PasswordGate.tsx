import { FormEvent, ReactNode, useEffect, useState } from "react";

// SHA-256 hash of the access password. Default value is the hash of
// "ninagawa-preview" — change `PASSWORD_SHA256` (and pre-compute the new
// hash with e.g. `python3 -c 'import hashlib; print(hashlib.sha256(b"NEW_PW").hexdigest())'`)
// before sharing the URL with new audiences.
//
// NOTE: This is a *light* gate, not real security. A determined viewer
// can pull the bundle, find this hash, and brute-force a short password.
// Use it to keep accidental visitors out, not to protect sensitive data.
const PASSWORD_SHA256 =
  "469a30a4b35c2798989742eb4c36b3ec0ff4dacdc7b45abed750084ceb728b5f";

const STORAGE_KEY = "preview-gate-unlocked";

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  });
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (unlocked) document.body.style.overflow = "";
    else document.body.style.overflow = "hidden";
  }, [unlocked]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    const hash = await sha256Hex(value);
    if (hash === PASSWORD_SHA256) {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
      setValue("");
    }
    setSubmitting(false);
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#111]">
      <form onSubmit={onSubmit} className="flex flex-col items-stretch gap-3 w-[280px]">
        <p className="text-white text-center text-sm tracking-wide">Preview is password protected</p>
        <input
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          autoFocus
          autoComplete="off"
          spellCheck={false}
          className="bg-transparent border border-white/40 text-white text-sm rounded-[5px] px-3 py-2 focus:outline-none focus:border-white"
          placeholder="Password"
        />
        {error && <p className="text-red-400 text-xs text-center">パスワードが違います</p>}
        <button
          type="submit"
          disabled={submitting || value.length === 0}
          className="bg-white text-black text-sm rounded-[5px] py-2 disabled:opacity-50"
        >
          {submitting ? "..." : "Enter"}
        </button>
      </form>
    </div>
  );
}
