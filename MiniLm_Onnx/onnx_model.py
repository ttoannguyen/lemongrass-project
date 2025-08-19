from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer

app = FastAPI()
model = SentenceTransformer("sentence-transformers/all-MiniLM-L12-v2")

class TextInput(BaseModel):
    text: str

@app.post("/embed")
def embed(input: TextInput):
    vector = model.encode(input.text).tolist()
    return {"embedding": vector}
# uvicorn onnx_model:app --host 0.0.0.0 --port 8000