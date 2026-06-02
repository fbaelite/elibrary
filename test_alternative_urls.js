import fetch from 'node-fetch';

const ids = [
  '1RwbMFaiH2EPKCmyFtgp9moIpSHCNKxa6', // The body keeps the scores
  '1NjaONPSJCVpus6Qn3JWHCkqEKYbLTU48', // Template CV candidate
  '1qv44dUCVcXoe9Msuxqywmv3UvJt0u7IY', // Template CV candidate
  '1hf8uLoFr1MJCVgjMTqfo254Rz_BVWH9F', // Template CV candidate
  '15lX16_5o_Vrok6iTZXmcqP9RzOFW_wet', // CFA
  '1coPXGIrpZVB5EaZBr7dydUxtv_Q8Qbzw',  // CFA
  '1PqXODrOhousP7inn7if5z8wlt1PmA4Gi'  // Slide template candidate
];

async function testAlternatives() {
  for (const id of ids) {
    console.log(`\nTesting ID: ${id}`);
    
    // Alt 1: lh3.googleusercontent
    const alt1Url = `https://lh3.googleusercontent.com/d/${id}=w400`;
    try {
      const check1 = await fetch(alt1Url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
      const type = check1.headers.get('content-type');
      console.log(`  lh3.googleusercontent: Status ${check1.status}, Type ${type}`);
    } catch(e) {
      console.log(`  lh3.googleusercontent error: ${e.message}`);
    }

    // Alt 2: doc.google.com export
    const alt2Url = `https://docs.google.com/uc?export=view&id=${id}`;
    try {
      const check2 = await fetch(alt2Url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
      console.log(`  docs.google.comuc: Status ${check2.status}, Type ${check2.headers.get('content-type')}`);
    } catch(e) {
      console.log(`  docs.google.comuc error: ${e.message}`);
    }
  }
}

testAlternatives();
