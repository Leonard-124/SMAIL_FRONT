import robot from "../assets/images/robot.jpg"

const Developer = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#1c1c1c]">
      <div className="relative
      w-[200px] h-[200px] rounded-[10px]
      shadow-[16px_16px_20px_#0000008c]
      overflow-hidden
      before:absolute
      before:top-[-50%] before:right-[-50%] before:bottom-[-50%] before:left-[-50%]
      before:bg-[conic-gradient(transparent,transparent,#00a6ff)]
      before:animate-spin
      ">
        <div className="absolute flex justify-center bottom-[5px] left-[5px] rounded-[10px] px-4 bg-[#1c1c1c] shadow-[20px_20px_20px_#0000008c_inherit">
        <img src={robot} alt="" className="w-20 h-20" />
      </div>
      </div>
      
    </div>
  )
}

export default Developer
