"use client";

import React from "react";

interface BillingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
}

interface BillingFormProps {
  billingData: BillingData;
  setBillingData: (data: BillingData) => void;
}

export default function BillingForm({
  billingData,
  setBillingData,
}: BillingFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingData({ ...billingData, [name]: value });
  };

  const inputStyle = `
    w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 
    text-sm text-white placeholder:text-zinc-600 focus:outline-none 
    focus:border-pink-500/50 transition-all duration-300
  `;

  const labelStyle = `
    block text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 mb-2 ml-1
  `;

  return (
    <div className='space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700'>
      <div className='border-b border-white/5 pb-4'>
        <h3 className='text-xl font-black italic uppercase tracking-tighter'>
          Billing Information
        </h3>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Name Group */}
        <div>
          <label className={labelStyle}>First Name</label>
          <input
            type='text'
            name='firstName'
            placeholder='Jane'
            value={billingData.firstName}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>
        <div>
          <label className={labelStyle}>Last Name</label>
          <input
            type='text'
            name='lastName'
            placeholder='Doe'
            value={billingData.lastName}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>

        {/* Contact Group */}
        <div className='md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className={labelStyle}>Email Address</label>
            <input
              type='email'
              name='email'
              placeholder='jane@example.com'
              value={billingData.email}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label className={labelStyle}>Phone Number</label>
            <input
              type='tel'
              name='phone'
              placeholder='(555) 000-0000'
              value={billingData.phone}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
        </div>

        {/* Address Group */}
        <div className='md:col-span-2'>
          <label className={labelStyle}>Street Address</label>
          <input
            type='text'
            name='addressLine1'
            placeholder='123 Beauty Lane'
            value={billingData.addressLine1}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>

        <div className='md:col-span-2'>
          <label className={labelStyle}>Suite / Apt (Optional)</label>
          <input
            type='text'
            name='addressLine2'
            placeholder='Unit 101'
            value={billingData.addressLine2}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        {/* Location Details */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:col-span-2'>
          <div>
            <label className={labelStyle}>City</label>
            <input
              type='text'
              name='city'
              placeholder='Brantford'
              value={billingData.city}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label className={labelStyle}>Province</label>
            <input
              type='text'
              name='state'
              placeholder='ON'
              value={billingData.state}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label className={labelStyle}>Postal Code</label>
            <input
              type='text'
              name='postalCode'
              placeholder='N3T 1A1'
              value={billingData.postalCode}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
