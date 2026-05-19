from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import os

app = FastAPI()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

memory = []

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):

    memory.append({
        "role": "user",
        "content": req.message
    })

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=memory
    )

    result = response.choices[0].message.content

    memory.append({
        "role": "assistant",
        "content": result
    })

    return {
        "response": result
    }
