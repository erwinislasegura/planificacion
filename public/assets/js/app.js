
const KEY = "alto_rendimiento_tenis_mesa_8s_corregido";
const API_URL = (window.PLAN_APP && window.PLAN_APP.apiUrl) || "api/plan";
const ASSET_BASE = (window.PLAN_APP && window.PLAN_APP.assetBase) || "public";

const phases = [
  {t:"Adaptación técnica", o:"Ordenar comidas, eliminar extras líquidos y aprender rutina de pies.", a:"No recortar agresivo; priorizar constancia."},
  {t:"Déficit controlado", o:"Sostener proteína y aumentar cumplimiento de desplazamiento.", a:"Reducir pan/arroz solo en días sin tenis."},
  {t:"Base de velocidad", o:"Mejorar frecuencia de pies y postura baja.", a:"Carbohidrato antes del trabajo rápido."},
  {t:"Reacción competitiva", o:"Cambios de dirección y estímulos visuales/sonoros.", a:"Post-entreno con proteína + carbohidrato medido."},
  {t:"Intensificación", o:"Más calidad en desplazamientos, menos pausa improductiva.", a:"Si energía menor a 5, subir fruta o papa alrededor del entreno."},
  {t:"Consistencia", o:"Convertir rutina en hábito diario.", a:"Preparar comidas base 2 veces por semana."},
  {t:"Velocidad específica", o:"Simular movimientos de mesa: corto-largo-lateral.", a:"Evitar déficit extremo; velocidad requiere combustible."},
  {t:"Evaluación y cierre", o:"Medir progreso físico, peso y rendimiento.", a:"Definir siguiente ciclo según energía y cumplimiento."}
];

const menus = [
  {d:["2 huevos + pan integral chico","1 fruta","Té/café sin azúcar"], a:["Pollo, jurel o atún","½ taza arroz o 1 papa","Ensalada grande"], c:["Yogur proteico o natural","Fruta si entrena"], n:["Omelette o atún","Verduras o sopa","Legumbre si hay hambre"]},
  {d:["Avena 3-4 cucharadas","Leche descremada o yogur","1 huevo duro"], a:["Lentejas o porotos","Huevo o atún extra","Ensalada verde"], c:["Quesillo o jamón pavo","Manzana o naranja"], n:["Pollo desmenuzado","Ensalada grande","Papa pequeña si entrenó"]},
  {d:["2 huevos duros","Pan pita o integral","Tomate o ¼ palta"], a:["Pollo o pescado","½ taza arroz o quinoa","Verduras cocidas"], c:["Yogur alto proteína","Plátano chico si intenso"], n:["Ensalada con jurel/atún","Garbanzos opcional","Agua o té"]},
  {d:["Yogur natural/proteico","Avena 3 cucharadas","Fruta picada"], a:["Charquicán liviano","Carne magra o pollo","Ensalada; sin pan extra"], c:["Huevo duro + fruta","O quesillo con tomate"], n:["Sopa de verduras","Pavo, pollo o jurel","Ensalada libre"]},
  {d:["Omelette con verduras","1 fruta","Café/té sin azúcar"], a:["Garbanzos o porotos","Atún, huevo o pollo","Ensalada chilena"], c:["Pre-entreno: plátano/manzana","Yogur o leche"], n:["Jurel o atún","Ensalada grande","Papa/arroz si entrenó fuerte"]},
  {d:["Pan integral con quesillo","1 huevo duro","Té/café"], a:["Pollo, pescado o carne magra","Papa o ½ taza arroz","Verduras salteadas"], c:["Yogur proteico o leche","Fruta si requiere"], n:["Tortilla verduras","Ensalada grande","Sin pan si no entrenó"]},
  {d:["Avena con yogur/leche","1 huevo duro","1 fruta"], a:["Cazuela liviana","Mucha verdura","Papa pequeña o ½ choclo"], c:["Quesillo, yogur o huevo","Fruta si hay entreno"], n:["Ensalada grande","Atún, jurel, pollo o huevo","Legumbre si hambre"]}
];

