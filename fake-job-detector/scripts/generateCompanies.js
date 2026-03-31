const fs = require('fs');

const baseCompanies = [
  "TCS", "Infosys", "Wipro", "HCL Technologies", "Tech Mahindra",
  "Reliance Industries", "Tata Motors", "Mahindra & Mahindra", "Larsen & Toubro",
  "HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra Bank",
  "Zomato", "Swiggy", "Flipkart", "Paytm", "Razorpay", "Ola", "Oyo", "Cred",
  "BharatPe", "PhonePe", "MakeMakeTrip", "Nykaa", "Zerodha", "Upstox", "Meesho",
  "Tata Consultancy Services", "HCL"
];

const suffixes = ["Private Limited", "Limited", "Technologies", "Solutions", "Services", "Corp", "Group"];

let companies = [];
let cinCounter = 10000;

function randomId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

baseCompanies.forEach(name => {
  companies.push({
    companyName: name,
    cin: `L${(Math.floor(Math.random() * 90000) + 10000)}MH20${Math.floor(Math.random() * 20) + 10}PLC${(Math.floor(Math.random() * 900000) + 100000)}`,
    status: Math.random() > 0.05 ? "Active" : "Inactive",
    verificationScore: Math.floor(Math.random() * 20) + 80 // 80-99
  });
});

while(companies.length < 520) {
  let rName = `AlphaGen ${randomId()} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
  companies.push({
    companyName: rName,
    cin: `U${(Math.floor(Math.random() * 90000) + 10000)}KA20${Math.floor(Math.random() * 20) + 10}PTC${(Math.floor(Math.random() * 900000) + 100000)}`,
    status: Math.random() > 0.1 ? "Active" : "Inactive",
    verificationScore: Math.floor(Math.random() * 40) + 60 // 60-99
  });
}

// Make sure directory exists
if (!fs.existsSync('./backend/src/data')) {
  fs.mkdirSync('./backend/src/data', { recursive: true });
}
fs.writeFileSync('./backend/src/data/indian_companies.json', JSON.stringify(companies, null, 2));
console.log(`Generated ${companies.length} companies successfully.`);
