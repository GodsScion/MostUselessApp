// let app = localStorage.getItem("app")
// if (app !== null) document.getElementById(app).click() 
const messages = [
    {title: "Hold on, is this real 😵‍💫?", message: "I wasn't sure anyone would find this! Are you lost 🤨?"},
    {title: "You must be really bored 😏", message: "We get it, existential dread is a real thing. But seriously, there's gotta be something better to do... right 😂?"},
    {title: "Alert❗", message: "A single user has been detected! Prepare the... confetti 🎊? Wait, I don't actually have confetti 😅."},
    {title: "Mom! Look, I have a visitor 😃!", message: "Pssst, don't tell her, you're the only active visitor 🤫."},
    {title: "🚨 BREAKING NEWS 🚨 Website receives first visitor in the history of ever.", message: "More at 11 👨🏼‍💼📰... or whenever we figure out how to write news articles 🤓😅."},
    {title: "Would you like a participation trophy 🏆 for finding this?", message: "Just kidding (mostly). I'm happy to have you 😁..."},
    {title: "ℹ️ Info", message: "This notification is the most exciting thing that will happen here all day 🥱. Maybe."},
    {title: "Wait! What 😲!!?", message: "Is someone actually using this website 🤯?"}, 
]
let todays_message = messages[Math.floor(Math.random() * messages.length)]
showToast("<h6>"+todays_message.message+"</h6>", "<h5>"+todays_message.title+"</h5>")

setInterval(timeLeft,1000)
setTimeout(showTip,8000)

// App level functions
function themeChanger() {
    const themeBtn = document.getElementById("theme")
    let theme = "light"
    if (themeBtn.innerHTML.search("Li") > -1) { theme = "dark" }
    localStorage.setItem("theme", theme)
    if (theme === "light") {
        themeBtn.innerHTML = "☀️ Light Theme"
        themeBtn.classList.replace("btn-dark", "btn-light")
    } else {
        themeBtn.innerHTML = "🌙 Dark Theme"
        themeBtn.classList.replace("btn-light", "btn-dark")
    }
    document.documentElement.setAttribute("data-bs-theme", theme)
}
function showToast(message, title = "ℹ️ Info", hideButton = true) {
    document.getElementById("toastBody").innerHTML = message
    document.getElementById("toastTitle").innerHTML = title
    document.getElementById("toastButton").hidden = hideButton
    bootstrap.Toast.getOrCreateInstance(document.getElementById("toastMain")).show()
}
function showWarning(message) {
    document.getElementById("result-warning").hidden = false
    document.getElementById("result-error").innerHTML = message
}
function hideWarning() { document.getElementById("result-warning").hidden = true }
function showTip() {
    const tooltip = document.getElementById("tooltip-all")
    tooltip.hidden = false
    setTimeout(() => {
        tooltip.hidden = true; 
        setTimeout(turnOnAlarmFirstTime, 2000)
    }, 7000)
}
function turnOnAlarmFirstTime() {
    let app = localStorage.getItem("app")
    if (app !== "changeText" && !AlarmOn) {
        showToast("Alarm will be turned On ⏰🔔 in few secs!","ℹ️ Info")
        setTimeout(() => {AlarmOn = false; toggleAlarm()}, 6000)
    }
}


// Change Text Cases functions
function reset() {
    let inputText = document.getElementById("text")
    inputText.value = ""
    inputText.setAttribute("rows", "1")
    inputText = document.getElementById('result')
    inputText.innerHTML = ""
    inputText.setAttribute("rows", "1")
}
function upper() {document.getElementById('result').innerHTML = document.getElementById("text").value.toUpperCase(); dynamicHeight('result')}
function lower() {document.getElementById('result').innerHTML = document.getElementById("text").value.toLowerCase(); dynamicHeight('result')}
function startUpper() {
    let list = document.getElementById("text").value.toLowerCase().split('\n')
    let text = ""
    for (let sentence of list) {
        let words = sentence.split(' ')
        for (let word of words) { text = text + word.charAt(0).toUpperCase() + word.substring(1) + " " }
        text = text.substring(0, text.length - 1) + "\n"
    }
    let resultText = document.getElementById('result')
    resultText.innerHTML = text.slice(0,-1)
    resultText.setAttribute("rows", list.length)
}
function copyClipboard() {
    let copyText = document.getElementById('result');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    showToast("Copied the text: " + copyText.value);
}
function dynamicHeight(id) {
    let inputText = document.getElementById(id)
    let len = inputText.value.split('\n').length
    inputText.setAttribute("rows", len)
}


