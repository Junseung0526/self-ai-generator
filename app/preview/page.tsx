'use client';
import React, { useState, useEffect } from 'react';
import { SandpackProvider, SandpackPreview } from "@codesandbox/sandpack-react";
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MobilePreviewPage() {
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const storedCode = localStorage.getItem('generatedCodeForPreview');
      setGeneratedCode(storedCode);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  // 헤더 높이를 제외한 나머지 높이 계산
  const headerHeight = 64; // p-4 + border 포함 대략적인 높이

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        
        .sp-preview-container,
        .sp-preview-iframe,
        .sp-wrapper,
        [class*="preview"],
        [class*="Preview"] {
          height: 100% !important;
          min-height: 100% !important;
        }
      `}</style>
      
      <div className="w-screen h-screen flex flex-col bg-[#fafafa] overflow-hidden">
        <header className="flex items-center p-4 border-b border-gray-200 shadow-sm bg-white z-10 shrink-0">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-gray-900">미리보기</h1>
          <div className="w-10"></div>
        </header>
        
        <div 
          className="w-full"
          style={{ 
            height: `calc(100vh - ${headerHeight}px)`,
            overflow: 'hidden'
          }}
        >
          {generatedCode ? (
            <SandpackProvider
              template="react"
              files={{ "/App.js": generatedCode }}
              customSetup={{
                dependencies: { "lucide-react": "latest" }
              }}
              options={{
                externalResources: ["https://cdn.tailwindcss.com"]
              }}
            >
              <div style={{ width: '100%', height: '100%' }}>
                <SandpackPreview
                  showNavigator={false}
                  showRefreshButton={true}
                  showOpenInCodeSandbox={false}
                />
              </div>
            </SandpackProvider>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              생성된 코드를 찾을 수 없습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
}