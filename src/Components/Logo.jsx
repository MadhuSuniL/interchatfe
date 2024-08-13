import React from 'react'

const Logo = ({
    size
}) => {
  return (
    <div className={`text-main font-bold ${size || 'text-3xl'}`}><i>Inter<span className='mx-[2px]'>Chat</span></i></div>
  )
}

export default Logo