// Pre Plan Leaving Time functions
let AlarmOn = false
function toggleAlarm() { 
    AlarmOn = !AlarmOn 
    if (AlarmOn) {
        const btn = document.getElementById("toggleAlarmBtn")
        showToast("Alarm is On ⏰🔔","ℹ️ Info") 
        btn.innerHTML = "Turn Off Alarm ⏰🔕"
        btn.classList.replace("btn-secondary","btn-warning")
    } else {
        const btn = document.getElementById("toggleAlarmBtn")
        showToast("Alarm is Off ⏰🔕","ℹ️ Info") 
        btn.innerHTML = "Turn On Alarm ⏰🔔"
        btn.classList.replace("btn-warning","btn-secondary")
    }
}
function timeCorrecter(hrs) { 
    if (Number(hrs) >= 24) { 
        let tomorrow = new Date(new Date() + (Number(hrs)-24)*60*60*1000)
        return [tomorrow.getHours(), "TOMORROW as in " + tomorrow + ""]
    } else { 
        return [hrs, ""] 
    } 
}
function timeLeft() {
    let currentTime = new Date()
    let leavingTime = document.getElementById("leavingTime").value.split(":")
    let timeLeft = (Number(leavingTime[0]) - currentTime.getHours())*60 + Number(leavingTime[1]) - currentTime.getMinutes()
    document.getElementById("time").innerHTML = currentTime.toLocaleTimeString();
    if (timeLeft > 0) { 
        document.getElementById("timeLeft").innerHTML = `Hustle! Hustle! There's only ${Math.floor(timeLeft/60)} h ${timeLeft%60} m ${59 - currentTime.getSeconds()} s left 🧑🏻‍💻!`
    } else { 
        document.getElementById("timeLeft").innerHTML = `What are you still waiting for, isn't it time to leave 😁?`; 
        if (AlarmOn) { showToast("Let's Go...❗❗","<h2>🔔</h2>",false) }
    }
}
function validateLunch() {
    let lunchTotal = Number(document.getElementById("lunchTotal").value)
    let workTotal = Number(document.getElementById("targetHrs").value)*60 + Number(document.getElementById("targetMin").value)
    let start = document.getElementById("startTime").value.split(":")
    document.getElementById("suggestLunch").innerHTML = `Recommended to start Lunch after ${timeCorrecter(Number(start[0])+3)[0]}:${start[1]} and before ${timeCorrecter(Number(start[0])+5)[0]}:${start[1]}`
    let lunch = document.getElementById("lunchStart").value.split(":")
    let diff = Number(lunch[0])*60 + Number(lunch[1]) - Number(start[0])*60 - Number(start[1])
    if (lunchTotal < 30 && (workTotal > 360 || (lunchTotal > 0 && workTotal <= 360))) { return showWarning("Usually Lunch can't be less than 30 min. Unless you're waiving it for some reason 🧐. Please update Lunch 'Total' as 0 if you'll only work 6 hrs or less and skip lunch 😅!") }
    if (diff < 0) { return showWarning("Lunch should start after your Office entry time 😒!") }
    if (diff >= 300 && workTotal > 360) { return showWarning(`Lunch should start before 5 hrs from entry of your office 🧐. Your current difference is ${Math.floor(diff/60)} hrs ${(diff%60).toString().padStart(2,0)} min 🥱. Unless you're waving your lunch time and only working for max 6 hrs today!`) }
    if (diff < 180) { return showWarning(`It's recommended to start Lunch at least after 3 hrs from entry of your office 🧐. Your current difference is only ${Math.floor(diff/60)} hrs ${(diff%60).toString().padStart(2,0)} min 😑`) }
    return hideWarning()
}
function changeTotal(th) {
    const startEle = document.getElementById("lunchStart")
    const endEle = document.getElementById("lunchEnd")
    let start = startEle.value.split(":")
    let end = endEle.value.split(":")
    const totalEle = document.getElementById("lunchTotal")
    let total = (Number(end[0]) - Number(start[0]))*60 - Number(start[1]) + Number(end[1])
    if (total > 180) { 
        showToast("Total duration of lunch cannot be greater than 3 hrs = 180 min 😑!"); 
        return endEle.value = (Number(start[0])+3).toString().padStart(2,0) + ":" + start[1]
    }
    if (total < 0) { 
        showToast("You cannot end lunch before you can start your lunch 😒!"); 
        endEle.value = (Number(start[0])).toString().padStart(2,0) + ":" + start[1]
        total = 0
    }             
    totalEle.value = total 
    calLeaveTime()
}
function changeTo(th) {
    let start = document.getElementById("lunchStart").value.split(":")
    let total = Number(document.getElementById("lunchTotal").value)
    let min = Number(start[1]) + total
    let hrs = timeCorrecter( Number(start[0]) + Math.floor(min/60) )
    document.getElementById("lunchEnd").value = hrs[0].toString().padStart(2,0) + ":" + (min%60).toString().padStart(2,0)
    time24("lunchEnd", null, hrs[1])
    validateLunch()
}
function calLeaveTime() {
    const startEle = document.getElementById("startTime")
    const targetHrsEle = document.getElementById("targetHrs")
    const targetMinEle = document.getElementById("targetMin")
    const lunchTotalEle = document.getElementById("lunchTotal")
    const leavingTimeEle = document.getElementById("leavingTime")
    let start = startEle.value.split(":")
    let min = Number(start[1]) + Number(targetMinEle.value) + Number(lunchTotalEle.value)
    let hrs = timeCorrecter( Number(start[0]) + Number(targetHrsEle.value) + Math.floor(min/60) )
    console.log(hrs);
    leavingTimeEle.value = hrs[0].toString().padStart(2,0) + ":" + (min%60).toString().padStart(2,0)
    time24("leavingTime", null, hrs[1])
    validateLunch()
}
function time24(id, th, tomorrow = "") { 
    const hmEle = document.getElementById(id)
    let hm = hmEle.value.split(':')
    if (hm.length !== 2 || isNaN(hm[0]) || isNaN(hm[1]) || Number(hm[0]) > 23 || Number(hm[0]) < 0 || Number(hm[1]) > 59 || Number(hm[1]) < 0) {
        hmEle.value = th.previousValue || "00:00"
        showToast("Seriously 😒? Use arrows ⬆️⬇️ or click on 🕒 to change time. Only enter valid inputs.")
    }
    document.getElementById(id+'-24').innerHTML = hmEle.value + " Military time" + tomorrow 
}
function resetAll() {
    document.getElementById("startTime").value = "08:00"
    document.getElementById("startTime-24").innerHTML = "08:00 Military time"
    document.getElementById("targetHrs").value = "8"
    document.getElementById("targetMin").value = "00"
    document.getElementById("lunchTotal").value = "30"
    document.getElementById("lunchStart").value = "12:00"
    document.getElementById("lunchStart-24").innerHTML = "12:00 Military time"
    document.getElementById("lunchEnd").value = "12:30"
    document.getElementById("lunchEnd-24").innerHTML = "12:30 Military time"
    document.getElementById("leavingTime").value = "16:30"
    document.getElementById("leavingTime-24").innerHTML = "16:30 Military time"
    AlarmOn = false
    hideWarning()
}
