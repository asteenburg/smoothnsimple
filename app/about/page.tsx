import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function About() {
  return (
    <div className='flex flex-col min-h-screen overflow-x-hidden'>
      <Header />

      <main className='flex-1 px-6 py-12 bg-gray-50 text-black dark:bg-black dark:text-white flex flex-col items-center'>
        <div className='mt-20 max-w-4xl w-full md:text-left text-left'>
          {/* Heading */}
          <div data-aos='fade-down'>
            <h1 className='md:text-5xl text-3xl tracking-tighter uppercase italic font-bold mb-4 md:text-left text-left text-black dark:text-gray-300'>
              <span className='md:text-6xl'>About</span>
              <br />
              Smooth <span className='text-pink-600'>N</span> Simple
            </h1>
            <div className='h-1 w-24 bg-pink-600 rounded-full mb-10'></div>
          </div>
          <p
            className='text-lg text-gray-600 dark:text-gray-300 mb-10'
            data-aos='fade-in'
          >
            Personalized, natural-looking results in a safe and professional 
            medical aesthetics environment in Brantford.
          </p>

          {/* Profile + Content */}
          <div data-aos='fade-up'>
            <div className='bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-8 text-left'>
              {/* Profile Image */}
              <div className='w-40 h-40 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center'>
                <img
                  src='../../images/headshot.jpeg'
                  alt='Shelby - Certified Nurse Injector at Smooth N Simple Brantford'
                  className='w-full h-full object-cover'
                />
              </div>

              {/* Text Content */}
              <div className='space-y-5'>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  Hi, I’m <span className='font-semibold'>Shelby</span>, a 
                  certified cosmetic nurse injector specializing in Botox and aesthetic treatments.
                </p>

                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  I’m passionate about helping my clients feel confident and 
                  refreshed with natural-looking results through personalized 
                  treatment plans tailored to each individual in the Brant County area.
                </p>

                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  Whether you’re looking to smooth fine lines or prevent deeper 
                  wrinkles, I provide safe, effective, and professional Botox 
                  treatments in a comfortable and welcoming environment.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className='mt-10'>
              <a
                href='https://smoothnsimple.janeapp.com/'
                className='inline-block bg-black text-white dark:bg-pink-600 dark:text-white px-6 py-3 rounded-xl hover:opacity-90 transition'
              >
                Book a Consultation <span className="sr-only">with Shelby in Brantford</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
