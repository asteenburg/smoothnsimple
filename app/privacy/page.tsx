// app/privacy/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Smooth n Simple",
  description:
    "Learn how Smooth n Simple protects your personal and patient information.",
};

const sections = [
  { id: "info-collection", title: "1. Information We Collect" },
  { id: "info-use", title: "2. How We Use Your Information" },
  { id: "info-sharing", title: "3. Information Sharing" },
  { id: "security", title: "4. Security" },
  { id: "cookies", title: "5. Cookies and Tracking" },
  { id: "rights", title: "6. Your Rights" },
  { id: "children", title: "7. Children’s Privacy" },
  { id: "changes", title: "8. Changes to This Privacy Statement" },
];

export default function PrivacyPage() {
  return (
    <main className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 scroll-smooth'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8'>
        {/* Table of Contents */}
        <nav className='hidden lg:block sticky top-24 self-start'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>Contents</h2>
          <ul className='space-y-2 text-gray-700'>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
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
            Privacy Policy
          </h1>

          <p className='mb-4 text-gray-700'>
            At <strong>Smooth n Simple</strong>, protecting your privacy is a
            top priority. This Privacy Statement explains how we collect, use,
            and safeguard your information when you use{" "}
            <a
              href='https://smoothnsimple.janeapp.com'
              className='text-blue-600 underline'
            >
              smoothnsimple.janeapp.com
            </a>{" "}
            and related services.
          </p>

          {/* Sections */}
          {sections.map((section) => (
            <section
              id={section.id}
              key={section.id}
              className='mb-6'
            >
              <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                {section.title}
              </h2>
              <SectionContent id={section.id} />
            </section>
          ))}

          {/* Back to Home Button */}
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
    </main>
  );
}

// Content for each section
function SectionContent({ id }: { id: string }) {
  switch (id) {
    case "info-collection":
      return (
        <ul className='list-disc list-inside text-gray-700 space-y-1'>
          <li>
            <strong>Patient Information:</strong> Name, date of birth, contact
            info, health history, and medical details.
          </li>
          <li>
            <strong>Payment Information:</strong> Credit card or other payment
            info processed securely via Square.
          </li>
          <li>
            <strong>Technical Data:</strong> IP address, browser type, device
            info, and usage data.
          </li>
        </ul>
      );
    case "info-use":
      return (
        <ul className='list-disc list-inside text-gray-700 space-y-1'>
          <li>Provide healthcare services and manage appointments.</li>
          <li>Process payments securely.</li>
          <li>Communicate regarding treatments, billing, or updates.</li>
          <li>Improve our services and website.</li>
        </ul>
      );
    case "info-sharing":
      return (
        <>
          <p className='text-gray-700'>
            We only share information in limited circumstances:
          </p>
          <ul className='list-disc list-inside text-gray-700 space-y-1 mt-2'>
            <li>
              Healthcare providers, as authorized by you, to coordinate your
              care.
            </li>
            <li>
              Service providers like Jane App and Square, who process
              information on our behalf under strict security standards.
            </li>
            <li>Legal requirements when required by law.</li>
          </ul>
          <p className='text-gray-700 mt-2'>
            <strong>
              We do not sell or trade your personal health information.
            </strong>
          </p>
        </>
      );
    case "security":
      return (
        <p className='text-gray-700'>
          We implement reasonable technical, administrative, and physical
          safeguards to protect your information. All payments are processed
          through Square, which complies with PCI DSS standards.
        </p>
      );
    case "cookies":
      return (
        <p className='text-gray-700'>
          Our website may use cookies for functionality and analytics. These do
          not collect personal health information. You may disable cookies in
          your browser, but some features may not function properly.
        </p>
      );
    case "rights":
      return (
        <p className='text-gray-700'>
          Under PHIPA, you have the right to access, correct, or request
          withdrawal of your personal health information. To exercise these
          rights, contact us at{" "}
          <a
            href='mailto:nurseinjectorshelby@gmail.com'
            className='text-blue-600 underline'
          >
            nurseinjectorshelby@gmail.com
          </a>
          .
        </p>
      );
    case "children":
      return (
        <p className='text-gray-700'>
          Our services are not intended for children under 13.
        </p>
      );
    case "changes":
      return (
        <p className='text-gray-700'>
          We may update this Privacy Statement from time to time. The “Effective
          Date” at the top reflects the latest update.
        </p>
      );
    default:
      return null;
  }
}
