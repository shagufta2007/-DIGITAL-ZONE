import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Government Job Alerts – Daily Updates",
    category: "Jobs & Education",
    desc: "Get daily government job alerts including SSC, UPSC, Railway, Bank and state jobs with full guidance.",
  },
  {
    id: 2,
    title: "Aadhaar, PAN & Voter ID Services",
    category: "Identity Services",
    desc: "Apply, update and download Aadhaar, PAN card and voter ID easily through our digital support.",
  },
  {
    id: 3,
    title: "Certificates Online Apply Guide",
    category: "Certificates",
    desc: "Caste, Income, Residence and all government certificates apply process explained step by step.",
  },
  {
    id: 4,
    title: "PM Schemes & Online Applications",
    category: "Government Schemes",
    desc: "Learn how to apply for PM Awas Yojana, PM Kisan, Ujjwala Yojana and other schemes.",
  },
  {
    id: 5,
    title: "Banking & AEPS Services Guide",
    category: "Banking",
    desc: "Money transfer, AEPS, account opening, and digital banking services explained in simple steps.",
  },
  {
    id: 6,
    title: "GST & Income Tax Filing Help",
    category: "Tax & Legal",
    desc: "Complete guide for GST registration, ITR filing and MSME registration services.",
  },
  {
    id: 7,
    title: "Online Form Filling & Admission Help",
    category: "CSC Services",
    desc: "Fill any online form, admission forms, admit cards and result download assistance.",
  },
  {
    id: 8,
    title: "Digital Skills & Online Earning",
    category: "Tech Skills",
    desc: "Learn freelancing, online earning, AI tools, and digital skills for future growth.",
  },
  {
    id: 9,
    title: "Design & Branding Services",
    category: "Design",
    desc: "Logo design, posters, social media posts, visiting cards and branding solutions.",
  },
  {
    id: 10,
    title: "Printing & Documentation Services",
    category: "Printing",
    desc: "Printouts, photocopy, lamination, photo printing, banners and flex services.",
  },
  {
    id: 11,
    title: "Travel & Ticket Booking Services",
    category: "Travel",
    desc: "Railway, bus, flight booking, hotel reservation and fast booking assistance.",
  },
  {
    id: 12,
    title: "Mobile & Digital Support",
    category: "Technical Support",
    desc: "Mobile repair guidance, software install, data backup and device setup help.",
  },
];

function Blog() {
  const [search, setSearch] = useState("");

  // ✅ IMPORTANT: navigate hook yahan define karo
  const navigate = useNavigate();

  const filtered = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "0 15px",
      }}
    >
      {/* HEADER */}
      <h1
        style={{
          textAlign: "center",
          color: "#e17b0d",
          marginTop: 70,
        }}
      >
        Sultan Digital Zone Blog
      </h1>

      <p style={{ textAlign: "center", color: "#6b7280" }}>
        All digital services guides, updates & help articles
      </p>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search services blog..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          margin: "20px 0",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {filtered.map((post) => (
          <div
            key={post.id}
            style={{
              background: "#0f172a",
              color: "white",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <span style={{ fontSize: "12px", color: "#f59e0b" }}>
              {post.category}
            </span>

            <h3 style={{ marginTop: "10px" }}>{post.title}</h3>

            <p style={{ fontSize: "14px", color: "#cbd5e1" }}>
              {post.desc}
            </p>

            {/* ✅ FIXED BUTTON */}
            <button
              onClick={() => navigate("/services")}
              style={{
                marginTop: "15px",
                padding: "8px 12px",
                background: "#22c55e",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;