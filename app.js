const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],inr=n=>"₹"+Math.round(n),sleep=t=>new Promise(r=>setTimeout(r,t));
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
let loc=ld("zg-loc",{lat:28.6692,lng:77.4538,addr:"Ghaziabad, Uttar Pradesh"}),cart=ld("zg-cart",{r:null,i:{}}),promo=ld("zg-promo",null),orders=ld("zg-orders",[]);
const IC={pin:'<path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',cart:'<path d="M3 4h2l2.4 11h10l2-8H6.5"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h4l4 8M10 9H8"/>',tag:'<path d="M3 12l9-9h8v8l-9 9z"/><circle cx="15.5" cy="8.5" r="1.3"/>',shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',check:'<path d="M5 12l5 5 9-10"/>',leaf:'<path d="M5 19C5 9 11 5 20 4c0 9-4 15-13 15zM5 19l8-8"/>',flame:'<path d="M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9z"/>',card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>',phone:'<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',bank:'<path d="M3 10l9-6 9 6M5 10v8M10 10v8M14 10v8M19 10v8M3 20h18"/>',cash:'<rect x="3" y="7" width="18" height="10" rx="2"/><circle cx="12" cy="12" r="2.5"/>',nav:'<path d="M12 3l7 17-7-4-7 4z"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'};
const ic=(n,s=18)=>`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${IC[n]}</svg>`;
const km=(a,b,c,d)=>{const t=x=>x*Math.PI/180,h=Math.sin(t(c-a)/2)**2+Math.cos(t(a))*Math.cos(t(c))*Math.sin(t(d-b)/2)**2;return 12742*Math.asin(Math.sqrt(h))};
function build(){RS.forEach((r,i)=>{const a=AREAS[r.a],p=POOL[r.c];r.id=i;r.lat=a[0]+((i*37)%21-10)/1400;r.lng=a[1]+((i*53)%21-10)/1400;
 r.menu=p.d.map((d,j)=>({id:j,n:d[0],p:Math.round(d[1]*r.m/5)*5,v:d[2],e:p.e,r:i,s:p.s[j>>2],b:(i+j)%5===0}));r.pure=r.menu.every(m=>m.v);
 r.cost=Math.round(r.menu.reduce((a,m)=>a+m.p,0)/r.menu.length*1.8/50)*50;r.g=`linear-gradient(135deg,hsl(${i*47%360} 80% 55%),hsl(${(i*47+45)%360} 85% 42%))`});calc()}
function calc(){RS.forEach(r=>{r.km=km(loc.lat,loc.lng,r.lat,r.lng);r.eta=Math.round(20+r.km*3.5);r.fee=r.km<3?30:r.km<6?50:70})}
const toast=t=>{const e=$("#toast");e.textContent=t;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("on"),2400)};
const dot=v=>`<span class="dot ${v?"":"nv"}" title="${v?"Veg":"Non-veg"}"></span>`;

/* cart */
const ctl=(r,d)=>{const q=cart.r===r&&cart.i[d]||0;return q?`<span class="qty"><button data-a="add" data-r="${r}" data-d="${d}" data-n="-1" aria-label="Remove one">−</button>${q}<button data-a="add" data-r="${r}" data-d="${d}" data-n="1" aria-label="Add one">+</button></span>`:`<button class="add" data-a="add" data-r="${r}" data-d="${d}" data-n="1">Add</button>`};
const W=(r,d)=>`<span data-ctl="${r},${d}">${ctl(r,d)}</span>`;
function add(r,d,n){
 if(cart.r!==null&&cart.r!==r&&Object.keys(cart.i).length){if(!confirm(`Your cart has items from ${RS[cart.r].n}. Clear it and start a new cart from ${RS[r].n}?`))return;cart={r:null,i:{}}}
 cart.r=r;cart.i[d]=(cart.i[d]||0)+n;if(cart.i[d]<=0)delete cart.i[d];if(!Object.keys(cart.i).length)cart.r=null;sv("zg-cart",cart);paint()}
