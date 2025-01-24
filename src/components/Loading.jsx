
import { CircleLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className='flex justify-center items-center w-full h-[100vh] bg-black'>
   
      <CircleLoader size={80} color='#E50000'  speedMultiplier={2}/> /
     
      
    </div>
  )
}

export default Loading