import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { userInfo } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return new Response(JSON.stringify({ error: "키 없음" }), { status: 500 });

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", 
    }, { apiVersion: 'v1' });

    const prompt = `
      사용자 정보: ${userInfo}
      위 정보를 바탕으로 한 페이지짜리 자기소개 React 웹사이트를 작성해줘.
      
      [중요 지침]
      1. 모든 컴포넌트(ProjectCard 등)를 하나의 파일 안에 작성해. 외부 임포트 없이 이 파일 하나만으로 실행되어야 해.
      2. 반드시 'export default function App()'이 포함되어야 해.
      3. 오직 '순수 코드'만 응답해. 설명, 인사말, 마크다운(\`\`\`)은 절대 포함하지 마.
      4. lucide-react 아이콘을 사용한다면 반드시 상단에 import 문을 포함해.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // 로직: 설명이 섞여있을 경우를 대비해 첫 번째 import나 function 키워드부터 끝까지만 추출
    const startIndex = text.search(/import|function|export/);
    let finalCode = startIndex !== -1 ? text.slice(startIndex) : text;
    
    // 마크다운 잔재 제거
    finalCode = finalCode.replace(/```jsx|```javascript|```/g, "").trim();

    return new Response(JSON.stringify({ code: finalCode }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}