import React from 'react'

const CloseDropdown = ({callback}) => {
  return (
    
    <div onClick={callback} style={{position:'fixed', top:0, bottom:0, left:0, right:0, backgroundColor:'rgba(0,0,0,0)'}} ></div>
                                        
  )
}

export default CloseDropdown