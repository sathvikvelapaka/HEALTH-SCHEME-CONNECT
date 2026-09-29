
export const getChatbotResponse = async (history, newMessage, apiKey) => {
  try {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, message: newMessage, apiKey }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'AI request failed');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error fetching response from backend AI service:", error);
    return "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
  }
};
