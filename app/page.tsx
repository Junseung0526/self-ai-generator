'use client';

import React, { useState, useEffect } from 'react';
import { Sandpack } from "@codesandbox/sandpack-react";
import { Sparkles, Send, Loader2, Maximize2, X, Monitor } from "lucide-react";
import Link from 'next/link';
import SplashScreen from './splash';
import useIsMobile from './hooks/useIsMobile'; // useIsMobile 훅 임포트

// 데스크톱 레이아웃 컴포넌트
const DesktopAppLayout = ({
  userInfo,
  setUserInfo,
  generatedCode,
  isLoading,
  handleGenerate,
  setIsFullPreview,
  isFullPreview,
}) => (
  <main className="flex h-screen w-full bg-[#fafafa] overflow-hidden font-sans">
    {/* 1. 사이드바 제어판 */}
    <div className="w-[400px] flex flex-col p-8 bg-white border-r border-gray-100 shadow-2xl z-20">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
          <Sparkles className="text-white w-5 h-5" />
        </div>
        <h1 className="text-xl font-black tracking-tighter text-gray-900 italic">MY-SELF.AI</h1>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex justify-between items-end px-1">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">User Description</label>
          <span className="text-[10px] text-green-500 font-bold">● AI ONLINE</span>
        </div>
        <textarea
          className="flex-1 w-full p-6 border-2 border-gray-50 rounded-[2.5rem] bg-gray-50 outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none text-lg leading-relaxed shadow-inner text-gray-900 placeholder:text-gray-400"
          placeholder="이름은 김하나, 3년차 프론트엔드 개발자야. 깔끔한 다크모드 포트폴리오를 만들어줘."
          value={userInfo}
          onChange={(e) => setUserInfo(e.target.value)}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="mt-8 flex items-center justify-center gap-3 bg-indigo-600 text-white py-5 rounded-[1.8rem] font-bold text-lg disabled:bg-gray-200 transition-all hover:bg-indigo-700 active:scale-95 shadow-xl shadow-indigo-100"
      >
        {isLoading ? <Loader2 className="animate-spin w-6 h-6" /> : <Send size={20} />}
        {isLoading ? "AI 코딩 중..." : "사이트 생성하기"}
      </button>
    </div>

    {/* 2. 메인 화면 (에디터 + 미리보기) */}
    <div className="flex-1 h-full relative">
      <button
        onClick={() => setIsFullPreview(true)}
        className="absolute top-8 right-8 z-10 bg-white border border-gray-100 px-6 py-3.5 rounded-2xl shadow-2xl hover:bg-gray-50 transition-all flex items-center gap-3 font-bold text-gray-700 active:scale-95"
      >
        <Maximize2 size={18} className="text-indigo-600" />
        전체화면 보기
      </button>

      <Sandpack
        template="react"
        files={{ "/App.js": generatedCode }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
          editorHeight: "100vh",
          showNavigator: false,
          showEditor: false, // 에디터를 숨기고 미리보기만 표시
        }}
        customSetup={{
          dependencies: { "lucide-react": "latest" }
        }}
        theme="light"
      />
    </div>

    {/* 3. 전체보기 모달 (결과물만 꽉 차게 렌더링) */}
    {isFullPreview && (
      <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in zoom-in duration-300">
        <div className="flex-1 w-full h-full bg-white overflow-hidden relative">
          <Sandpack
            template="react"
            files={{ "/App.js": generatedCode }}
            layout="preview"
            customSetup={{
              dependencies: { "lucide-react": "latest" }
            }}
            options={{
              externalResources: ["https://cdn.tailwindcss.com"],
              editorHeight: "100vh",
              showEditor: false,
              showNavigator: false
            }}
          />
          <button
            onClick={() => setIsFullPreview(false)}
            className="absolute top-4 right-4 z-10 flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-2xl hover:bg-red-500 transition-all shadow-lg active:scale-95"
          >
            <span className="text-xs font-black tracking-widest">닫기</span>
            <X size={20} />
          </button>
        </div>
      </div>
    )}
  </main>
);

