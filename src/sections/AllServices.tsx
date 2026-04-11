import { ArrowRight } from "lucide-react";

const allServices = [
  "All India Government Job Alerts",
  "Jharkhand & Other State Govt Jobs",
  "Railway | Bank | Police | Teaching",
  "Defence | SSC | UPSC | Other Exams",
  "Upcoming Vacancy Notifications",
  "Daily / Weekly Current Affairs",
  "Free Study Materials (PDF Notes, Practice Sets)",
  "Exam Guidance & Form Help",
  "Resume / CV / Bio-Data Maker",
  "Cover Letter & Application Format",
  "Computer Courses (DCA, ADCA, CCC, Tally)",
  
  "Aadhaar Services",
  "PAN Card Services",
  "Voter ID Card",
  "Ration Card",
  "Ayushman Card",
  "ABHA Health Card",
  "E-Shram Card",

  "Caste Certificate",
  "Income Certificate",
  "Residence Certificate",
  "EWS / OBC Certificate",
  "Birth & Death Certificate",
  "Marriage Certificate",

  "PM Kisan",
  "PM Awas Yojana",
  "Ujjwala Yojana",
  "Pension Schemes",
  "Scholarship Forms",

  "Bank Account Opening",
  "Money Transfer",
  "ATM Card Apply",
  "Loan Services",
  "Insurance",

  "GST Registration",
  "Income Tax Filing",
  "FSSAI License",
  "Udyam Registration",

  "Online Form Filling",
  "Admit Card Download",
  "College Admission Form",

  "Digital Skills Training",
  "AI Tools Guidance",
  "Laptop Setup",

  "Poster Design",
  "Logo Design",
  "Social Media Post",

  "Printout & Photocopy",
  "PVC Card Printing",
  "Data Entry",

  "Shaadi Card Printing",
  "Flex & Banner",

  "Railway Ticket Booking",
  "Flight Booking",
  "Electricity Bill Payment",
  "Mobile Recharge",

  "PF Services",
  "UAN Activation",

  "Amazon / Flipkart Orders",
  "Google Map Listing",
  "WhatsApp Business Setup",

  "SIM Services",
  "Driving License",
  "Passport Apply"
];

export default function AllServices() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">
        All Available Services (114)
      </h1>

      <div className="max-w-4xl mx-auto grid gap-4">
        {allServices.map((service, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center hover:border-orange-500 transition"
          >
            <span>{index + 1}. {service}</span>
            <ArrowRight size={16} className="text-orange-500" />
          </div>
        ))}
      </div>
    </div>
  );
}