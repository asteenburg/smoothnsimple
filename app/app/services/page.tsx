import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ServiceCard from "../../components/ServiceCard";

export default function Services() {
  const services = [
    {
      title: "Botox Injections",
      price: "$8.00 per unit",
      description:
        "Botox decreases fine lines and wrinkles to forehead, frown lines and crow’s feet, as well as other areas.",
      image: "/images/pexels-shvetsa-4586711.jpg",
    },
    {
      title: "Lip Flip",
      price: "$60.00 per lip",
      description:
        "A lip flip uses Botox to relax muscles around the mouth, creating a fuller, natural-looking upper lip without fillers.",
      image: "/images/pexels-farhadirani-34775440.jpg",
    },
    {
      title: "B12 Injections",
      price: "$50.00",
      description:
        "Please contact us to book this treatment. 519-718-3294 nurseinjectorshelby@gmail.com",
      image: "/images/pexels-ron-lach-8626078.jpg",
    },
  ];

  return (
    <div className='flex flex-col min-h-screen overflow-x-hidden'>
      <Header />

      <main className='flex-1 px-6 py-10 bg-black dark:bg-black flex flex-col items-center'>
        <h2 className='text-5xl tracking-tighter uppercase italic font-bold mb-10 text-center text-pink-600'>
          Our Services
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full'>
          {services.map((s) => (
            <ServiceCard
              key={s.title}
              {...s}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
