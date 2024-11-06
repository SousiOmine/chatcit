# chatcit

## これは
チバニーっぽいのとチャットが楽しめます。

## 使い方

llama.cpp用の量子化済み言語モデルをmodelsに配置し、
index.jsの
```await chatai.LoadModel("gemma-2-2B-jpn-it-IQ4_XS.gguf");```
の引数部を言語モデルのファイル名に書き換えてください。  
おすすめはGemma2-2b-jpnです。  
起動したら
http://localhost:8081/chatcit
を開いてください。