'use client';
import React, { useState, useEffect } from 'react';
import { SandpackProvider, SandpackPreview } from "@codesandbox/sandpack-react";
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MobilePreviewPage() {
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      try {
        const storedCode = localStorage.getItem('generatedCodeForPreview');
        console.log('Stored code:', storedCode);
        
        if (!storedCode) {
          setError('저장된 코드가 없습니다.');
          setLoading(false);
          return;
        }
        
        setGeneratedCode(storedCode);
        
        // 5초 후에도 로딩 중이면 타임아웃 처리
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      } catch (e) {
        console.error('Error loading code:', e);
        setError('코드를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    }
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  if (!mounted) {
    return null;
  }

  const headerHeight = 64;

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
          <button
            onClick={handleRefresh}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <RefreshCw size={20} className="text-gray-700" />
          </button>
        </header>
        
        <div 
          className="w-full relative"
          style={{ 
            height: `calc(100vh - ${headerHeight}px)`,
            overflow: 'hidden'
          }}
        >
          {error ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
              <p className="text-center mb-4">{error}</p>
              <button
                onClick={() => router.back()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                돌아가기
              </button>
            </div>
          ) : generatedCode ? (
            <>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-20">
                  <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <p className="text-gray-600">로딩 중...</p>
                  </div>
                </div>
              )}
              
              <SandpackProvider
                template="react"
                files={{ "/App.js": generatedCode }}
                customSetup={{
                  dependencies: { "lucide-react": "latest" }
                }}
                options={{
                  externalResources: ["https://cdn.tailwindcss.com"],
                  autorun: true,
                  autoReload: true
                }}
              >
                <div style={{ width: '100%', height: '100%' }}>
                  <SandpackPreview
                    showNavigator={false}
                    showRefreshButton={false}
                    showOpenInCodeSandbox={true}
                  />
                </div>
              </SandpackProvider>
            </>
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