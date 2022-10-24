import React from 'react'
import Image from 'next/image'
import image from "../Assets/rabbit.png";

export default function Eyeballs() {


  React.useEffect( () => {
    const mouseMover = (): void => {
      
      document.addEventListener("mousemove", e => {
        const mouseX : number = e.clientX;
        const mouseY : number = e.clientY;
    
        const rabbit : Element | null = document.getElementById("rabbit");
        const rekt : DOMRect | null | undefined = rabbit?.getBoundingClientRect();
    
        const anchorX = rekt.left + rekt.width / 2;
        const anchorY = rekt.right + rekt.height / 2;
    
        const angleDeg = getAngle(mouseX, mouseY, anchorX, anchorY);
        
        const eyes = document.querySelectorAll(".eyes");
        eyes.forEach(eye => {
          console.log(eye, 'eyyyyyyyyyyyyyyyyyyyyyyyye')
          eye.style.transform = `rotate(${angleDeg + 90}deg);`
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
      <div className="absolute  left-20 mt-14">
        <Image
            src={image}
            alt=""
            height={70}
            width={60}
            className=""
            id="rabbit"
          />
      </div>
      <div className="absolute w-4 rounded-full h-4 bg-[white] top-[4.5rem] left-[6.2rem]"></div>
      <div className="absolute w-4 rounded-full h-4 bg-white top-[4.5rem] left-[7.7rem]"></div>
        
      <div className="eyes absolute w-[0.7rem] rounded-full h-[0.7rem] bg-black top-[5rem] left-[8rem]"></div>
      <div className="eyes absolute w-[0.3rem] rounded-full h-[0.3rem] bg-[black] top-[5rem] left-[6.5rem]"></div>
    </div>
  )
}
