
import os
import time

from dotenv import load_dotenv
from google import genai
from google.genai import errors

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError(
        "GEMINI_API_KEY is missing. Add it to your backend .env file."
    )

client = genai.Client(api_key=api_key)


def generate_response(prompt: str) -> str:
    """Generate text with Gemini and retry temporary service failures."""

    model = os.getenv("GEMINI_MODEL", "gemini-3.6-flash")
    max_attempts = 3

    for attempt in range(max_attempts):
        try:
            response = client.models.generate_content(
                model=model,
                contents=prompt,
            )

            if not response.text:
                raise RuntimeError("Gemini returned an empty response.")

            return response.text.strip()

        except errors.ServerError as exc:
            # Retry only temporary server errors, such as HTTP 503.
            if exc.code not in (500, 502, 503, 504):
                raise

            if attempt == max_attempts - 1:
                raise

            time.sleep(2 ** attempt)

    raise RuntimeError("Gemini could not generate a response.")
