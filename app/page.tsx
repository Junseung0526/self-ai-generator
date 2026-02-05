'use client';

import React, { useState, useEffect } from 'react';
import { Sandpack } from "@codesandbox/sandpack-react";
import { Sparkles, Send, Loader2 } from "lucide-react";

export default function GeneratorPage() {
  const [mounted, setMounted] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [generatedCode, setGeneratedCode] = useState(`
import React from 'react';

export default function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-800">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">My-Self.AI</h1>
        <p>왼쪽에 정보를 입력하고 버튼을 눌러보세요!</p>
      </div>
    </div>
  );
}
  `);
  const [isLoading, setIsLoading] = useState(false);

  // Hydration Error 방지: 클라이언트 마운트 확인
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGenerate = async () => {
    if (!userInfo.trim()) {
      alert("자기소개 정보를 입력해주세요!");
      return;
    }

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
        throw new Error("No code received");
      }
    } catch (error) {
      console.error("생성 실패:", error);
      alert("AI가 코드를 생성하는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null; // 서버 사이드 렌더링 시 아무것도 안 보임으로써 에러 방지

  return (
    <div className="flex h-screen w-full bg-gray-100 text-black">
      {/* 왼쪽 입력 영역 */}
      <div className="w-1/3 flex flex-col p-8 bg-white border-r border-gray-200 shadow-xl z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900">My-Self.AI</h1>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">사용자 정보 입력</label>
          <textarea 
            className="flex-1 w-full p-5 border-2 border-gray-100 rounded-2xl bg-gray-50 focus:border-indigo-500 focus:bg-white outline-none transition-all resize-none text-base leading-relaxed"
            placeholder="예: 이름은 김철수, 3학년 개발자 지망생, 취미는 등산, 리액트랑 노드에 자신 있음. 스타일은 힙하게!"
            value={userInfo}
            onChange={(e) => setUserInfo(e.target.value)}
          />
        </div>

        <button 
          onClick={handleGenerate}
          disabled={isLoading}
          className="mt-6 flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:bg-gray-300 disabled:shadow-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> 
              AI가 제작 중...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" /> 10초 만에 웹사이트 만들기
            </>
          )}
        </button>
        
        <p className="mt-4 text-center text-xs text-gray-400">
          Powered by Gemini API & Next.js
        </p>
      </div>

      {/* 오른쪽 결과 영역 (Sandpack) */}
      <div className="w-2/3 h-full overflow-hidden bg-gray-200">
        <Sandpack 
          template="react"
          files={{
            "/App.js": generatedCode,
          }}
          options={{
            externalResources: ["[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"],
            showNavigator: false,
            showLineNumbers: false,
            editorHeight: "100vh",
          }}
          theme="light"
        />
      </div>
    </div>
  );
}