

import Footer from '../Main/Footer';
import Latest from './Latest';
import Navbar from './Navbar'
import Slider from './Slider';

const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <Slider/>
      <Latest/>
      <Footer/>
    </div>
  )
}

export default Dashboard;
