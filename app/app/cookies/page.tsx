// app/cookies/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Cookies Policy | Smooth n Simple",
  description:
    "Learn how Smooth n Simple uses cookies and tracking technologies on our website.",
};

export default function CookiesPage() {
  return (
    <main className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 scroll-smooth'>
      <div className='max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8 flex flex-col'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6 text-center'>
          Cookies Policy
        </h1>

        <p className='mb-4 text-gray-700'>
          Smooth n Simple uses cookies and similar technologies to enhance your
          browsing experience, provide functionality, and analyze site usage.
          Cookies are small text files stored on your device that help us
          remember your preferences.
        </p>

        <section
          id='types'
          className='mb-6'
        >
          <h2 className='text-xl font-semibold text-gray-800 mb-2'>
            Types of Cookies
          </h2>
          <ul className='list-disc list-inside text-gray-700 space-y-1'>
            <li>
              <strong>Essential:</strong> Required for website functionality.
            </li>
            <li>
              <strong>Analytics:</strong> Help us understand how users interact
              with our site.
            </li>
            <li>
              <strong>Preferences:</strong> Remember your settings such as
              language and theme.
            </li>
            <li>
              <strong>Marketing:</strong> Track user behavior for advertising
              purposes (if applicable).
            </li>
          </ul>
        </section>

        <section
          id='control'
          className='mb-6'
        >
          <h2 className='text-xl font-semibold text-gray-800 mb-2'>
            Managing Cookies
          </h2>
          <p className='text-gray-700'>
            You can choose to accept, decline, or manage cookies using the
            banner that appears when you first visit our site. You can also
            adjust your browser settings to block or delete cookies. Note that
            disabling essential cookies may affect site functionality.
          </p>
        </section>

        <div className='mt-auto text-center'>
          <Link
            href='/'
            className='inline-block bg-pink-500 text-white px-6 py-2 rounded-lg shadow hover:bg-pink-600 transition-colors'
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
