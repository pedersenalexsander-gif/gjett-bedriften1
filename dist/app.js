const companies=[
["Varmepumpe Bergen Vestrheim","Varmepumper","varmepumpebergen.no","En Bergen-bedrift som arbeider med energieffektiv oppvarming og inneklima."],
["Thuen & Matre","Bilverksted","thuen-matre.no","Et verkstednavn fra Os-området som hjelper bileiere med service og reparasjoner."],
["Nærøy Bil","Bilverksted","naroybil.no","Denne bilbedriften holder til i Kolvereid og hjelper lokale bileiere."],
["Stoa Autorep MECA","Bilverksted","meca.no","Et MECA-verksted i Arendal med Stoa som en del av navnet."],
["Andreassen Brønnboring og Energiboring","Brønn- og energiboring","andreassen-bronnboring.no","Har over 40 års erfaring og utfører brønnboring, energiboring og fundamentering."],
["Brobekk Grill & Pizza","Restaurant","brobekk.pizza","Et kjent fastfood-sted i Oslo med både grillretter og pizza på menyen."],
["Mesterhus Innlandet","Bygg og bolig","mesterhusinnlandet.no","Lokal byggmester og totalentreprenør som bygger hus, hytter og rehabiliterer i Innlandet."],
["Servicehallen Dombås","Bilverksted","meca.no","MECA-verksted på Dombås med service, EU-kontroll og reparasjoner."],
["VoldenTollefsen","Rørlegger","voldentollefsen.no","En rørleggerbedrift med historie tilbake til 1876 og avdelinger i Egersund og Sokndal."],
["MECA PlanetHifi","Bilverksted","meca.no","Navnet høres ut som lydutstyr, men dette er knyttet til et bilverksted."],
["S Holand Bilverksted","Bilverksted og bilberging","s-holand.no","MECA-verkstedet på Evenskjer har vært i drift siden 1976 og tilbyr bilberging hele døgnet."],
["Skadesenteret Riko","Bilskadeverksted","skadesenteretriko.no","Autorisert skadeverksted i Førde med oppretting, lakkering, bilglass og taksering."],
["Greverud Grill & Indisk","Restaurant","greverudgrill.no","Her kombineres klassisk grillmat med indiske retter på Greverud."],
["Rotstigen","Bygg og bolig","mesterhusinnlandet.no","Selskapet bak Mesterhus Innlandet leverer nybygg og rehabilitering."],
["Sauda Bilverksted","Bilverksted","saudabilverksted.no","Et lokalt verksted med kommunen Sauda tydelig i navnet."],
["Elektriker på Hjul","Elektriker","elektrikerpahjul.no","Navnet lover at elektrikertjenestene kommer rullende ut til kunden."],
["Narvik Car Rental","Bilutleie","narvikcarrental.no","Denne bedriften leier ut biler i byen omgitt av fjell og Ofotfjorden."],
["Superdekk Bømlo Bil","Dekk og bilservice","superdekk.no","En bilbedrift på Bømlo hvor dekk er en sentral del av navnet."],
["Stormglass","Glassmester","stormglass.no","Navnet peker direkte mot glassarbeid, reparasjon og montering."],
["Bilstellet","Bilpleie","bilstellet.no","Denne bedriften har et navn som forteller at bilen skal få godt stell."],
["Steam Sauna Tromsø","Badstue og opplevelser","steamsauna.no","En arktisk velværeopplevelse hvor varme møter Tromsøs kalde omgivelser."],
["Steam Tours Tromsø","Reiseliv og opplevelser","steamtours.no","Denne Tromsø-aktøren tilbyr turer og opplevelser for besøkende."],
["Johs. E. Øvsthus","Byggmester","ovsthus.no","En lokal Mesterhus-forhandler og byggmester på Voss."],
["Jærprosjekt","Bygg og bolig","mesterhus.no","En Mesterhus-forhandler med Jæren som markedsområde."],
["Forma Studio","Design og kreativt studio","formastudio.no","Navnet forbindes med form, uttrykk og kreativt arbeid."],
["Fengselet Gjestegård","Overnatting","fengselet.no","Et uvanlig overnattingssted med navn hentet fra byggets tidligere bruk."]
].map(x=>({name:x[0],cat:x[1],domain:x[2],clue:x[3]}));
const $=id=>document.getElementById(id);let mode="mixed",count=10,round=[],index=0,score=0,streak=0,best=0,correct=0,time=15,timer,locked=false;
$("companyCount").textContent=companies.length;$("record").textContent=localStorage.getItem("gb-record")||0;
document.querySelectorAll(".mode").forEach(b=>b.onclick=()=>{document.querySelectorAll(".mode").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");mode=b.dataset.mode});
document.querySelectorAll("[data-count]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-count]").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");count=+b.dataset.count});
const shuffle=a=>[...a].sort(()=>Math.random()-.5),show=id=>{document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));$(id).classList.add("active")};
function start(){const pool=shuffle(companies);round=pool.slice(0,Math.min(count,pool.length)).map((company,i)=>({company,type:mode==="mixed"?["logo","category","clue"][i%3]:mode}));index=score=streak=best=correct=0;show("game");render()}
function choices(answer){return shuffle([answer,...shuffle(companies.filter(c=>c.name!==answer.name)).slice(0,3)])}
function render(){clearInterval(timer);locked=false;time=15;$("timer").textContent=time;$("streak").textContent="🔥 "+streak;$("score").textContent=score;$("scoreTop").textContent=score+" poeng";$("questionNumber").textContent=`Spørsmål ${index+1} av ${round.length}`;$("progressBar").style.width=`${index/round.length*100}%`;$("feedback").textContent="";$("feedback").className="feedback";$("next").classList.add("hidden");const q=round[index],c=q.company,v=$("visual");v.innerHTML="";
if(q.type==="logo"){$("questionType").textContent="GJETT LOGOEN";$("question").textContent="Hvilken bedrift er dette?";$("subquestion").textContent="Logo eller nettstedsikon fra bedriften.";const img=new Image();img.src=`https://www.google.com/s2/favicons?domain=${c.domain}&sz=128`;img.alt="Bedriftslogo";img.onerror=()=>v.innerHTML=`<span class="monogram">${c.name[0]}</span>`;v.appendChild(img)}
else if(q.type==="category"){v.innerHTML=`<span class="monogram">${c.cat[0]}</span>`;$("questionType").textContent="GJETT KATEGORIEN";$("question").textContent=c.cat;$("subquestion").textContent="Hvilken bedrift passer til denne kategorien?"}
else{v.innerHTML="<span class='monogram'>❝</span>";$("questionType").textContent="GJETT LEDETRÅDEN";$("question").textContent="Hvilken bedrift beskrives?";$("subquestion").textContent=c.clue}
const box=$("answers");box.innerHTML="";choices(c).forEach((choice,i)=>{const b=document.createElement("button");b.className="answer";b.textContent=`${String.fromCharCode(65+i)}  ${choice.name}`;b.onclick=()=>answer(b,choice.name===c.name,c);box.appendChild(b)});timer=setInterval(()=>{time--;$("timer").textContent=time;if(time<=0){clearInterval(timer);answer(null,false,c)}},1000)}
function answer(button,isCorrect,c){if(locked)return;locked=true;clearInterval(timer);document.querySelectorAll(".answer").forEach(b=>{b.disabled=true;if(b.textContent.includes(c.name))b.classList.add("correct")});if(isCorrect){const gained=100+time*5+streak*10;score+=gained;streak++;correct++;best=Math.max(best,streak);$("feedback").textContent=`Riktig! +${gained} poeng`;$("feedback").classList.add("good")}else{streak=0;if(button)button.classList.add("wrong");$("feedback").textContent=`Riktig svar: ${c.name}`;$("feedback").classList.add("bad")}$("score").textContent=score;$("streak").textContent="🔥 "+streak;$("next").classList.remove("hidden")}
function next(){index++;if(index>=round.length){finish();return}render()}
function finish(){const accuracy=Math.round(correct/round.length*100),old=+(localStorage.getItem("gb-record")||0);if(score>old)localStorage.setItem("gb-record",score);$("record").textContent=Math.max(old,score);$("finalScore").textContent=score;$("correctCount").textContent=`${correct}/${round.length}`;$("bestStreak").textContent=best;$("accuracy").textContent=accuracy+"%";$("resultEmoji").textContent=accuracy>=80?"🏆":accuracy>=50?"👏":"🧠";$("resultTitle").textContent=accuracy>=80?"Bedriftsekspert!":accuracy>=50?"Godt jobbet!":"Ny runde?";$("resultText").textContent=accuracy>=80?"Du kjenner kundene svært godt.":"Nå kjenner du bedriftene enda litt bedre.";show("result")}
$("play").onclick=start;$("next").onclick=next;$("again").onclick=()=>show("start");$("quit").onclick=()=>{clearInterval(timer);show("start")};