function tot(tip=0){
 const R=cart.r!==null?RS[cart.r]:null,ls=Object.entries(cart.i).map(([d,q])=>({m:R.menu[d],q})),sub=ls.reduce((a,x)=>a+x.m.p*x.q,0);
 let disc=0,fee=R&&sub?(sub>=499?0:R.fee):0,msg="",err=0;const P=PROMOS[promo];
 if(P){if(P.min&&sub<P.min){msg=`${promo} needs a ₹${P.min} subtotal`;err=1}else{msg=P.m;disc=P.t==="pct"?sub*P.v/100:P.t==="flat"?P.v:0;if(P.t==="ship")fee=0}}
 const tax=(sub-disc)*.05;return{R,ls,sub,disc,fee,tax,tip,msg,err,total:Math.max(0,sub-disc+tax+fee+tip),n:ls.reduce((a,x)=>a+x.q,0)}}
const lines=t=>{const r=(a,b,c="")=>`<div class="${c}"><dt>${a}</dt><dd>${b}</dd></div>`;return r("Subtotal",inr(t.sub))+(t.disc?r("Discount","−"+inr(t.disc)):"")+r("GST (5%)",inr(t.tax))+r("Delivery",t.fee?inr(t.fee):"Free")+(t.tip?r("Rider tip",inr(t.tip)):"")+r("Total",inr(t.total),"tot")};
function paint(){
 const t=tot();$("#cn").textContent=t.n;$("#ord").hidden=!orders.length;$("#crn").textContent=t.R?`${t.R.n} · ${t.R.eta} min`:"";
 $("#ci").innerHTML=t.n?t.ls.map(x=>`<div class="ln"><div>${dot(x.m.v)}${x.m.n}<br><small>${inr(x.m.p)}</small></div>${W(t.R.id,x.m.id)}<b>${inr(x.m.p*x.q)}</b></div>`).join(""):`<p class="empty">Your cart is empty. Add a dish and it shows up here.</p>`;
 $("#tt").innerHTML=lines(t);$("#pm").textContent=t.msg;$("#pm").className="msg"+(t.err?" err":"");$("#co").disabled=!t.n;
 $$("[data-ctl]").forEach(e=>{const[a,b]=e.dataset.ctl.split(",").map(Number);e.innerHTML=ctl(a,b)})}
const dr=o=>{$("#dr").classList.toggle("open",o);$("#sc").classList.toggle("on",o)};
function shell(){
 document.body.insertAdjacentHTML("afterbegin",`<header class="top"><a class="logo" href="index.html">Zaika<i>Ghaziabad</i></a><a class="loc" href="index.html" title="Change location">${ic("pin",16)} ${loc.addr}</a><a id="ord" class="hb" href="track.html" hidden>${ic("bike")} <span>Track order</span></a><button id="cb" class="cartbtn">${ic("cart")} Cart <b id="cn">0</b></button></header>`);
 document.body.insertAdjacentHTML("beforeend",`<aside id="dr" class="drawer"><div class="dh"><h2>Your cart</h2><button class="x" data-a="close" aria-label="Close cart">${ic("x",22)}</button></div><p id="crn" class="sub"></p><div id="ci" class="items"></div>
 <div class="promo"><input id="pc" placeholder="Promo code"><button id="pa">Apply</button></div><p id="pm" class="msg"></p><dl id="tt" class="totals"></dl><button id="co" class="primary">Go to checkout</button></aside><div id="sc" class="scrim"></div><div id="toast" class="toast" role="status"></div>`);
 document.addEventListener("click",e=>{const b=e.target.closest("[data-a]");if(!b)return;if(b.dataset.a==="add")add(+b.dataset.r,+b.dataset.d,+b.dataset.n);else dr(0)});
 $("#cb").onclick=()=>dr(1);$("#sc").onclick=()=>dr(0);$("#co").onclick=()=>location.href="checkout.html";
 $("#pa").onclick=()=>{const c=$("#pc").value.trim().toUpperCase();if(c&&!PROMOS[c]){promo=null;paint();$("#pm").textContent="Code not recognised. Try WELCOME10, FLAT50 or FREESHIP.";$("#pm").className="msg err";return}promo=c||null;sv("zg-promo",promo);paint()}}
const tile=m=>L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap",maxZoom:19}).addTo(m);
const pin=(e,c="")=>L.divIcon({html:`<div class="mp ${c}">${e}</div>`,className:"",iconSize:[38,38],iconAnchor:[19,19]});

