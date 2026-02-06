'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight, ChevronDown, AlertCircle } from 'lucide-react'; // AlertCircle 추가

export default function SplashScreen() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-center bg-white px-6">
      
      {/* ⚠️ 모바일 전용 안내 문구: PC(md 이상)에서는 숨김 처리 */}
      <div className="absolute top-8 flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 rounded-full md:hidden">
        <AlertCircle size={14} className="text-amber-600" />
        <span className="text-[11px] font-medium text-amber-700">
          모바일 환경은 현재 최적화 중입니다. PC를 권장해요!
        </span>
      </div>

      {/* 로고 섹션 */}
      <div className="animate-float mb-12 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-800" style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}>
          MY-SELF.AI
        </h1>
        <p className="text-base md:text-lg text-gray-500 mt-2">
          AI가 만들어주는 나만의 웹사이트
        </p>
      </div>

      {/* 스텝 섹션 (세로/가로 반응형) */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 w-full max-w-sm md:max-w-none">
        
        {/* Step 1: File */}
        <div className="flex flex-col items-center gap-2 opacity-0 splash-intro-1">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-sky-50 rounded-2xl flex items-center justify-center">
            <Image src="/file.svg" alt="File" width={40} height={40} className="md:w-[48px] md:h-[48px]" />
          </div>
          <span className="text-xs md:text-sm font-bold text-gray-500">내 정보 입력</span>
        </div>

        <div className="opacity-0 splash-intro-2 flex items-center justify-center">
          <ChevronRight size={32} className="text-gray-300 hidden md:block" />
          <ChevronDown size={32} className="text-gray-300 md:hidden" />
        </div>

        {/* Step 2: Globe */}
        <div className="flex flex-col items-center gap-2 opacity-0 splash-intro-3">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-sky-50 rounded-2xl flex items-center justify-center">
            <Image src="/globe.svg" alt="Globe" width={40} height={40} className="md:w-[48px] md:h-[48px]" />
          </div>
          <span className="text-xs md:text-sm font-bold text-gray-500">AI 분석</span>
        </div>

        <div className="opacity-0 splash-intro-4 flex items-center justify-center">
          <ChevronRight size={32} className="text-gray-300 hidden md:block" />
          <ChevronDown size={32} className="text-gray-300 md:hidden" />
        </div>

        {/* Step 3: Window */}
        <div className="flex flex-col items-center gap-2 opacity-0 splash-intro-5">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-sky-50 rounded-2xl flex items-center justify-center">
            <Image src="/window.svg" alt="Window" width={40} height={40} className="md:w-[48px] md:h-[48px]" />
          </div>
          <span className="text-xs md:text-sm font-bold text-gray-500">웹사이트 생성</span>
        </div>
      </div>
      
      {/* 하단 스크롤 안내 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 splash-intro-scroll">
        <span className="text-[10px] md:text-xs font-bold text-gray-400">아래로 스크롤</span>
        <div className="animate-bounce-subtle">
          <ChevronDown size={20} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}