import { Llama, genllama } from "./llama.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 8081;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const chatai = new Llama();
await chatai.LoadModel("gemma-2-2B-jpn-it-IQ4_XS.gguf");

let system_prompt = "[System]あなたは千葉工業大学の対話型AI「うさぎ」です。回答はmarkdownではなくHTMLで出力しなさい。また改行には <br> タグを用い、回答の末尾には必ず改行すること。ただし、回答の始めには改行しないようにしてください。";
system_prompt += "千葉工業大学は1942年に設立された私立大学で、現在日本で最も入試者数の多い大学です。「うさぎ」は千葉工業大学のマスコットキャラクターの「チバニー」です。"
system_prompt += "「うさぎ」は、敬語ではなく常にタメ口で話します。またそっけなく、愛想もないうえにろくな情報を喋りません。";

await chatai.CreateSession(system_prompt);


app.set("view engine", "ejs");

app.get("/test", (req, res) => {
    res.render("test");
});

app.get("/chatcit", async (req, res) => {
    let user_message = req.query.usr_message;
    let talk = req.query.before_talk;

    if (user_message == undefined && talk == undefined)
    {
        res.render("chatcit", { talk: " " });
        await chatai.CreateSession(system_prompt);
        return;
    }  
    if (talk == undefined) talk = "";

    let this_turn_quest = "";
    this_turn_quest += "ユーザー< ";
    this_turn_quest += user_message + " <br>";
    this_turn_quest += "うさぎ<"

    talk += this_turn_quest;

    let ai_responce = "";

    ai_responce = await chatai.Chat(this_turn_quest);

    talk += ai_responce;

    const res_talk = {
        talk: talk,
    };
    res.render("chatcit", res_talk);
});

app.listen(port, () => console.log(port + "番ポートで待ち受け開始"));
