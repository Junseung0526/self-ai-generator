import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { userInfo, style } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    너는 세계 최고의 UI/UX 디자이너이자 React 개발자야.
    사용자 정보: ${userInfo}
    스타일 선호: ${style}

    위 정보를 바탕으로 한 페이지짜리 세련된 '자기소개 웹사이트' 코드를 작성해줘.
    [조건]
    1. React와 Tailwind CSS만 사용할 것. (CDN 방식이 아닌 표준 JSX 문법)
    2. lucide-react 아이콘을 적절히 사용할 것.
    3. 코드 외의 설명(예: "알겠습니다", "여기 코드가 있습니다")은 절대 하지 말고 오직 유효한 JSX 코드만 출력할 것.
    4. 코드 시작과 끝에 \`\`\`jsx 같은 마크다운 기호를 붙이지 말고 순수 텍스트로만 코드를 줄 것.
    5. 전체 컴포넌트 이름은 'App'으로 통일하고 export default를 포함할 것.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let code = response.text();

    // 혹시라도 마크다운 기호가 섞여 나올 경우를 대비한 정제
    code = code.replace(/```jsx|```javascript|```/g, "").trim();

    return new Response(JSON.stringify({ code }));
  } catch (error) {
    return new Response(JSON.stringify({ error: "Gemini API 오류 발생" }), { status: 500 });
  }
}