const routines = [
  [
    ["Activación tobillo-cadera","4 min","movilidad dinámica de tobillos, cadera y rodillas. trabajar en postura baja, con apoyo en la punta de los pies y control de equilibrio."],
    ["Shadow lateral 2 puntos","6 min","desplazarse de derecha a revés sin pelota, simulando golpe y recuperación al centro. mantener pasos cortos, rápidos y sin cruzar los pies."],
    ["Ladder imaginaria","5 min","marcar una escalera en el piso o usar líneas. realizar entradas y salidas rápidas adelante-atrás, cuidando coordinación y ritmo de pies."],
    ["Corto-largo","5 min","partir cerca de la mesa, entrar con paso corto y salir hacia atrás con control. volver siempre a posición neutra para el siguiente movimiento."],
    ["Sentadilla + split squat","5 min","fortalecer piernas con sentadillas controladas y zancadas cortas. bajar con técnica, sin perder alineación de rodillas ni estabilidad del tronco."],
    ["Core + respiración","5 min","realizar plancha, dead bug y respiración profunda. activar abdomen sin tensión cervical y terminar bajando pulsaciones."]
  ],
  [
    ["Movilidad elástica","4 min","activar tobillos, rodillas y cadera con movimientos suaves y progresivos. preparar articulaciones para cambios de dirección rápidos."],
    ["Side shuffle 3 marcas","6 min","usar tres marcas en el piso y desplazarse lateralmente entre ellas. mantener base baja, pecho estable y retorno rápido al centro."],
    ["Reacción palmada","5 min","salir hacia derecha, izquierda o adelante según señal sonora. frenar con control, estabilizar y volver a postura inicial."],
    ["Paso pivote derecha","5 min","simular ataque de derecha desde zona de revés. girar cadera, ajustar pies y recuperar rápido al centro de la mesa."],
    ["Puente glúteo + gemelos","5 min","trabajar empuje de piernas con puente de glúteo y elevaciones de gemelo. ejecutar lento y con rango completo."],
    ["Elongación activa","5 min","descargar cadera, isquiotibiales, espalda y gemelos. mantener respiración controlada y sin rebotes."]
  ],
  [
    ["Activación general","4 min","skipping suave, movilidad de hombros, cadera y tobillos. entrar en calor sin fatigar antes del trabajo de velocidad."],
    ["Figura T","6 min","moverse en forma de t: centro, lateral, frente y regreso. priorizar freno, equilibrio y vuelta rápida a la posición base."],
    ["Split step + salida","5 min","hacer pequeño salto de activación y salir explosivamente a una dirección. caer suave, reaccionar rápido y no quedar rígida."],
    ["Multi-dirección 4 conos","5 min","trabajar adelante, atrás, lateral y diagonal con cuatro marcas. mirar al frente y mantener pasos cortos de ajuste."],
    ["Zancadas cortas","5 min","realizar zancadas controladas para fortalecer piernas y estabilidad. no buscar velocidad, sino técnica y control articular."],
    ["Core anti-rotación","5 min","plancha lateral, dead bug o presión contra pared. mantener abdomen firme para mejorar estabilidad al golpear."]
  ],
  [
    ["Movilidad + base baja","4 min","preparar tobillos, cadera y columna. sostener postura baja similar a la posición de espera en tenis de mesa."],
    ["Derecha-revés-centro","6 min","simular golpe de derecha, golpe de revés y retorno al centro. trabajar ritmo constante y recuperación después de cada acción."],
    ["Semáforo reacción","5 min","usar señales: rojo detener, verde salir, azul lateral. mejorar reacción, control del freno y cambio de dirección."],
    ["Entrada corta flick","5 min","dar paso corto hacia adelante como si se atacara una pelota corta. regresar rápido sin levantarse demasiado."],
    ["Sentadilla isométrica","5 min","mantener posición de sentadilla parcial y hacer pequeños ajustes de pies. fortalecer resistencia específica de piernas."],
    ["Descarga muscular","5 min","elongar cadera, cuádriceps, gemelos y espalda. cerrar con respiración nasal lenta para facilitar recuperación."]
  ],
  [
    ["Activación neural","4 min","saltitos suaves, movilidad y aceleraciones pequeñas. preparar el sistema nervioso para moverse rápido sin tensión."],
    ["Intervalos 10/10 lateral","6 min","hacer 10 segundos de desplazamiento lateral rápido y 10 segundos suave. repetir manteniendo técnica y postura baja."],
    ["Diagonal corta-larga","5 min","moverse desde esquina corta a posición larga y volver al centro. entrenar lectura de distancia y ajuste de pies."],
    ["Reacción visual con objeto","5 min","responder a una señal de mano, color u objeto. salir hacia la dirección indicada y recuperar equilibrio."],
    ["Core dinámico","5 min","mountain climber controlado, dead bug o plancha con toque. mantener tronco firme y respiración estable."],
    ["Movilidad final","5 min","liberar cadera, tobillos y espalda. evitar estiramientos dolorosos y terminar con sensación de recuperación."]
  ],
  [
    ["Movilidad técnica","4 min","activar articulaciones en postura de juego. realizar pequeños balanceos y ajustes de pies antes de acelerar."],
    ["Paso chino lateral","6 min","usar desplazamiento más largo cuando la distancia lo exija. cruzar solo si es necesario y recuperar rápido la base."],
    ["Micro pasos de ajuste","5 min","hacer pasos muy cortos antes de simular el golpe. mejorar precisión de posición y timing con la pelota."],
    ["Pivote + recuperación","5 min","pivote para atacar de derecha y regreso inmediato. cuidar que el cuerpo no quede abierto ni fuera de equilibrio."],
    ["Fuerza unilateral","5 min","zancada atrás, puente a una pierna o equilibrio monopodal. fortalecer control de cada pierna por separado."],
    ["Respiración + estirar","5 min","bajar pulsaciones con respiración controlada. elongar cadera, isquios, espalda y gemelos."]
  ],
  [
    ["Entrada en calor","4 min","movilidad general y skipping suave. preparar pies, cadera y tronco para una sesión rápida y coordinada."],
    ["Circuito mesa imaginaria","6 min","marcar cuatro zonas alrededor de una mesa imaginaria. moverse a cada esquina y volver al centro en cada repetición."],
    ["Reacción 1-2-3","5 min","asignar números a direcciones y reaccionar a la señal. acelerar, frenar y volver a postura de espera."],
    ["Freno y arranque","5 min","acelerar, detener completamente y salir hacia el lado opuesto. entrenar control, equilibrio y potencia del primer paso."],
    ["Core y estabilidad","5 min","plancha con toque de hombros o bird dog. evitar balanceo excesivo y mantener abdomen firme."],
    ["Descarga","5 min","elongación activa y respiración. terminar con sensación de piernas livianas, no agotadas."]
  ]
];

