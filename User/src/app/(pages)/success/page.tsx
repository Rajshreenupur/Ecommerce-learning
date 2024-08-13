"use client"
import { clearCartItem } from '@/app/services/productsApi';
import React from 'react'

const paymentSuccess: React.FC= () => {

  clearCartItem();

  return (
    <div>Payment Successful</div>
  )
}

export default paymentSuccess