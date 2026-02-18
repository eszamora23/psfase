// Twofish test - extracted from passwordsafe.html for verification against known test vectors
'use strict';

const Q0 = new Uint8Array([
  0xA9,0x67,0xB3,0xE8,0x04,0xFD,0xA3,0x76,0x9A,0x92,0x80,0x78,0xE4,0xDD,0xD1,0x38,
  0x0D,0xC6,0x35,0x98,0x18,0xF7,0xEC,0x6C,0x43,0x75,0x37,0x26,0xFA,0x13,0x94,0x48,
  0xF2,0xD0,0x8B,0x30,0x84,0x54,0xDF,0x23,0x19,0x5B,0x3D,0x59,0xF3,0xAE,0xA2,0x82,
  0x63,0x01,0x83,0x2E,0xD9,0x51,0x9B,0x7C,0xA6,0xEB,0xA5,0xBE,0x16,0x0C,0xE3,0x61,
  0xC0,0x8C,0x3A,0xF5,0x73,0x2C,0x25,0x0B,0xBB,0x4E,0x89,0x6B,0x53,0x6A,0xB4,0xF1,
  0xE1,0xE6,0xBD,0x45,0xE2,0xF4,0xB6,0x66,0xCC,0x95,0x03,0x56,0xD4,0x1C,0x1E,0xD7,
  0xFB,0xC3,0x8E,0xB5,0xE9,0xCF,0xBF,0xBA,0xEA,0x77,0x39,0xAF,0x33,0xC9,0x62,0x71,
  0x81,0x79,0x09,0xAD,0x24,0xCD,0xF9,0xD8,0xE5,0xC5,0xB9,0x4D,0x44,0x08,0x86,0xE7,
  0xA1,0x1D,0xAA,0xED,0x06,0x70,0xB2,0xD2,0x41,0x7B,0xA0,0x11,0x31,0xC2,0x27,0x90,
  0x20,0xF6,0x60,0xFF,0x96,0x5C,0xB1,0xAB,0x9E,0x9C,0x52,0x1B,0x5F,0x93,0x0A,0xEF,
  0x91,0x85,0x49,0xEE,0x2D,0x4F,0x8F,0x3B,0x47,0x87,0x6D,0x46,0xD6,0x3E,0x69,0x64,
  0x2A,0xCE,0xCB,0x2F,0xFC,0x97,0x05,0x7A,0xAC,0x7F,0xD5,0x1A,0x4B,0x0E,0xA7,0x5A,
  0x28,0x14,0x3F,0x29,0x88,0x3C,0x4C,0x02,0xB8,0xDA,0xB0,0x17,0x55,0x1F,0x8A,0x7D,
  0x57,0xC7,0x8D,0x74,0xB7,0xC4,0x9F,0x72,0x7E,0x15,0x22,0x12,0x58,0x07,0x99,0x34,
  0x6E,0x50,0xDE,0x68,0x65,0xBC,0xDB,0xF8,0xC8,0xA8,0x2B,0x40,0xDC,0xFE,0x32,0xA4,
  0xCA,0x10,0x21,0xF0,0xD3,0x5D,0x0F,0x00,0x6F,0x9D,0x36,0x42,0x4A,0x5E,0xC1,0xE0
]);

