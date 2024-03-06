import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained('gpt2')
tokenizer = AutoTokenizer.from_pretrained('gpt2')

def generate_next_word_probs(text):
	inputs = tokenizer(text, return_tensors='pt')
	next_token_probs = model(**inputs).logits[0][-1]
	next_token_probs = torch.nn.functional.softmax(next_token_probs, dim=0)
	values, indices = next_token_probs.topk(10)
	tokens = tokenizer.convert_ids_to_tokens(indices)
	#print(tokens)
	tokens = [token.replace("Ġ", " ") for token in tokens]
	return {"tokens": tokens, "values": values.tolist()}

import flask
from flask import Flask
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET", "POST"])
def func():
	if request.method == "GET":
		response = flask.jsonify({"html": "<p>Hiya</p>"})
		#response.headers.add('Access-Control-Allow-Origin', '*')
		print(response)
		return response
	if request.method == "POST":
		text = request.json["text"]
		print(text)
		prob_list = generate_next_word_probs(text)
		response = flask.jsonify(prob_list)
		#response = flask.jsonify({"html": "<p>Post Hiya</p>"})
		#response.headers.add('Access-Control-Allow-Origin', '*')
		#print(response)
		return response

if __name__ == "__main__":
	app.run(host="0.0.0.0", port=8002)
