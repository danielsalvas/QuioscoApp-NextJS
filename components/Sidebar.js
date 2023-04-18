import Image from "next/image"
import logo from "../public/assets/img/logo.png"

const Sidebar = () => {
  return (
    <div>
      <Image width={300} height={100} src={logo} alt="logo" />

      
    </div>
  )
}

export default Sidebar
