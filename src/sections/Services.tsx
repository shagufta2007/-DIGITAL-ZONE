import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  FileText,
  ArrowRight,
  Sparkles,
  Search
} from "lucide-react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "@/src/lib/firebase";

// ✅ TYPE
type Service = {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
};

// 🔥 FULL 114 SERVICES
const allServices: string[] = [
  // Jobs & Education
  "All India Government Job Alerts",
  "Jharkhand & Other State Govt Jobs",
  "Railway | Bank | Police | Teaching",
  "Defence | SSC | UPSC | Other Exams",
  "Upcoming Vacancy Notifications",
  "Daily / Weekly Current Affairs",
  "Free Study Materials (PDF Notes, Practice Sets, VVI Content)",
  "Exam Guidance | Strategy | Form-related Help",
  "Resume / CV / Bio-Data Maker",
  "Cover Letter & Application Format",
  "Computer Courses (DCA, ADCA, CCC, Tally, DTP, Internet)",

  // Identity
  "Aadhaar Services",
  "PAN Card",
  "Voter ID Card",
  "Ration Card",
  "Ayushman Golden Card (PM-JAY)",
  "ABHA Health Card",
  "E-Shram / Labour Card",

  // Certificates
  "Caste Certificate",
  "Income Certificate",
  "Residence Certificate",
  "EWS & OBC Certificate",
  "Character Certificate",
  "Non-Creamy Layer Certificate",
  "Birth & Death Certificate",
  "Marriage & Unmarried Certificate",
  "Disability Certificate",
  "Life Certificate (Jeevan Pramaan)",
  "Vaccination & Religion Certificate",

  // Schemes
  "PM Kisan Samman Nidhi",
  "PM Awas Yojana",
  "Ujjwala Yojana",
  "Pension Schemes",
  "All Sarkari Yojana Apply & Status",
  "Scholarship Forms",
  "MGNREGA Job Card",
  "KCC (Kisan Credit Card)",

  // Banking
  "Fino Payment Bank",
  "Airtel Payment Bank",
  "Account Opening (IPPB, Axis, Jio, PNB)",
  "Cash Deposit & Withdrawal (AEPS)",
  "Money Transfer",
  "DBT / NPCI Linking",
  "Online Payment & Receipts",
  "ATM / Debit / Credit Card",
  "Loan Services",
  "Insurance",
  "Cheque Deposit",

  // Tax & Legal
  "GST Registration & Return",
  "Income Tax (ITR Filing)",
  "Holding / Water / Road Tax",
  "FSSAI License",
  "Shop & Establishment License",
  "Udyam Registration (MSME)",
  "Land Record / Khatiyan",
  "Mutation (Dakhil Kharij)",
  "Rent Agreement & Affidavit",
  "Lost FIR & E-Challan",

  // CSC / Online
  "Online Form Filling",
  "Admit Card / Result Download",
  "School / College Admission",
  "DigiLocker & UMANG Setup",
  "Hospital Appointment",
  "Email Creation",
  "CSC / AEPS / Kiosk ID",
  "Cyber Cafe Services",

  // Tech
  "Mobile Assistance",
  "Technical Problem Solving",
  "Online Earning Guidance",
  "Digital Skills Training",
  "AI Tools Guidance",
  "Laptop / Mobile Setup",
  "Windows / MS Office Install",
  "Mobile Reset / Software Install",
  "Data Backup & Email Recovery",

  // Design
  "Poster Design",
  "Visiting Card Design",
  "Social Media Design",
  "Logo & Branding",
  "Instagram / Facebook Content",
  "VIP Ads Design",

  // Printing
  "Printout (B/W & Color)",
  "Photocopy / Lamination / Scan",
  "Passport Photo",
  "Signature Creation",
  "PVC Card Printing",
  "Data Entry",
  "Excel & Letterhead",
  "Project Binding",

  // Printing Press
  "Shaadi Card Printing",
  "Pamphlet / Banner / Flex",
  "School ID Card",
  "Photo Frame Print",

  // Travel
  "Railway Ticket Booking",
  "Flight / Bus / Hotel",
  "Train Food Order",
  "Electricity Bill",
  "Mobile Recharge",
  "Gas Booking",
  "Fastag Services",

  // PF
  "EPFO / PF Services",
  "PF Claim / KYC",
  "UAN Activation",
  "Passbook Print",

  // Ecommerce
  "Amazon / Flipkart Orders",
  "Google Map Listing",
  "WhatsApp Business Setup",
  "Online Shop Promotion",
  "YouTube / Instagram Setup",

  // Telecom
  "SIM Services",
  "Driving License",
  "Passport Apply",
  "Health ID & Doctor Consultation",
  "Digital Tips & Tricks"
];

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const q = query(collection(db, "services"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(
      q,
      (snap) => {
        const data: Service[] = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Service, "id">),
        }));

        setServices(data);
        setLoading(false);
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, "services");
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  // 🔥 combine
  const combinedServices: string[] = [
    ...services.map((s) => s.title || ""),
    ...allServices,
  ];

  // 🔍 filter
  const filteredServices = combinedServices.filter((service) =>
    service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-24 bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            {combinedServices.length}+ Services
          </h2>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredServices.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center hover:border-orange-500"
            >
              <span className="text-white text-sm">
                {index + 1}. {service}
              </span>
              <ArrowRight size={14} className="text-orange-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}