const Q1 = new Uint8Array([
  0x75,0xF3,0xC6,0xF4,0xDB,0x7B,0xFB,0xC8,0x4A,0xD3,0xE6,0x6B,0x45,0x7D,0xE8,0x4B,
  0xD6,0x32,0xD8,0xFD,0x37,0x71,0xF1,0xE1,0x30,0x0F,0xF8,0x1B,0x87,0xFA,0x06,0x3F,
  0x5E,0xBA,0xAE,0x5B,0x8A,0x00,0xBC,0x9D,0x6D,0xC1,0xB1,0x0E,0x80,0x5D,0xD2,0xD5,
  0xA0,0x84,0x07,0x14,0xB5,0x90,0x2C,0xA3,0xB2,0x73,0x4C,0x54,0x92,0x74,0x36,0x51,
  0x38,0xB0,0xBD,0x5A,0xFC,0x60,0x62,0x96,0x6C,0x42,0xF7,0x10,0x7C,0x28,0x27,0x8C,
  0x13,0x95,0x9C,0xC7,0x24,0x46,0x3B,0x70,0xCA,0xE3,0x85,0xCB,0x11,0xD0,0x93,0xB8,
  0xA6,0x83,0x20,0xFF,0x9F,0x77,0xC3,0xCC,0x03,0x6F,0x08,0xBF,0x40,0xE7,0x2B,0xE2,
  0x79,0x0C,0xAA,0x82,0x41,0x3A,0xEA,0xB9,0xE4,0x9A,0xA4,0x97,0x7E,0xDA,0x7A,0x17,
  0x66,0x94,0xA1,0x1D,0x3D,0xF0,0xDE,0xB3,0x0B,0x72,0xA7,0x1C,0xEF,0xD1,0x53,0x3E,
  0x8F,0x33,0x26,0x5F,0xEC,0x76,0x2A,0x49,0x81,0x88,0xEE,0x21,0xC4,0x1A,0xEB,0xD9,
  0xC5,0x39,0x99,0xCD,0xAD,0x31,0x8B,0x01,0x18,0x23,0xDD,0x1F,0x4E,0x2D,0xF9,0x48,
  0x4F,0xF2,0x65,0x8E,0x78,0x5C,0x58,0x19,0x8D,0xE5,0x98,0x57,0x67,0x7F,0x05,0x64,
  0xAF,0x63,0xB6,0xFE,0xF5,0xB7,0x3C,0xA5,0xCE,0xE9,0x68,0x44,0xE0,0x4D,0x43,0x69,
  0x29,0x2E,0xAC,0x15,0x59,0xA8,0x0A,0x9E,0x6E,0x47,0xDF,0x34,0x35,0x6A,0xCF,0xDC,
  0x22,0xC9,0xC0,0x9B,0x89,0xD4,0xED,0xAB,0x12,0xA2,0x0D,0x52,0xBB,0x02,0x2F,0xA9,
  0xD7,0x61,0x1E,0xB4,0x50,0x04,0xF6,0xC2,0x16,0x25,0x86,0x56,0x55,0x09,0xBE,0x91
]);

const RS = [
  [0x01,0xA4,0x55,0x87,0x5A,0x58,0xDB,0x9E],
  [0xA4,0x56,0x82,0xF3,0x1E,0xC6,0x68,0xE5],
  [0x02,0xA1,0xFC,0xC1,0x47,0xAE,0x3D,0x19],
  [0xA4,0x55,0x87,0x5A,0x58,0xDB,0x9E,0x03]
];

function gfMul14D(a, b) {
  let r = 0, aa = a;
  for (let i = 0; i < 8; i++) {
    if (b & (1 << i)) r ^= aa;
    const hi = aa & 0x80;
    aa = (aa << 1) & 0xFF;
    if (hi) aa ^= 0x4D;
  }
  return r;
}

function gfMul169(a, b) {
  let r = 0, aa = a;
  for (let i = 0; i < 8; i++) {
    if (b & (1 << i)) r ^= aa;
    const hi = aa & 0x80;
    aa = (aa << 1) & 0xFF;
    if (hi) aa ^= 0x69;
  }
  return r;
}

const MDS0 = new Uint32Array(256);
const MDS1 = new Uint32Array(256);
const MDS2 = new Uint32Array(256);
const MDS3 = new Uint32Array(256);

for (let i = 0; i < 256; i++) {
  const m = (a, b) => gfMul169(a, b);
  MDS0[i] = ((m(0x01,i)) | (m(0x5B,i)<<8) | (m(0xEF,i)<<16) | (m(0xEF,i)<<24)) >>> 0;
  MDS1[i] = ((m(0xEF,i)) | (m(0xEF,i)<<8) | (m(0x5B,i)<<16) | (m(0x01,i)<<24)) >>> 0;
  MDS2[i] = ((m(0x5B,i)) | (m(0xEF,i)<<8) | (m(0x01,i)<<16) | (m(0xEF,i)<<24)) >>> 0;
  MDS3[i] = ((m(0x5B,i)) | (m(0x01,i)<<8) | (m(0xEF,i)<<16) | (m(0x5B,i)<<24)) >>> 0;
}

function rU32(b, o) { return (b[o] | (b[o+1]<<8) | (b[o+2]<<16) | (b[o+3]<<24)) >>> 0; }
function wU32(b, o, v) { b[o]=v&0xFF; b[o+1]=(v>>>8)&0xFF; b[o+2]=(v>>>16)&0xFF; b[o+3]=(v>>>24)&0xFF; }
function ROL(x, n) { return ((x << n) | (x >>> (32 - n))) >>> 0; }
function ROR(x, n) { return ((x >>> n) | (x << (32 - n))) >>> 0; }

function rsRemix(src, off) {
  const out = new Uint8Array(4);
  for (let i = 0; i < 4; i++) {
    let v = 0;
    for (let j = 0; j < 8; j++) v ^= gfMul14D(RS[i][j], src[off + j]);
    out[i] = v;
  }
  return out;
}

