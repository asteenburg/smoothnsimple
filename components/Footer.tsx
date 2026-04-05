// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className='w-full p-6 text-center bg-gray-100 dark:bg-gray-900'>
      <p className='text-sm text-gray-600 dark:text-gray-300 mb-2'>
        &copy; {new Date().getFullYear()} Smooth n Simple. All rights reserved.
      </p>
      <p className='text-sm text-gray-600 dark:text-gray-300'>
        <Link
          href='/privacy'
          className='underline hover:text-blue-600 dark:hover:text-blue-400'
        >
          Privacy Policy
        </Link>
      </p>
    </footer>
  );
}