// 모바일 레이아웃 컴포넌트
const MobileAppLayout = ({
  userInfo,
  setUserInfo,
  generatedCode,
  isLoading,
  handleGenerate,
  setIsFullPreview,
  isFullPreview,
}) => (
  <main className="flex flex-col h-screen w-full bg-[#fafafa] overflow-y-auto font-sans p-4">
    <div className="flex items-center justify-between gap-3 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100">
          <Sparkles className="text-white w-4 h-4" />
        </div>
        <h1 className="text-lg font-black tracking-tighter text-gray-900 italic">MY-SELF.AI</h1>
      </div>
      <span className="text-[10px] text-green-500 font-bold">● AI ONLINE</span>
    </div>

    <div className="flex flex-col gap-3 mb-4">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">User Description</label>
      <textarea
        className="w-full p-4 border-2 border-gray-50 rounded-2xl bg-gray-50 outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none text-base leading-relaxed shadow-inner text-gray-900 placeholder:text-gray-400 h-24"
        placeholder="이름은 김하나, 3년차 프론트엔드 개발자야. 깔끔한 다크모드 포트폴리오를 만들어줘."
        value={userInfo}
        onChange={(e) => setUserInfo(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="flex items-center justify-center gap-3 bg-indigo-600 text-white py-3 rounded-xl font-bold text-base disabled:bg-gray-200 transition-all hover:bg-indigo-700 active:scale-95 shadow-xl shadow-indigo-100"
      >
        {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send size={16} />}
        {isLoading ? "AI 코딩 중..." : "사이트 생성하기"}
      </button>
    </div>

    {/* 미리보기 영역 */}
    <div className="flex-1 w-full relative">
      <Sandpack
        template="react"
        files={{ "/App.js": generatedCode }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
          editorHeight: "100%", // 모바일에서는 높이를 유동적으로
          showNavigator: false,
          showTabs: false,
          showEditor: false, // 에디터를 숨기고 미리보기만 표시
        }}
        customSetup={{
          dependencies: { "lucide-react": "latest" }
        }}
        theme="light"
      />
      <button
        onClick={() => setIsFullPreview(true)}
        className="absolute bottom-4 right-4 z-10 bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-md hover:bg-gray-50 transition-all flex items-center gap-2 font-bold text-gray-700 text-sm active:scale-95"
      >
        <Maximize2 size={16} className="text-indigo-600" />
        전체화면
      </button>
      <Link href="/preview" className="absolute bottom-4 left-4 z-10 bg-indigo-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-indigo-600 transition-all flex items-center gap-2 font-bold text-sm active:scale-95">
        <Monitor size={16} />
        전용 미리보기 페이지
      </Link>
    </div>

    {/* 전체보기 모달 (결과물만 꽉 차게 렌더링) */}
    {isFullPreview && (
      <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in zoom-in duration-300">
        <div className="flex-1 w-full h-full bg-white overflow-hidden relative">
          <Sandpack
            template="react"
            files={{ "/App.js": generatedCode }}
            layout="preview"
            customSetup={{
              dependencies: { "lucide-react": "latest" }
            }}
            options={{
              externalResources: ["https://cdn.tailwindcss.com"],
              editorHeight: "100vh",
              showEditor: false,
              showNavigator: false
            }}
          />
          <button
            onClick={() => setIsFullPreview(false)}
            className="absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-red-500 transition-all shadow-lg active:scale-95 text-sm"
          >
            <span className="text-xs font-black tracking-widest">닫기</span>
            <X size={16} />
          </button>
        </div>
      </div>
    )}
  </main>
);


export default function GeneratorPage() {
  const [mounted, setMounted] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [generatedCode, setGeneratedCode] = useState(`
import React from 'react';
import { Sparkles } from 'lucide-react';

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-900 p-6">
      <div className="p-4 bg-indigo-50 rounded-full mb-6 shadow-sm">
        <Sparkles className="w-12 h-12 text-indigo-600 animate-pulse" />
      </div>
      <h1 className="text-4xl font-black tracking-tight mb-4 text-center">나만의 AI 웹사이트 생성기</h1>
      <p className="text-gray-500 text-lg text-center max-w-sm leading-relaxed">
        왼쪽에 당신의 정보를 입력하면<br/>
        AI가 즉시 멋진 사이트를 코딩해 드립니다.
      </p>
    </div>
  );
}
  `);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullPreview, setIsFullPreview] = useState(false);

  // useIsMobile 훅 사용
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGenerate = async () => {
    if (!userInfo.trim()) return alert("자기소개를 입력해주세요!");
    setIsLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInfo }),
      });
      const data = await res.json();
      if (data.code) {
        setGeneratedCode(data.code);
        localStorage.setItem('generatedCodeForPreview', data.code); // localStorage에 저장
      }
    } catch (e) {
      console.error(e);
      alert("생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  const commonProps = {
    userInfo,
    setUserInfo,
    generatedCode,
    isLoading,
    handleGenerate,
    setIsFullPreview,
    isFullPreview,
  };

  return (
    <div className="h-screen w-screen overflow-y-auto snap-y snap-mandatory no-scrollbar">
      {/* Slide 1: Splash Screen */}
      <section className="h-screen w-full snap-start">
        <SplashScreen />
      </section>

      {/* Slide 2: Main App - 조건부 렌더링 */}
      <section className="h-screen w-full snap-start">
        {isMobile ? <MobileAppLayout {...commonProps} /> : <DesktopAppLayout {...commonProps} />}
      </section>
    </div>
  );
}