function buildNav(){
  let html="";
  for(let w=1; w<=8; w++){
    html += '<button class="week-btn '+(w===1?'active':'')+'" onclick="showWeek('+w+')">Semana '+w+'<span class="badge" id="weekBadge'+w+'">0%</span></button>';
  }
  document.getElementById("weekNav").innerHTML = html;
}

function ul(items){
  return "<ul>" + items.map(i => "<li>"+i+"</li>").join("") + "</ul>";
}

function mealBox(w,d,k,title,items){
  return '<div class="box"><h5>'+title+'<input data-save="w'+w+'d'+d+'_'+k+'_ok" type="checkbox"></h5>'+ul(items)+'</div>';
}

function routineBox(w,d,idx,item){
  const keys = ["mov","speed1","speed2","speed3","strength","recovery"];
  const speed = (idx>=1 && idx<=3) ? ' data-speed="1"' : "";
  return '<label class="routine-step"><input data-save="w'+w+'d'+d+'_r_'+keys[idx]+'"'+speed+' type="checkbox"><b>'+item[0].toLowerCase()+' · '+item[1].toLowerCase()+'</b><span>'+item[2].toLowerCase()+'</span></label>';
}

function buildWeeks(){
  let out = "";
  for(let w=1; w<=8; w++){
    const ph = phases[w-1];
    out += '<section class="week-panel '+(w===1?'active':'')+'" id="week'+w+'">';
    out += '<div class="week-head"><div><h3>Semana '+w+': '+ph.t+'</h3><span class="tag">Plan alto rendimiento · fase '+w+'/8</span></div>';
    out += '<div class="tags"><span class="tag">Semana <b id="weekPct'+w+'">0%</b></span><span class="tag">Velocidad <b id="weekSpeed'+w+'">0%</b></span><span class="tag">Peso prom. <b id="weekPeso'+w+'">—</b></span></div></div>';
    out += '<div class="phase-grid"><div class="phase"><b>Objetivo</b><p>'+ph.o+'</p></div><div class="phase"><b>Ajuste nutricional</b><p>'+ph.a+'</p></div><div class="phase"><b>Foco físico</b><p>70% desplazamiento: frecuencia de pies, lateralidad, reacción y regreso al centro.</p></div></div>';
    out += '<div class="day-list">';
    for(let d=1; d<=7; d++){
      const m = menus[d-1];
      const r = routines[(w+d-2)%routines.length];
      out += '<article class="day-card '+(w===1 && d===1?'open':'')+'" id="w'+w+'d'+d+'">';
      out += '<div class="day-title" onclick="toggleDay('+w+','+d+')"><h4>Semana '+w+' · Día '+d+'</h4><span class="badge" id="dayBadge'+w+'_'+d+'">0%</span></div>';
      out += '<div class="day-content">';
      out += '<div class="meal-grid">'+mealBox(w,d,"desayuno","Desayuno",m.d)+mealBox(w,d,"almuerzo","Almuerzo",m.a)+mealBox(w,d,"colacion","Colación deportiva",m.c)+mealBox(w,d,"cena","Cena",m.n)+'</div>';
      out += '<div class="track-grid">';
      out += '<div><label>Peso kg</label><input data-save="w'+w+'d'+d+'_peso" type="number" step="0.1"></div>';
      out += '<div><label>Energía 1-10</label><input data-save="w'+w+'d'+d+'_energia" type="number" min="1" max="10"></div>';
      out += '<div><label>Sueño h</label><input data-save="w'+w+'d'+d+'_sueno" type="number" step="0.5"></div>';
      out += '<div><label>Agua L</label><input data-save="w'+w+'d'+d+'_agua" type="number" step="0.1"></div>';
      out += '<div><label>Hambre 1-10</label><input data-save="w'+w+'d'+d+'_hambre" type="number" min="1" max="10"></div>';
      out += '<div><label>Tenis min</label><input data-save="w'+w+'d'+d+'_tenis" type="number" step="5"></div>';
      out += '<div><label>RPE 1-10</label><input data-save="w'+w+'d'+d+'_rpe" type="number" min="1" max="10"></div>';
      out += '<div><label>Dolor 0-10</label><input data-save="w'+w+'d'+d+'_dolor" type="number" min="0" max="10"></div>';
      out += '</div>';
      out += '<div class="routine"><div class="routine-head"><h5>Rutina diaria 30 minutos · 70% desplazamiento</h5><span class="tag">Velocidad: <b id="daySpeed'+w+'_'+d+'">0%</b></span></div>';
      out += '<div class="routine-grid">'+r.map((x,i)=>routineBox(w,d,i,x)).join("")+'</div></div>';
      out += '<div class="checkrow">';
      ["sin_bebida|Sin bebida","sin_fritura|Sin fritura","proteina|Proteína alta","verduras|Verduras","agua_ok|Agua objetivo","post_entreno|Post-entreno","sin_picoteo|Sin picoteo","rutina30|30 min completos"].forEach(pair=>{
        const parts = pair.split("|");
        out += '<label class="check"><input data-save="w'+w+'d'+d+'_'+parts[0]+'" type="checkbox">'+parts[1]+'</label>';
      });
      out += '</div>';
      out += '<div class="calc-row">';
      out += '<div class="calc"><small>Nutrición</small><strong id="calcNutri'+w+'_'+d+'">0%</strong></div>';
      out += '<div class="calc"><small>Rutina</small><strong id="calcRutina'+w+'_'+d+'">0%</strong></div>';
      out += '<div class="calc"><small>Velocidad</small><strong id="calcSpeed'+w+'_'+d+'">0%</strong></div>';
      out += '<div class="calc"><small>Hábitos</small><strong id="calcHab'+w+'_'+d+'">0%</strong></div>';
      out += '<div class="calc"><small>Readiness</small><strong id="calcReady'+w+'_'+d+'">—</strong></div>';
      out += '<div class="calc"><small>Carga</small><strong id="calcCarga'+w+'_'+d+'">—</strong></div>';
      out += '<div class="calc"><small>Señal</small><strong id="calcSenal'+w+'_'+d+'">—</strong></div>';
      out += '</div>';
      out += '<div class="notes-grid"><div><label>Observaciones físicas / tenis</label><textarea data-save="w'+w+'d'+d+'_obs_fisica" placeholder="Velocidad, reacción, dolor, fatiga, técnica..."></textarea></div><div><label>Comidas extras / ansiedad / ajustes</label><textarea data-save="w'+w+'d'+d+'_obs_comida" placeholder="Extras, hambre, eventos, cambios de porción..."></textarea></div></div>';
      out += '</div></article>';
    }
    out += '</div></section>';
  }
  document.getElementById("weeksContainer").innerHTML = out;
}

