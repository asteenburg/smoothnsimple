"use client";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  image: string;
}

export default function ServiceCard({
  title,
  price,
  description,
  image,
}: ServiceCardProps) {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden'>
      <Image
        src={image}
        alt={title}
        width={400}
        height={250}
        className='object-cover'
      />
      <div className='p-4'>
        <h3 className='text-xl font-semibold'>{title}</h3>
        <p className='text-sm text-gray-500 dark:text-gray-400 mb-2'>{price}</p>
        <p className='text-gray-600 dark:text-gray-300'>{description}</p>
      </div>
    </div>
  );
}
