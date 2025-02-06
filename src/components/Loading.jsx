
import {  PulseLoader } from 'react-spinners'

const Loading = ({text="center"}) => {
  return (
    <div className={`flex justify-center items-${text} w-full h-[100vh] bg-black`}>
   
      <PulseLoader size={10} color='#E50000'  speedMultiplier={1}/> 
      
     
      
    </div>
  )
}

export default Loading