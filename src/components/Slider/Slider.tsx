import { useRef, useState, type FC } from 'react'
import s from './slider.module.scss'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const Slider:FC<{images: string[]}> = ({images}) => {

  const containerRef = useRef<HTMLDivElement | null>(null)
  const sliderContentRef = useRef<HTMLDivElement | null>(null)

  let currentOffset = 0

  const MAX_OFFSET = -(images.length - 1) * 100

  const changeSlide = (forward: boolean) => {
    if(containerRef.current && sliderContentRef.current){
      currentOffset = forward ? Math.max(currentOffset - 100, MAX_OFFSET) : Math.min(currentOffset + 100, 0)
      sliderContentRef.current!.style.translate = currentOffset + '%'
    }
  }

  const jumpToSlide = (index: number) => {
    currentOffset = -index * 100;
    sliderContentRef.current!.style.translate = currentOffset + '%';
  }

  return (
    <div ref={containerRef} className={s.slider_container}>
      <button className={s.button1} onClick={() => changeSlide(false)}><IoIosArrowBack size={40} /></button>
      <button className={s.button2} onClick={() => changeSlide(true)}><IoIosArrowForward size={40} /></button>
      <div ref={sliderContentRef} className={s.slider_content}>
        {images.map(url => <img src={url} key={url} className={s.slide } />)}
      </div>
      <div className={s.preview}>
        {images.map((url, index) => <img onClick={() => jumpToSlide(index)} src={url} key={url} className={s.preview_tile} />)}
      </div>
    </div>
  )
}

export default Slider