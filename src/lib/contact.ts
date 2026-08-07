// Email kept lightly obfuscated in source so scrapers don't get a plain literal.
const rev = (parts: string[]) => parts.map((p) => p.split("").reverse().join("")).join("");

export const CONTACT_EMAIL = rev(["iarihba", "mg@6002", "moc.lia"]);

const SUBJECT = "Hi Abhishek, I'd like to chat";
const BODY = "Hey Abhishek,\n\nI saw your portfolio and...";

/** Pre-filled mailto: link — opens the visitor's own mail client (RFC 6068). */
export const hireMailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;
