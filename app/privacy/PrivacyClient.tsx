"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "info-collection", title: "1. Information We Collect" },
  { id: "info-use", title: "2. How We Use Your Information" },
  { id: "info-sharing", title: "3. Information Sharing" },
  { id: "security", title: "4. Security" },
  { id: "cookies", title: "5. Cookies and Tracking" },
  { id: "rights", title: "6. Your Rights" },
  { id: "children", title: "7. Children’s Privacy" },
  { id: "changes", title: "8. Changes to This Policy" },
];

export default function PrivacyClient() {
  const [activeId, setActiveId] = useState("info-collection");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.1 },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className='min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8 scroll-smooth'>
      <Header />

      <div className='max-w-6xl mx-auto mt-10 mb-16 grid grid-cols-1 lg:grid-cols-4 gap-10'>
        {/* TOC */}
        <nav className='hidden lg:block sticky top-24 self-start'>
          <h2 className='text-xs uppercase tracking-[0.3em] text-zinc-500 mb-6'>
            Contents
          </h2>

          <ul className='space-y-3 text-sm'>
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`transition-all duration-300 ${
                    activeId === s.id
                      ? "text-pink-500 font-semibold pl-2 border-l border-pink-500"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CONTENT */}
        <div className='lg:col-span-3'>
          <div className='bg-gradient-to-b from-zinc-950 to-black border border-zinc-800 rounded-3xl p-8 md:p-10'>
            <h1 className='text-3xl md:text-4xl font-black mb-3'>
              Privacy Policy
            </h1>

            <p className='text-zinc-400 mb-12 max-w-2xl'>
              This policy explains how your personal and medical information is
              collected, used, and protected.
            </p>

            <div className='space-y-14'>
              {sections.map((section) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5 }}
                  className='scroll-mt-28'
                >
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-1.5 h-6 bg-pink-600 rounded-full' />
                    <h2 className='text-lg md:text-xl font-bold'>
                      {section.title}
                    </h2>
                  </div>

                  <div className='text-zinc-400 text-sm md:text-base leading-relaxed pl-5 border-l border-zinc-800'>
                    <SectionContent id={section.id} />
                  </div>
                </motion.section>
              ))}
            </div>

            {/* BACK */}
            <div className='mt-14 pt-8 border-t border-zinc-800 text-center'>
              <Link
                href='/'
                className='inline-flex bg-white text-black hover:bg-pink-600 hover:text-white px-8 py-4 rounded-full font-bold transition'
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

/* CONTENT */
function SectionContent({ id }: { id: string }) {
  switch (id) {
    case "info-collection":
      return (
        <ul className='space-y-2'>
          <li>Patient information (name, DOB, medical history)</li>
          <li>Payment information via secure processors</li>
          <li>Technical usage data</li>
        </ul>
      );

    case "info-use":
      return (
        <ul className='space-y-2'>
          <li>Appointment and treatment management</li>
          <li>Payment processing</li>
          <li>Client communication</li>
        </ul>
      );

    case "info-sharing":
      return (
        <>
          <p>We only share data when necessary:</p>
          <ul className='space-y-2 mt-2'>
            <li>Healthcare coordination</li>
            <li>Service providers (Jane App, Square)</li>
            <li>Legal compliance</li>
          </ul>
        </>
      );

    case "security":
      return <p>We use industry-standard safeguards to protect your data.</p>;

    case "cookies":
      return <p>Cookies are used only for functionality and analytics.</p>;

    case "rights":
      return (
        <p>You may request access or correction of your data at any time.</p>
      );

    case "children":
      return <p>Services are not intended for individuals under 13.</p>;

    case "changes":
      return <p>This policy may be updated at any time.</p>;

    default:
      return null;
  }
}
