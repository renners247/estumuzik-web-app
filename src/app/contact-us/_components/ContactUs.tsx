"use client";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { RiShareLine } from "react-icons/ri";
 
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
 
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Game Flex Arcade Contact",
          text: "Connect with Game Flex Arcade for any inquiries or support!",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled or failed", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };
 
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
 
        {title === "Share Us" && (
<div className="flex gap-4 mt-2">
<motion.button
              onClick={handleNativeShare}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#FFCC00",
                color: "#000",
              }}
              className="size-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 transition-colors"
>
<RiShareLine size={18} />
</motion.button>
</div>
        )}
</div>
</CardWrapper>
  );
};
 
/**
* MAIN PAGE COMPONENT
*/
export default function ContactPage() {
  return (
<main className="flex-1 flex flex-col overflow-y-auto mt-20">
<div className="max-w-7xl w-full mx-auto px-6 py-12">
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
 
          <ContactCard icon={ExternalLink} title="Share Us" isSocial={true} />
</div>
 
        {/* FOOTER INFO */}
        {/* <div className="mt-20 text-center">
<p className="text-zinc-600 text-sm">
&copy; {new Date().getFullYear()} Estumuzik. Built for creators and
            listeners.
</p>
</div> */}
</div>
</main>
  );
}