import httpx
import logging
import os

# Hugging Face Inference API details
HF_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
HF_TOKEN = os.environ.get("HF_TOKEN", "")  # Set via environment variable

logger = logging.getLogger(__name__)

async def summarize_text(text: str, max_length: int = 150, min_length: int = 40):
    """
    Summarize long articles using Hugging Face Inference API
    """
    if not text or len(text) < 100:
        return text
    
    if not HF_TOKEN:
        logger.warning("HF_TOKEN not set. Summarization unavailable.")
        return "AI summarization is not configured. Please set HF_TOKEN."

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
