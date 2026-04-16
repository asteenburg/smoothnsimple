import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Referral Terms | Smooth n Simple",
  description:
    "Review the terms and conditions for the Smooth n Simple referral program.",
};

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

export default function ReferralTermsPage() {
  return (
    <main className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 scroll-smooth'>
      <Header />
      <div className='max-w-6xl mx-auto mt-8 mb-12 grid grid-cols-1 lg:grid-cols-4 gap-8'>
        {/* Table of Contents */}
        <nav className='hidden lg:block sticky top-24 self-start'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>Contents</h2>
          <ul className='space-y-2 text-gray-700'>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className='hover:text-pink-600 transition-colors'
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <div className='lg:col-span-3 bg-white shadow-md rounded-xl p-8 flex flex-col'>
          <h1 className='text-3xl font-bold text-gray-900 mb-6 text-center'>
            Referral Program Terms & Conditions
          </h1>

          <p className='mb-4 text-gray-700'>
            The Smooth n Simple referral program is designed to reward loyal
            clients while maintaining fairness and integrity. By participating,
            you agree to the following terms and conditions.
          </p>

          {/* Sections */}
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className='mb-6'
            >
              <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                {section.title}
              </h2>
              <SectionContent id={section.id} />
            </section>
          ))}

          {/* Back Button */}
          <div className='mt-auto text-center'>
            <Link
              href='/'
              className='inline-block bg-pink-500 text-white px-6 py-2 rounded-lg shadow hover:bg-pink-600 transition-colors'
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function SectionContent({ id }: { id: string }) {
  switch (id) {
    case "eligibility":
      return (
        <ul className='list-disc list-inside text-gray-700 space-y-1'>
          <li>Program is available to existing Smooth n Simple clients</li>
          <li>Referred individuals must be new clients</li>
          <li>All participants must be 18 years of age or older</li>
        </ul>
      );

    case "rewards":
      return (
        <ul className='list-disc list-inside text-gray-700 space-y-1'>
          <li>Discount applies to the referred client’s first visit only</li>
          <li>No cash value and cannot be redeemed for cash</li>
          <li>Cannot be applied retroactively to past services</li>
        </ul>
      );

    case "one-time":
      return (
        <p className='text-gray-700'>
          Each referral discount code is valid for a single use only. Once
          redeemed, the code is permanently invalid.
        </p>
      );

    case "non-transferable":
      return (
        <p className='text-gray-700'>
          Referral codes are non-transferable and may only be used by the
          individual to whom they were issued. Codes may not be shared,
          distributed, or sold.
        </p>
      );

    case "limits":
      return (
        <p className='text-gray-700'>
          Each new client may only be referred once. Multiple referrals using
          different email addresses or identities for the same individual are
          not permitted.
        </p>
      );

    case "abuse":
      return (
        <>
          <p className='text-gray-700'>
            Smooth n Simple reserves the right to cancel or revoke referral
            benefits if misuse is detected, including:
          </p>
          <ul className='list-disc list-inside text-gray-700 space-y-1 mt-2'>
            <li>Self-referrals</li>
            <li>Multiple accounts or fake identities</li>
            <li>
              Public sharing of codes (forums, coupon sites, social media)
            </li>
            <li>Attempts to bypass program restrictions</li>
          </ul>
        </>
      );

    case "verification":
      return (
        <p className='text-gray-700'>
          We reserve the right to verify participant identity and eligibility
          before applying any referral discount.
        </p>
      );

    case "modifications":
      return (
        <p className='text-gray-700'>
          Smooth n Simple may modify, suspend, or terminate the referral program
          at any time without prior notice.
        </p>
      );

    case "general":
      return (
        <p className='text-gray-700'>
          Referral discounts cannot be combined with other promotions unless
          explicitly stated. All decisions made by Smooth n Simple are final.
        </p>
      );

    case "liability":
      return (
        <p className='text-gray-700'>
          Smooth n Simple is not responsible for lost, misused, or unauthorized
          use of referral codes.
        </p>
      );

    default:
      return null;
  }
}
