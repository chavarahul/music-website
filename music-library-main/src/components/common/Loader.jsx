import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center space-x-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="music-bar bg-green-600"
          style={{
            animationDelay: `${i * 0.15}s`,
            height: `${20 + Math.random() * 20}px`,
          }}
        ></span>
      ))}
    </div>)
}

export default Loader