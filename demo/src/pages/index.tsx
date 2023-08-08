import { Lora } from 'next/font/google'
import DatePicker from '@/components/Datepicker'
import { motion } from 'framer-motion'

const lora = Lora({ subsets: ['latin'] })

export default function Home() {
  return (
    <motion.main
    layout
      className={`flex min-h-screen flex-col items-center justify-center bg-spring-wood-100 space-y-3 ${lora.className}`}
    >
      <div className='text-center'>
        <h1 className='font-semibold text-4xl text-neutral-800'>
          Datepicker
        </h1>
        <p className='font-medium text-neutral-500 max-w-lg mt-1'>
          Datepicker component for React. Built with Tailwind & Framer Motion. Types included.
        </p>
      </div>

      <DatePicker onChange={date => console.log(date)} />
    </motion.main>
  )
}
