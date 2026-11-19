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
  Microscope,
  ScanFace,
  ShieldCheck,
  CircleHelp,
  Layers,
  HeartPulse,
} from "lucide-react";

const TREATMENTS = [
  {
    id: "microneedling",
    title: "Microneedling",
    subtitle: "Natural Skin Renewal",
    image: "/images/microneedle.jpeg",
    description:
      "Microneedling uses ultra-fine needles to create controlled micro-channels in the skin, stimulating the body's natural renewal response. This treatment helps improve the appearance of uneven skin texture, fine lines, enlarged pores and overall skin tone.",
    benefits: [
      "Supports natural collagen production",
      "Improves the appearance of skin texture and tone",
      "Helps minimize the appearance of pores",
      "Targets the appearance of fine lines",
    ],
    bookingUrl:
      "https://smoothnsimple.janeapp.com/#/staff_member/1/treatment/10",
    ctaText: "Book Microneedling",
  },
  {
    id: "prp-microneedling",
    title: "PRP Microneedling",
    subtitle: "Advanced Skin Rejuvenation",
    image: "/images/prp-with-microneedle.jpeg",
    description:
      "PRP microneedling combines traditional microneedling with platelet-rich plasma prepared from your own blood. The PRP is applied during the treatment to complement the skin renewal process and support a personalized approach to skin rejuvenation.",
    benefits: [
      "Combines microneedling with your own PRP",
      "Supports the skin's natural renewal process",
      "Targets uneven texture and skin tone",
      "Supports smoother, healthier-looking skin",
    ],
    bookingUrl:
      "https://smoothnsimple.janeapp.com/#/staff_member/1/treatment/11",
    ctaText: "Book PRP Microneedling",
  },
];

const FAQS = [
  {
    question: "What is microneedling?",
    answer:
      "Microneedling is a cosmetic skin treatment that uses a specialized device with fine needles to create controlled micro-channels in the skin. This stimulates the body's natural healing response and supports collagen production.",
  },
  {
    question:
      "What is the difference between microneedling and PRP microneedling?",
    answer:
      "Traditional microneedling uses controlled micro-channels to stimulate the skin's natural renewal process. PRP microneedling combines this treatment with platelet-rich plasma prepared from your own blood, which is applied during the procedure.",
  },
  {
    question: "What exactly is PRP?",
    answer:
      "PRP stands for platelet-rich plasma. It is prepared using a small sample of your own blood, which is processed in a centrifuge to separate and concentrate the platelet-rich portion of the plasma.",
  },
  {
    question: "What skin concerns can microneedling address?",
    answer:
      "Microneedling may help improve the appearance of uneven skin texture, fine lines, enlarged pores and uneven skin tone. Your provider can discuss whether the treatment is appropriate for your individual skin concerns.",
  },
  {
    question: "How many treatments will I need?",
    answer:
      "Treatment plans vary depending on your skin, treatment goals and individual response. Multiple sessions may be recommended. Your provider can discuss an appropriate treatment plan during your consultation.",
  },
  {
    question: "Is there any downtime?",
    answer:
      "Temporary redness, sensitivity, swelling or mild irritation can occur following treatment. Recovery varies depending on the individual and the treatment performed. You will receive specific aftercare instructions.",
  },
  {
    question: "Is PRP microneedling made from my own blood?",
    answer:
      "Yes. PRP is prepared from a small sample of your own blood. The sample is processed to separate the platelet-rich plasma before it is incorporated into your treatment.",
  },
  {
    question: "Am I a good candidate for microneedling?",
    answer:
      "Suitability depends on your skin condition, medical history and individual circumstances. A consultation is important to determine whether microneedling or PRP microneedling is appropriate for you.",
  },
];

