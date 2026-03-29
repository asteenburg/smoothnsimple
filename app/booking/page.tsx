import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Booking() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 p-10 bg-gray-50 dark:bg-black'>
        <h2 className='text-3xl font-bold mb-6'>Book Your Appointment</h2>
        <iframe
          src='https://smoothnsimple.janeapp.com'
          width='100%'
          height='800'
          frameBorder='0'
        ></iframe>
      </main>
      <Footer />
    </div>
  );
}
