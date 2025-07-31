import React, { useState, useEffect } from 'react'
import { personalInfo } from '../data'
import StarfieldBackground from '../StarfieldBackground'

function SplashScreen({ onComplete }) {
  const [showWelcome, setShowWelcome] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Start welcome animation after a brief delay
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true)
    }, 500)

    // Start fade out after showing welcome
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 2500)

    // Complete transition
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 3500)

    return () => {
      clearTimeout(welcomeTimer)
      clearTimeout(fadeTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className={`fixed inset-0 bg-black text-white font-mono flex items-center justify-center z-50 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Background */}
      <StarfieldBackground />
      
      {/* Welcome Content */}
      <div className={`text-center relative z-10 transition-all duration-1000 ${showWelcome ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="space-y-6">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome
          </h1>
          <div className="text-xl opacity-80 font-light">
            to {personalInfo.name}'s portfolio
          </div>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen