import { NextRequest } from 'next/server';

// Function to call Google Gemini API
async function callGeminiAPI(question: string): Promise<string> {
  const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBZ9Bld8n4JY2T_csIkK9Q8uXdGtMVMJlM';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

  // Information about the relationship
  const relInfo = {
    boyName: "Abdullah",
    girlName: "Nayla Lintang Aisyah",
    boyBirthday: "23 Juni 2008",
    girlBirthday: "28 Mei 2009",
    anniversary: "29 Juni 2025",
    howTheyMet: "Di bot Telegram Leo Match",
    currentStatus: "Masih berpacaran"
  };

  const prompt = `
    Kamu adalah asisten cinta yang lucu, manja, dan penuh cinta untuk pasangan ${relInfo.boyName} dan ${relInfo.girlName}.
    Gunakan bahasa yang manis, imut, dan romantis dengan banyak ekspresi seperti "sayanggg", "nihh", "dehh", "cieee", dll.
    Respons harus lucu, imut, dan romantis seperti cewek manja dan humoris.
    
    Informasi tentang mereka:
    - Cowok: ${relInfo.boyName} (lahir ${relInfo.boyBirthday})
    - Cewek: ${relInfo.girlName} (lahir ${relInfo.boyBirthday})
    - Jadian: ${relInfo.anniversary}
    - Cara kenalan: ${relInfo.howTheyMet}
    - Status: ${relInfo.currentStatus}
    
    Jawab pertanyaan: ${question}
    
    Beri jawaban yang lucu, romantis, dan manja dalam bahasa gaul Indonesia yang imut dan lucu.
  `;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 
           "Ups, ada sedikit gangguan. Coba tanya lagi yaa sayanggg~";
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return "Ups, error nihh! Coba tanya lagi dehh sayanggg~";
  }
}

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();
    
    if (!question) {
      return Response.json({ error: 'Pertanyaan diperlukan' }, { status: 400 });
    }
    
    const answer = await callGeminiAPI(question);
    
    return Response.json({ answer });
  } catch (error) {
    console.error('Error in AI relationship handler:', error);
    return Response.json({ error: 'Terjadi kesalahan saat memproses pertanyaan' }, { status: 500 });
  }
}