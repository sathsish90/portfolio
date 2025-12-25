import { useState } from "react";
import {
  Mail,
  Linkedin,
  Twitter,
  Send,
  Shield,
  Phone,
  GraduationCap,
  ExternalLink,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create Gmail compose URL with pre-filled email
      const recipientEmail = "cybersecure8@gmail.com";
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(
        `${formData.message}\n\n---\n${formData.name}\n${formData.email}`
      );
      const cc = encodeURIComponent(formData.email);

      // Gmail compose URL format
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=${subject}&body=${body}&cc=${cc}`;

      // Open Gmail compose window in new tab
      window.open(gmailUrl, "_blank");

      // Show success message
      toast({
        title: "Opening Gmail...",
        description:
          "Gmail will open in a new tab with your pre-filled message. Please review and send.",
      });

      // Reset form after a short delay
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitting(false);
      }, 500);
    } catch (error) {
      // Show error message
      toast({
        title: "Failed to Open Gmail",
        description:
          "Please try again or contact me directly at cybersecure8@gmail.com",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/sathsish90/",
      label: "LinkedIn",
      external: true,
    },
    {
      icon: Twitter,
      href: "https://x.com/sathsish90",
      label: "Twitter/X",
      external: true,
    },
    { icon: Mail, href: "mailto:cybersecure8@gmail.com", label: "Email" },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "cybersecure8@gmail.com",
      href: "mailto:cybersecure8@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 98409 69548",
      href: "tel:+919840969548",
    },
    {
      icon: GraduationCap,
      label: "Mentorship",
      value: "skillmate.ai/sathish",
      href: "https://skillmate.ai/sathish",
      external: true,
    },
  ];

  const whatsappMessage = encodeURIComponent(
    "Hi, Just checked your website. Shall we have a quick call?"
  );
  const whatsappUrl = `https://wa.me/919840969548?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-16 md:py-24 pb-24 md:pb-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block font-mono text-primary text-sm uppercase tracking-widest mb-3 md:mb-4">
              {"// Contact"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display mb-4 md:mb-6">
              Let's <span className="text-primary text-glow">Connect</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base md:text-lg">
              Ready to secure your digital assets? Let's discuss how I can help
              protect your organization.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block font-mono text-xs sm:text-sm text-muted-foreground mb-1.5 md:mb-2">
                      {">"} Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2.5 md:px-4 md:py-3 bg-card border border-primary/20 rounded-lg font-mono text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs sm:text-sm text-muted-foreground mb-1.5 md:mb-2">
                      {">"} Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2.5 md:px-4 md:py-3 bg-card border border-primary/20 rounded-lg font-mono text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-xs sm:text-sm text-muted-foreground mb-1.5 md:mb-2">
                    {">"} Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-3 py-2.5 md:px-4 md:py-3 bg-card border border-primary/20 rounded-lg font-mono text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Security Assessment Inquiry"
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs sm:text-sm text-muted-foreground mb-1.5 md:mb-2">
                    {">"} Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2.5 md:px-4 md:py-3 bg-card border border-primary/20 rounded-lg font-mono text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                    placeholder="Tell me about your security needs..."
                    required
                  />
                </div>
                <Button
                  variant="cyber"
                  size="lg"
                  type="submit"
                  className="w-full group mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>

              {/* WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 md:mt-6 block"
              >
                <Button
                  variant="cyber-outline"
                  size="lg"
                  className="w-full group bg-green-500/10 border-green-500/30 hover:bg-green-500/20 hover:border-green-500/50"
                >
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>

            {/* Contact Info */}
            <div className="order-1 lg:order-2 space-y-5 md:space-y-6">
              {/* Info Card */}
              <div className="p-4 md:p-6 bg-card border border-primary/20 rounded-xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4 md:mb-6">
                  {/* Profile Photo */}
                  <div className="relative group flex-shrink-0">
                    <div className="absolute -inset-1 bg-primary/20 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-primary/30 ring-2 ring-primary/10">
                      <img
                        src="/images/sathish-profile.png"
                        alt="Sathish Kumar Balakrishnan"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Name & Title */}
                  <div className="text-center sm:text-left">
                    <h3 className="font-display font-semibold text-base md:text-lg">
                      Sathish Kumar Balakrishnan
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      Cybersecurity Specialist
                    </p>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  {contactInfo.map((info, idx) => (
                    <a
                      key={idx}
                      href={info.href}
                      target={info.external ? "_blank" : undefined}
                      rel={info.external ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-2 md:gap-3 text-xs md:text-sm hover:text-primary transition-colors group"
                    >
                      <info.icon className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                        <span className="text-muted-foreground">
                          {info.label}:{" "}
                        </span>
                        <span className="text-foreground font-mono group-hover:text-primary transition-colors break-all">
                          {info.value}
                        </span>
                        {info.external && (
                          <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="p-4 md:p-6 bg-card border border-primary/20 rounded-xl">
                <h4 className="font-display font-semibold mb-3 md:mb-4 text-sm md:text-base">
                  Connect on Social
                </h4>
                <div className="flex gap-2 md:gap-3">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target={social.external ? "_blank" : undefined}
                      rel={social.external ? "noopener noreferrer" : undefined}
                      className="p-2.5 md:p-3 bg-muted border border-primary/20 rounded-lg hover:border-primary hover:bg-primary/10 transition-all group"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <social.icon className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="p-3 md:p-4 bg-secondary/10 border border-secondary/30 rounded-xl">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-secondary rounded-full animate-pulse flex-shrink-0" />
                  <span className="font-mono text-xs md:text-sm text-secondary">
                    Available for new projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