function showWeek(w){
  document.querySelectorAll(".week-panel").forEach(el=>el.classList.remove("active"));
  document.getElementById("week"+w).classList.add("active");
  document.querySelectorAll(".week-btn").forEach(el=>el.classList.remove("active"));
  document.querySelectorAll(".week-btn")[w-1].classList.add("active");
}

function toggleDay(w,d){
  document.getElementById("w"+w+"d"+d).classList.toggle("open");
}

function val(k){
  const el = document.querySelector('[data-save="'+k+'"]');
  if(!el) return "";
  return el.type === "checkbox" ? el.checked : el.value;
}
function num(k){
  const v = parseFloat(val(k));
  return Number.isFinite(v) ? v : null;
}
function setText(id,t){
  const el = document.getElementById(id);
  if(el) el.textContent = t;
}
function pct(a,b){ return b ? Math.round((a/b)*100) : 0; }
function avg(a){ return a.length ? a.reduce((x,y)=>x+y,0)/a.length : null; }

function collectData(){
  const data = {};
  document.querySelectorAll("[data-save]").forEach(el=>{
    data[el.dataset.save] = el.type === "checkbox" ? el.checked : el.value;
  });
  return data;
}
function applyData(data){
  if(!data || typeof data !== "object") return;
  document.querySelectorAll("[data-save]").forEach(el=>{
    if(data[el.dataset.save] === undefined) return;
    if(el.type === "checkbox") el.checked = Boolean(data[el.dataset.save]);
    else el.value = data[el.dataset.save];
  });
}
function setSyncStatus(text, state="idle"){
  const el = document.getElementById("syncStatus");
  if(!el) return;
  el.textContent = text;
  el.dataset.state = state;
}
async function remoteRequest(method="GET", payload=null){
  const options = { method, headers:{"Accept":"application/json"} };
  if(payload !== null){
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(payload);
  }
  const response = await fetch(API_URL, options);
  const json = await response.json().catch(()=>({ok:false,message:"Respuesta inválida"}));
  if(!response.ok || json.ok === false) throw new Error(json.message || "No se pudo sincronizar");
  return json;
}
function saveLocal(data=collectData()){
  localStorage.setItem(KEY, JSON.stringify(data));
}
async function persistRemote(data){
  setSyncStatus("Guardando…", "saving");
  const json = await remoteRequest("PUT", {data});
  setSyncStatus("Guardado automático", "saved");
  setTimeout(()=>setSyncStatus("Cambios al día", "saved"), 1200);
  return json;
}
function saveAll(options={}){
  const data = collectData();
  saveLocal(data);
  if(!window.PLAN_APP || !window.PLAN_APP.enableRemote){
    setSyncStatus("Guardado local", "saved");
    return Promise.resolve({ok:true,local:true});
  }
  if(!window.__planHydrated && !options.force) return Promise.resolve({ok:true,pending:true});
  clearTimeout(window.__planSaveTimer);
  const runner = () => persistRemote(data).catch(err=>{
    console.warn(err);
    setSyncStatus("Offline: guardado local", "warning");
    return {ok:false,error:err.message};
  });
  if(options.immediate) return runner();
  window.__planSaveTimer = setTimeout(runner, 650);
  setSyncStatus("Cambios pendientes…", "saving");
  return Promise.resolve({ok:true,queued:true});
}
async function loadAll(){
  let loaded = false;
  if(window.PLAN_APP && window.PLAN_APP.enableRemote){
    try{
      const json = await remoteRequest("GET");
      if(json.data && Object.keys(json.data).length){
        applyData(json.data);
        saveLocal(json.data);
        loaded = true;
      }
      setSyncStatus("Cambios al día", "saved");
    }catch(err){
      console.warn(err);
      setSyncStatus("Modo local sin conexión", "warning");
    }
  }
  if(!loaded){
    const raw = localStorage.getItem(KEY);
    if(raw){
      try{ applyData(JSON.parse(raw)); }catch(e){ console.warn(e); }
    }
  }
}
async function resetAll(){
  if(!confirm("¿Seguro que deseas limpiar todos los datos?")) return;
  localStorage.removeItem(KEY);
  if(window.PLAN_APP && window.PLAN_APP.enableRemote){
    remoteRequest("DELETE").catch(err=>console.warn(err));
  }
  document.querySelectorAll("[data-save]").forEach(el=>{
    if(el.type === "checkbox") el.checked = false;
    else el.value = "";
  });
  document.querySelector('[data-save="estatura"]').value = 160;
  document.querySelector('[data-save="peso_inicial"]').value = 80;
  document.querySelector('[data-save="agua_objetivo"]').value = 2.3;
  document.querySelector('[data-save="proteina_objetivo"]').value = 120;
  updateAll();
  saveAll({immediate:true, force:true});
}
function toast(msg){
  const old = document.getElementById("toast");
  if(old) old.remove();
  const t = document.createElement("div");
  t.id = "toast";
  t.textContent = msg;
  t.style.cssText = "position:fixed;right:18px;bottom:18px;background:#061B33;color:#fff;padding:11px 13px;border:1px solid #fff;font-weight:800;z-index:999";
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),1600);
}
function latestWeight(){
  let last = null;
  for(let w=1; w<=8; w++){
    for(let d=1; d<=7; d++){
      const p = num("w"+w+"d"+d+"_peso");
      if(p !== null) last = p;
    }
  }
  return last;
}
function firstWeight(){
  for(let w=1; w<=8; w++){
    for(let d=1; d<=7; d++){
      const p = num("w"+w+"d"+d+"_peso");
      if(p !== null) return p;
    }
  }
  return null;
}

