"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Calendar,
  Droplets,
  Syringe,
  ScanFace,
  Sprout,
  ShieldCheck,
  CircleHelp,
  Microscope,
} from "lucide-react";

const TREATMENTS = [
  {
    id: "treatment-1",
    title: "Microneedling",
    subtitle: "Natural Skin Renewal",
    image: "/images/microneedle.jpeg",
    icon: Sparkles,
    description:
      "Microneedling uses ultra-fine needles to create controlled micro-channels in the skin, triggering your body's natural renewal process to refresh the skin's surface and improve overall texture and tone.",
    benefits: [
      "Supports natural skin renewal",
      "Refines uneven skin texture and tone",
      "Minimizes the appearance of pores",
    ],
    bookingUrl:
      "https://smoothnsimple.janeapp.com/#/staff_member/1/treatment/10",
    ctaText: "Book Microneedling",
  },
  {
    id: "treatment-2",
    title: "PRP with Microneedling",
    subtitle: "Advanced Skin Rejuvenation",
    image: "/images/prp-with-microneedle.jpeg",
    icon: Sparkles,
    description:
      "Combining microneedling with platelet-rich plasma prepared from your own blood, this treatment applies your natural growth factors directly to the skin to support deeper rejuvenation, radiance, and smoother texture.",
    benefits: [
      "Uses your body's own platelet-rich plasma",
      "Supports deeper skin renewal and radiance",
      "Improves overall skin tone and texture",
    ],
    bookingUrl:
      "https://smoothnsimple.janeapp.com/#/staff_member/1/treatment/11",
    ctaText: "Book PRP Microneedling",
  },
  {
    id: "treatment-3",
    title: "PRP Under-Eye",
    subtitle: "Delicate Area Revival",
    image:
      "/images/D6_S8jfKkJNZhYlE6yinH3fCX_wjq_X_OCIbQ6Xxyvjw2i_J9H7bEW2G6nwcvy1N9-nehwt3OQCbF_qxMt0lQIycLlVPYcdZNO9pDSNj7NYTjWfOoa8yiAWEH6YscNU8lxUy4yr0A1maj6Z1OkNlT8VjHAtzHZcpfb1ty1Wsjwy2zchZZyDzVbL4CVRo00CI.jpeg",
    icon: Syringe,
    description:
      "PRP under-eye injections use platelet-rich plasma prepared from your own blood and administered to the delicate under-eye area. This treatment aims to support natural skin renewal and improve the overall appearance of dark circles, fine lines, and under-eye texture.",
    benefits: [
      "Supports under-eye skin renewal",
      "Targets dark circles and fine lines",
      "Personalized under-eye treatment",
    ],
    bookingUrl:
      "https://smoothnsimple.janeapp.com/#/staff_member/1/treatment/6",
    ctaText: "Book PRP Under-Eye",
  },
  {
    id: "treatment-4",
    title: "PRP Hair Treatment",
    subtitle: "Scalp & Follicle Restoration",
    image: "/images/high-angle-man-getting-prp-injection-alopecia.jpg",
    icon: Syringe,
    description:
      "PRP hair restoration uses concentrated platelets from your own blood administered to targeted areas of the scalp. This treatment aims to nourish hair follicles, support healthier hair growth, and improve overall hair density.",
    benefits: [
      "Nourishes targeted hair follicles",
      "Supports thicker, fuller-looking hair",
      "Non-surgical, personalized scalp care",
    ],
    bookingUrl:
      "https://smoothnsimple.janeapp.com/#/staff_member/1/treatment/9",
    ctaText: "Book PRP Hair Treatment",
  },
];

const FAQS = [
  {
    question: "What exactly is PRP?",
    answer:
      "PRP stands for platelet-rich plasma. It is prepared using a small sample of your own blood, which is processed in a centrifuge to separate and concentrate the platelet-rich portion of the plasma.",
  },
  {
    question: "Is PRP made from my own blood?",
    answer:
      "Yes. PRP is prepared from a sample of your own blood. The sample is processed to separate the platelet-rich plasma before it is used during treatment.",
  },
  {
    question: "How many treatments will I need?",
    answer:
      "Treatment plans vary depending on the area being treated, your goals and your individual response. Your provider can discuss a recommended treatment plan during your consultation.",
  },
  {
    question: "When will I see results?",
    answer:
      "Results vary between individuals and treatment types. PRP is not an instant treatment, and improvements may develop gradually. Your provider can explain realistic expectations for your particular treatment.",
  },
  {
    question: "Is there any downtime?",
    answer:
      "Some temporary redness, swelling, tenderness or bruising may occur depending on the treatment performed. Recovery varies by individual and procedure. You will receive appropriate aftercare instructions.",
  },
  {
    question: "Am I a good candidate for PRP?",
    answer:
      "Suitability depends on your medical history, treatment area and individual circumstances. A consultation is important to determine whether PRP is appropriate for you.",
  },
];

