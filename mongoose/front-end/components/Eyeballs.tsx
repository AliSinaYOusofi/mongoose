import React from 'react'
import Image from 'next/image'
import image from "../Assets/rabbit.png";

export default function Eyeballs() {

  React.useEffect( () => {
    const mouseMover = (): void => {
      
      document.addEventListener("mousemove", e => {
        const mouseX : number = e.clientX;
        const mouseY : number = e.clientY;
    
        const rabbit : Element | null | HTMLImageElement = document.getElementById("rabbit") as Element | HTMLImageElement | null;
        const rekt : DOMRect | any = rabbit?.getBoundingClientRect();
    
        const anchorX : number = rekt.left + rekt.width / 2;
        const anchorY : number = rekt.right + rekt.height / 2;
    
        const angleDeg = getAngle(mouseX, mouseY, anchorX, anchorY);
        
        const eyes : NodeList | HTMLDivElement | Array<NodeList> = document.querySelectorAll(".eyes");

        eyes.forEach(eye => {
          eye.style.transform = `rotate(${angleDeg + 90}deg)`; // did not work becuase of a semicolon
          rabbit.style.filter = `hue-rotate(${angleDeg}deg)`;
        })
      });
    }
    mouseMover();
  })
  

  function getAngle(cx : number, cy : number, ex: number, ey : number) : number {
    const dy = ey - cy;
    const dx = ex - cx;

    const rad = Math.atan2(dy, dx);
    return rad * 180 / Math.PI;
  }
  return (
    <div className="relative">
      <div className="absolute group  left-20">
        <Image
            src={image}
            alt=""
            height={70}
            width={60}
            className=""
            id={"rabbit"}
          />
          <div className=" eyes absolute w-[0.3rem] rounded-full h-[0.4rem] bg-black top-[1.3rem] z-10 left-[3rem]"></div>
          <div className="eyes absolute w-[0.3rem] rounded-full h-[0.4rem] bg-[black] top-[1.5rem] z-10 left-[1.5rem] "></div>
    

      </div>
      
      <div className="absolute w-4  z-[1] rounded-full h-4 bg-[white] top-[1rem] left-[6.2rem]"></div>
      <div className="absolute w-4 rounded-full h-4 bg-white top-[1rem] left-[7.7rem] z-[1]"></div>
    
    </div>
  )
}