/* pages */
function home(){
 $("#pl").textContent=`${RS.length} restaurants · ${RS.reduce((a,r)=>a+r.menu.length,0)} dishes in Ghaziabad`;$("#find").innerHTML=ic("search")+" Search";$("#geo").innerHTML=ic("nav")+" Use my current location";
 $("#tr").innerHTML=`<span>${ic("clock")} Delivery in about 30 min</span><span>${ic("tag")} New offers every day</span><span>${ic("shield")} Secure payments</span>`;
 const m=L.map("map").setView([loc.lat,loc.lng],13);tile(m);const me=L.marker([loc.lat,loc.lng],{draggable:true}).addTo(m),ring=L.circle([loc.lat,loc.lng],{radius:3000,color:"#ff4d6d",weight:1,fillOpacity:.07}).addTo(m);
 $("#addr").value=loc.addr==="Ghaziabad, Uttar Pradesh"?"":loc.addr;
 RS.forEach(r=>L.marker([r.lat,r.lng],{icon:pin(POOL[r.c].e)}).addTo(m).bindPopup(`<b>${r.n}</b><br>${r.c} · ${r.a}<br>★ ${r.rt} · ${inr(r.cost)} for two<br><a href="restaurant.html?id=${r.id}">View menu</a>`));
 const near=()=>{calc();ring.setLatLng([loc.lat,loc.lng]);$("#near").textContent=`${RS.filter(r=>r.km<=3).length} restaurants within 3 km`};near();
 const set=async(lat,lng,fly,name)=>{loc.lat=lat;loc.lng=lng;me.setLatLng([lat,lng]);if(fly)m.flyTo([lat,lng],15);near();
  if(name)loc.addr=name;else try{const j=await(await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)).json();loc.addr=j.display_name.split(",").slice(0,3).join(",")}catch{loc.addr=`${lat.toFixed(4)}, ${lng.toFixed(4)}`}
  $("#addr").value=loc.addr;sv("zg-loc",loc)};
 me.on("dragend",()=>{const p=me.getLatLng();set(p.lat,p.lng)});m.on("click",e=>set(e.latlng.lat,e.latlng.lng));
 const find=async()=>{const q=$("#addr").value.trim();if(!q)return toast("Type an area or address first");
  try{const j=await(await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=${encodeURIComponent(q+", Ghaziabad")}`)).json();
   j[0]?set(+j[0].lat,+j[0].lon,1,j[0].display_name.split(",").slice(0,3).join(",")):toast("Address not found. Try an area name or tap the map.")}catch{toast("Search needs internet. Tap the map instead.")}};
 $("#find").onclick=find;$("#addr").onkeydown=e=>{if(e.key==="Enter")find()};
 $("#geo").onclick=()=>navigator.geolocation?navigator.geolocation.getCurrentPosition(p=>set(p.coords.latitude,p.coords.longitude,1),()=>toast("Location blocked. Tap the map to set it."),{timeout:8000}):toast("Location is not supported here");
 $("#chips").innerHTML=["Indirapuram","Vaishali","Raj Nagar Extension","Kaushambi","Vasundhara","Crossings Republik"].map(a=>`<button data-ar="${a}">${a}</button>`).join("");
 $$("[data-ar]").forEach(b=>b.onclick=()=>set(AREAS[b.dataset.ar][0],AREAS[b.dataset.ar][1],1,b.dataset.ar+", Ghaziabad"));
 $("#go").onclick=()=>{sv("zg-loc",loc);location.href="explore.html"}}
function explore(){
 let c="All";const cs=["All",...Object.keys(POOL)];$("#q").value=new URLSearchParams(location.search).get("q")||"";$("#si").innerHTML=ic("search",20);
 $("#of").innerHTML=[["WELCOME10","10% off your order","Tap to apply"],["FLAT50","₹50 off orders over ₹300","Tap to apply"],["FREESHIP","Free delivery on any order","Tap to apply"]].map(o=>`<button class="of" data-p="${o[0]}">${ic("tag")} <b>${o[1]}</b><small>${o[2]}</small><br><code>${o[0]}</code></button>`).join("");
 $("#of").onclick=e=>{const b=e.target.closest("[data-p]");if(b){promo=b.dataset.p;sv("zg-promo",promo);paint();toast(promo+" saved. It applies at checkout.")}};
 const draw=()=>{const q=$("#q").value.trim().toLowerCase(),vg=$("#vg").checked,so=$("#so").value;
  $("#cu").innerHTML=cs.map(x=>`<button class="${x===c?"on":""}" data-c="${x}">${x==="All"?"All":POOL[x].e+" "+x}</button>`).join("");
  let l=RS.filter(r=>(c==="All"||r.c===c)&&(!q||(r.n+r.c+r.a).toLowerCase().includes(q)));
  l.sort((a,b)=>so==="r"?b.rt-a.rt:so==="c"?a.cost-b.cost:a.km-b.km);
  $("#rh").textContent=l.length?`${l.length} restaurant${l.length>1?"s":""} near you`:"";
  $("#rg").innerHTML=l.length?l.map(r=>`<a class="rc" href="restaurant.html?id=${r.id}"><div class="ban" style="background:${r.g}">${POOL[r.c].e}${r.pure?`<span class="bd">${ic("leaf",13)} Pure veg</span>`:""}<span class="rt">${ic("star",13)} ${r.rt}</span></div><div class="b"><h3>${r.n}</h3><p>${r.c} · ${r.a}</p><p class="mt"><span>${ic("clock",14)} ${r.eta} min</span><span>${ic("nav",14)} ${r.km.toFixed(1)} km</span><span>${ic("bike",14)} ${inr(r.fee)}</span></p></div></a>`).join(""):`<p class="empty">No restaurants match. Clear the search or pick another cuisine.</p>`;
  let d=[];if(q.length>1)RS.forEach(r=>r.menu.forEach(m=>{if((!vg||m.v)&&(c==="All"||r.c===c)&&m.n.toLowerCase().includes(q))d.push(m)}));
  d.sort((a,b)=>RS[a.r].km-RS[b.r].km);
  $("#dw").innerHTML=d.length?`<h2 class="s">${d.length} dish${d.length>1?"es":""} matching “${$("#q").value.trim()}”</h2><div class="grid">${d.slice(0,12).map(m=>`<div class="dc"><span class="em">${m.e}</span><div class="i"><h4>${dot(m.v)}${m.n}</h4><a href="restaurant.html?id=${m.r}">${RS[m.r].n} · ${RS[m.r].eta} min</a><br><b>${inr(m.p)}</b></div>${W(m.r,m.id)}</div>`).join("")}</div>`:"";paint()};
 $("#q").oninput=$("#vg").onchange=$("#so").onchange=draw;$("#cu").onclick=e=>{const b=e.target.closest("[data-c]");if(b){c=b.dataset.c;draw()}};draw()}
function rest(){
 const r=RS[+new URLSearchParams(location.search).get("id")]||RS[0],secs=POOL[r.c].s;document.title=r.n+" – Zaika Ghaziabad";
 $("#rh").style.background=r.g;$("#rh").innerHTML=`<div class="in"><span class="em">${POOL[r.c].e}</span><div><h1>${r.n}</h1><p>${r.c} · ${r.a}, Ghaziabad</p><p>${ic("star")} ${r.rt} · ${ic("clock")} ${r.eta} min · ${ic("nav")} ${r.km.toFixed(1)} km · ${inr(r.cost)} for two</p><p>${ic("bike")} Delivery ${inr(r.fee)}, free over ₹499</p></div>
  <div class="acts"><a class="ghost" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}">${ic("nav")} Directions</a><a class="ghost" href="explore.html">All restaurants</a></div></div>`;
 const draw=()=>{const q=$("#ms").value.trim().toLowerCase(),vg=$("#vg").checked;let h="",s=[];
  secs.forEach((n,k)=>{const l=r.menu.filter(m=>m.s===n&&(!vg||m.v)&&(!q||m.n.toLowerCase().includes(q)));if(l.length){s.push([k,n]);h+=`<h2 class="s" id="s${k}">${n}</h2><div class="list">${l.map(m=>`<div class="dc"><span class="em">${m.e}</span><div class="i"><h4>${dot(m.v)}${m.n}</h4>${m.b?`<span class="hot">${ic("flame",13)} Bestseller</span><br>`:""}<b>${inr(m.p)}</b></div>${W(r.id,m.id)}</div>`).join("")}</div>`}});
  $("#ml").innerHTML=h||`<p class="empty">No dishes match. Clear the search or the veg filter.</p>`;$("#sn").innerHTML=s.map(x=>`<button data-s="s${x[0]}">${x[1]}</button>`).join("");paint()};
 $("#sn").onclick=e=>{const b=e.target.closest("[data-s]");if(b)$("#"+b.dataset.s).scrollIntoView({behavior:"smooth"})};
 $("#ms").oninput=$("#vg").onchange=draw;draw();
 try{const m=L.map("rmap",{scrollWheelZoom:false});tile(m);L.marker([r.lat,r.lng],{icon:pin(POOL[r.c].e)}).addTo(m).bindPopup(r.n);L.marker([loc.lat,loc.lng],{icon:pin("🏠")}).addTo(m).bindPopup("Delivering to you");m.fitBounds([[r.lat,r.lng],[loc.lat,loc.lng]],{padding:[40,40],maxZoom:15})}catch{$("#rmap").remove()}}

/* checkout and payment (demo gateway: nothing is charged, card details are never stored) */
const luhn=s=>{let n=0;s.split("").reverse().forEach((c,i)=>{let d=+c;if(i%2){d*=2;if(d>9)d-=9}n+=d});return n%10===0};
const brand=s=>/^4/.test(s)?"Visa":/^(5[1-5]|2[2-7])/.test(s)?"Mastercard":/^(60|65|81|82)/.test(s)?"RuPay":/^3[47]/.test(s)?"Amex":"Card";
function checkout(){
 const root=$("#cx");let m="upi",tip=20;
 if(!tot().n){root.innerHTML=`<div class="empty box">${ic("cart",40)}<h2>Your cart is empty</h2><a class="primary" href="explore.html">Browse restaurants</a></div>`;return}
 const T=[["upi","UPI","phone"],["card","Card","card"],["net","Netbanking","bank"],["cod","Cash","cash"]],banks=["State Bank of India","HDFC Bank","ICICI Bank","Axis Bank","Kotak Mahindra Bank","Punjab National Bank"];
 const panel=()=>({upi:`<label>UPI ID<input id="vpa" placeholder="yourname@okaxis" autocomplete="off"></label><div class="chips lt">${["@okaxis","@ybl","@paytm","@oksbi"].map(s=>`<button type="button" data-s="${s}">${s}</button>`).join("")}</div>`,
  card:`<label>Card number<input id="cn1" inputmode="numeric" placeholder="4242 4242 4242 4242" maxlength="19" autocomplete="off"></label><label>Name on card<input id="cnm" autocomplete="off"></label><div class="f2"><label>Expiry (MM/YY)<input id="cex" placeholder="08/29" maxlength="5" inputmode="numeric" autocomplete="off"></label><label>CVV<input id="ccv" type="password" maxlength="4" inputmode="numeric" autocomplete="off"></label></div><p class="note">${ic("shield",16)} Demo mode: use test card 4242 4242 4242 4242 with any future expiry and any CVV. Card details are never saved.</p>`,
  net:`<label>Choose your bank<select id="bk">${banks.map(b=>`<option>${b}</option>`).join("")}</select></label>`,
  cod:`<p class="note">${ic("cash",16)} Pay the rider in cash or UPI when your food arrives. Please keep exact change.</p>`})[m];
 const draw=()=>{const t=tot(tip),R=t.R;
  root.innerHTML=`<div class="co"><div><div class="card"><h2>${ic("pin")} Delivery details</h2><label>Full name<input id="nm" autocomplete="name"></label><label>Phone (10 digits)<input id="ph" inputmode="numeric" maxlength="10" autocomplete="tel"></label><label>Delivery address<textarea id="ad" rows="2"></textarea></label><p class="note">${ic("nav",16)} Pinned on the map. <a href="index.html">Change location</a></p></div>
  <div class="card"><h2>${ic("bike")} Tip your rider</h2><div class="tip">${[0,10,20,30].map(v=>`<button data-t="${v}" class="${v===tip?"on":""}">${v?inr(v):"No tip"}</button>`).join("")}</div></div>
  <div class="card"><h2>${ic("card")} Payment</h2><div class="tabs">${T.map(x=>`<button data-m="${x[0]}" class="${x[0]===m?"on":""}">${ic(x[2],22)}${x[1]}</button>`).join("")}</div><div id="pp">${panel()}</div></div></div>
  <aside class="sum card"><h2>${ic("cart")} ${R.n}</h2><p class="sub">${R.eta} min · ${R.a}</p>${t.ls.map(x=>`<div class="ln"><span>${dot(x.m.v)}${x.m.n} × ${x.q}</span><b>${inr(x.m.p*x.q)}</b></div>`).join("")}<dl class="totals">${lines(t)}</dl><p id="er" class="msg err"></p>
  <button id="pay" class="primary" style="width:100%">${m==="cod"?"Place order":"Pay"} ${inr(t.total)}</button><p class="note">${ic("shield",16)} Secure checkout. Demo gateway, no money is charged.</p></aside></div>`;
  const keep=(id,v)=>{if(v&&$(id))$(id).value=v};keep("#nm",draw.v?.nm);keep("#ph",draw.v?.ph);$("#ad").value=draw.v?.ad??loc.addr;
  $("#pay").onclick=pay;$$("[data-t]").forEach(b=>b.onclick=()=>{save();tip=+b.dataset.t;draw()});$$("[data-m]").forEach(b=>b.onclick=()=>{save();m=b.dataset.m;draw()});
  $$("[data-s]").forEach(b=>b.onclick=()=>{const v=$("#vpa");v.value=v.value.split("@")[0]+b.dataset.s;v.focus()});
  if($("#cn1")){$("#cn1").oninput=e=>e.target.value=e.target.value.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();$("#cex").oninput=e=>{let v=e.target.value.replace(/\D/g,"").slice(0,4);e.target.value=v.length>2?v.slice(0,2)+"/"+v.slice(2):v}}};
 const save=()=>{draw.v={nm:$("#nm").value,ph:$("#ph").value,ad:$("#ad").value}};
 async function pay(){
  const er=$("#er"),v=id=>$(id).value.trim(),bad=s=>{er.textContent=s;return 0};er.textContent="";let label;
  if(v("#nm").length<2)return bad("Enter your full name.");if(!/^[6-9]\d{9}$/.test(v("#ph")))return bad("Enter a valid 10-digit mobile number.");if(v("#ad").length<8)return bad("Enter your full delivery address.");
  if(m==="upi"){if(!/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(v("#vpa")))return bad("Enter a valid UPI ID, like name@okaxis.");label="UPI · "+v("#vpa")}
  if(m==="card"){const n=v("#cn1").replace(/\s/g,""),e=v("#cex").match(/^(0[1-9]|1[0-2])\/(\d\d)$/);
   if(n.length<13||!luhn(n))return bad("That card number is not valid. Check it and try again.");if(v("#cnm").length<2)return bad("Enter the name on the card.");
   if(!e||new Date(2000+ +e[2],+e[1],1)<=new Date())return bad("Enter a valid, unexpired date as MM/YY.");if(!/^\d{3,4}$/.test(v("#ccv")))return bad("Enter the 3 or 4 digit CVV.");label=`${brand(n)} •••• ${n.slice(-4)}`}
  if(m==="net")label="Netbanking · "+v("#bk");if(m==="cod")label="Cash on delivery";
  const t=tot(tip),ov=document.createElement("div");ov.className="ov";document.body.append(ov);
  const say=(h,s)=>ov.innerHTML=`<div>${h}<h2>${s}</h2><p>Please don't close this page.</p></div>`,sp='<div class="sp"></div>';
  if(m!=="cod"){say(sp,"Connecting to your bank…");await sleep(1100);say(sp,`Authorising ${inr(t.total)}…`);await sleep(1300)}else{say(sp,"Placing your order…");await sleep(900)}
  const o={id:"ZG"+String(Date.now()).slice(-7),rid:t.R.id,rn:t.R.n,items:t.ls.map(x=>({id:x.m.id,n:x.m.n,q:x.q,p:x.m.p})),sub:t.sub,disc:t.disc,fee:t.fee,tax:t.tax,tip,total:t.total,pay:label,paid:m!=="cod",name:v("#nm"),phone:v("#ph"),addr:v("#ad"),lat:loc.lat,lng:loc.lng,eta:t.R.eta,start:Date.now()};
  orders.unshift(o);sv("zg-orders",orders.slice(0,20));cart={r:null,i:{}};promo=null;sv("zg-cart",cart);sv("zg-promo",null);
  ov.innerHTML=`<div><div class="ok">${ic("check",64)}</div><h2>${o.paid?"Payment successful":"Order placed"}</h2><p>${inr(o.total)} · ${label}</p></div>`;await sleep(1400);location.href="track.html?id="+o.id}
 draw()}

/* live order tracking with route and moving rider */
async function track(){
 const root=$("#tk"),id=new URLSearchParams(location.search).get("id"),o=orders.find(x=>x.id===id)||orders[0];
 if(!o){root.style.display="block";root.innerHTML=`<div class="wrap"><div class="empty box">${ic("bike",40)}<h2>No orders yet</h2><a class="primary" href="explore.html">Order something tasty</a></div></div>`;return}
 const r=RS[o.rid],ST=["Order confirmed","Preparing your food","Out for delivery","Delivered"];
 root.innerHTML=`<div id="tm"></div><div class="tp"><div id="hd"></div><ol id="st" class="steps"></ol><details open class="rcp"><summary>Order ${o.id}</summary><p>${o.rn}</p>${o.items.map(i=>`<div class="r"><span>${i.q} × ${i.n}</span><span>${inr(i.p*i.q)}</span></div>`).join("")}<hr><div class="r"><span>GST + delivery${o.tip?" + tip":""}</span><span>${inr(o.tax+o.fee+o.tip)}</span></div>${o.disc?`<div class="r"><span>Discount</span><span>−${inr(o.disc)}</span></div>`:""}<div class="r"><b>Total</b><b>${inr(o.total)}</b></div><p>${ic("card",16)} ${o.pay}${o.paid?" · Paid":" · Pay on delivery"}<br>${ic("pin",16)} ${o.name}, ${o.addr}</p></details>
 <div class="row"><a class="ghost" href="explore.html">Order more</a><button id="again" class="primary">Order again</button></div><p class="note">Demo tracking runs faster than real time (about 90 seconds).</p></div>`;
 $("#again").onclick=()=>{cart={r:o.rid,i:{}};o.items.forEach(i=>cart.i[i.id]=i.q);sv("zg-cart",cart);paint();dr(1)};
 const m=L.map("tm");tile(m);L.marker([r.lat,r.lng],{icon:pin(POOL[r.c].e)}).addTo(m).bindPopup(r.n);L.marker([o.lat,o.lng],{icon:pin("🏠")}).addTo(m).bindPopup("Your location");
 let path=[[r.lat,r.lng],[o.lat,o.lng]];
 try{const j=await(await fetch(`https://router.project-osrm.org/route/v1/driving/${r.lng},${r.lat};${o.lng},${o.lat}?overview=full&geometries=geojson`)).json();path=j.routes[0].geometry.coordinates.map(c=>[c[1],c[0]])}catch{}
 L.polyline(path,{color:"#ff4d6d",weight:5,opacity:.85}).addTo(m);m.fitBounds(path,{padding:[50,50]});const rider=L.marker(path[0],{icon:pin("🛵","rd")}).addTo(m);
 const cum=[0];for(let i=1;i<path.length;i++)cum.push(cum[i-1]+Math.hypot(path[i][0]-path[i-1][0],path[i][1]-path[i-1][1]));
 const at=f=>{const d=f*cum[cum.length-1];let i=1;while(i<cum.length-1&&cum[i]<d)i++;const s=Math.min(1,(d-cum[i-1])/((cum[i]-cum[i-1])||1));return[path[i-1][0]+(path[i][0]-path[i-1][0])*s,path[i-1][1]+(path[i][1]-path[i-1][1])*s]};
 const tick=()=>{const s=(Date.now()-o.start)/1e3,n=s<8?0:s<35?1:s<90?2:3,f=Math.max(0,Math.min(1,(s-35)/55)),eta=Math.max(1,Math.ceil(o.eta*(1-s/90)));rider.setLatLng(at(f));
  $("#hd").innerHTML=`<h1>${ST[n]}</h1><p>${n===3?"Enjoy your meal from "+o.rn+".":n===2?"Your rider is heading to you from "+o.rn+".":"From "+o.rn}</p><div class="eta">${n===3?ic("check")+" Delivered":ic("clock")+" Arriving in about "+eta+" min"}</div>`;
  $("#st").innerHTML=ST.map((x,i)=>`<li class="${i<n||n===3?"done":i===n?"now":""}">${x}</li>`).join("");if(n===3)clearInterval(tick.i)};
 tick();tick.i=setInterval(tick,1000)}
build();shell();paint();({home,explore,rest,checkout,track})[document.body.dataset.p]();
