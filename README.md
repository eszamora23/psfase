# Password Safe Web Client

A single-file, zero-dependency, browser-based viewer and editor for Password Safe `.psafe3` vault files. Built for corporate and air-gapped environments where installing desktop software is restricted or impractical.

---

## Table of Contents

- [Why This Exists](#why-this-exists)
- [Security Overview for Leadership](#security-overview-for-leadership)
- [How It Works (In a Nutshell)](#how-it-works-in-a-nutshell)
- [Common Questions and Concerns](#common-questions-and-concerns)
- [Network and Connectivity](#network-and-connectivity)
- [Content Security Policy](#content-security-policy)
- [What Is Twofish?](#what-is-twofish)
- [What Is CBC Mode?](#what-is-cbc-mode)
- [How Your Master Password Stays Safe](#how-your-master-password-stays-safe)
- [Dependencies and External Code](#dependencies-and-external-code)
- [Browser APIs Used](#browser-apis-used)
- [Deployment for Teams](#deployment-for-teams)
- [Cryptographic Details](#cryptographic-details)
- [Compatibility](#compatibility)
- [Limitations](#limitations)

---

## Why This Exists

Many corporate environments lock down workstations. You can't install Password Safe, KeePass, or other desktop tools. But your team still needs to read and update shared `.psafe3` vault files.

This tool solves that problem. It's a single HTML file. No installation. No admin rights. No network access. You double-click it, it opens in your browser, and you can unlock, view, edit, and save `.psafe3` files using the exact same encryption the official Password Safe application uses.

---

## Security Overview for Leadership

**The short version:** This tool never sees the internet. Your passwords never leave your computer. The file is encrypted with military-grade cryptography, and the encryption key is derived from your master password using the same algorithm the official Password Safe desktop application uses. There is nothing to install, nothing to update over the network, and nothing that phones home.

Here are the key points:

| Concern | Answer |
|---|---|
| Does it connect to the internet? | **No.** Zero network activity. Works fully offline. |
| Does it send data anywhere? | **No.** No outgoing connections of any kind. |
| Does it store passwords on disk? | **No.** Everything lives in browser memory and is gone when you close the tab. |
| Does it use third-party code or libraries? | **No.** Zero external dependencies. Every line of code is in the single HTML file. |
| Is the encryption standard? | **Yes.** It uses Twofish-256 + CBC + HMAC-SHA256, identical to the official Password Safe application. |
| Can IT audit it? | **Yes.** It's one readable HTML file. No minified code, no build step, no hidden modules. |
| What happens if someone gets the HTML file? | **Nothing.** The HTML file contains no secrets. Your vault file is still encrypted. |
| Does it need admin rights? | **No.** It runs in any modern browser. |

---

## How It Works (In a Nutshell)

Here's what happens when you unlock a vault:

```
1. You pick a .psafe3 file and type your master password
2. The tool reads the file header (salt, iteration count, verification hash)
3. Your password is "stretched" — hashed hundreds of thousands of times
   to make brute-force attacks impractical
4. The stretched password is verified against the hash stored in the file
   (wrong password = rejected here, no data is decrypted)
5. The stretched password decrypts two internal keys:
   - Key K (used to decrypt the actual password entries)
   - Key L (used to verify the file hasn't been tampered with)
6. Key K decrypts all the password entries using Twofish-CBC
7. Key L verifies the HMAC (a tamper-detection checksum) over all entries
8. Your entries appear in the UI
```

When you save:

```
1. New random salt, encryption keys, and IV are generated
2. Your entries are encrypted with Twofish-CBC using the new keys
3. A tamper-detection checksum (HMAC) is computed
4. The encrypted file is assembled and verified by re-opening it
5. Only after verification passes does the browser offer the download
```

At no point does any unencrypted data touch the disk, the network, or anything outside the browser tab.

---

## Common Questions and Concerns

### "Is this safe to use with real passwords?"

Yes. The encryption is identical to the official Password Safe desktop application (Twofish-256 in CBC mode with HMAC-SHA256 integrity checking). The `.psafe3` files this tool produces can be opened by the official app, and vice versa.

### "What if someone steals the .psafe3 file?"

They still need your master password. The file is encrypted with 256-bit Twofish, and the key is derived from your password through hundreds of thousands of SHA-256 iterations. Without the password, the file is indistinguishable from random noise.

### "What if someone steals the HTML file?"

The HTML file contains no secrets. It's the same for everyone. It's a tool, not a vault. Think of it like a padlock manufacturer's tool — having the tool doesn't give you the combination to any lock.

### "Could this tool be modified to steal passwords?"

Any software can theoretically be modified by a malicious actor. The advantage of this tool is that it's a single, human-readable HTML file with no external dependencies, no build pipeline, and no network calls. Your security team can read every line of code and verify there's nothing suspicious. There's no `node_modules` folder hiding thousands of unaudited packages.

### "What if the browser has a vulnerability?"

This tool runs inside the browser's standard security sandbox. It has a strict Content Security Policy that blocks all external resources, network requests, and dynamic code loading. Even if the browser itself had a vulnerability, this tool's attack surface is minimal because it doesn't load anything from the outside.

### "Can I use this on a shared computer?"

Yes, with the same caution you'd use for any password tool on a shared machine. The tool holds decrypted data only in browser memory while the tab is open. Closing the tab (or clicking "Lock") clears everything. Passwords are never written to local storage, cookies, or the filesystem.

### "Does each person need their own copy?"

No. The HTML file can live on a shared network drive. Each person opens it in their own browser, unlocks their own vault file with their own master password, and works independently. Nothing is shared between users.

### "What if I need to give vault access to a new team member?"

This tool doesn't manage access control — the `.psafe3` file format does. Share the vault file and the master password with the new team member through a secure channel (in person, encrypted email, etc.). They can then open it with this tool or the official Password Safe application.

---

## Network and Connectivity

**This tool makes zero network requests.** Here's why you can be confident:

### Content Security Policy

The HTML file includes this header:

```
Content-Security-Policy: default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:;
```

This is a browser-enforced policy that means:

- **`default-src 'none'`** — Block everything by default. No fonts, no media, no frames, no connections to anywhere.
- **`script-src 'unsafe-inline'`** — Only allow scripts that are physically written inside the HTML file. No external `.js` files, no CDNs, no dynamic script loading.
- **`style-src 'unsafe-inline'`** — Only allow styles written inside the HTML file.
- **`img-src data:`** — Only allow inline data URIs for images (none are currently used).

There is no `connect-src`, no `fetch`, no `XMLHttpRequest`, no WebSocket, no `<img>` pointing to a remote server, no tracking pixel, no analytics. The browser itself enforces this policy and will block any attempt to make a network request, even if someone tried to inject one.

### How to verify (for your security team)

1. Open Chrome DevTools (F12) → Network tab
2. Open the HTML file and use it normally
3. The Network tab will show exactly zero requests

You can also run it on a machine with no network connection at all. It works identically.

---

## What Is Twofish?

Twofish is an encryption algorithm (a "block cipher") designed by Bruce Schneier and a team of cryptographers. It was one of five finalists in the competition to become the Advanced Encryption Standard (AES) in the late 1990s. While AES (Rijndael) ultimately won, Twofish is considered equally secure — it has never been broken.

Key facts:

- **256-bit key size** — The key space is 2^256. There are more possible keys than atoms in the observable universe. Brute-forcing it is not physically possible.
- **128-bit block size** — Encrypts data in 16-byte chunks.
- **16 rounds** — Each block goes through 16 rounds of mixing, substitution, and permutation.
- **No known attacks** — After 25+ years of public cryptanalysis, no practical attack against full Twofish has been found.
- **Patent-free** — Twofish is unpatented and free to use.

Password Safe chose Twofish as its encryption algorithm when the project was created. Since Password Safe was originally written by Bruce Schneier himself (who also designed Twofish), this wasn't a coincidence.

**Is Twofish an external dependency?** No. Twofish is a mathematical algorithm, like long division. Our implementation is written directly in JavaScript inside the HTML file. There's no library, no package, no download. It's about 300 lines of code that implement the algorithm from the published specification.

---

## What Is CBC Mode?

CBC stands for "Cipher Block Chaining." It's a way to use a block cipher (like Twofish) to encrypt data that's longer than one block (16 bytes).

The idea is simple: before encrypting each block, you mix it with the previous encrypted block. This means:

- Identical plaintext blocks produce different ciphertext (so patterns don't leak)
- Changing one byte of plaintext changes the entire ciphertext from that point forward
- You need an "Initialization Vector" (IV) — a random starting value for the first block

```
Block 1: Encrypt(Plaintext_1 XOR IV)           = Ciphertext_1
Block 2: Encrypt(Plaintext_2 XOR Ciphertext_1) = Ciphertext_2
Block 3: Encrypt(Plaintext_3 XOR Ciphertext_2) = Ciphertext_3
...
```

This is the same CBC mode used by the official Password Safe application. The IV is randomly generated each time you save.

---

## How Your Master Password Stays Safe

Your master password is never stored anywhere. Here's what happens to it:

### Key Stretching

When you type your password, the tool doesn't use it directly as an encryption key. Instead, it runs it through a process called "key stretching":

```
Step 1: Combine your password with a random salt (stored in the file)
Step 2: Hash the result with SHA-256
Step 3: Hash the hash with SHA-256
Step 4: Hash it again... and again... and again...
        (hundreds of thousands of times — the exact count is stored in the file)
Step 5: The final hash is your "stretched key" (P')
```

This is called PBKDF (Password-Based Key Derivation Function). The point is to make each password guess expensive. If an attacker steals your vault file and tries to brute-force the password, they have to do hundreds of thousands of SHA-256 operations for each single guess. At typical iteration counts (200,000+), even fast hardware can only test a few thousand passwords per second.

### Password Verification

The file stores `SHA-256(P')` — a hash of the stretched key, not the password itself. When you enter your password:

1. The tool stretches it to get P'
2. Computes SHA-256(P')
3. Compares with the value in the file
4. If they don't match → "Incorrect password" (nothing is decrypted)

Even if someone intercepts the stored hash, they can't reverse it to get P', and they can't reverse P' to get your password.

### Key Hierarchy

Your password doesn't directly encrypt your data. Instead:

```
Your Password
    ↓ (key stretching: SHA-256 × hundreds of thousands)
Stretched Key (P')
    ↓ (decrypts B1, B2, B3, B4 from file header)
Encryption Key (K)  +  HMAC Key (L)
    ↓                       ↓
Decrypts entries       Verifies integrity
```

Key K (the actual encryption key) is randomly generated when the vault is saved and is different every time you save. It's stored in the file, encrypted with P'. An attacker would need to know P' (which requires your password) to get K.

### After Unlocking

While the vault is open in your browser tab, the decrypted data exists only in JavaScript memory. It's never written to disk, local storage, cookies, or session storage. When you close the tab or click "Lock," the JavaScript references are released and the browser's garbage collector reclaims the memory.

---

## Dependencies and External Code

**This tool has zero external dependencies.**

| Component | Source |
|---|---|
| Twofish cipher | Implemented from the published specification, directly in JavaScript inside the HTML file (~300 lines) |
| SHA-256 | Browser's built-in Web Crypto API (`crypto.subtle.digest`) |
| HMAC-SHA256 | Browser's built-in Web Crypto API (`crypto.subtle.sign` with HMAC) |
| Random number generation | Browser's built-in `crypto.getRandomValues()` (cryptographically secure) |
| UI framework | None. Plain HTML, CSS, and vanilla JavaScript |
| Build tools | None. No Webpack, no Babel, no npm, no transpilation |
| Package manager | None. No node_modules, no package.json |

There is no supply chain to attack. No `npm install` that pulls in hundreds of transitive dependencies. No CDN that could be compromised. No auto-updater that could be hijacked. The entire application is one file that you can read from top to bottom.

---

## Browser APIs Used

The only browser APIs this tool uses:

| API | Purpose |
|---|---|
| `crypto.subtle.digest('SHA-256', ...)` | Hashing for key stretching and password verification |
| `crypto.subtle.importKey(...)` | Importing the HMAC key |
| `crypto.subtle.sign('HMAC', ...)` | Computing HMAC-SHA256 for integrity verification |
| `crypto.getRandomValues(...)` | Generating cryptographically secure random bytes (for salt, keys, IV, padding) |
| `FileReader.readAsArrayBuffer(...)` | Reading the .psafe3 file the user selects |
| `URL.createObjectURL(...)` | Creating a download link for the saved file |
| `navigator.clipboard.writeText(...)` | Copying passwords to clipboard (with fallback) |

That's it. No `fetch()`, no `XMLHttpRequest`, no `WebSocket`, no `navigator.sendBeacon()`, no Service Workers, no IndexedDB, no localStorage.

---

## Deployment for Teams

### Option 1: Shared Network Drive

Place the HTML file on a shared drive (e.g., `\\server\tools\passwordsafe.html`). Each team member double-clicks to open it in their browser. The vault `.psafe3` files can live on the same drive or on individual machines.

### Option 2: Internal Web Server

Host the HTML file on an internal web server or intranet. Users navigate to the URL and use it. Since the tool makes no network requests after loading, it works even if the connection drops after the page loads.

### Option 3: Local Copy

Each user saves a copy of the HTML file to their desktop. This is the simplest and most offline approach.

### How the workflow works

1. A team member opens `passwordsafe.html` in their browser
2. They select the shared `.psafe3` vault file and enter the master password
3. They view or edit entries as needed
4. They click "Save" — the browser downloads a new `.psafe3` file
5. They replace the old vault file with the new one on the shared drive
6. The next person repeats the process with the updated file

For teams where multiple people edit the same vault, coordinate so only one person edits at a time (same as with the desktop Password Safe application).

---

## Cryptographic Details

For security auditors and technical reviewers. This section describes the exact cryptographic operations.

### File Format (Password Safe V3)

```
Offset   Size   Description
──────   ────   ───────────
0        4      Tag: "PWS3" (ASCII)
4        32     Salt (random, unique per save)
36       4      Iteration count N (little-endian uint32)
40       32     H(P') = SHA-256(P') — password verification
72       16     B1 = Twofish-ECB(K[0:16], P')
88       16     B2 = Twofish-ECB(K[16:32], P')
104      16     B3 = Twofish-ECB(L[0:16], P')
120      16     B4 = Twofish-ECB(L[16:32], P')
136      16     IV (random CBC initialization vector)
152      N×16   Encrypted field data (Twofish-256-CBC with key K)
152+N×16 16     EOF marker: "PWS3-EOFPWS3-EOF" (plaintext)
168+N×16 32     HMAC-SHA256(L, field_data)
```

### Key Derivation

```
P' = SHA-256^N(SHA-256(password_utf8 || salt))

Where N = iteration count from file header (typically 200,000+)
Total SHA-256 calls = N + 1
```

### Encryption Keys

```
K (32 bytes) = Twofish-ECB-Decrypt(B1, P') || Twofish-ECB-Decrypt(B2, P')
L (32 bytes) = Twofish-ECB-Decrypt(B3, P') || Twofish-ECB-Decrypt(B4, P')
```

K is the data encryption key. L is the HMAC key.

### Field Encryption

Each field is stored as:

```
[4 bytes: data length (LE)] [1 byte: field type] [data bytes] [random padding to 16-byte boundary]
```

Fields are concatenated and encrypted with Twofish-256-CBC. The CBC chain is continuous across all fields (not reset between fields). The IV is from the file header.

### Integrity Verification

```
HMAC = HMAC-SHA256(L, concat(all_field_data_bytes))
```

The HMAC covers only the raw data bytes of each field (not the length, type, or padding). If the HMAC doesn't match, the file has been corrupted or tampered with.

### Twofish Implementation

The Twofish cipher is implemented from the published specification:

- **Key schedule**: RS matrix (GF(2^8) with polynomial 0x14D) for S-box key derivation, h-function with MDS matrix (GF(2^8) with polynomial 0x169) for subkey generation
- **S-boxes**: 4 key-dependent 256-entry lookup tables, precomputed during key setup
- **Round function**: 16 Feistel rounds with Pseudo-Hadamard Transform (PHT)
- **Self-test**: On every page load, the cipher runs the official 49-iteration recursive test from the Twofish specification (ecb_ival.txt). If the test fails, the tool disables itself.

### What We Use From the Browser vs. What We Wrote

| Component | Implementation |
|---|---|
| SHA-256 | Browser (`crypto.subtle`) — hardware-accelerated, FIPS-validated in most browsers |
| HMAC-SHA256 | Browser (`crypto.subtle`) — same |
| CSPRNG | Browser (`crypto.getRandomValues`) — OS-level entropy source |
| Twofish-256 | Our code — the browser doesn't provide Twofish, so we implement it in JavaScript following the published spec. Verified against official test vectors. |
| CBC mode | Our code — straightforward XOR-and-encrypt loop, ~20 lines |
| Key stretching | Our code — calls browser SHA-256 in a loop (N+1 times) |
| .psafe3 parsing | Our code — binary format reader/writer per the V3 specification |

---

## Compatibility

| Platform | Status |
|---|---|
| Chrome 63+ | Supported |
| Edge 79+ | Supported |
| Firefox 57+ | Supported |
| Safari 11+ | Supported |
| Internet Explorer | Not supported (no Web Crypto API) |
| Mobile browsers | Works but the UI is designed for desktop/laptop |

Files created by this tool can be opened by the official Password Safe application, and vice versa. Both use the same V3 format specification.

---

## Limitations

- **Single-user editing**: Like the desktop app, only one person should edit a vault file at a time. There's no merge or conflict resolution.
- **No auto-save**: Changes are only saved when you click "Save" and the browser downloads the file. If you close the tab without saving, changes are lost.
- **No cloud sync**: This is by design. The tool is intentionally offline-only.
- **Password strength depends on you**: The encryption is strong, but a weak master password can still be brute-forced. Use a long, unique master password.
- **Browser memory**: While the vault is unlocked, decrypted passwords exist in browser memory. Close the tab or click "Lock" when you're done.

---

## License

MIT

---

## Questions?

If your security team has additional questions about this tool, the entire source code is in `passwordsafe.html`. It's one file, well-commented, and designed to be audited.
