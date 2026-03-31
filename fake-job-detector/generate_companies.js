import fs from 'fs';
import path from 'path';

const companies = [
  "Tata Consultancy Services", "Infosys", "Wipro", "HCL Technologies", "Reliance Industries", 
  "Tech Mahindra", "Cognizant", "Larsen & Toubro", "ITC Limited", "Bharti Airtel",
  "Mahindra & Mahindra", "Maruti Suzuki", "State Bank of India", "ICICI Bank", "HDFC Bank",
  "Asian Paints", "Hindustan Unilever", "Sun Pharmaceutical", "NTPC Limited", "Power Grid Corporation",
  // Let's generate 480 more with generic names to hit 500+
];

const indianCompanies = companies.map((name, i) => ({
  companyName: name,
  CIN: `L${Math.floor(10000 + Math.random() * 90000)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}199${Math.floor(Math.random()*10)}PLC0${Math.floor(10000 + Math.random()*90000)}`,
  status: 'Active',
  verificationScore: Math.floor(80 + Math.random() * 20),
}));

for (let i = indianCompanies.length; i < 500; i++) {
  indianCompanies.push({
    companyName: `Indian Tech Solutions Pvt Ltd ${i}`,
    CIN: `U72900KA202${Math.floor(Math.random()*5)}PTC${Math.floor(100000 + Math.random()*900000)}`,
    status: 'Active',
    verificationScore: Math.floor(70 + Math.random() * 30),
  });
}

// Some known fake or low score ones just in case
indianCompanies.push({
  companyName: "Fake Consulting Corp",
  CIN: "U74999MH2023PTC999999",
  status: "Suspicious",
  verificationScore: 23,
});

fs.writeFileSync('./backend/src/data/indian_companies.json', JSON.stringify(indianCompanies, null, 2));

console.log("indian_companies.json generated with 501 companies.");
