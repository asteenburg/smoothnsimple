import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function About() {
  return (
    <div className='flex flex-col min-h-screen overflow-x-hidden bg-black text-white'>
      <Header />

      <main className='flex-1 px-6 py-14 md:py-20 flex flex-col items-center'>
        <div className='mt-16 md:mt-24 max-w-4xl w-full text-left'>
          {/* HEADING */}
          <div data-aos='fade-down'>
            <p className='text-pink-500 uppercase tracking-[0.35em] text-xs md:text-sm font-bold mb-4'>
              About
            </p>

            <h1 className='text-4xl md:text-6xl font-black tracking-tight leading-tight'>
              Smooth <span className='text-pink-600'>N</span> Simple
            </h1>

            <div className='h-1 w-20 bg-pink-600 rounded-full mt-6 mb-8'></div>
          </div>

          <p
            className='text-zinc-400 text-base md:text-lg max-w-2xl mb-12 leading-relaxed'
            data-aos='fade-in'
          >
            Personalized, natural-looking results in a safe and professional
            aesthetic environment.
          </p>

          {/* PROFILE CARD */}
          <div data-aos='fade-up'>
            <div className='bg-gradient-to-b from-zinc-950 to-black border border-zinc-800 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8'>
              {/* IMAGE */}
              <div className='w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border border-zinc-800 flex-shrink-0'>
                <img
                  src='../../images/logo.jpeg'
                  alt='Shelby - Nurse Injector'
                  className='w-full h-full object-cover'
                />
              </div>

              {/* TEXT */}
              <div className='space-y-5'>
                <p className='text-zinc-300 leading-relaxed'>
                  Hi, I’m{" "}
                  <span className='text-white font-semibold'>Shelby</span>, a
                  certified cosmetic nurse injector specializing in Botox and
                  aesthetic treatments.
                </p>

                <p className='text-zinc-400 leading-relaxed'>
                  My focus is on enhancing natural features with subtle,
                  balanced results tailored specifically to each client.
                </p>

                <p className='text-zinc-400 leading-relaxed'>
                  Every treatment is delivered in a calm, professional
                  environment with an emphasis on safety, precision, and
                  long-term confidence.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className='mt-10 text-left'>
              <a
                href='https://smoothnsimple.janeapp.com/'
                className='inline-block bg-white text-black hover:bg-pink-600 hover:text-white px-8 py-4 rounded-full font-bold transition'
              >
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