export default function PRPPage() {
  return (
    <div className='bg-black min-h-screen text-white flex flex-col selection:bg-pink-600/30'>
      <Header />

      {/* HERO */}
      <section className='relative h-[60vh] min-h-[420px] w-full flex items-center overflow-hidden border-b border-zinc-900'>
        <div className='absolute inset-0 z-0 pointer-events-none'>
          <Image
            src='/images/joe-woods-4Zaq5xY5M_c-unsplash.jpg'
            alt='Professional PRP aesthetic treatment'
            fill
            className='object-cover opacity-35 brightness-50'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-b from-pink-600/10 via-black/40 to-black' />
        </div>

        <div className='relative z-10 max-w-5xl mx-auto text-center px-6 pt-16'>
          <p className='text-pink-500 uppercase tracking-[0.35em] text-xs md:text-sm font-bold mb-5'>
            Smooth N Simple
          </p>

          <h1 className='text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none'>
            Platelet Rich Plasma
          </h1>

          <p className='text-zinc-400 text-base md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed'>
            Discover a personalized approach to skin rejuvenation and hair
            restoration using platelet-rich plasma prepared from your own blood.
          </p>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className='py-20 md:py-28 px-6'>
        <div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-14 md:gap-20 items-center'>
          <div className='relative h-[380px] md:h-[540px] rounded-3xl overflow-hidden border border-zinc-800'>
            <Image
              src='/images/female-doctor-making-injection-woman-chin.jpg'
              alt='Platelet-rich plasma preparation'
              fill
              sizes='(max-width: 768px) 100vw, 50vw'
              className='object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
          </div>

          <div>
            <p className='text-pink-500 uppercase tracking-[0.3em] text-xs font-bold mb-5'>
              Understanding PRP
            </p>

            <h2 className='text-4xl md:text-5xl font-black tracking-tight mb-7'>
              Your Body.
              <span className='text-pink-600'> Your Plasma.</span>
              <br />
              Your Treatment.
            </h2>

            <p className='text-zinc-400 leading-relaxed mb-6'>
              Platelet-rich plasma, commonly known as PRP, is an innovative
              treatment approach that uses components of your own blood.
            </p>

            <p className='text-zinc-400 leading-relaxed mb-6'>
              A small blood sample is collected and processed using a centrifuge
              to separate the platelet-rich plasma. This concentrated plasma is
              then used in the selected treatment area.
            </p>

            <p className='text-zinc-400 leading-relaxed'>
              PRP can be incorporated into several aesthetic treatments,
              including facial injections, microneedling and hair restoration.
            </p>

            <div className='flex items-center gap-4 mt-9 p-5 bg-zinc-950 border border-zinc-800 rounded-2xl'>
              <div className='p-3 bg-pink-600/10 text-pink-500 rounded-xl'>
                <Droplets size={25} />
              </div>
              <div>
                <h3 className='font-bold text-white'>Autologous Treatment</h3>
                <p className='text-zinc-500 text-sm mt-1'>
                  Prepared from your own blood.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TREATMENTS */}
      <section
        id='treatments'
        className='py-20 md:py-28 bg-zinc-950 border-y border-zinc-900'
      >
        <div className='max-w-7xl mx-auto px-4 md:px-6'>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <p className='text-pink-500 uppercase tracking-[0.35em] text-xs font-bold mb-5'>
              Our PRP Services
            </p>

            <h2 className='text-4xl md:text-6xl font-black tracking-tight'>
              Four Treatments.
              <span className='block text-pink-600'>Personalized Care.</span>
            </h2>

            <p className='text-zinc-400 mt-6 leading-relaxed'>
              Explore our PRP treatment options and discover which approach may
              be suitable for your goals.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7'>
            {TREATMENTS.map((treatment) => {
              const Icon = treatment.icon;

              return (
                <div
                  key={treatment.id}
                  className='group bg-gradient-to-b from-black to-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col hover:border-pink-600/50 transition-all duration-300'
                >
                  <div className='relative h-72 w-full overflow-hidden'>
                    <Image
                      src={treatment.image}
                      alt={treatment.title}
                      fill
                      sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                      className='object-cover transition-transform duration-700 group-hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent' />

                    <div className='absolute bottom-5 left-6'>
                      <span className='text-pink-400 text-xs uppercase tracking-widest font-bold'>
                        PRP Treatment
                      </span>
                    </div>
                  </div>

                  <div className='p-7 flex flex-col flex-1'>
                    <div className='flex items-center gap-3 mb-3'>
                      <div className='p-2 bg-white text-black rounded-xl group-hover:bg-pink-600 group-hover:text-white transition'>
                        <Icon size={17} />
                      </div>

                      <span className='text-pink-500 text-xs uppercase tracking-widest font-bold'>
                        {treatment.subtitle}
                      </span>
                    </div>

                    <h3 className='text-2xl font-black tracking-tight mb-4 group-hover:text-pink-500 transition-colors'>
                      {treatment.title}
                    </h3>

                    <p className='text-zinc-400 text-sm leading-relaxed mb-6'>
                      {treatment.description}
                    </p>

                    <div className='border-t border-zinc-800 pt-5 mb-8 flex-1'>
                      <p className='text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4'>
                        Treatment Highlights
                      </p>

                      <ul className='space-y-3'>
                        {treatment.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className='flex items-start gap-3 text-sm text-zinc-300'
                          >
                            <Sparkles
                              size={14}
                              className='text-pink-500 mt-1 shrink-0'
                            />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={treatment.bookingUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-full py-4 bg-white text-black rounded-full font-bold flex items-center justify-center gap-3 hover:bg-pink-600 hover:text-white transition-all duration-300'
                    >
                      <Calendar size={15} />
                      {treatment.ctaText || "Book Consultation"}
                      <ArrowRight
                        size={15}
                        className='group-hover:translate-x-1 transition-transform'
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className='py-20 md:py-28 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <p className='text-pink-500 uppercase tracking-[0.35em] text-xs font-bold mb-5'>
              The Process
            </p>

            <h2 className='text-4xl md:text-5xl font-black tracking-tight'>
              How Does PRP Work?
            </h2>

            <p className='text-zinc-400 mt-6 leading-relaxed'>
              PRP treatments begin with the preparation of platelet-rich plasma
              from a small sample of your own blood.
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-10'>
            <div className='text-center'>
              <div className='w-20 h-20 mx-auto rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-pink-500 mb-6'>
                <Droplets size={30} />
              </div>
              <span className='text-pink-600 text-xs font-bold tracking-widest'>
                STEP 01
              </span>
              <h3 className='text-xl font-black mt-3 mb-3'>Blood Collection</h3>
              <p className='text-zinc-400 text-sm leading-relaxed'>
                A small sample of blood is collected by the treatment provider.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-20 h-20 mx-auto rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-pink-500 mb-6'>
                <Microscope size={30} />
              </div>
              <span className='text-pink-600 text-xs font-bold tracking-widest'>
                STEP 02
              </span>
              <h3 className='text-xl font-black mt-3 mb-3'>
                Plasma Preparation
              </h3>
              <p className='text-zinc-400 text-sm leading-relaxed'>
                The blood sample is processed in a centrifuge to separate
                platelet-rich plasma.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-20 h-20 mx-auto rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-pink-500 mb-6'>
                <Sparkles size={30} />
              </div>
              <span className='text-pink-600 text-xs font-bold tracking-widest'>
                STEP 03
              </span>
              <h3 className='text-xl font-black mt-3 mb-3'>
                Personalized Treatment
              </h3>
              <p className='text-zinc-400 text-sm leading-relaxed'>
                The prepared PRP is used according to your selected treatment
                plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className='py-20 md:py-24 bg-zinc-950 border-y border-zinc-900'>
        <div className='max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center'>
          <div>
            <p className='text-pink-500 uppercase tracking-[0.3em] text-xs font-bold mb-5'>
              A Personalized Approach
            </p>

            <h2 className='text-4xl md:text-5xl font-black tracking-tight mb-7'>
              Designed Around
              <span className='text-pink-600'> Your Goals.</span>
            </h2>

            <p className='text-zinc-400 leading-relaxed mb-8'>
              PRP offers several treatment applications. Whether your focus is
              facial rejuvenation, skin texture or hair restoration, the right
              approach begins with understanding your individual needs.
            </p>

            <ul className='space-y-5'>
              {[
                "Uses platelet-rich plasma prepared from your own blood",
                "Multiple treatment applications",
                "Individualized treatment planning",
                "Consultation-led approach",
              ].map((item) => (
                <li
                  key={item}
                  className='flex gap-4 items-center text-zinc-300'
                >
                  <ShieldCheck
                    size={20}
                    className='text-pink-500 shrink-0'
                  />
                  <span className='text-sm md:text-base'>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className='relative h-[400px] md:h-[520px] rounded-3xl overflow-hidden border border-zinc-800'>
            <Image
              src='/images/OsXT0jOGeMViv5iI6JooovCW-iqX5qoxPvtDEpGurdpTHVx1NMMXkmKd9Ej9yIQ_56fltZHz9Zd3TJlFqbFyQ0lS4Rbqd6nO73G7jnRHahCR25Ve0XcAH3s9P9uirOP_dGf7BwcjMsPM0bhn4euTgpD_iDcCw2anKXdGciPhhwtBndki00TveMcmNAB8_oux.jpeg'
              alt='Healthy-looking skin and facial rejuvenation'
              fill
              sizes='(max-width: 768px) 100vw, 50vw'
              className='object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className='py-20 md:py-28 px-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-14'>
            <div className='flex justify-center mb-5'>
              <div className='p-3 rounded-xl bg-pink-600/10 text-pink-500'>
                <CircleHelp size={27} />
              </div>
            </div>

            <p className='text-pink-500 uppercase tracking-[0.3em] text-xs font-bold mb-5'>
              Frequently Asked Questions
            </p>

            <h2 className='text-4xl md:text-5xl font-black tracking-tight'>
              Good Questions.
              <span className='text-pink-600'> Clear Answers.</span>
            </h2>
          </div>

          <div className='space-y-4'>
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className='group bg-zinc-950 border border-zinc-800 rounded-2xl p-6 open:border-pink-600/40 transition-colors'
              >
                <summary className='cursor-pointer list-none flex items-center justify-between gap-5'>
                  <span className='font-bold text-white text-base md:text-lg'>
                    {faq.question}
                  </span>

                  <ArrowRight
                    size={18}
                    className='text-pink-500 shrink-0 rotate-90 group-open:-rotate-90 transition-transform'
                  />
                </summary>

                <p className='text-zinc-400 text-sm leading-relaxed mt-5 pr-6'>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTATION */}
      <section className='px-4 md:px-6 pb-20 md:pb-28'>
        <div className='max-w-6xl mx-auto relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-950 to-black p-10 md:p-20 text-center'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-pink-600/10 blur-[100px] pointer-events-none' />

          <div className='relative z-10'>
            <p className='text-pink-500 uppercase tracking-[0.35em] text-xs font-bold mb-5'>
              Your Next Step
            </p>

            <h2 className='text-4xl md:text-6xl font-black tracking-tight mb-6'>
              Ready to Explore
              <span className='block text-pink-600'>PRP Treatments?</span>
            </h2>

            <p className='text-zinc-400 text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed'>
              Every treatment journey starts with a conversation. Schedule a
              consultation to discuss your goals and determine which PRP
              treatment may be right for you.
            </p>

            <Link
              href='https://smoothnsimple.janeapp.com/#/staff_member/1/treatment/8'
              className='inline-flex items-center justify-center gap-3 px-10 py-5 bg-pink-600 text-white rounded-full font-bold hover:bg-pink-500 transition-all duration-300'
            >
              <Calendar size={17} />
              Schedule Your Consultation
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* MEDICAL DISCLAIMER */}
      <section className='pb-12 px-6'>
        <div className='max-w-5xl mx-auto border-t border-zinc-900 pt-7'>
          <p className='text-zinc-600 text-xs leading-relaxed text-center'>
            PRP treatment outcomes vary between individuals. Results are not
            guaranteed. PRP may not be suitable for everyone. All treatments are
            subject to consultation, medical history review and provider
            assessment. Individual risks, benefits and aftercare should be
            discussed with your provider.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
