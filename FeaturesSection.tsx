import { Clock, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "نتائج فورية",
    desc: "تبييض خلال 45 دقيقة فقط",
  },
  {
    icon: ShieldCheck,
    title: "آمن تمامًا",
    desc: "مناسب للأسنان واللثة بدون ضرر",
  },
  {
    icon: Sparkles,
    title: "أحدث الأجهزة",
    desc: "باستخدام تقنية Zoom أو الليزر البارد",
  },
];

const FeaturesSection = () => {
  return (
    <section className="section-padding bg-light-blue">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-12">
          لماذا تختارنا؟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`glass-card p-8 text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 animate-fade-up-delay-${i + 1}`}
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <f.icon className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