function updateAll(){
  const est = num("estatura");
  const pi = num("peso_inicial");
  const meta = num("meta_peso");
  const actual = latestWeight() ?? pi;
  let weights=[], energies=[], sleeps=[], waters=[], pain=[];
  let mealDone=0, mealTotal=0, routineDone=0, routineTotal=0, speedDone=0, speedTotal=0, habitDone=0, habitTotal=0;

  for(let w=1; w<=8; w++){
    let weekScore=0, weekPossible=0, weekSpeedDone=0, weekSpeedTotal=0, weekWeights=[];
    for(let d=1; d<=7; d++){
      const mealKeys = ["desayuno","almuerzo","colacion","cena"].map(k=>"w"+w+"d"+d+"_"+k+"_ok");
      const mDone = mealKeys.filter(k=>val(k)).length;
      mealDone += mDone; mealTotal += 4;

      const rKeys = ["mov","speed1","speed2","speed3","strength","recovery"].map(k=>"w"+w+"d"+d+"_r_"+k);
      const rDone = rKeys.filter(k=>val(k)).length;
      routineDone += rDone; routineTotal += 6;

      const sKeys = ["speed1","speed2","speed3"].map(k=>"w"+w+"d"+d+"_r_"+k);
      const sDone = sKeys.filter(k=>val(k)).length;
      speedDone += sDone; speedTotal += 3;
      weekSpeedDone += sDone; weekSpeedTotal += 3;

      const hKeys = ["sin_bebida","sin_fritura","proteina","verduras","agua_ok","post_entreno","sin_picoteo","rutina30"].map(k=>"w"+w+"d"+d+"_"+k);
      const hDone = hKeys.filter(k=>val(k)).length;
      habitDone += hDone; habitTotal += 8;

      const nutritionPct = pct(mDone+hDone,12);
      const routinePct = pct(rDone,6);
      const speedPct = pct(sDone,3);
      const habitsPct = pct(hDone,8);
      const dayPct = Math.round((nutritionPct + routinePct + speedPct + habitsPct) / 4);
      weekScore += dayPct; weekPossible += 100;

      setText("calcNutri"+w+"_"+d, nutritionPct+"%");
      setText("calcRutina"+w+"_"+d, routinePct+"%");
      setText("calcSpeed"+w+"_"+d, speedPct+"%");
      setText("daySpeed"+w+"_"+d, speedPct+"%");
      setText("calcHab"+w+"_"+d, habitsPct+"%");
      setText("dayBadge"+w+"_"+d, dayPct+"%");

      const e = num("w"+w+"d"+d+"_energia");
      const sl = num("w"+w+"d"+d+"_sueno");
      const wa = num("w"+w+"d"+d+"_agua");
      const pa = num("w"+w+"d"+d+"_dolor");
      const rp = num("w"+w+"d"+d+"_rpe");
      const te = num("w"+w+"d"+d+"_tenis");
      const p = num("w"+w+"d"+d+"_peso");

      if(e!==null) energies.push(e);
      if(sl!==null) sleeps.push(sl);
      if(wa!==null) waters.push(wa);
      if(pa!==null) pain.push(pa);
      if(p!==null){ weights.push(p); weekWeights.push(p); }

      let ready = "—";
      if(e!==null || sl!==null || pa!==null){
        const score = ((e ?? 6)*10) + Math.min((sl ?? 7)*10,80) - ((pa ?? 0)*6);
        ready = score >= 120 ? "Alto" : score >= 90 ? "Medio" : "Bajo";
      }
      setText("calcReady"+w+"_"+d, ready);

      let carga = "—";
      if(te!==null || rp!==null) carga = String((te ?? 0) * (rp ?? 5));
      setText("calcCarga"+w+"_"+d, carga);

      let senal = "—";
      if(ready === "Bajo" || (pa!==null && pa>=6)) senal = "Recuperar";
      else if(dayPct>=80 && speedPct>=67) senal = "Óptimo";
      else if(dayPct>=55) senal = "Cumplir";
      else if(dayPct>0) senal = "Bajo";
      setText("calcSenal"+w+"_"+d, senal);
    }
    const wPct = pct(weekScore,weekPossible);
    setText("weekPct"+w,wPct+"%");
    setText("weekBadge"+w,wPct+"%");
    setText("weekSpeed"+w,pct(weekSpeedDone,weekSpeedTotal)+"%");
    setText("weekPeso"+w,weekWeights.length ? avg(weekWeights).toFixed(1)+" kg" : "—");
  }

  const nutriPct = pct(mealDone+habitDone,mealTotal+habitTotal);
  const rutinaPct = pct(routineDone,routineTotal);
  const speedPct = pct(speedDone,speedTotal);
  const adh = Math.round((nutriPct + rutinaPct + speedPct) / 3);

  setText("adhTotal",adh+"%");
  setText("miniNutri",nutriPct+"%");
  setText("miniRutina",rutinaPct+"%");
  setText("miniSpeed",speedPct+"%");
  setText("indiceVelocidad",speedPct+"%");
  setText("miniEnergia",energies.length ? avg(energies).toFixed(1)+"/10" : "—");
  setText("miniSueno",sleeps.length ? avg(sleeps).toFixed(1)+" h" : "—");
  setText("miniAgua",waters.length ? avg(waters).toFixed(1)+" L" : "—");
  setText("promDolor",pain.length ? avg(pain).toFixed(1)+"/10" : "—");

  if(est && pi){
    const imc = pi / ((est/100)*(est/100));
    setText("imcInicial",imc.toFixed(1));
    setText("imcEstado", imc<25 ? "Normal" : imc<30 ? "Sobrepeso" : "Rango alto");
  }
  setText("pesoActual", actual ? actual.toFixed(1)+" kg" : "—");

  let lost = 0;
  if(pi && actual){
    lost = pi - actual;
    setText("bajaTotal",(lost>=0 ? "-" : "+") + Math.abs(lost).toFixed(1)+" kg");
  }

  const weeksElapsed = Math.max(1, Math.ceil(weights.length/7));
  const ritmo = pi && actual ? lost/weeksElapsed : null;
  setText("ritmoSemanal", ritmo!==null ? ritmo.toFixed(2)+" kg" : "—");

  let progress = 0;
  if(pi && meta && actual){
    const total = pi - meta;
    if(total > 0) progress = Math.max(0, Math.min(100, ((pi-actual)/total)*100));
  }
  document.getElementById("progressMeta").style.width = progress.toFixed(0)+"%";
  setText("metaLograda", progress.toFixed(0)+"%");

  const avgE = avg(energies);
  const avgS = avg(sleeps);
  const avgP = avg(pain);
  let readiness = "—";
  if(avgE!==null || avgS!==null){
    const sc = ((avgE ?? 6)*10) + Math.min((avgS ?? 7)*10,80) - ((avgP ?? 0)*5);
    readiness = sc >= 120 ? "Alto" : sc >= 90 ? "Medio" : "Bajo";
  }
  setText("readiness",readiness);

  const alerta = document.getElementById("alertaPrincipal");
  const final = document.getElementById("recomendacionFinal");
  let riesgo = "—", estado = "—";

  if(ritmo!==null){
    if(ritmo>1.0 || readiness==="Bajo"){
      riesgo = "Alto"; estado = "Ajustar";
      alerta.className = "alert bad";
      alerta.textContent = "Riesgo de déficit excesivo o baja recuperación. Subir carbohidrato alrededor del entrenamiento y no reducir proteína.";
    } else if(ritmo>=0.4 && ritmo<=0.9 && adh>=65){
      riesgo = "Controlado"; estado = "Óptimo";
      alerta.className = "alert good";
      alerta.textContent = "Progreso adecuado: pérdida de grasa con margen para sostener velocidad y recuperación.";
    } else {
      riesgo = "Medio"; estado = "Revisar";
      alerta.className = "alert warn";
      alerta.textContent = "Revisar adherencia, extras, sueño y porciones antes de hacer cambios agresivos.";
    }
  }
  setText("riesgoDeficit",riesgo);
  setText("estadoGeneral",estado);

  if(readiness==="Bajo"){
    final.className = "alert bad";
    final.textContent = "Recomendación: priorizar recuperación 48-72 h, mantener rutina técnica suave, subir 1 porción de carbohidrato pre/post entrenamiento y revisar sueño.";
  } else if(speedPct<60){
    final.className = "alert warn";
    final.textContent = "Recomendación: el foco físico está bajo. Cumplir los 3 bloques de desplazamiento diarios antes de aumentar intensidad de fuerza.";
  } else if(nutriPct<65){
    final.className = "alert warn";
    final.textContent = "Recomendación: no ajustar calorías todavía. Primero mejorar cumplimiento alimentario, agua, proteína y control de extras.";
  } else if(ritmo!==null && ritmo>=0.4 && ritmo<=0.9){
    final.className = "alert good";
    final.textContent = "Recomendación: mantener el plan. La combinación de nutrición, velocidad y recuperación está en zona efectiva.";
  } else {
    final.className = "alert warn";
    final.textContent = "Recomendación: mantener proteína alta, controlar extras y evaluar tendencia semanal antes de reducir porciones.";
  }

  saveAll();
}

function setupInstallPrompt(){
  let deferredPrompt = null;
  const installButton = document.getElementById("installApp");
  window.addEventListener("beforeinstallprompt", (event)=>{
    event.preventDefault();
    deferredPrompt = event;
    if(installButton) installButton.hidden = false;
  });
  if(installButton){
    installButton.addEventListener("click", async ()=>{
      if(!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      installButton.hidden = true;
    });
  }
}
function setupServiceWorker(){
  if("serviceWorker" in navigator){
    navigator.serviceWorker.register(ASSET_BASE + "/sw.js").catch(err=>console.warn("SW", err));
  }
}

buildNav();
buildWeeks();
setupInstallPrompt();
setupServiceWorker();
loadAll().then(()=>{
  window.__planHydrated = true;
  updateAll();
});
document.addEventListener("input", function(e){ if(e.target.matches("[data-save]")) updateAll(); });
document.addEventListener("change", function(e){ if(e.target.matches("[data-save]")) updateAll(); });
