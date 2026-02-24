import {
  MapPin,
  Phone,
  Mail,
  Twitter,
  Instagram,
  Linkedin,
  Facebook,
  ExternalLink,
} from "lucide-react";

// Styled Contact Card
const ContactCard = ({
  icon: Icon,
  title,
  content,
  href,
  isSocial = false,
}: {
  icon: any;
  title: string;
  content?: string;
  href?: string;
  isSocial?: boolean;
}) => {
  const CardWrapper = href ? "a" : "div";

  return (
    <CardWrapper
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      className={`group block p-8 rounded-2xl bg-zinc-900/40 border border-white/5 transition-all duration-300 hover:bg-zinc-900/60 hover:border-primary-500 hover:shadow-2xl hover:shadow-primary-500/5 ${href ? "cursor-pointer" : ""}`}
    >
      <div className="flex flex-col items-start gap-4">
        <div className="p-3 rounded-xl bg-zinc-800 text-zinc-400 group-hover:text-primary-500 group-hover:bg-primary-500/10 transition-colors duration-300">
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
          {!isSocial && (
            <p className="text-zinc-400 font-medium group-hover:text-zinc-300 transition-colors">
              {content}
            </p>
          )}
        </div>
        {isSocial && (
          <div className="flex gap-4 mt-2">
            <SocialIcon
              icon={Twitter}
              href="https://twitter.com"
              aria="Twitter"
            />
            <SocialIcon
              icon={Instagram}
              href="https://instagram.com"
              aria="Instagram"
            />
            <SocialIcon
              icon={Linkedin}
              href="https://linkedin.com"
              aria="LinkedIn"
            />
            <SocialIcon
              icon={Facebook}
              href="https://facebook.com"
              aria="Facebook"
            />
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

const SocialIcon = ({
  icon: Icon,
  href,
  aria,
}: {
  icon: any;
  href: string;
  aria: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={aria}
    className="p-2 rounded-lg bg-zinc-800 text-zinc-500 hover:text-primary-500 hover:bg-primary-500/10 transition-all duration-300"
  >
    <Icon size={20} />
  </a>
);

/**
 * MAIN PAGE COMPONENT
 */
export default function ContactPage() {
  return (
    <main className="flex-1 flex flex-col overflow-y-auto">
      <div className="max-w-5xl w-full mx-auto px-6 py-12">
        {/* PAGE HEADER */}
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Contact <span className="text-white">Us</span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
            We&apos;d love to hear from you. Reach out to us through any of the
            channels below and our team will get back to you as soon as
            possible.
          </p>
          <div className="h-px w-24 bg-primary-500/50 mt-8" />
        </section>

        {/* CONTACT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactCard
            icon={MapPin}
            title="Our Office"
            content="Victoria Island, Lagos, Nigeria"
          />

          <ContactCard
            icon={Phone}
            title="Call Us"
            content="+234 800 123 4567"
            href="tel:+2348001234567"
          />

          <ContactCard
            icon={Mail}
            title="Email Us"
            content="support@jollyapp.com"
            href="mailto:support@jollyapp.com"
          />

          <ContactCard icon={ExternalLink} title="Follow Us" isSocial={true} />
        </div>

        {/* FOOTER INFO */}
        <div className="mt-20 text-center">
          <p className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} Estumuzik. Built for creators and
            listeners.
          </p>
        </div>
      </div>
    </main>
  );
}
