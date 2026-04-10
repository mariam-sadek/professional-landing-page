import { useState } from "react";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const services = [
  "تبييض بالليزر",
  "تبييض منزلي",
  "تنظيف وتلميع عميق",
  "استشارة طبية",
];

const BookingSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(services[0]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setSubmitting(true);
    const { error } = await supabase.from("bookings").insert({
      name: name.trim(),
      phone: phone.trim(),
      service,
    });

    if (error) {
      toast.error("حدث خطأ، حاول مرة أخرى");
    } else {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  return (
    <section id="booking" className="section-padding bg-primary">
      <div className="container mx-auto max-w-xl text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
          متفوتش العرض – احجز مكانك دلوقتي!
        </h2>
        <p className="text-primary-foreground/80 mb-10">
          خصم 30% لفترة محدودة — سجّل بياناتك وهنتواصل معاك فورًا
        </p>

        {submitted ? (
          <div className="glass-card p-10 animate-fade-up">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-foreground mb-2">تم الحجز بنجاح!</h3>
            <p className="text-muted-foreground">هنتواصل معاك في أقرب وقت</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5 animate-fade-up">
            <input
              type="text"
              placeholder="الاسم"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              className="w-full px-5 py-3 rounded-lg bg-muted text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-muted-foreground"
            />
            <input
              type="tel"
              placeholder="رقم الهاتف"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              maxLength={20}
              className="w-full px-5 py-3 rounded-lg bg-muted text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-muted-foreground"
            />
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-5 py-3 rounded-lg bg-muted text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-gold appearance-none"
            >
              {services.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              type="submit"
              disabled={submitting}
              className="shimmer-gold text-gold-foreground font-bold text-lg w-full py-4 rounded-xl shadow-lg shadow-gold/30 hover:-translate-y-0.5 transition-transform duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send size={20} />
              {submitting ? "جاري الحجز..." : "احجز الآن"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default BookingSection;
