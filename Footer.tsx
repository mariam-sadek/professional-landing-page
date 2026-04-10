import { Facebook, Instagram, MessageCircle, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Location */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-gold" />
              العنوان
            </h3>
            <p className="text-primary-foreground/70 mb-4">
              شارع المعادي، القاهرة، مصر
            </p>
            <div className="rounded-xl overflow-hidden h-40">
              <iframe
                title="موقع العيادة"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d31.235!3d30.044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzM4LjQiTiAzMcKwMTQnMDYuMCJF!5e0!3m2!1sar!2seg!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Clock size={20} className="text-gold" />
              مواعيد العمل
            </h3>
            <ul className="space-y-2 text-primary-foreground/70">
              <li>السبت – الخميس: 10 صباحًا – 10 مساءً</li>
              <li>الجمعة: مغلق</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold mb-4">تابعنا</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold transition-colors duration-300"
                aria-label="فيسبوك"
              >
                <Facebook size={22} />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold transition-colors duration-300"
                aria-label="إنستجرام"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://wa.me/201000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold transition-colors duration-300"
                aria-label="واتساب"
              >
                <MessageCircle size={22} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center text-primary-foreground/50 text-sm">
          © {new Date().getFullYear()} عيادة الابتسامة — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
};

export default Footer;
