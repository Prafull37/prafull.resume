import fs from 'fs';
import express from 'express';
import puppeteer from 'puppeteer';

const app = express();

const port = 7000
const isLocal = true;

app.use(express.json());

const url=isLocal ? "http://127.0.0.1:5500/index.html":"https://prafull37.github.io/resume";
const emulatePrint=true;
const fileName="Prafull_React_Developer_Resume.pdf"

async function launchAndPrint(){
    try{
        const browser = await puppeteer.launch({headless:!isLocal,product:"chrome"});
        const page = await browser.newPage();
        if(emulatePrint){
            await page.emulateMediaType("print");
        }
        await page.goto(url,{waitUntil:"load"});
        await page.pdf({
            format:"A4",
            path:fileName,
            printBackground:true,
        })
        await browser.close();
    }catch(e){
        throw new Error("Error with puppeteer",e);
    }
}

app.get("/print",async (req,res)=>{
   
   try{
    // const {url,emulatePrint}=req.body||{};
    if(!fs.existsSync(fsName)){
        await launchAndPrint(url,emulatePrint);
    }
    const fileStream = fs.createReadStream(fsName);
    res.setHeader("Content-Type","application/pdf");
    res.download(fileStream);
   } catch(e){
    res.status(500)
   }
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port,async () => {
    
    if(fs.existsSync(fileName)){
        fs.unlink(fileName,(err)=>{
            if(err){
                console.log("error while deleting file",err)
            }else{
                console.log("file deleted successfully...")
            }
        })
    }
    await launchAndPrint(url,emulatePrint);
    console.log(`Example app listening on port ${port}`)
})