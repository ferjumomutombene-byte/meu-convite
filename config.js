/**
 * CONFIGURAÇÃO DO CONVITE DIGITAL DE CASAMENTO
 * * Altera os dados abaixo para personalizar o convite de cada casal.
 */

const CONFIG = {
  // --- DADOS DO CASAL ---
  noivos: {
    noivo: {
      nomeCurto: "Zefanias",
      nomeCompleto: "Zefanias Aurélio Massinga",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop", // Substituir por foto real
      pais: {
        pai: "Zefanias Aurélio Massinga",
        paiEmMemoria: false,
        mae: "Maria Massinga",
        maeEmMemoria: false
      }
    },
    noiva: {
      nomeCurto: "Helena",
      nomeCompleto: "Helena Santos",
      foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop", // Substituir por foto real
      pais: {
        pai: "António Santos",
        paiEmMemoria: false,
        mae: "Ana Santos",
        maeEmMemoria: true
      }
    },
    monograma: "Z & H",
    fotoHero: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop"
  },

  // --- DATA E HORA DO EVENTO PRINCIPAL ---
  // Formato: AAAA-MM-DDTHH:MM:SS (Ano-Mês-Dia THora:Minuto:Segundo)
  dataEvento: "2026-09-12T10:00:00",

  // --- FRASES E VERSÍCULOS ---
  citacoes: {
    abertura: {
      texto: "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.",
      referencia: "1 Coríntios 13:4"
    },
    inspiradora: {
      texto: "O casamento é a união de duas almas para criar um caminho cheio de amor, cumplicidade e sonhos partilhados.",
      autor: "Anónimo"
    }
  },

  // --- MENSAGEM DO CONVITE ---
  mensagemConvite: {
    titulo: "Convidamo-lo a Celebrarem Conosco",
    texto: "É com grande alegria que convidamos você e sua família para testemunharem o nosso sim e celebrarem o início deste novo capítulo em nossas vidas.",
    notaLugares: "Este convite é válido para 2 pessoas."
  },

  // --- PROGRAMAÇÃO DO DIA (Fácil de adicionar, remover ou editar) ---
  programacao: [
    {
      hora: "09:30",
      titulo: "Cerimónia Civil",
      local: "Conservatória do Registo Civil",
      linkMapas: "https://maps.google.com"
    },
    {
      hora: "11:30",
      titulo: "Cerimónia Religiosa",
      local: "Igreja Central",
      linkMapas: "https://maps.google.com"
    },
    {
      hora: "13:30",
      titulo: "Sessão de Fotos",
      local: "Jardim Botânico",
      linkMapas: "https://maps.google.com"
    },
    {
      hora: "15:00",
      titulo: "Copo d'Água & Festa",
      local: "Salão de Festas Elegance",
      linkMapas: "https://maps.google.com"
    }
  ],

  // --- GALERIA DE FOTOS ---
  galeria: [
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop"
  ],

  // --- MULTIMÉDIA E RSVP ---
  musicaBackground: "assets/musica.mp3", // Ficheiro mp3 local ou URL
  rsvp: {
    whatsapp: "258840000000", // Número com código do país (sem + ou espaços)
    dataLimite: "01 de Setembro de 2026",
    mensagemPadrao: "Olá! Gostaria de confirmar a minha presença no casamento de Zefanias & Helena."
  },

  // --- OPÇÕES DE PRESENTES ---
  presentes: {
    monetario: {
      mpesa: { numero: "841234567", titular: "Zefanias A. Massinga" },
      emola: { numero: "861234567", titular: "Helena Santos" },
      banco: {
        nomeBanco: "BIM",
        conta: "123456789",
        nib: "000100001234567890123",
        titular: "Zefanias & Helena"
      }
    },
    materiais: {
      loja: "Loja de Listas de Casamento Home Decor",
      telefone: "+258 84 000 0000",
      linkMapas: "https://maps.google.com"
    }
  },

  // --- CRÉDITOS DO RODAPÉ ---
  creditos: {
    nomeMarca: "Criado por Sua Marca Design",
    instagramUrl: "https://instagram.com/suamarca"
  }
};
