import httpx
import logging
import os

# Hugging Face Inference API details
HF_API_URL = "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn"
HF_TOKEN = os.environ.get("HF_TOKEN", "")  # Set via environment variable

logger = logging.getLogger(__name__)

async def summarize_text(text: str, max_length: int = 150, min_length: int = 40):
    """
    Summarize long articles using Hugging Face Inference API
    """
    if not text or len(text) < 50:
        return text
    
    if not HF_TOKEN:
        logger.warning("HF_TOKEN not set. Summarization unavailable.")
        return "AI summarization is not configured. Please check your environment variables."

    headers = {"Authorization": f"Bearer {HF_TOKEN}"}
    payload = {
        "inputs": text,
        "parameters": {
            "max_length": max_length,
            "min_length": min_length,
            "do_sample": False
        }
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(HF_API_URL, headers=headers, json=payload, timeout=30.0)
            
            if response.status_code == 200:
                result = response.json()
                if isinstance(result, list) and len(result) > 0:
                    return result[0].get("summary_text", text)
                return text
            elif response.status_code == 503:
                # Model is loading
                logger.warning("Hugging Face model is loading (503).")
                return "The AI model is currently warming up. Please try again in a few seconds."
            else:
                logger.error(f"HF API Error: {response.status_code} - {response.text}")
                return f"Summarization failed: {response.status_code}"
                
    except Exception as e:
        logger.error(f"Error in summarize_text: {str(e)}")
        return "An error occurred during summarization."

async def chat_with_ai(message: str, context: str = "", conversation_history: list = []):
    """
    Chat with AI about news articles
    """
    if not HF_TOKEN:
        logger.warning("HF_TOKEN not set. Chat unavailable.")
        return "AI chat is not configured. Please check your environment variables."

    # Build the conversation context
    system_prompt = """You are a helpful AI assistant specialized in tech news and programming. 
    You can summarize articles, explain complex topics, compare different articles, 
    and provide insights on current events in the tech world. 
    Always be concise and informative in your responses."""

    # Construct messages for the chat model
    messages = [{"role": "system", "content": system_prompt}]
    
    # Add conversation history
    for msg in conversation_history[-5:]:  # Last 5 messages
        messages.append(msg)
    
    # Add current context if provided
    if context:
        messages.append({"role": "system", "content": f"Relevant context: {context}"})
    
    # Add current user message
    messages.append({"role": "user", "content": message})

    try:
        # Use a chat model
        chat_api_url = "https://router.huggingface.co/hf-inference/models/meta-llama/Llama-3.2-1B-Instruct"
        headers = {"Authorization": f"Bearer {HF_TOKEN}"}
        payload = {
            "inputs": messages,
            "parameters": {
                "max_new_tokens": 500,
                "temperature": 0.7,
                "top_p": 0.9,
            }
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(chat_api_url, headers=headers, json=payload, timeout=30.0)
            
            if response.status_code == 200:
                result = response.json()
                if isinstance(result, list) and len(result) > 0:
                    return result[0].get("generated_text", "I apologize, but I couldn't generate a response.")
                return "I apologize, but I couldn't generate a response."
            elif response.status_code == 503:
                return "The AI model is currently warming up. Please try again in a few seconds."
            else:
                logger.error(f"HF Chat API Error: {response.status_code} - {response.text}")
                return f"Chat failed: {response.status_code}"

    except Exception as e:
        logger.error(f"Error in chat_with_ai: {str(e)}")
        return "An error occurred during chat. Please try again."
