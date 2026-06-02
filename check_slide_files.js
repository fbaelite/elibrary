import fetch from 'node-fetch';

const ids = [
  '1PqXODrOhousP7inn7if5z8wlt1PmA4Gi',
  '1lHjWeTYx4ggpx37ISmuFnQnPzBWA_0ED',
  '1srLx8Wvo0IUHpi8dTo5CXyW9giXHZCG5',
  '1syhb-SaLf6rOhkBnJ2EL4IJTFLsQIcJF',
  '1CbWo9C1Mx9ISkF3Fzs1o5eVd4QQgH1dK'
];

async function checkTitle(id) {
  const url = `https://drive.google.com/file/d/${id}/view`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const match = html.match(/<title>(.*?)<\/title>/);
    const title = match ? match[1] : 'Unknown';
    console.log(`ID: ${id} -> Title: ${title}, Status: ${res.status}`);
  } catch (e) {
    console.log(`ID: ${id} -> Error: ${e.message}`);
  }
}

async function run() {
  for (const id of ids) {
    await checkTitle(id);
  }
}

run();
