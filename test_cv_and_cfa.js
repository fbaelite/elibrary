import fetch from 'node-fetch';

const candidates = [
  '1NjaONPSJCVpus6Qn3JWHCkqEKYbLTU48',
  '1qv44dUCVcXoe9Msuxqywmv3UvJt0u7IY',
  '1hf8uLoFr1MJCVgjMTqfo254Rz_BVWH9F'
];

async function testCv() {
  for (const id of candidates) {
    const check = await fetch(`https://drive.google.com/thumbnail?id=${id}&sz=w400`, {
      method: 'HEAD',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    console.log(`ID: ${id} -> Status: ${check.status}, Type: ${check.headers.get('content-type')}`);
  }
}

async function testCleanCfa() {
  const url = "https://drive.google.com/drive/folders/1MjxHmSrzLIJiy0Xq3-bzICptRJ1G4mjA";
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8'
      }
    });
    const html = await res.text();
    const regex = /\b1[a-zA-Z0-9_-]{32}\b/g;
    const matches = [...html.matchAll(regex)].map(m => m[0]);
    const cleanCand = [...new Set(matches)].filter(id => id !== "1MjxHmSrzLIJiy0Xq3-bzICptRJ1G4mjA");
    console.log(`Clean CFA found ${cleanCand.length} candidates:`, cleanCand);
    
    // Test them
    for (const id of cleanCand) {
      const check = await fetch(`https://drive.google.com/thumbnail?id=${id}&sz=w400`, {
        method: 'HEAD',
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      console.log(`CFA ID ${id} -> Status: ${check.status}, Type: ${check.headers.get('content-type')}`);
    }
  } catch (e) {
    console.error(e);
  }
}

async function run() {
  await testCv();
  await testCleanCfa();
}

run();