function hFunc(x, L) {
  let b0 = x & 0xFF, b1 = (x>>>8) & 0xFF, b2 = (x>>>16) & 0xFF, b3 = (x>>>24) & 0xFF;
  b0 = Q1[b0] ^ (L[3] & 0xFF);
  b1 = Q0[b1] ^ ((L[3]>>>8) & 0xFF);
  b2 = Q0[b2] ^ ((L[3]>>>16) & 0xFF);
  b3 = Q1[b3] ^ ((L[3]>>>24) & 0xFF);
  b0 = Q1[b0] ^ (L[2] & 0xFF);
  b1 = Q1[b1] ^ ((L[2]>>>8) & 0xFF);
  b2 = Q0[b2] ^ ((L[2]>>>16) & 0xFF);
  b3 = Q0[b3] ^ ((L[2]>>>24) & 0xFF);
  b0 = Q0[b0] ^ (L[1] & 0xFF);
  b1 = Q1[b1] ^ ((L[1]>>>8) & 0xFF);
  b2 = Q0[b2] ^ ((L[1]>>>16) & 0xFF);
  b3 = Q1[b3] ^ ((L[1]>>>24) & 0xFF);
  b0 = Q0[b0] ^ (L[0] & 0xFF);
  b1 = Q0[b1] ^ ((L[0]>>>8) & 0xFF);
  b2 = Q1[b2] ^ ((L[0]>>>16) & 0xFF);
  b3 = Q1[b3] ^ ((L[0]>>>24) & 0xFF);
  b0 = Q1[b0]; b1 = Q0[b1]; b2 = Q1[b2]; b3 = Q0[b3];
  return (MDS0[b0] ^ MDS1[b1] ^ MDS2[b2] ^ MDS3[b3]) >>> 0;
}

function twofishInit(key) {
  const Me = [rU32(key,0), rU32(key,8), rU32(key,16), rU32(key,24)];
  const Mo = [rU32(key,4), rU32(key,12), rU32(key,20), rU32(key,28)];

  const s0 = rsRemix(key, 0);
  const s1 = rsRemix(key, 8);
  const s2 = rsRemix(key, 16);
  const s3 = rsRemix(key, 24);

  const subKeys = new Uint32Array(40);
  for (let i = 0; i < 20; i++) {
    const byteA = 2 * i, byteB = 2 * i + 1;
    const xA = (byteA | (byteA<<8) | (byteA<<16) | (byteA<<24)) >>> 0;
    const xB = (byteB | (byteB<<8) | (byteB<<16) | (byteB<<24)) >>> 0;
    const a = hFunc(xA, Me);
    const b = ROL(hFunc(xB, Mo), 8);
    subKeys[2*i] = (a + b) >>> 0;
    subKeys[2*i+1] = ROL((a + 2*b) >>> 0, 9);
  }

  // S-box precomputation - s0 innermost (from key[0:8]), s3 outermost (from key[24:32])
  const sBox = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)];
  for (let i = 0; i < 256; i++) {
    sBox[0][i] = MDS0[Q1[Q0[Q0[Q1[Q1[i]^s0[0]]^s1[0]]^s2[0]]^s3[0]]];
    sBox[1][i] = MDS1[Q0[Q0[Q1[Q1[Q0[i]^s0[1]]^s1[1]]^s2[1]]^s3[1]]];
    sBox[2][i] = MDS2[Q1[Q1[Q0[Q0[Q0[i]^s0[2]]^s1[2]]^s2[2]]^s3[2]]];
    sBox[3][i] = MDS3[Q0[Q1[Q1[Q0[Q1[i]^s0[3]]^s1[3]]^s2[3]]^s3[3]]];
  }

  return { subKeys, sBox };
}

function gFunc(x, sBox) {
  return (sBox[0][x & 0xFF] ^ sBox[1][(x>>>8)&0xFF] ^ sBox[2][(x>>>16)&0xFF] ^ sBox[3][(x>>>24)&0xFF]) >>> 0;
}

