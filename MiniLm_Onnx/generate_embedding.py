from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import onnxruntime as ort

app = FastAPI()

session = ort.InferenceSession("model.onnx", providers=["CPUExecutionProvider"])

class TextRequest(BaseModel):
    text: str

@app.post("/embed")
def embed(req: TextRequest):
    model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
    emb = model.encode(req.text, convert_to_numpy=True).tolist()
    return {"embedding": emb}
