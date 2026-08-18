document.addEventListener("DOMContentLoaded", () => {
  // 1. CARREGAR DADOS BÁSICOS
  document.getElementById("monograma-abertura").textContent = CONFIG.noivos.monograma;
  document.getElementById("monograma-rodape").textContent = CONFIG.noivos.monograma;
  document.getElementById("nomes-hero").textContent = `${CONFIG.noivos.noivo.nomeCurto} & ${CONFIG.noivos.noiva.nomeCurto}`;
  
  const dataObj = new Date(CONFIG.dataEvento);
  const dataFormatada = dataObj.toLocaleDateString("pt-PT", { day: '2-digit', month: 'long', year: 'numeric' });
  
  document.getElementById("data-abertura").textContent = dataFormatada;
  document.getElementById("data-hero").textContent = dataFormatada;

  // Hero Background
  document.querySelector(".hero").style.backgroundImage = `url('${CONFIG.noivos.fotoHero}')`;

  // 2. CITAÇÕES
  document.getElementById("citacao-abertura-texto").textContent = CONFIG.citacoes.abertura.texto;
  document.getElementById("citacao-abertura-ref").textContent = CONFIG.citacoes.abertura.referencia;
  document.getElementById("citacao-inspiradora-texto").textContent = CONFIG.citacoes.inspiradora.texto;
  document.getElementById("citacao-inspiradora-autor").textContent = CONFIG.citacoes.inspiradora.autor;

  // 3. OS NOIVOS
  renderizarNoivo("noivo", CONFIG.noivos.noivo);
  renderizarNoivo("noiva", CONFIG.noivos.noiva);

  function renderizarNoivo(tipo, dados) {
    document.getElementById(`foto-${tipo}`).src = dados.foto;
    document.getElementById(`nome-${tipo}`).textContent = dados.nomeCompleto;
    
    const paiTexto = dados.pais.paiEmMemoria ? `${dados.pais.pai} <span class="em-memoria">(em memória)</span>` : dados.pais.pai;
    const maeTexto = dados.pais.maeEmMemoria ? `${dados.pais.mae} <span class="em-memoria">(em memória)</span>` : dados.pais.mae;
    const conector = tipo === "noivo" ? "Filho de" : "Filha de";
    
    document.getElementById(`pais-${tipo}`).innerHTML = `${conector} ${paiTexto} e ${maeTexto}`;
  }

  // 4. MENSAGEM DO CONVITE
  document.getElementById("titulo-mensagem").textContent = CONFIG.mensagemConvite.titulo;
  document.getElementById("texto-mensagem").textContent = CONFIG.mensagemConvite.texto;
  document.getElementById("nota-lugares").textContent = CONFIG.mensagemConvite.notaLugares;

  // 5. PROGRAMAÇÃO
  const containerTimeline = document.getElementById("timeline-container");
  containerTimeline.innerHTML = CONFIG.programacao.map(item => `
    <div class="item-timeline">
      <div class="hora">${item.hora}</div>
      <h3>${item.titulo}</h3>
      <p>${item.local}</p>
      <a href="${item.linkMapas}" target="_blank" class="botao-mapa">Ver no mapa →</a>
    </div>
  `).join('');

  // 6. GALERIA
  const containerGaleria = document.getElementById("galeria-container");
  containerGaleria.innerHTML = CONFIG.galeria.map(url => `
    <img src="${url}" alt="Foto Casal" loading="lazy">
  `).join('');

  // 7. RSVP (WhatsApp)
  document.getElementById("data-limite-rsvp").textContent = CONFIG.rsvp.dataLimite;
  document.getElementById("btn-rsvp").addEventListener("click", () => {
    const msg = encodeURIComponent(CONFIG.rsvp.mensagemPadrao);
    window.open(`https://wa.me/${CONFIG.rsvp.whatsapp}?text=${msg}`, '_blank');
  });

  // 8. RODAPÉ E CRÉDITOS
  const containerCreditos = document.getElementById("creditos-marca");
  containerCreditos.innerHTML = `<a href="${CONFIG.creditos.instagramUrl}" target="_blank">${CONFIG.creditos.nomeMarca}</a>`;

  // 9. REPRODUTOR DE MÚSICA & TELA DE ABERTURA
  const audio = document.getElementById("audio-fundo");
  audio.src = CONFIG.musicaBackground;
  const btnMusica = document.getElementById("btn-musica");
  let tocando = false;

  document.getElementById("btn-abrir").addEventListener("click", () => {
    document.getElementById("tela-abertura").classList.add("escondido");
    audio.play().then(() => {
      tocando = true;
      btnMusica.textContent = "🎵";
    }).catch(e => console.log("Autoplay bloqueado pelo navegador"));
  });

  btnMusica.addEventListener("click", () => {
    if (tocando) {
      audio.pause();
      btnMusica.textContent = "🔇";
    } else {
      audio.play();
      btnMusica.textContent = "🎵";
    }
    tocando = !tocando;
  });

  // 10. CONTAGEM REGRESSIVA
  function atualizarContagem() {
    const agora = new Date().getTime();
    const diferenca = dataObj.getTime() - agora;

    if (diferenca > 0) {
      document.getElementById("dias").textContent = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      document.getElementById("horas").textContent = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      document.getElementById("minutos").textContent = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
      document.getElementById("segundos").textContent = Math.floor((diferenca % (1000 * 60)) / 1000);
    }
  }
  setInterval(atualizarContagem, 1000);
  atualizarContagem();

  // 11. CALENDÁRIO SIMPLES
  function gerarCalendario() {
    const ano = dataObj.getFullYear();
    const mes = dataObj.getMonth();
    const diaEvento = dataObj.getDate();

    const nomesMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    document.getElementById("cal-titulo").textContent = `${nomesMeses[mes]} ${ano}`;

    const primeiroDiaIndex = new Date(ano, mes, 1).getDay();
    const totalDias = new Date(ano, mes + 1, 0).getDate();
    const gridDias = document.getElementById("cal-grid");
    gridDias.innerHTML = "";

    for (let x = 0; x < primeiroDiaIndex; x++) {
      gridDias.innerHTML += `<div></div>`;
    }

    for (let i = 1; i <= totalDias; i++) {
      if (i === diaEvento) {
        gridDias.innerHTML += `<div class="cal-dia evento-dia">${i}</div>`;
      } else {
        gridDias.innerHTML += `<div class="cal-dia">${i}</div>`;
      }
    }
  }
  gerarCalendario();

  // 12. MURAL DE MENSAGENS (localStorage com nota para expansão Firebase/Supabase)
  // NOTA DE EXPANSÃO: Para conectar a um banco de dados remoto no futuro, substitua a leitura 
  // e escrita do localStorage abaixo pelas chamadas de API do Firebase Firestore ou Supabase Client.
  const formMural = document.getElementById("form-mural");
  const listaMensagens = document.getElementById("lista-mensagens");

  function carregarMensagens() {
    const msgs = JSON.parse(localStorage.getItem("mural_casamento") || "[]");
    listaMensagens.innerHTML = msgs.map(m => `
      <div class="mensagem-card">
        <div class="autor">${m.nome} <span class="relacao">• ${m.relacao}</span></div>
        <p>${m.texto}</p>
      </div>
    `).join('');
  }

  formMural.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("mural-nome").value;
    const relacao = document.getElementById("mural-relacao").value;
    const texto = document.getElementById("mural-texto").value;

    const msgs = JSON.parse(localStorage.getItem("mural_casamento") || "[]");
    msgs.unshift({ nome, relacao, texto });
    localStorage.setItem("mural_casamento", JSON.stringify(msgs));

    formMural.reset();
    carregarMensagens();
  });
  carregarMensagens();

  // 13. MODAIS DE PRESENTES
  const modalMonetario = document.getElementById("modal-monetario");
  const modalMateriais = document.getElementById("modal-materiais");

  document.getElementById("btn-presente-monetario").onclick = () => abrirModal(modalMonetario);
  document.getElementById("btn-presente-materiais").onclick = () => abrirModal(modalMateriais);

  document.querySelectorAll(".fechar-modal").forEach(btn => {
    btn.onclick = () => {
      modalMonetario.classList.remove("ativo");
      modalMateriais.classList.remove("ativo");
    };
  });

  function abrirModal(modal) {
    if(modal === modalMonetario) {
      document.getElementById("dados-monetarios").innerHTML = `
        <p><strong>M-Pesa:</strong> ${CONFIG.presentes.monetario.mpesa.numero} (${CONFIG.presentes.monetario.mpesa.titular})</p><br>
        <p><strong>e-Mola:</strong> ${CONFIG.presentes.monetario.emola.numero} (${CONFIG.presentes.monetario.emola.titular})</p><br>
        <p><strong>Banco:</strong> ${CONFIG.presentes.monetario.banco.nomeBanco}</p>
        <p><strong>Conta:</strong> ${CONFIG.presentes.monetario.banco.conta}</p>
        <p><strong>NIB:</strong> ${CONFIG.presentes.monetario.banco.nib}</p>
        <p><strong>Titular:</strong> ${CONFIG.presentes.monetario.banco.titular}</p>
      `;
    } else {
      document.getElementById("dados-materiais").innerHTML = `
        <p><strong>Loja:</strong> ${CONFIG.presentes.materiais.loja}</p><br>
        <p><strong>Contacto:</strong> <a href="tel:${CONFIG.presentes.materiais.telefone}">${CONFIG.presentes.materiais.telefone}</a></p><br>
        <p><a href="${CONFIG.presentes.materiais.linkMapas}" target="_blank">Ver localização da loja no mapa →</a></p>
      `;
    }
    modal.classList.add("ativo");
  }

  // 14. ANIMAÇÕES REVEAL NO SCROLL
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('ativo');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
