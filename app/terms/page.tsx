import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ReferralTermsPage() {
  const sections = [
    { id: "eligibility", title: "1. Eligibility" },
    { id: "rewards", title: "2. Referral Rewards" },
    { id: "one-time", title: "3. One-Time Use" },
    { id: "non-transferable", title: "4. Non-Transferable" },
    { id: "limits", title: "5. Referral Limits" },
    { id: "abuse", title: "6. Fraud, Abuse & Misuse" },
    { id: "verification", title: "7. Verification & Redemption" },
    { id: "modifications", title: "8. Modifications & Termination" },
    { id: "general", title: "9. General Conditions" },
    { id: "liability", title: "10. Limitation of Liability" },
  ];

  return (
    <main className='min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8 scroll-smooth'>
      <Header />

      <div className='max-w-6xl mx-auto mt-10 mb-16 grid grid-cols-1 lg:grid-cols-4 gap-10'>
        {/* TABLE OF CONTENTS (polished only) */}
        <nav className='hidden lg:block sticky top-24 self-start'>
          <h2 className='text-xs uppercase tracking-[0.3em] text-zinc-500 mb-6'>
            Contents
          </h2>

          <ul className='space-y-3 text-sm'>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className='text-zinc-400 hover:text-pink-500 transition-colors'
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* MAIN CONTENT CARD */}
        <div className='lg:col-span-3'>
          <div className='bg-gradient-to-b from-zinc-950 to-black border border-zinc-800 rounded-3xl p-8 md:p-10'>
            {/* HEADER */}
            <h1 className='text-3xl md:text-4xl font-black tracking-tight mb-4'>
              Referral Program Terms & Conditions
            </h1>

            <p className='text-zinc-400 text-sm md:text-base leading-relaxed mb-12 max-w-2xl'>
              These terms outline eligibility, rewards, and program conditions
              for Smooth N Simple promotions and referral benefits.
            </p>

            {/* SECTIONS */}
            <div className='space-y-12'>
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className='scroll-mt-28'
                >
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-1.5 h-6 bg-pink-600 rounded-full' />
                    <h2 className='text-lg md:text-xl font-bold tracking-tight'>
                      {section.title}
                    </h2>
                  </div>

                  <div className='text-zinc-400 leading-relaxed text-sm md:text-base pl-5 border-l border-zinc-800'>
                    <SectionContent id={section.id} />
                  </div>
                </section>
              ))}
            </div>

            {/* BACK BUTTON */}
            <div className='mt-14 pt-8 border-t border-zinc-800 text-center'>
              <Link
                href='/'
                className='inline-flex items-center justify-center bg-white text-black hover:bg-pink-600 hover:text-white px-8 py-4 rounded-full font-bold transition'
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

/* CONTENT (unchanged logic — only wrapped styling improves via parent) */
function SectionContent({ id }: { id: string }) {
  switch (id) {
    case "eligibility":
      return (
        <ul className='space-y-2'>
          <li>
            Referral program is available to current Smooth N Simple clients.
          </li>
          <li>Referred individuals must qualify as new clients.</li>
          <li>
            A new client is someone who has never previously booked, received
            treatment, purchased services, or redeemed any promotion.
          </li>
          <li>Duplicate accounts or alternate identities are not eligible.</li>
          <li>All participants must be 18 years or older.</li>
        </ul>
      );

    case "rewards":
      return (
        <ul className='space-y-2'>
          <li>New clients may receive $6/unit Botox promotional pricing.</li>
          <li>Referrers receive 10% off after successful referral.</li>
          <li>Rewards apply only after completed paid appointment.</li>
          <li>No cash value or cash redemption.</li>
        </ul>
      );

    case "one-time":
      return <p>Offers are valid for one-time use unless otherwise stated.</p>;

    case "non-transferable":
      return (
        <p>
          Offers are non-transferable and may not be shared, sold, or
          reassigned.
        </p>
      );

    case "limits":
      return <p>Each new client may only be referred once.</p>;

    case "abuse":
      return (
        <p>
          Misuse, fraud, or abuse may result in cancellation of rewards or
          eligibility.
        </p>
      );

    case "verification":
      return (
        <p>
          Eligibility and referral validity may be verified prior to reward
          issuance.
        </p>
      );

    case "modifications":
      return (
        <p>
          Smooth N Simple may update or modify these terms at any time without
          notice.
        </p>
      );

    case "general":
      return (
        <ul className='space-y-2'>
          <li>Promotions cannot be combined unless explicitly stated.</li>
          <li>One offer per client per visit.</li>
          <li>All decisions are final.</li>
        </ul>
      );

    case "liability":
      return (
        <p>
          Smooth N Simple is not responsible for lost, misused, or invalid
          referral codes or promotions.
        </p>
      );

    default:
      return null;
  }
}
