import Link from "next/link";
import { Zap, Instagram, Facebook } from "lucide-react"; // Using Lucide for consistency

export default function Footer() {
  const BOOKING_URL = "https://smoothnsimple.janeapp.com";

  return (
    <footer className='w-full bg-black border-t border-white/5 pt-16 pb-8 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-start gap-12 mb-16'>
          {/* Brand Column */}
          <div className='max-w-xs'>
            <Link
              href='/'
              className='flex items-center gap-2 mb-6 group'
            >
              <div className='bg-pink-600 p-1 rounded-lg transition-transform group-hover:rotate-12'>
                <Zap
                  size={16}
                  className='text-white fill-current'
                />
              </div>
              <span className='font-black italic uppercase tracking-tighter text-xl text-white'>
                Smooth <span className='text-pink-600'>N</span> Simple
              </span>
            </Link>
            <p className='text-zinc-500 text-sm italic leading-relaxed'>
              Elevating medical aesthetics through precision, simplicity, and
              clinical excellence.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className='grid grid-cols-3 md:grid-cols-3 gap-12'>
            {/* Socials */}
            <div className='flex flex-col gap-4'>
              <h4 className='text-[10px] font-black uppercase tracking-[0.3em] text-white mb-2'>
                Social
              </h4>
              <a
                href='https://instagram.com/smoothnsimple'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                <Instagram size={14} /> Instagram
              </a>
              <a
                href='https://facebook.com/smoothnsimple'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                <Facebook size={14} /> Facebook
              </a>
              <a
                href='mailto:nurseinjectorshelby@gmail.com'
                className='flex items-center gap-2 text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                <i className='fas fa-envelope text-[10px]'></i> Email
              </a>
            </div>

            {/* Explore */}
            <div className='flex flex-col gap-4'>
              <h4 className='text-[10px] font-black uppercase tracking-[0.3em] text-white mb-2'>
                Explore
              </h4>
              <a
                href='/'
                className='text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                Home
              </a>
              <Link
                href='/shop'
                className='text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                Shop
              </Link>
              <Link
                href='/services'
                className='text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                Services
              </Link>
              <a
                href={BOOKING_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                Book Now
              </a>
            </div>

            {/* Legal */}
            <div className='flex flex-col gap-4'>
              <h4 className='text-[10px] font-black uppercase tracking-[0.3em] text-white mb-2'>
                Legal
              </h4>
              <Link
                href='/care'
                className='text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                Care
              </Link>
              <Link
                href='/disclaimer'
                className='text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                Disclaimer
              </Link>
              <Link
                href='/privacy'
                className='text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-[10px] font-black uppercase tracking-widest text-zinc-600'>
            &copy; {new Date().getFullYear()} Smooth N Simple.
          </p>
          <div className='h-[2px] w-12 bg-pink-600/30 rounded-full md:block hidden'></div>
          <p className='text-[10px] font-black uppercase tracking-widest text-zinc-600'>
            Ontario, Canada
          </p>
        </div>
      </div>
    </footer>
  );
}
