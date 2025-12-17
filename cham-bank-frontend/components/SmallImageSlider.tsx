'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/effect-fade';

export default function SmallImageSlider() {
  return (
    <div className="relative z-10 rounded-3xl shadow-2xl overflow-hidden h-80">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        speed={1500}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full w-full"
      >
        <SwiperSlide>
          <Image
            src="/images/awdea.jpg"
            alt="Cham Bank Services"
            fill
            className="object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/najmaty.jpg"
            alt="Cham Bank Branches"
            fill
            className="object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/mutanakel.jpg"
            alt="Cham Bank Innovation"
            fill
            className="object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/najmaty1.jpg"
            alt="Cham Bank Technology"
            fill
            className="object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}