from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

data_store = {
"steps": 0,
"mood": 0,
"points": 0
}

app.add_middleware(
CORSMiddleware,
allow_origins=["*"],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

@app.get("/test")
def get_data():
return data_store

@app.post("/test")
def save_data(data: dict):
global data_store
data_store = data
return {"message": "Saved successfully"}

