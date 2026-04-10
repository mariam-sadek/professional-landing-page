import { useState, useEffect } from "react";
import { Star, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

// Spam filter: min 3 words, no links
const isValidReview = (comment: string): boolean => {
  const words = comment.trim().split(/\s+/);
  if (words.length < 3) return false;
  if (/https?:\/\/|www\./i.test(comment)) return false;
  return true;
};

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Default reviews as fallback
  const defaultReviews: Review[] = [
    { id: "d1", name: "أحمد محمد", rating: 5, comment: "تجربة ممتازة! النتيجة كانت مذهلة من أول جلسة. أنصح الجميع بالتجربة.", created_at: "" },
    { id: "d2", name: "سارة علي", rating: 5, comment: "فريق محترف جدًا والعيادة نظيفة ومريحة. أسناني بقت بيضاء زي ما كنت عايزة.", created_at: "" },
    { id: "d3", name: "محمود حسن", rating: 5, comment: "كنت خايف من الألم بس الموضوع كان بسيط جدًا. شكرًا لفريق العيادة!", created_at: "" },
  ];

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("rating", { ascending: false })
      .limit(10);

    if (!error && data && data.length > 0) {
      // Client-side spam filter
      const filtered = data.filter((r: Review) => isValidReview(r.comment));
      setReviews(filtered.slice(0, 3));
    }
  };

  const displayedReviews = reviews.length > 0 ? reviews : defaultReviews;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    if (!isValidReview(comment)) {
      toast.error("يرجى كتابة تعليق أطول (3 كلمات على الأقل) بدون روابط");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      name: name.trim(),
      rating,
      comment: comment.trim(),
    });

    if (error) {
      toast.error("حدث خطأ، حاول مرة أخرى");
    } else {
      toast.success("شكرًا لتقييمك! ✨");
      setName("");
      setComment("");
      setRating(5);
      setShowForm(false);
      fetchReviews();
    }
    setSubmitting(false);
  };

  return (
    <section className="section-padding bg-light-blue">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-12">
          آراء عملائنا
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedReviews.map((t, i) => (
            <div
              key={t.id}
              className={`glass-card p-8 animate-fade-up-delay-${i + 1}`}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={20}
                    className={j < t.rating ? "fill-gold text-gold" : "text-muted-foreground"}
                  />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">"{t.comment}"</p>
              <p className="font-bold text-primary">{t.name}</p>
            </div>
          ))}
        </div>

        {/* Add review */}
        <div className="text-center mt-10">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="btn-gold"
            >
              أضف تقييمك
            </button>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass-card p-8 max-w-md mx-auto space-y-4 animate-fade-up text-right"
            >
              <input
                type="text"
                placeholder="الاسم"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={100}
                className="w-full px-5 py-3 rounded-lg bg-muted text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-muted-foreground"
              />
              {/* Star rating */}
              <div className="flex gap-1 justify-center">
                {Array.from({ length: 5 }).map((_, j) => (
                  <button
                    key={j}
                    type="button"
                    onClick={() => setRating(j + 1)}
                    onMouseEnter={() => setHoverRating(j + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <Star
                      size={28}
                      className={
                        j < (hoverRating || rating)
                          ? "fill-gold text-gold transition-colors"
                          : "text-muted-foreground transition-colors"
                      }
                    />
                  </button>
                ))}
              </div>
              <textarea
                placeholder="اكتب تعليقك هنا..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                maxLength={500}
                rows={3}
                className="w-full px-5 py-3 rounded-lg bg-muted text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-muted-foreground resize-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send size={18} />
                {submitting ? "جاري الإرسال..." : "إرسال التقييم"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
