import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const statsData = [
  { label: "Today Visitor", value: 109 },
  { label: "Active Member", value: 68 },
  { label: "Registered Mem", value: 98 },
  { label: "Total Visitor", value: 914 },
];

const skillsData = [
  { name: "Anything online", value: 98, color: "bg-green-500" },
  { name: "Web Designer", value: 78, color: "bg-lime-500" },
  { name: "English Typing", value: 85, color: "bg-emerald-500" },
  { name: "Hindi Typing", value: 25, color: "bg-yellow-400" },
];

const ProfileSection = () => {
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const [startAnim, setStartAnim] = useState(false);

  // 👇 detect scroll
  const { ref, inView } = useInView({
    triggerOnce: true, // sirf ek baar chale
    threshold: 0.3,    // 30% visible hone par start
  });

  useEffect(() => {
    if (inView) {
      setStartAnim(true);

      const interval = setInterval(() => {
        setCounts((prev) =>
          prev.map((num, i) => {
            if (num < statsData[i].value) {
              return num + Math.ceil(statsData[i].value / 40);
            }
            return statsData[i].value;
          })
        );
      }, 50);

      return () => clearInterval(interval);
    }
  }, [inView]);

  return (
    <div ref={ref} className="bg-[#0a0f2c] text-white p-5">

      {/* Top Section */}
      <div className="bg-black/80 p-6 rounded-2xl flex flex-col md:flex-row gap-6">

        {/* Left */}
        <div className="md:w-1/2">
          <h2 className="text-xl font-bold underline text-orange-400">
            Visit here:-
          </h2>

          <p className="mt-2 text-gray-300">
            Pathalgada, Chatra, Jharkhand
          </p>

          <div className="flex items-center mt-6">
            <img
              src="/icon-19222.png"
              className="w-16 h-16 rounded-full mr-4 border-2 border-orange-500"
            />
            <div>
              <h3 className="text-lg font-semibold">Sultan</h3>
              <p className="text-gray-400 text-sm">CSC Digital Seva</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 text-center md:w-1/2">
          {statsData.map((item, i) => (
            <div key={i}>
              <h1 className="text-4xl font-bold">
                {startAnim ? counts[i] : 0}
              </h1>
              <p className="text-gray-400 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-6 text-sky-400">
          My Skills
        </h2>

        {skillsData.map((skill, index) => (
          <div key={index} className="mb-5">
            <div className="flex justify-between mb-2 text-sm">
              <span>{skill.name}</span>
              <span>{skill.value}%</span>
            </div>

            <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
              <div
                className={`${skill.color} h-full transition-all duration-1000`}
                style={{
                  width: startAnim ? `${skill.value}%` : "0%",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProfileSection;