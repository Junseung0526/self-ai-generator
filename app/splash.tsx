'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight, ChevronDown } from 'lucide-react';

// SplashScreen no longer needs props for event handling
export default function SplashScreen() {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center text-center bg-white">
      
      <div className="animate-float">
        <h1 className="text-6xl font-black tracking-tighter text-gray-800" style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}>
          MY-SELF.AI
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          AI가 만들어주는 나만의 웹사이트
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 mt-16">
        {/* Step 1: File */}
        <div className="flex flex-col items-center gap-2 opacity-0 splash-intro-1">
          <div className="w-24 h-24 bg-sky-50 rounded-2xl flex items-center justify-center">
            <Image src="/file.svg" alt="File" width={48} height={48} />
          </div>
          <span className="text-xs font-bold text-gray-500">내 정보 입력</span>
        </div>

        <ChevronRight size={32} className="text-gray-300 opacity-0 splash-intro-2" />

        {/* Step 2: Globe */}
        <div className="flex flex-col items-center gap-2 opacity-0 splash-intro-3">
          <div className="w-24 h-24 bg-sky-50 rounded-2xl flex items-center justify-center">
            <Image src="/globe.svg" alt="Globe" width={48} height={48} />
          </div>
          <span className="text-xs font-bold text-gray-500">AI 분석</span>
        </div>

        <ChevronRight size={32} className="text-gray-300 opacity-0 splash-intro-4" />

        {/* Step 3: Window */}
        <div className="flex flex-col items-center gap-2 opacity-0 splash-intro-5">
          <div className="w-24 h-24 bg-sky-50 rounded-2xl flex items-center justify-center">
            <Image src="/window.svg" alt="Window" width={48} height={48} />
          </div>
          <span className="text-xs font-bold text-gray-500">웹사이트 생성</span>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 splash-intro-scroll">
        <span className="text-xs font-bold text-gray-400">아래로 스크롤</span>
        <div className="animate-bounce-subtle">
          <ChevronDown size={24} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}
