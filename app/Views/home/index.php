
<div class="user-gate" id="userGate" hidden>
  <div class="user-panel">
    <div class="user-panel-head">
      <div>
        <h2>Seleccionar usuario</h2>
        <p>Busca un deportista existente o crea uno nuevo para guardar su avance por separado.</p>
      </div>
      <span class="sync-pill" id="userGateStatus" data-state="saving">Cargando usuarios…</span>
    </div>
    <div class="user-panel-body">
      <label for="userSearch">Buscar usuario</label>
      <input id="userSearch" type="search" placeholder="Escribe nombre o apellido" autocomplete="off">
      <div class="user-list" id="userList"></div>
      <div class="user-create">
        <div>
          <label for="newUserName">Crear usuario nuevo</label>
          <input id="newUserName" type="text" placeholder="Nombre del deportista" autocomplete="off">
        </div>
        <button type="button" id="createUserBtn">Crear y seleccionar</button>
      </div>
      <p class="user-help">Cada usuario tiene su ficha, semanas, métricas, notas y sincronización independiente.</p>
    </div>
  </div>
</div>

<div class="wrapper">
  <header class="header">
    <div class="brand">
      <div class="logo">AR</div>
      <div>
        <h1>Programa Nutricional y Físico de Alto Rendimiento · 8 Semanas</h1>
        <p class="subtitle">Tenis de mesa · pérdida de grasa · energía competitiva · 70% velocidad de desplazamiento</p>
      </div>
    </div>
    <div class="actions">
      <span class="current-user" id="currentUserLabel">Sin usuario</span>
      <button class="secondary" type="button" onclick="openUserGate()">Cambiar usuario</button>
      <button onclick="window.print()">Imprimir / PDF</button>
      <button class="secondary" onclick="saveAll({immediate:true}); toast('Avance guardado')">Guardar</button>
      <button class="secondary" id="installApp" type="button" hidden>Instalar app</button>
      <button class="danger" onclick="resetAll()">Limpiar</button>
      <span class="sync-pill" id="syncStatus">Sincronizando…</span>
    </div>
  </header>

  <section class="grid-top">
    <div class="card">
      <div class="card-head">
        <div>
          <h2>Ficha inicial</h2>
          <p>Datos para cálculos nutricionales y deportivos.</p>
        </div>
      </div>
      <div class="card-body">
        <div class="form-grid">
          <div><label>Deportista</label><input data-save="nombre" placeholder="Nombre"></div>
          <div><label>Fecha inicio</label><input data-save="fecha_inicio" type="date"></div>
          <div><label>Estatura cm</label><input data-save="estatura" type="number" value="160"></div>
          <div><label>Peso inicial kg</label><input data-save="peso_inicial" type="number" step="0.1" value="80"></div>
          <div><label>Meta 8 semanas kg</label><input data-save="meta_peso" type="number" step="0.1" placeholder="Ej: 74"></div>
          <div><label>Agua objetivo L</label><input data-save="agua_objetivo" type="number" step="0.1" value="2.3"></div>
          <div><label>Proteína objetivo g</label><input data-save="proteina_objetivo" type="number" value="120"></div>
          <div><label>Tenis/semana</label><input data-save="entrenos_tenis" type="number" placeholder="Ej: 3"></div>
        </div>
        <div class="alert warn">
          Enfoque técnico: déficit calórico moderado, proteína alta, carbohidrato estratégico y rutina diaria de 30 minutos. No se busca bajar peso a costa de perder velocidad, recuperación o potencia.
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-head">
        <div>
          <h2>Panel de rendimiento</h2>
          <p>Indicadores calculados automáticamente con los registros diarios.</p>
        </div>
      </div>
      <div class="card-body">
        <div class="kpi-grid">
          <div class="kpi info"><small>IMC inicial</small><strong id="imcInicial">—</strong><span id="imcEstado">Completar</span></div>
          <div class="kpi good"><small>Peso actual</small><strong id="pesoActual">—</strong><span>último registro</span></div>
          <div class="kpi warn"><small>Ritmo kg/sem</small><strong id="ritmoSemanal">—</strong><span>estimado</span></div>
          <div class="kpi purple"><small>Índice velocidad</small><strong id="indiceVelocidad">0%</strong><span>rutina específica</span></div>
          <div class="kpi info"><small>Readiness</small><strong id="readiness">—</strong><span>energía + sueño + dolor</span></div>
          <div class="kpi good"><small>Adherencia total</small><strong id="adhTotal">0%</strong><span>nutrición + rutina</span></div>
        </div>
        <div class="progress-wrap"><div class="progress" id="progressMeta"></div></div>
        <div class="alert" id="alertaPrincipal">Completa meta y registros para activar recomendaciones.</div>
      </div>
    </div>
  </section>

  <section class="layout">
    <aside class="card sidebar">
      <div class="card-head">
        <div>
          <h2>Seguimiento</h2>
          <p>Semanas del programa.</p>
        </div>
      </div>
      <div class="card-body">
        <div class="week-nav" id="weekNav"></div>
        <div class="mini-list">
          <div class="mini"><span>Nutrición</span><strong id="miniNutri">0%</strong></div>
          <div class="mini"><span>Rutina 30m</span><strong id="miniRutina">0%</strong></div>
          <div class="mini"><span>Desplazamiento</span><strong id="miniSpeed">0%</strong></div>
          <div class="mini"><span>Prom. energía</span><strong id="miniEnergia">—</strong></div>
          <div class="mini"><span>Prom. sueño</span><strong id="miniSueno">—</strong></div>
          <div class="mini"><span>Prom. agua</span><strong id="miniAgua">—</strong></div>
        </div>
      </div>
    </aside>

    <main class="card">
      <div class="card-head">
        <div>
          <h2>Programa semanal alimentario y físico</h2>
          <p>Rutinas variadas con 70% foco en velocidad de desplazamiento, reacción y cambios de dirección.</p>
        </div>
      </div>
      <div class="card-body" id="weeksContainer"></div>
    </main>
  </section>

  <section class="card" style="margin-top:12px">
    <div class="card-head">
      <div>
        <h2>Recomendaciones automáticas</h2>
        <p>Resumen ejecutivo según datos ingresados.</p>
      </div>
    </div>
    <div class="card-body">
      <div class="kpi-grid">
        <div class="kpi info"><small>Baja total</small><strong id="bajaTotal">—</strong><span>desde inicio</span></div>
        <div class="kpi info"><small>Meta lograda</small><strong id="metaLograda">0%</strong><span>progreso</span></div>
        <div class="kpi warn"><small>Riesgo déficit</small><strong id="riesgoDeficit">—</strong><span>peso + energía</span></div>
        <div class="kpi purple"><small>Foco físico</small><strong>70%</strong><span>desplazamiento</span></div>
        <div class="kpi good"><small>Estado general</small><strong id="estadoGeneral">—</strong><span>decisión</span></div>
        <div class="kpi warn"><small>Prom. dolor</small><strong id="promDolor">—</strong><span>0 a 10</span></div>
      </div>
      <div class="alert" id="recomendacionFinal">Registra peso, energía, sueño, agua y cumplimiento para recibir recomendaciones.</div>
    </div>
  </section>

  <section class="card" style="margin-top:12px">
    <div class="card-head">
      <div>
        <h2>Guía técnica de la rutina de 30 minutos</h2>
        <p>Aproximadamente 21 minutos están destinados a desplazamiento, reacción y cambios de dirección.</p>
      </div>
    </div>
    <div class="card-body">
      <table class="table">
        <thead>
          <tr><th>Bloque</th><th>Duración</th><th>Objetivo</th><th>Indicaciones técnicas</th></tr>
        </thead>
        <tbody>
          <tr><td>Velocidad de pies</td><td>8 min</td><td>Primer paso, frecuencia y postura baja</td><td>Rodillas semiflexionadas, peso en punta de pies, pasos cortos y rápidos.</td></tr>
          <tr><td>Desplazamiento lateral</td><td>7 min</td><td>Cubrir mesa y volver al centro</td><td>No cruzar pies en desplazamientos cortos; regresar siempre a posición neutra.</td></tr>
          <tr><td>Reacción y cambios de dirección</td><td>6 min</td><td>Responder estímulos y frenar sin perder equilibrio</td><td>Usar señales visuales/sonoras, conos o marcas en el piso.</td></tr>
          <tr><td>Fuerza funcional</td><td>5 min</td><td>Estabilidad de piernas y core</td><td>Trabajo controlado, sin llegar al fallo muscular.</td></tr>
          <tr><td>Movilidad y descarga</td><td>4 min</td><td>Recuperación y rango de movimiento</td><td>Cadera, tobillos, espalda torácica y respiración.</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="card" style="margin-top:12px">
    <div class="card-head">
      <div>
        <h2>Indicaciones alimentarias</h2>
        <p>Simples, económicas y orientadas a sostener velocidad y recuperación.</p>
      </div>
    </div>
    <div class="card-body">
      <div class="option-grid">
        <div class="option-card"><h4>Proteína diaria</h4><ul><li>Objetivo: 110 a 130 g/día.</li><li>Huevos, pollo, jurel, atún, yogur, quesillo y legumbres.</li><li>Debe aparecer en cada comida.</li></ul></div>
        <div class="option-card"><h4>Carbohidrato estratégico</h4><ul><li>Antes de entrenar: fruta, avena o pan integral.</li><li>Después: papa, arroz o legumbre medida.</li><li>No eliminar en días de intensidad.</li></ul></div>
        <div class="option-card"><h4>Déficit seguro</h4><ul><li>Baja ideal: 0,4 a 0,9 kg/semana.</li><li>Más rápido puede afectar velocidad y recuperación.</li><li>Si energía baja: subir carbohidrato deportivo.</li></ul></div>
        <div class="option-card"><h4>Compra económica</h4><ul><li>Huevos, jurel, atún, pollo, lentejas.</li><li>Avena, arroz, papa, frutas de temporada.</li><li>Repollo, zanahoria, lechuga, tomate.</li></ul></div>
      </div>
    </div>
  </section>

  <p class="footer-note">Documento de planificación deportiva y nutricional. No reemplaza evaluación individual presencial de nutricionista, médico o kinesiólogo.</p>
</div>

