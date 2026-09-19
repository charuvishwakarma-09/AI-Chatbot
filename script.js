let prompt=document.querySelector("#prompt")
let submitbtn=document.querySelector("#submit")
let chatContainer=document.querySelector(".chat-container")
let imagebtn=document.querySelector("#image")
let image=document.querySelector("#image img")
let imageinput=document.querySelector("#image input")

const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent"
const Api_Key="GIVE API"
let user={
    message:null,
    file:{
        mime_type:null,
        data: null
    }
}
 
async function generateResponse(aiChatBox) {
    async function fetchWithRetry(url,options,tries=4){
    for(let i=0;i<tries;i++){
        let response=await fetch(url,options)
        if((response.status===503 || response.status===429) && i<tries-1){
            await new Promise(r=>setTimeout(r,2000*(i+1)))
            continue
        }
        return response
    }
}

let text=aiChatBox.querySelector(".ai-chat-area")
    let parts=[]
if(user.file.data){
    parts.push({inline_data:user.file})
}
parts.push({text:user.message})

let RequestOption={
    method:"POST",
    headers:{
        'Content-Type':'application/json',
        'x-goog-api-key':Api_Key
    },
    body:JSON.stringify({
        contents:[{parts:parts}]
    })
}
    try{
    let response= await fetchWithRetry(Api_Url,RequestOption)
    let data=await response.json()
    if(!response.ok){
        throw new Error(data.error?.message || "Request failed")
    }
    let apiResponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
    text.innerText=apiResponse
}
catch(error){
    console.log(error)
    text.innerText="Sorry, something went wrong: "+error.message
}
    finally{
        chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})
        image.src=`img.svg`
        image.classList.remove("choose")
        user.file={}
    }
}



function createChatBox(html,classes){
    let div=document.createElement("div")
    div.innerHTML=html
    div.classList.add(classes)
    return div
}


function handlechatResponse(userMessage){
     if(!userMessage.trim()) return
    user.message=userMessage
    let html=`<img src="user.png" alt="" id="userImage" width="8%">
<div class="user-chat-area">
<span class="user-text"></span>
${user.file.data?`<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />` : ""}
</div>`
prompt.value=""
let userChatBox=createChatBox(html,"user-chat-box")
userChatBox.querySelector(".user-text").textContent=user.message
chatContainer.appendChild(userChatBox)

chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})

setTimeout(()=>{
let html=`<img src="ai.png" alt="" id="aiImage" width="10%">
    <div class="ai-chat-area">
    <img src="loading.webp" alt="" class="load" width="50px">
    </div>`
    let aiChatBox=createChatBox(html,"ai-chat-box")
    chatContainer.appendChild(aiChatBox)
    generateResponse(aiChatBox)

},600)

}


prompt.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
       handlechatResponse(prompt.value)

    }
})

submitbtn.addEventListener("click",()=>{
    handlechatResponse(prompt.value)
})
imageinput.addEventListener("change",()=>{
    const file=imageinput.files[0]
    if(!file) return
    let reader=new FileReader()
    reader.onload=(e)=>{
       let base64string=e.target.result.split(",")[1]
       user.file={
        mime_type:file.type,
        data: base64string
    }
    image.src=`data:${user.file.mime_type};base64,${user.file.data}`
    image.classList.add("choose")
    }
    
    reader.readAsDataURL(file)
})


imagebtn.addEventListener("click",()=>{
    imagebtn.querySelector("input").click()
})