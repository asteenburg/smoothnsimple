export default function Footer() {
  return (
    <footer className="w-full p-6 text-center bg-gray-100 dark:bg-gray-900">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        &copy; {new Date().getFullYear()} Smooth n Simple. All rights reserved.
      </p>
    </footer>
  );
}