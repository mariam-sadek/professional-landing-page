import heroImg from "@/assets/hero-smile.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="ابتسامة بيضاء مشرقة"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-foreground/80 via-foreground/60 to-foreground/30" />
      </div>
      <div className="relative container mx-auto text-center md:text-right">
        <div className="max-w-2xl md:mr-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight animate-fade-up">
            احصل على ابتسامة أكثر بياضًا
            <br />
            <span className="text-gold">في جلسة واحدة فقط!</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/90 animate-fade-up-delay-1">
            تبييض الأسنان بأحدث تقنيات الليزر — بدون ألم ونتائج فورية
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-up-delay-2">
            <a href="#booking" className="shimmer-gold text-gold-foreground font-bold text-lg px-10 py-4 rounded-xl shadow-lg shadow-gold/30 hover:-translate-y-1 transition-transform duration-300 inline-block">
              احجز الآن – خصم 30%
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