function twofishEncryptBlock(block, ctx) {
  let r0 = rU32(block,0) ^ ctx.subKeys[0];
  let r1 = rU32(block,4) ^ ctx.subKeys[1];
  let r2 = rU32(block,8) ^ ctx.subKeys[2];
  let r3 = rU32(block,12) ^ ctx.subKeys[3];
  for (let round = 0; round < 16; round++) {
    const t0 = gFunc(r0, ctx.sBox);
    const t1 = gFunc(ROL(r1, 8), ctx.sBox);
    const f0 = (t0 + t1 + ctx.subKeys[2*round+8]) >>> 0;
    const f1 = (t0 + 2*t1 + ctx.subKeys[2*round+9]) >>> 0;
    r2 = ROR(r2 ^ f0, 1);
    r3 = ROL(r3, 1) ^ f1;
    let tmp;
    tmp = r0; r0 = r2; r2 = tmp;
    tmp = r1; r1 = r3; r3 = tmp;
  }
  let tmp;
  tmp = r0; r0 = r2; r2 = tmp;
  tmp = r1; r1 = r3; r3 = tmp;
  const out = new Uint8Array(16);
  wU32(out, 0, (r0 ^ ctx.subKeys[4]) >>> 0);
  wU32(out, 4, (r1 ^ ctx.subKeys[5]) >>> 0);
  wU32(out, 8, (r2 ^ ctx.subKeys[6]) >>> 0);
  wU32(out, 12, (r3 ^ ctx.subKeys[7]) >>> 0);
  return out;
}

function twofishDecryptBlock(block, ctx) {
  let r0 = rU32(block,0) ^ ctx.subKeys[4];
  let r1 = rU32(block,4) ^ ctx.subKeys[5];
  let r2 = rU32(block,8) ^ ctx.subKeys[6];
  let r3 = rU32(block,12) ^ ctx.subKeys[7];
  for (let round = 15; round >= 0; round--) {
    const t0 = gFunc(r0, ctx.sBox);
    const t1 = gFunc(ROL(r1, 8), ctx.sBox);
    const f0 = (t0 + t1 + ctx.subKeys[2*round+8]) >>> 0;
    const f1 = (t0 + 2*t1 + ctx.subKeys[2*round+9]) >>> 0;
    r2 = ROL(r2, 1) ^ f0;
    r3 = ROR(r3 ^ f1, 1);
    let tmp;
    tmp = r0; r0 = r2; r2 = tmp;
    tmp = r1; r1 = r3; r3 = tmp;
  }
  let tmp;
  tmp = r0; r0 = r2; r2 = tmp;
  tmp = r1; r1 = r3; r3 = tmp;
  const out = new Uint8Array(16);
  wU32(out, 0, (r0 ^ ctx.subKeys[0]) >>> 0);
  wU32(out, 4, (r1 ^ ctx.subKeys[1]) >>> 0);
  wU32(out, 8, (r2 ^ ctx.subKeys[2]) >>> 0);
  wU32(out, 12, (r3 ^ ctx.subKeys[3]) >>> 0);
  return out;
}

// Helper to parse hex string to Uint8Array
function hex(s) {
  s = s.replace(/\s/g, '');
  const a = new Uint8Array(s.length / 2);
  for (let i = 0; i < a.length; i++) a[i] = parseInt(s.substr(i*2, 2), 16);
  return a;
}
function toHex(a) { return Array.from(a).map(b => b.toString(16).padStart(2,'0')).join(''); }

// Test vectors
const tests = [
  {
    name: 'I=1: all-zeros key, all-zeros PT',
    key: hex('0000000000000000000000000000000000000000000000000000000000000000'),
    pt:  hex('00000000000000000000000000000000'),
    ct:  hex('57FF739D4DC92C1BD7FC01700CC8216F'),
  },
  {
    name: 'I=2: all-zeros key, non-zero PT',
    key: hex('0000000000000000000000000000000000000000000000000000000000000000'),
    pt:  hex('57FF739D4DC92C1BD7FC01700CC8216F'),
    ct:  hex('D43BB7556EA32E46F2A282B7D45B4E0D'),
  },
  {
    name: 'I=3: half-non-zero key',
    key: hex('57FF739D4DC92C1BD7FC01700CC8216F00000000000000000000000000000000'),
    pt:  hex('D43BB7556EA32E46F2A282B7D45B4E0D'),
    ct:  hex('90AFE91BB288544F2C32DC239B2635E6'),
  },
  {
    name: 'I=4: fully non-zero key',
    key: hex('D43BB7556EA32E46F2A282B7D45B4E0D57FF739D4DC92C1BD7FC01700CC8216F'),
    pt:  hex('90AFE91BB288544F2C32DC239B2635E6'),
    ct:  hex('6CB4561C40BF0A9705931CB6D408E7FA'),
  },
  {
    name: 'Intermediate value test (counting key)',
    key: hex('0123456789ABCDEFFEDCBA987654321000112233445566778899AABBCCDDEEFF'),
    pt:  hex('00000000000000000000000000000000'),
    ct:  hex('37527BE0052334B89F0CFCCAE87CFA20'),
  },
];

