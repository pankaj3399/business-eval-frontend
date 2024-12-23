'use client'

import { useState, useEffect } from 'react'
import { motion,} from 'framer-motion'
import { BarChart2, Loader2, PieChart, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  // const { scrollYProgress } = useScroll()
  const navigate = useNavigate()
  // const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  // const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    
      return (
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-primary h-8 w-8" />
        </div>
      );
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 text-white">
   

      <main>
        <section className="container min-h-screen flex items-center justify-center mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-4">Welcome !</h2>
            <div className="space-x-4">
              <button onClick={()=> navigate("/signup")} className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold text-lg hover:bg-opacity-90 transition duration-300">
                Sign Up
              </button>
              <button  onClick={()=> navigate("/login")} className="bg-transparent border border-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-500 transition duration-300">
                Sign In
              </button>
              <button  onClick={()=> navigate("/addbusiness")} className="text-white underline hover:text-blue-200 transition duration-300">
                Skip for Now
              </button>
            </div>
          </motion.div>
        </section>

        {/* <section className="container mx-auto px-4 py-20">
          <motion.div
            style={{ opacity, scale }}
            className="flex justify-center items-center"
          >
            <HeroAnimation />
          </motion.div>
        </section> */}

        <section className="container mx-auto px-4 py-20">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </section>
      </main>

      {/* <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">&copy; 2023 BusinessEval. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-200 transition duration-300">
                <Github size={24} />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition duration-300">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition duration-300">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm">Empowering Businesses, One Evaluation at a Time.</p>
          </div>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-white hover:text-blue-200 transition duration-300">Terms of Service</a>
            <span className="mx-2">|</span>
            <a href="#" className="text-sm text-white hover:text-blue-200 transition duration-300">Privacy Policy</a>
          </div>
        </div>
      </footer> */}
    </div>
  )
}

const features = [
  {
    title: "Track key financial metrics dynamically",
    description: "Monitor your business's financial health in real-time with our dynamic tracking system.",
    icon: BarChart2,
  },
  {
    title: "Manage multiple businesses seamlessly",
    description: "Effortlessly switch between and manage various business entities from a single dashboard.",
    icon: PieChart,
  },
  {
    title: "Interactive dashboards with live recalculations",
    description: "Experience the power of live data with our interactive dashboards that update in real-time.",
    icon: TrendingUp,
  },
]

function FeatureCard({ title, description, icon: Icon, index }:{
  title: string,
  description: string,
  icon: any,
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-20 transition duration-300"
    >
      <Icon className="w-12 h-12 mb-4 text-blue-300" />
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-blue-100">{description}</p>
    </motion.div>
  )
}

// function HeroAnimation() {
//   return (
//     <svg width="200" height="200" viewBox="0 0 200 200">
//       <motion.circle
//         cx="100"
//         cy="100"
//         r="80"
//         stroke="#ffffff"
//         strokeWidth="20"
//         fill="none"
//         initial={{ pathLength: 0 }}
//         animate={{ pathLength: 1 }}
//         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.path
//         d="M40,100 L80,140 L160,60"
//         stroke="#ffffff"
//         strokeWidth="20"
//         fill="none"
//         initial={{ pathLength: 0 }}
//         animate={{ pathLength: 1 }}
//         transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
//       />
//     </svg>
//   )
// }