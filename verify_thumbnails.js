import fetch from 'node-fetch';

const candidates = {
  "Template CV": [
    '1iXStvXQDnM7OEzoGNrRrT5FuAcwbIayU',
    '1Az-9SZvKMNtQbrzEl07Lv9XUzlKVXOEc',
    '1sekjSRFwVbeRWKLILHg_BYhKtlgAqv6_',
    '1yA7AZ_txg2qPDx6rTPCH83MyZuoCTFkM',
    '1wcmhh8ab2Qz_TSNx1JrqgyxbF3Id8OqZ'
  ],
  "Tài liệu ngôn ngữ SQL": [
    '1eFSV0pulz97HdpSinRClfgdHhJGLXMka',
    '1YFg_IJbhjEZFsu32SFDZZpjXXdFdZgYg',
    '1do2-ISsiQQpAzYnHLpr1SHCIaeU4Modp',
    '1KIAMKwnwN4aAqBHz851-PvRI6d3aG1yl',
    '1QmrW_OfEMhBo3z4gNMMD5PQtJ8H4RFIR'
  ],
  "CFA": [
    '15lX16_5o_Vrok6iTZXmcqP9RzOFW_wet',
    '1coPXGIrpZVB5EaZBr7dydUxtv_Q8Qbzw',
    '1pnHx1w6c3y7p7VBqK_uhQ53b_uDXkmMK',
    '1oZI3Jkldy5_Rnfj2_o6dvRS_CNv1aU35',
    '1tAULAVNla76NrQCq22B4dDy5s_IJMOsr'
  ],
  "Slide templates": [
    '1PqXODrOhousP7inn7if5z8wlt1PmA4Gi',
    '1lHjWeTYx4ggpx37ISmuFnQnPzBWA_0ED',
    '1srLx8Wvo0IUHpi8dTo5CXyW9giXHZCG5',
    '1syhb-SaLf6rOhkBnJ2EL4IJTFLsQIcJF',
    '1CbWo9C1Mx9ISkF3Fzs1o5eVd4QQgH1dK'
  ],
  "Kỹ năng phỏng vấn": [
    '1ZLEba5ep1qTulgdStkKw_NjxLgnPJonf',
    '1niwEuqU0uZ0D5goOw83ZKDOXms9WrxBG',
    '1SnAxlMGL9uTdc3zYvPaYtZraoVI0LMkU',
    '11UpVXoLDeuK2Y4up0jTIpbsqDUWjthVw',
    '1SrRmKlaQ_V28ZVvvkmMX-QmT8lIml8kB'
  ],
  "Ebooks Tâm lí": [
    '1QF5Qw12Mqkgq5nIK6UZqPBXpoz7dx5Pe',
    '1Z2WDxZ58Rk8vnBzxsVr1SjvONeVLUpSo',
    '15cIS1HWVJQzW95buWKzAgIPgDGKP_ypf',
    '1U0Z2GGzGTUsGiYmva3s1waW8rHMboxTt',
    '1Zrp3OxyOWhivray4p4VYKm5ceIE-ihGO'
  ],
  "The body keeps the scores": [
    '1RwbMFaiH2EPKCmyFtgp9moIpSHCNKxa6'
  ]
};

async function testCandidate(name, id) {
  const url = `https://drive.google.com/thumbnail?id=${id}&sz=w400`;
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    const contentType = res.headers.get('content-type');
    const contentLength = res.headers.get('content-length');
    console.log(`[${name}] ID: ${id} -> Status: ${res.status}, Type: ${contentType}, Length: ${contentLength}`);
    return res.status === 200 && contentType && contentType.startsWith('image/');
  } catch (e) {
    console.log(`[${name}] ID: ${id} -> Error:`, e.message);
    return false;
  }
}

async function run() {
  for (const [name, ids] of Object.entries(candidates)) {
    console.log(`Testing candidates for: ${name}`);
    for (const id of ids) {
      await testCandidate(name, id);
    }
  }
}

run();
