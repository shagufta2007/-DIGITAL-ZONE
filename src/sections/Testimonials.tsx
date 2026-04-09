import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Kumar",
    role: "Student",
    text: "Sultan Digital Zone helped me with my scholarship form. The process was so fast and smooth. Highly recommended!",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=1",
  },
  {
    name: "Priya Singh",
    role: "Business Owner",
    text: "I got my GST registration done here. Md Shahjad is very professional and knows exactly what needs to be done.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=2",
  },
  {
    name: "Amit Sharma",
    role: "Freelancer",
    text: "Best place for all digital services. I always come here for my passport and banking related work.",
    rating: 4,
    image: "https://i.pravatar.cc/150?u=3",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-bold mb-6"
          >
            <Star size={16} className="fill-current" />
            <span>Customer Reviews</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            What Our  <span className="text-sky-400">Customers Say</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Don't just take our word for it. Here's what our customers have to say about their experience with Sultan Digital Zone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 relative group hover:border-orange-500/50 transition-all duration-300"
            >
              <Quote className="absolute top-8 right-8 text-slate-800 group-hover:text-orange-500/20 transition-colors" size={48} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? "text-yellow-500 fill-current" : "text-slate-700"}
                  />
                ))}
              </div>

              <p className="text-slate-300 text-lg mb-8 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-slate-800 group-hover:border-orange-500 transition-colors"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-slate-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
