import { Phone } from "lucide-react";
import clinicLogo from "@/assets/clinic-logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-card/90 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <img src={clinicLogo} alt="لوجو العيادة" width={44} height={44} className="rounded-full" />
          <span className="text-lg font-bold text-foreground">عيادة الابتسامة</span>
        </div>
        <a
          href="https://wa.me/201000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold flex items-center gap-2 text-sm py-2 px-5"
        >
          <Phone size={18} />
          <span>تواصل معنا الآن</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
