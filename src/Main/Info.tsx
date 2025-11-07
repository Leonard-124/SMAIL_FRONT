import pawpaw from "../assets/images/pawpaw.jpg"

const Info = () => {
  return (
    <>
    <div className='bg-[#747474] w-full  flex justify-between h-5/12'>
    <div className="flex flex-col gap-5 text-[#FFFFFF]">
    <p className=" text-2xl font-serif">Bringing Your Business Online in three easy Steps</p>
    <p className="text-2xl font-light">Trusted by many business retailers and SME's</p>
    <p className="text-2xl font-light">
      SMAIL Simplifies your online business and makes it easy for your customers to reach your store at the comfort of your Home.
    </p>
    <div className="flex gap-14 text-black">
      <button type="button" className="bg-[#ffffff] rounded-xl p-1 tracking-tight hover:bg-amber-50">Start Free Trial</button>
      <a href="#" className="bg-[#ffffff] rounded-xl p-1 tracking-tight hover:bg-amber-50">Contact Sales</a>
    </div>
    </div>
    <div className=" p-5 w-[450px] animate-pulse">
      <img src={pawpaw} alt="pawpaw" className="w-full h-80 rounded-xl"/>
    </div>
    </div>
    </>
    
  )
}

export default Info
