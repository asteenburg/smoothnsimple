import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function About() {
  return (
    <div className='flex flex-col min-h-screen overflow-x-hidden'>
      <Header />

      <main className='flex-1 px-6 py-12 bg-gray-50 dark:bg-black flex flex-col items-center'>
        <div className='max-w-4xl w-full text-center'>
          {/* Heading */}
          <h1 className='text-4xl font-bold mb-6'>About Smooth N Simple</h1>

          <p className='text-lg text-gray-600 dark:text-gray-300 mb-10'>
            Personalized, natural-looking results in a safe and professional
            environment.
          </p>

          {/* Profile + Content */}
          <div className='bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-8 text-left'>
            {/* 👇 Profile Image Placeholder */}
            <div className='w-40 h-40 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center'>
              <img
                src='../../images/headshot.jpeg'
                alt='Shelby - Nurse Injector'
                className='w-full h-full object-cover'
              />
            </div>

            {/* Text Content */}
            <div className='space-y-5'>
              <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                Hi, I’m <span className='font-semibold'>Shelby</span>, a
                certified cosmetic nurse injector with experience in enhancing
                natural beauty through Botox and dermal fillers.
              </p>

              <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                I’m passionate about helping my clients feel confident and
                refreshed with personalized treatment plans tailored to their
                individual needs.
              </p>

              <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                Whether you’re looking to smooth fine lines or restore volume,
                I’m here to provide safe, effective, and professional results in
                a comfortable and welcoming environment.
              </p>

              <p className='text-gray-900 dark:text-white font-semibold text-lg pt-2'>
                Let’s work together to bring out your best self.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className='mt-10'>
            <a
              href='https://smoothnsimple.janeapp.com/'
              className='inline-block bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition'
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
