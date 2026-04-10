import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "هل التبييض مؤلم؟",
    a: "لا، التبييض باستخدام تقنياتنا الحديثة آمن تمامًا وبدون ألم. قد يشعر بعض المرضى بحساسية خفيفة تزول خلال ساعات.",
  },
  {
    q: "كم تدوم النتائج؟",
    a: "تدوم نتائج التبييض من 6 أشهر إلى سنة كاملة، حسب العناية بالأسنان وتجنب المشروبات الملونة.",
  },
  {
    q: "هل العرض يشمل الكشف؟",
    a: "نعم! العرض يشمل كشف مجاني قبل الجلسة للتأكد من صحة الأسنان واللثة.",
  },
];

const FAQSection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-12">
          الأسئلة الشائعة
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="glass-card px-6 border-none"
            >
              <AccordionTrigger className="text-right text-lg font-semibold text-foreground hover:text-primary hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
