export type passwordValidateResult = { ok: true; reason: undefined } | { ok: false; reason: "empty" | "mismatch" | undefined };