export default function MicroneedlingPage() {
  return (
    <div className='bg-black min-h-screen text-white flex flex-col selection:bg-pink-600/30'>
      <Header />

      {/* HERO */}
      <section className='mt-8 relative h-[60vh] min-h-[420px] w-full flex items-center overflow-hidden border-b border-zinc-900'>
        <div className='absolute inset-0 z-0 pointer-events-none'>
          <Image
            src='/images/microneedle.jpeg'
            alt='Professional microneedling skin treatment'
            fill
            className='object-cover opacity-35 brightness-50'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-b from-pink-600/10 via-black/50 to-black' />
        </div>

        <div className='relative z-10 max-w-5xl mx-auto text-center px-6 pt-16'>
          <p className='text-pink-500 uppercase tracking-[0.35em] text-xs md:text-sm font-bold mb-5'>
            Smooth N Simple
          </p>

          <h1 className='text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none'>
            Microneedling
          </h1>

          <p className='text-zinc-300 text-base md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed'>
            Reveal a refreshed complexion with personalized skin rejuvenation.
            Discover the benefits of traditional microneedling and advanced PRP
            microneedling.
          </p>

          <Link
            href='#treatments'
            className='inline-flex items-center gap-3 mt-9 px-8 py-4 bg-pink-600 text-white rounded-full font-bold hover:bg-pink-500 transition-all'
          >
            Explore Treatments
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className='py-20 md:py-28 px-6'>
        <div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-14 md:gap-20 items-center'>
          <div className='relative h-[380px] md:h-[540px] rounded-3xl overflow-hidden border border-zinc-800'>
            <Image
              src='/images/microneedle.jpeg'
              alt='Microneedling facial treatment'
              fill
              sizes='(max-width: 768px) 100vw, 50vw'
              className='object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
          </div>

          <div>
            <p className='text-pink-500 uppercase tracking-[0.3em] text-xs font-bold mb-5'>
              Understanding Microneedling
            </p>

            <h2 className='text-4xl md:text-5xl font-black tracking-tight mb-7'>
              Renew Your Skin.
              <span className='text-pink-600'> Restore Your Glow.</span>
            </h2>

            <p className='text-zinc-400 leading-relaxed mb-6'>
              Microneedling is a popular skin rejuvenation treatment designed to
              improve the appearance and overall texture of your skin.
            </p>

            <p className='text-zinc-400 leading-relaxed mb-6'>
              Using a specialized device with ultra-fine needles, controlled
              micro-channels are created in the skin. This activates the body's
              natural healing response and supports collagen production.
            </p>

            <p className='text-zinc-400 leading-relaxed'>
              For those looking to take their treatment further, PRP
              microneedling combines this process with platelet-rich plasma
              prepared from your own blood.
            </p>

            <div className='flex items-center gap-4 mt-9 p-5 bg-zinc-950 border border-zinc-800 rounded-2xl'>
              <div className='p-3 bg-pink-600/10 text-pink-500 rounded-xl'>
                <Sparkles size={25} />
              </div>
              <div>
                <h3 className='font-bold text-white'>
                  Personalized Skin Rejuvenation
                </h3>
                <p className='text-zinc-500 text-sm mt-1'>
                  Treatment options designed around your skin goals.
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
              Our Services
            </p>

            <h2 className='text-4xl md:text-6xl font-black tracking-tight'>
              Two Treatments.
              <span className='block text-pink-600'>One Focus. Your Skin.</span>
            </h2>

            <p className='text-zinc-400 mt-6 leading-relaxed'>
              Whether you are exploring traditional microneedling or the added
              benefits of PRP, discover the treatment approach that best aligns
              with your skin goals.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {TREATMENTS.map((treatment) => (
              <div
                key={treatment.id}
                className='group bg-gradient-to-b from-black to-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col hover:border-pink-600/50 transition-all duration-300'
              >
                <div className='relative h-72 md:h-80 w-full overflow-hidden'>
                  <Image
                    src={treatment.image}
                    alt={treatment.title}
                    fill
                    sizes='(max-width: 768px) 100vw, 50vw'
                    className='object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent' />

                  <div className='absolute bottom-5 left-6'>
                    <span className='text-pink-400 text-xs uppercase tracking-widest font-bold'>
                      Skin Rejuvenation
                    </span>
                  </div>
                </div>

                <div className='p-7 md:p-9 flex flex-col flex-1'>
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='p-2 bg-white text-black rounded-xl group-hover:bg-pink-600 group-hover:text-white transition'>
                      {treatment.id === "microneedling" ? (
                        <ScanFace size={19} />
                      ) : (
                        <Droplets size={19} />
                      )}
                    </div>

                    <span className='text-pink-500 text-xs uppercase tracking-widest font-bold'>
                      {treatment.subtitle}
                    </span>
                  </div>

                  <h3 className='text-2xl md:text-3xl font-black tracking-tight mb-4 group-hover:text-pink-500 transition-colors'>
                    {treatment.title}
                  </h3>

                  <p className='text-zinc-400 text-sm leading-relaxed mb-7'>
                    {treatment.description}
                  </p>

                  <div className='border-t border-zinc-800 pt-6 mb-8 flex-1'>
                    <p className='text-xs uppercase tracking-widest text-zinc-500 font-bold mb-5'>
                      Treatment Highlights
                    </p>

                    <ul className='space-y-4'>
                      {treatment.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className='flex items-start gap-3 text-sm text-zinc-300'
                        >
                          <Sparkles
                            size={15}
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
                    {treatment.ctaText}
                    <ArrowRight
                      size={15}
                      className='group-hover:translate-x-1 transition-transform'
                    />
                  </Link>
                </div>
              </div>
            ))}
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
              How Does It Work?
            </h2>

            <p className='text-zinc-400 mt-6 leading-relaxed'>
              Both treatments use microneedling to stimulate the skin's natural
              renewal response. PRP microneedling includes an additional
              preparation step.
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-10'>
            <div className='text-center'>
              <div className='w-20 h-20 mx-auto rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-pink-500 mb-6'>
                <ScanFace size={30} />
              </div>

              <span className='text-pink-600 text-xs font-bold tracking-widest'>
                STEP 01
              </span>

              <h3 className='text-xl font-black mt-3 mb-3'>Skin Preparation</h3>

              <p className='text-zinc-400 text-sm leading-relaxed'>
                The treatment area is assessed and prepared. Your provider will
                discuss your skin goals and the appropriate treatment approach.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-20 h-20 mx-auto rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-pink-500 mb-6'>
                <Microscope size={30} />
              </div>

              <span className='text-pink-600 text-xs font-bold tracking-widest'>
                STEP 02
              </span>

              <h3 className='text-xl font-black mt-3 mb-3'>Microneedling</h3>

              <p className='text-zinc-400 text-sm leading-relaxed'>
                A specialized microneedling device creates controlled
                micro-channels in the skin to stimulate its natural renewal
                response.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-20 h-20 mx-auto rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-pink-500 mb-6'>
                <Droplets size={30} />
              </div>

              <span className='text-pink-600 text-xs font-bold tracking-widest'>
                STEP 03
              </span>

              <h3 className='text-xl font-black mt-3 mb-3'>PRP Enhancement</h3>

              <p className='text-zinc-400 text-sm leading-relaxed'>
                For PRP microneedling, a small blood sample is processed to
                separate platelet-rich plasma, which is incorporated into the
                treatment.
              </p>
            </div>
          </div>

          <div className='mt-12 p-6 md:p-8 rounded-2xl border border-zinc-800 bg-zinc-950 text-center'>
            <p className='text-zinc-400 text-sm leading-relaxed max-w-3xl mx-auto'>
              The PRP preparation step applies specifically to PRP
              microneedling. Traditional microneedling does not require a blood
              sample.
            </p>
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
              Invest in Your Skin.
              <span className='text-pink-600'> Discover Your Glow.</span>
            </h2>

            <p className='text-zinc-400 leading-relaxed mb-8'>
              Every person's skin is different. Microneedling offers a
              personalized approach to improving the appearance of skin texture,
              tone and overall complexion.
            </p>

            <ul className='space-y-5'>
              {[
                "Supports natural collagen production",
                "Improves the appearance of skin texture",
                "Targets the appearance of fine lines and pores",
                "Two treatment options to explore",
                "Personalized treatment planning",
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
              src='/images/prp-with-microneedle.jpeg'
              alt='Professional PRP microneedling treatment'
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
              Ready to Refresh
              <span className='block text-pink-600'>Your Skin?</span>
            </h2>

            <p className='text-zinc-400 text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed'>
              Whether you're interested in traditional microneedling or PRP
              microneedling, your journey starts with a conversation. Schedule a
              consultation to explore your options and determine the right
              approach for your skin.
            </p>

            <Link
              href='https://smoothnsimple.janeapp.com/#/staff_member/1/treatment/8'
              target='_blank'
              rel='noopener noreferrer'
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
            Microneedling and PRP treatment outcomes vary between individuals.
            Results are not guaranteed. These treatments may not be suitable for
            everyone. All treatments are subject to consultation, medical
            history review and provider assessment. Individual risks, benefits,
            contraindications and aftercare should be discussed with your
            provider.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
