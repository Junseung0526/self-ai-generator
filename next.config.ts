/** @type {import('next').NextConfig} */
const nextConfig = {
  // 💡 TypeScript 에러가 있어도 빌드를 완료합니다.
  typescript: {
    ignoreBuildErrors: true,
  },
  // 💡 ESLint 규칙 위반이 있어도 빌드를 완료합니다.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 💡 정적 자산 및 이미지 설정
  images: {
    unoptimized: true,
  },
  // Next.js 16에서 Turbopack 관련 경고가 날 수 있으므로 추가적인 안정성 확보
  experimental: {
    // 필요한 실험적 기능이 있다면 여기에 추가
  }
};

export default nextConfig;