'use client';

import React, { useState, useEffect } from 'react';
import { Sandpack } from "@codesandbox/sandpack-react";
import { Sparkles, Send, Loader2, Maximize2, X, Monitor } from "lucide-react";

export default function GeneratorPage() {
  const [mounted, setMounted] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [generatedCode, setGeneratedCode] = useState(`
import React from 'react';
import { Sparkles } from 'lucide-react';

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-50 to-white text-gray-800 p-6">
      <Sparkles className="w-20 h-20 mb-6 text-indigo-500 animate-pulse" />
      <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
        My-Self.AI
      </h1>
      <p className="text-gray-500 mt-6 text-xl text-center max-w-md leading-relaxed">
        왼쪽 입력창에 당신의 이야기를 들려주세요. <br/>
        AI가 즉석에서 웹사이트를 코딩해 드립니다.
      </p>
    </div>
  );
}
  `);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullPreview, setIsFullPreview] = useState(false);

  // Next.js Hydration 에러 방지용 마운트 체크
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGenerate = async () => {
    if (!userInfo.trim()) return alert("자기소개 정보를 입력해주세요!");
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
      } else {
        throw new Error("코드 생성에 실패했습니다.");
      }
    } catch (e) {
      console.error(e);
      alert("AI 서버와 통신 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-sans">
      {/* 1. 왼쪽: 입력 사이드바 */}
      <div className="w-1/3 flex flex-col p-8 bg-white border-r border-gray-200 shadow-2xl z-20">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2.5 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-gray-900">My-Self.AI</h1>
        </div>
        
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Story Prompt</label>
            <span className="text-[10px] text-indigo-500 font-bold uppercase">AI Generator Ready</span>
          </div>
          <textarea 
            className="flex-1 w-full p-6 border-2 border-gray-100 rounded-[2rem] bg-gray-50 outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none text-lg leading-relaxed text-gray-700 shadow-inner"
            placeholder="예: 저는 5년차 UX 디자이너 김하나입니다. 다크 모드 기반의 세련된 포트폴리오를 만들어주세요."
            value={userInfo}
            onChange={(e) => setUserInfo(e.target.value)}
          />
        </div>
        
        <button 
          onClick={handleGenerate}
          disabled={isLoading}
          className="mt-8 flex items-center justify-center gap-3 bg-indigo-600 text-white py-5 rounded-[1.5rem] font-bold text-lg disabled:bg-gray-300 shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 disabled:scale-100"
        >
          {isLoading ? <Loader2 className="animate-spin w-6 h-6" /> : <Send size={20} />}
          {isLoading ? "AI 코딩 중..." : "웹사이트 생성하기"}
        </button>
      </div>

      {/* 2. 오른쪽: 실시간 에디터 & 미리보기 */}
      <div className="w-2/3 h-full relative group">
        <button 
          onClick={() => setIsFullPreview(true)}
          className="absolute top-8 right-8 z-10 bg-white/90 backdrop-blur-md border border-gray-200 px-6 py-3.5 rounded-2xl shadow-2xl hover:bg-white transition-all flex items-center gap-3 font-bold text-gray-700 active:scale-95 border-b-4 border-indigo-100"
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
          }}
          customSetup={{
            dependencies: { "lucide-react": "latest" }
          }}
          theme="light"
        />
      </div>

      {/* 3. 전체보기 모달 (높이 버그 완벽 수정) */}
      {isFullPreview && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in zoom-in duration-300">
          {/* 상단 윈도우 컨트롤 바 */}
          <div className="h-14 border-b flex items-center justify-between px-6 bg-white shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex gap-2 mr-4">
                <div className="w-3.5 h-3.5 rounded-full bg-red-400 shadow-inner" />
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-400 shadow-inner" />
                <div className="w-3.5 h-3.5 rounded-full bg-green-400 shadow-inner" />
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-gray-100 border rounded-xl text-[11px] text-gray-500 font-bold tracking-tight">
                <Monitor size={14} />
                PREVIEW_INTERNAL_SERVER:3000
              </div>
            </div>
            <button 
              onClick={() => setIsFullPreview(false)}
              className="group flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-2xl transition-all hover:bg-red-500 shadow-lg"
            >
              <span className="text-xs font-black uppercase tracking-widest">Close</span>
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 w-full h-full overflow-hidden bg-white">
            <Sandpack 
              template="react"
              files={{ "/App.js": generatedCode }}
              options={{
                externalResources: ["https://cdn.tailwindcss.com"],
                showNavigator: false,
                showTabs: false,
                // 💡 상단바(56px)를 뺀 나머지 전체 높이를 강제합니다.
                editorHeight: "calc(100vh - 56px)", 
              }}
              customSetup={{
                dependencies: { "lucide-react": "latest" }
              }}
              components={{
                // 💡 전체화면 시 에디터는 숨기고 프리뷰만 출력
                Editor: () => null 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}