console.log('=== Twofish Test Vectors ===\n');
let allPass = true;

for (const t of tests) {
  const ctx = twofishInit(t.key);
  const ct = twofishEncryptBlock(t.pt, ctx);
  const pass = toHex(ct).toUpperCase() === toHex(t.ct).toUpperCase();

  if (!pass) {
    console.log(`FAIL: ${t.name}`);
    console.log(`  Key: ${toHex(t.key)}`);
    console.log(`  PT:  ${toHex(t.pt)}`);
    console.log(`  Expected CT: ${toHex(t.ct)}`);
    console.log(`  Got CT:      ${toHex(ct)}`);

    // Also dump some internals
    console.log(`  Me: [${[rU32(t.key,0), rU32(t.key,8), rU32(t.key,16), rU32(t.key,24)].map(x => '0x'+x.toString(16).padStart(8,'0'))}]`);
    console.log(`  Mo: [${[rU32(t.key,4), rU32(t.key,12), rU32(t.key,20), rU32(t.key,28)].map(x => '0x'+x.toString(16).padStart(8,'0'))}]`);
    const s0 = rsRemix(t.key, 0);
    const s1 = rsRemix(t.key, 8);
    const s2 = rsRemix(t.key, 16);
    const s3 = rsRemix(t.key, 24);
    console.log(`  s0 (bytes 0-7):  [${Array.from(s0).map(b=>'0x'+b.toString(16).padStart(2,'0'))}]`);
    console.log(`  s1 (bytes 8-15): [${Array.from(s1).map(b=>'0x'+b.toString(16).padStart(2,'0'))}]`);
    console.log(`  s2 (bytes 16-23):[${Array.from(s2).map(b=>'0x'+b.toString(16).padStart(2,'0'))}]`);
    console.log(`  s3 (bytes 24-31):[${Array.from(s3).map(b=>'0x'+b.toString(16).padStart(2,'0'))}]`);
    console.log(`  SubKeys[0..7]: [${Array.from(ctx.subKeys.slice(0,8)).map(x => '0x'+x.toString(16).padStart(8,'0'))}]`);
    allPass = false;
  } else {
    console.log(`PASS: ${t.name}`);
    // Verify decrypt roundtrip
    const dec = twofishDecryptBlock(ct, ctx);
    const rtPass = toHex(dec).toUpperCase() === toHex(t.pt).toUpperCase();
    if (!rtPass) {
      console.log(`  DECRYPT ROUNDTRIP FAILED! Got: ${toHex(dec)}`);
      allPass = false;
    }
  }
}

console.log(`\n=== ${allPass ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'} ===`);

// Full recursive test (49 iterations) for 256-bit
// Per Twofish paper section 10.2:
// I=1: K=0, P=0
// I=2: K=0, P=CT[1]
// I=3: K=CT[1]||0, P=CT[2]
// I=N (N>=4): K=CT[N-2]||CT[N-3], P=CT[N-1]
console.log('\n=== Recursive Test (49 iterations, 256-bit) ===');
const cts = [new Uint8Array(16)]; // cts[0] = dummy zeros

for (let i = 1; i <= 49; i++) {
  let key256;
  if (i <= 2) {
    key256 = new Uint8Array(32); // all zeros
  } else if (i === 3) {
    key256 = new Uint8Array(32);
    key256.set(cts[1]); // CT[1] || zeros
  } else {
    key256 = new Uint8Array(32);
    key256.set(cts[i-2]);       // CT[i-2] in first 16 bytes
    key256.set(cts[i-3], 16);   // CT[i-3] in second 16 bytes
  }

  const pt = cts[cts.length - 1].slice(); // PT = last CT
  const ctx = twofishInit(key256);
  const ct = twofishEncryptBlock(pt, ctx);
  cts.push(ct);

  if (i <= 6 || i === 49) {
    console.log(`I=${i}: CT=${toHex(ct).toUpperCase()}`);
  }
}

// Expected I=49 CT: 37FE26FF1CF66175F5DDF4C33B97A205
const expected49 = '37FE26FF1CF66175F5DDF4C33B97A205';
const got49 = toHex(cts[49]).toUpperCase();
console.log(`\nI=49 expected: ${expected49}`);
console.log(`I=49 got:      ${got49}`);
console.log(got49 === expected49 ? 'RECURSIVE TEST PASSED' : 'RECURSIVE TEST FAILED');
