// Base de Dados de Imóveis Reais e de Alto Padrão em São Paulo e Região
const PROPERTIES_DATA = [
    {
        id: "LP-101",
        title: "Residencial Fasano Itaim | Apartamento Alto Padrão com Design e Vista Panorâmica",
        type: "Apartamento",
        purpose: "Venda",
        badge: "Super Destaque",
        price: 9800000,
        condo: 5200,
        iptu: 2100,
        location: "Rua Pedroso Alvarenga, Itaim Bibi - São Paulo, SP",
        neighborhood: "Itaim Bibi",
        area: 285,
        bedrooms: 4,
        suites: 4,
        bathrooms: 6,
        parking: 4,
        parkingType: "Vagas demarcadas e livres com ponto elétrico para recarga",
        yearBuilt: 2021,
        floor: "18º andar (vista livre)",
        sunOrientation: "Face Norte / Sol da Manhã",
        status: "Pronto para Morar",
        featured: true,
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "Exclusividade e sofisticação no endereço mais nobre do Itaim Bibi. Projeto com living ampliado para 3 ambientes integrado à varanda com fechamento em cortina de vidro e piso em mármore travertino romano levigado. Cozinha planejada da marca italiana Valcucine, ar-condicionado central VRF da Daikin com controle individualizado por ambiente e automação residencial completa de som, iluminação e cortinas (Control4). Suíte master com closet duplo Ornare, banheira de imersão e cubas duplas esculpidas.",
        amenities: [
            "Automação Residencial Control4 (Iluminação, Climatização e Som)",
            "Piscina Aquecida Coberta com Raia Olímpica de 25m",
            "Spa Privativo com Sauna Seca, Úmida e Sala de Massagem",
            "Academia Completa com Equipamentos Technogym de Última Geração",
            "Adega Climatizada e Espaço Gourmet Assinado por Chef",
            "Segurança Patrimonial com Guarita Blindada Nível III-A",
            "Elevadores Biométricos com Código Direto na Unidade",
            "Gerador Full que atende 100% da área comum e privativa"
        ],
        nearby: [
            "A 350m do Parque do Povo",
            "A 400m dos restaurantes Nino Cucina e Kosushi",
            "A 5 minutos do Shopping JK Iguatemi e Shopping Cidade Jardim",
            "Próximo ao polo financeiro da Av. Brigadeiro Faria Lima"
        ]
    },
    {
        id: "LP-102",
        title: "Mansão Arquitetônica Tamboré 3 | Obra de Arte Contemporânea e Vista para Reserva",
        type: "Casa",
        purpose: "Venda",
        badge: "Exclusividade",
        price: 18500000,
        condo: 3200,
        iptu: 1450,
        location: "Alameda das Sucupiras, Tamboré 3 - Santana de Parnaíba / Alphaville, SP",
        neighborhood: "Tamboré / Alphaville",
        area: 920,
        bedrooms: 5,
        suites: 5,
        bathrooms: 8,
        parking: 6,
        parkingType: "Garagem subterrânea com ponto para supercarros e oficina privativa",
        yearBuilt: 2023,
        floor: "3 Pavimentos com Elevador Thyssenkrupp",
        sunOrientation: "Face Norte / Sol o dia inteiro",
        status: "Nova / Recém Entregue",
        featured: true,
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "Mansão cinematográfica com arquitetura moderna e biofílica, paredes de vidro termoacústico e estrutura suspensa em balanço. O living possui pé-direito de 7 metros com lareira ecológica esculpida em granito preto absoluto. Área externa composta por piscina com borda infinita aquecida por energia solar, prainha molhada, spa jacuzzi integrado e fogo de chão (fire pit). Suíte principal de 120 m² com terraço privativo debruçado para a mata preservada.",
        amenities: [
            "Piscina com Borda Infinita e Prainha Aquecida",
            "Elevador Panorâmico Privativo atendendo os 3 Níveis",
            "Home Cinema Acústico com Projetor 4K e Som Dolby Atmos",
            "Adega Subterrânea Climatizada para 800 Rótulos com Lounge de Degustação",
            "Usinagem Solar Fotovoltaica com 40 Placas de Alta Eficiência",
            "Irrigação Automatizada do Jardim com Reuso de Água Pluvial",
            "Espaço Gourmet com Parrilla Uruguaia e Forno de Pizza a Lenha",
            "Condomínio com Heliponto Homologado e Quadras de Tênis de Saibro"
        ],
        nearby: [
            "Dentro do condomínio mais seguro da grande São Paulo",
            "A 8 minutos da Rodovia Castelo Branco (Km 22)",
            "Próximo ao Colégio Mackenzie Alphaville e Colégio Morumbi",
            "A 10 minutos do Centro Comercial Alphaville e Shopping Iguatemi"
        ]
    },
    {
        id: "LP-103",
        title: "Penthouse Duplex Praça Pereira Coutinho | Vista 360° com Piscina Suspensa",
        type: "Cobertura",
        purpose: "Venda",
        badge: "Troféu Imobiliário",
        price: 24000000,
        condo: 7800,
        iptu: 3900,
        location: "Praça Pereira Coutinho, Vila Nova Conceição - São Paulo, SP",
        neighborhood: "Vila Nova Conceição",
        area: 620,
        bedrooms: 4,
        suites: 4,
        bathrooms: 7,
        parking: 6,
        parkingType: "Vagas soltas e cobertas com depósito privativo de 25m²",
        yearBuilt: 2019,
        floor: "24º e 25º pavimentos (duplex)",
        sunOrientation: "Face Norte / Leste / Oeste",
        status: "Reformada por Studio de Arquitetura",
        featured: true,
        images: [
            "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "Considerada uma das coberturas mais espetaculares do metro quadrado mais valorizado do Brasil. Debruçada sobre as copas das árvores da Praça Pereira Coutinho e com horizonte desimpedido para o Parque Ibirapuera. No pavimento superior, deck solarium com piscina suspensa de vidro com hidromassagem, espaço lounge e bar de drinks. Living triplo no piso inferior com piso em tábua corrida de peroba rosa de demolição tratada.",
        amenities: [
            "Piscina Suspensa com Fundo de Vidro e Aquecimento",
            "Solarium Privativo com Bar Externo e Churrasqueira",
            "A 400 metros a pé dos Portões 7 e 8 do Parque Ibirapuera",
            "Marcenaria Florense em todas as Suítes e Cozinha",
            "Paredes com Isolamento Acústico Duplo de Alta Performance",
            "Guarita de Segurança com Reconhecimento Facial e Eclusa",
            "Gerador que supre Ar-Condicionado e Geladeiras",
            "Quarto de Motorista e Área de Serviço Completa com 2 Dormitórios"
        ],
        nearby: [
            "Em frente à charmosa Praça Pereira Coutinho",
            "A passos da Padaria Boston Bakery e Empório São Paulo",
            "Próximo aos hospitais Sírio-Libanês e Albert Einstein unidade Jardins",
            "Fácil acesso às Avenidas Santo Amaro, Faria Lima e Hélio Pellegrino"
        ]
    },
    {
        id: "LP-104",
        title: "Apartamento Decorado Vitacon Oscar Freire | Porteira Fechada no Coração dos Jardins",
        type: "Apartamento",
        purpose: "Venda",
        badge: "Porteira Fechada",
        price: 3450000,
        condo: 1980,
        iptu: 750,
        location: "Rua Oscar Freire, Cerqueira César / Jardins - São Paulo, SP",
        neighborhood: "Jardins",
        area: 135,
        bedrooms: 2,
        suites: 2,
        bathrooms: 3,
        parking: 2,
        parkingType: "Vagas com manobrista 24h",
        yearBuilt: 2022,
        floor: "11º andar",
        sunOrientation: "Face Oeste / Pôr do Sol",
        status: "Mobiliado e Equipado",
        featured: false,
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1502005229762-ee1b2da97a06?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "Vendido com todo o mobiliário de design assinado (Jader Almeida e Sergio Rodrigues), eletrônicos de última geração (Smart TVs OLED, adega e eletros de embutir Gorenje). Planta inteligente com living espaçoso, varanda nivelada integrada à cozinha e suítes com persianas blackout 100% motorizadas. Ideal tanto para moradia com conforto imediato quanto para investimento com alto rendimento.",
        amenities: [
            "Mobília Completa Inclusa (Porteira Fechada)",
            "Fechaduras Digitais Intelbras em todas as portas",
            "Rooftop com Lounge, Bar e Piscina de Borda Infinita com vista 360°",
            "Espaço de Coworking com Salas de Reunião Reservadas",
            "Academia By Reebok Fitness",
            "Bicicletário com Oficina e Estação de Calibragem",
            "Lavanderia Coletiva OMO com aplicativo de agendamento"
        ],
        nearby: [
            "A 120 metros da Estação Oscar Freire (Linha 4 - Amarela)",
            "Cercado pelas principais grifes e cafés da Oscar Freire e Bela Cintra",
            "A 500m do Hospital das Clínicas (FMUSP)",
            "A 10 minutos a pé da Avenida Paulista"
        ]
    },
    {
        id: "LP-105",
        title: "Edifício Heritage Cyrela by Pininfarina | Luxo Máximo no Leopoldina / Vila Nova",
        type: "Apartamento",
        purpose: "Venda",
        badge: "Design Pininfarina",
        price: 28900000,
        condo: 8900,
        iptu: 4500,
        location: "Rua Clodomiro Amazonas, Itaim / Vila Nova - São Paulo, SP",
        neighborhood: "Itaim Bibi",
        area: 570,
        bedrooms: 4,
        suites: 4,
        bathrooms: 7,
        parking: 6,
        parkingType: "Vagas com box privativo e recarga de alta potência",
        yearBuilt: 2021,
        floor: "22º andar",
        sunOrientation: "Face Norte / Vista deslumbrante",
        status: "Pronto para Morar",
        featured: true,
        images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "Assinado pelo estúdio de design italiano Pininfarina (designer oficial da Ferrari), o Heritage é um dos edifícios residenciais mais icônicos da América Latina. Planta com pé-direito de 3,20m livres, varanda panorâmica de curvatura aerodinâmica contínua, suíte master com closet walk-in de proporções generosas e banheiros senhor e senhora inteiramente revestidos em mármore importado.",
        amenities: [
            "Projeto Arquitetônico Pininfarina (Itália)",
            "Piscina Coberta Aquecida com Design Escultural de 25m",
            "Quadra de Tênis Coberta Oficial com Piso Rápido",
            "Concierge 24 horas no lobby e Serviço de Valet VIP",
            "Espaço Spa com Saunas Seca e a Vapor, Jacuzzi e Sala de Relaxamento",
            "Kids Club e Salão de Festas com Decoração de Alta Costura",
            "Monitoramento 24h com Câmeras Térmicas e Inteligência Artificial"
        ],
        nearby: [
            "A 3 minutos da Av. Brig. Faria Lima e Av. Pres. Juscelino Kubitschek",
            "Próximo ao Eataly Brasil e renomados bistrôs paulistanos",
            "Ao lado dos principais centros executivos de tecnologia e finanças"
        ]
    },
    {
        id: "LP-106",
        title: "Studio Executivo VN Faria Lima | Totalmente Mobiliado para Locação Premium",
        type: "Studio",
        purpose: "Aluguel",
        badge: "Locação Imediata",
        price: 5900,
        condo: 680,
        iptu: 195,
        location: "Rua Ministro Jesuíno Cardoso, Vila Olímpia / Faria Lima - São Paulo, SP",
        neighborhood: "Vila Olímpia",
        area: 45,
        bedrooms: 1,
        suites: 1,
        bathrooms: 1,
        parking: 1,
        parkingType: "Vaga coberta com manobrista",
        yearBuilt: 2023,
        floor: "15º andar",
        sunOrientation: "Face Leste / Sol da manhã",
        status: "Pronto para Morar",
        featured: false,
        images: [
            "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "Studio de conceito inteligente com marcenaria planejada em laca e iluminação indireta em LED. Equipado com cama queen com baú, ar-condicionado Daikin Inverter silencioso, Smart TV 55', geladeira inox, micro-ondas, cooktop de indução, cafeteira Nespresso e enxoval completo. Varanda envidraçada com mesa de trabalho e vista para o skyline da Faria Lima.",
        amenities: [
            "Internet Wi-Fi de Fibra Óptica 600 Mega Inclusa no Condomínio",
            "Fechadura Biométrica Digital com Senha Temporária",
            "Rooftop com Piscina de Borda Infinita e Bar Social",
            "Academia 24 Horas com Personal Trainer Virtual",
            "Grab and Go: Mercado Autônomo Hirota 24 Horas no Térreo",
            "Serviço de Limpeza e Arrumação Pay-Per-Use"
        ],
        nearby: [
            "A 200m da Av. Brigadeiro Faria Lima (Edifício Birmann e Pátio Malzoni)",
            "A 400m da Estação Vila Olímpia da CPTM (Linha 9 - Esmeralda)",
            "A 5 minutos a pé do Shopping Vila Olímpia e Shopping JK Iguatemi"
        ]
    },
    {
        id: "LP-107",
        title: "Residencial Quinta da Baroneza | Chácara de Luxo com Campo de Golfe e Hípica",
        type: "Casa",
        purpose: "Venda",
        badge: "Refúgio no Campo",
        price: 21500000,
        condo: 4100,
        iptu: 1800,
        location: "Rodovia Alkindar Monteiro Junqueira, Quinta da Baroneza - Bragança Paulista / Itatiba, SP",
        neighborhood: "Quinta da Baroneza",
        area: 1100,
        bedrooms: 6,
        suites: 6,
        bathrooms: 9,
        parking: 8,
        parkingType: "Garagem coberta para 8 veículos com pátio para visitantes",
        yearBuilt: 2022,
        floor: "2 Pavimentos em Lote de 3.500 m²",
        sunOrientation: "Face Norte / Vista para o Vale",
        status: "Nova / Decorada",
        featured: true,
        images: [
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "Obra-prima em um dos condomínios de campo mais exclusivos do país. Terreno privativo de 3.500 m² com pomar formado, bosque nativo e vista deslumbrante para as montanhas. Casa com 6 amplas suítes com varandas privativas, living com lareira rústica e pé-direito duplo de 6 metros, varanda gourmet completa, quadra de beach tennis oficial exclusiva no lote e piscina aquecida de 20 metros revestida em pedra hijau.",
        amenities: [
            "Quadra de Beach Tennis Privativa com Iluminação Noturna",
            "Piscina com Revestimento Natural em Pedra Hijau e Prainha",
            "Sauna a Vapor com Saída Subaquática para a Piscina",
            "Campo de Golfe Profissional de 18 Buracos no Condomínio",
            "Centro Hípico Completo com Cavalariças e Instrutores",
            "Heliponto Homologado com Hangar e Lounge de Espera",
            "Clube Social, Náutica no Rio Atibaia e Trilhas Ecológicas",
            "Segurança Armada com Ronda 24h e Muralha Perimetral Monitorada"
        ],
        nearby: [
            "A apenas 80 km de São Paulo pela Rodovia dos Bandeirantes / Dom Pedro",
            "A 40 minutos do Aeroporto Internacional de Viracopos (Campinas)",
            "Dentro do condomínio ecológico de maior renome do Estado de São Paulo"
        ]
    },
    {
        id: "LP-108",
        title: "Apartamento Vista Parque | Rua Curitiba ao Lado do Ibirapuera",
        type: "Apartamento",
        purpose: "Aluguel",
        badge: "Locação Nobre",
        price: 22000,
        condo: 3100,
        iptu: 1200,
        location: "Rua Curitiba, Paraíso / Ibirapuera - São Paulo, SP",
        neighborhood: "Ibirapuera",
        area: 215,
        bedrooms: 3,
        suites: 3,
        bathrooms: 5,
        parking: 3,
        parkingType: "Vagas paralelas com armário náutico",
        yearBuilt: 2020,
        floor: "12º andar",
        sunOrientation: "Face Norte / Vista para o Obelisco e Parque",
        status: "Pronto para Morar",
        featured: false,
        images: [
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "Viva a passos do Parque Ibirapuera com todo o conforto de um edifício moderno de alto padrão. Imóvel com planta circular perfeita, sala para 3 ambientes climatizada, varanda integrada com churrasqueira gourmet e bancada em Silestone. Cozinha equipada com torre quente e despensa. Todas as 3 suítes repletas de armários planejados Elgin e banheiros com ventilação natural.",
        amenities: [
            "A 150 metros da entrada principal do Parque Ibirapuera",
            "Varanda Gourmet com Churrasqueira a Carvão com Exaustão Mecânica",
            "Piscina Coberta Aquecida e Piscina Descoberta Adulto/Infantil",
            "Quadra Poliesportiva e Quadra de Squash",
            "Academia Completa equipada pela Life Fitness",
            "Brinquedoteca, Playground e Salão de Jogos Teen",
            "Gerador que sustenta 100% dos elevadores e iluminação interna"
        ],
        nearby: [
            "A 2 minutos a pé do Parque Ibirapuera",
            "Próximo ao Clube Atlético Monte Líbano e Círculo Militar",
            "Acesso imediato às Avenidas 23 de Maio, Brasil e República do Líbano"
        ]
    }
];

// WhatsApp do Corretor Especialista
const WHATSAPP_PHONE = "5511999999999";

// Estado da Aplicação
let currentFilter = {
    purpose: "todos",
    type: "todos",
    neighborhood: "todos",
    bedrooms: 0,
    search: "",
    sort: "destaque"
};

let favorites = JSON.parse(localStorage.getItem("lumina_favorites") || "[]");
let currentModalProperty = null;
let currentModalImageIndex = 0;
let showFavoritesOnly = false;

// Formatadores
const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
});

function formatPrice(val, purpose) {
    if (purpose === "Aluguel") {
        return `${currencyFormatter.format(val)}<small>/mês</small>`;
    }
    return currencyFormatter.format(val);
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    initEventListeners();
    populateNeighborhoodFilter();
    updateFavoritesBadge();
    renderProperties();
});

// Popula opções de bairros no filtro
function populateNeighborhoodFilter() {
    const neighborhoodSelect = document.getElementById("filterNeighborhood");
    if (!neighborhoodSelect) return;

    const neighborhoods = [...new Set(PROPERTIES_DATA.map(p => p.neighborhood))].sort();
    neighborhoods.forEach(n => {
        const opt = document.createElement("option");
        opt.value = n;
        opt.textContent = n;
        neighborhoodSelect.appendChild(opt);
    });
}

// Configuração de Eventos
function initEventListeners() {
    // Abas de Finalidade (Todos, Venda, Aluguel)
    document.querySelectorAll(".search-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".search-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            currentFilter.purpose = tab.dataset.purpose;
            renderProperties();
        });
    });

    // Inputs de Filtros
    const searchInput = document.getElementById("searchQuery");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentFilter.search = e.target.value.toLowerCase().trim();
            renderProperties();
        });
    }

    const filterType = document.getElementById("filterType");
    if (filterType) {
        filterType.addEventListener("change", (e) => {
            currentFilter.type = e.target.value;
            renderProperties();
        });
    }

    const filterNeighborhood = document.getElementById("filterNeighborhood");
    if (filterNeighborhood) {
        filterNeighborhood.addEventListener("change", (e) => {
            currentFilter.neighborhood = e.target.value;
            renderProperties();
        });
    }

    const filterBedrooms = document.getElementById("filterBedrooms");
    if (filterBedrooms) {
        filterBedrooms.addEventListener("change", (e) => {
            currentFilter.bedrooms = parseInt(e.target.value, 10);
            renderProperties();
        });
    }

    const filterSort = document.getElementById("filterSort");
    if (filterSort) {
        filterSort.addEventListener("change", (e) => {
            currentFilter.sort = e.target.value;
            renderProperties();
        });
    }

    // Botões de Limpar Filtros
    const btnClear = document.getElementById("btnClearFilters");
    const btnResetEmpty = document.getElementById("btnResetEmpty");
    [btnClear, btnResetEmpty].forEach(btn => {
        if (btn) btn.addEventListener("click", resetFilters);
    });

    // Alternar Favoritos
    const btnToggleFavorites = document.getElementById("btnToggleFavorites");
    if (btnToggleFavorites) {
        btnToggleFavorites.addEventListener("click", () => {
            showFavoritesOnly = !showFavoritesOnly;
            btnToggleFavorites.classList.toggle("active", showFavoritesOnly);
            renderProperties();
        });
    }

    // Links Rápidos no Rodapé
    document.querySelectorAll("[data-quick-type]").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const type = link.dataset.quickType;
            if (filterType) filterType.value = type;
            currentFilter.type = type;
            renderProperties();
            document.getElementById("imoveis").scrollIntoView({ behavior: "smooth" });
        });
    });

    // Eventos do Modal
    const modal = document.getElementById("propertyModal");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal && modal.classList.contains("active")) {
            closeModal();
        }
        if (modal && modal.classList.contains("active")) {
            if (e.key === "ArrowLeft") navigateModalGallery(-1);
            if (e.key === "ArrowRight") navigateModalGallery(1);
        }
    });

    // Navegação de Fotos no Modal
    const btnPrev = document.getElementById("galleryPrev");
    const btnNext = document.getElementById("galleryNext");
    if (btnPrev) btnPrev.addEventListener("click", () => navigateModalGallery(-1));
    if (btnNext) btnNext.addEventListener("click", () => navigateModalGallery(1));

    // Campo de texto customizado de WhatsApp no Modal
    const customWhatsappMsg = document.getElementById("customWhatsappMsg");
    if (customWhatsappMsg) {
        customWhatsappMsg.addEventListener("input", () => {
            updateModalWhatsappLink();
        });
    }
}

function resetFilters() {
    currentFilter = {
        purpose: "todos",
        type: "todos",
        neighborhood: "todos",
        bedrooms: 0,
        search: "",
        sort: "destaque"
    };
    showFavoritesOnly = false;

    const btnToggleFav = document.getElementById("btnToggleFavorites");
    if (btnToggleFav) btnToggleFav.classList.remove("active");

    const searchInput = document.getElementById("searchQuery");
    if (searchInput) searchInput.value = "";

    const filterType = document.getElementById("filterType");
    if (filterType) filterType.value = "todos";

    const filterNeighborhood = document.getElementById("filterNeighborhood");
    if (filterNeighborhood) filterNeighborhood.value = "todos";

    const filterBedrooms = document.getElementById("filterBedrooms");
    if (filterBedrooms) filterBedrooms.value = "0";

    const filterSort = document.getElementById("filterSort");
    if (filterSort) filterSort.value = "destaque";

    document.querySelectorAll(".search-tab").forEach(tab => {
        tab.classList.toggle("active", tab.dataset.purpose === "todos");
    });

    renderProperties();
}

// Renderização dos Imóveis
function renderProperties() {
    const grid = document.getElementById("propertiesGrid");
    const emptyState = document.getElementById("emptyState");
    const countBadge = document.getElementById("propertyCount");
    const btnClear = document.getElementById("btnClearFilters");

    if (!grid) return;

    // Filtragem
    let filtered = PROPERTIES_DATA.filter(item => {
        // Favoritos
        if (showFavoritesOnly && !favorites.includes(item.id)) {
            return false;
        }

        // Finalidade
        if (currentFilter.purpose !== "todos" && item.purpose !== currentFilter.purpose) {
            return false;
        }

        // Tipo
        if (currentFilter.type !== "todos" && item.type !== currentFilter.type) {
            return false;
        }

        // Bairro
        if (currentFilter.neighborhood !== "todos" && item.neighborhood !== currentFilter.neighborhood) {
            return false;
        }

        // Quartos
        if (currentFilter.bedrooms > 0 && item.bedrooms < currentFilter.bedrooms) {
            return false;
        }

        // Busca textual inteligente
        if (currentFilter.search) {
            const term = currentFilter.search;
            const matchTitle = item.title.toLowerCase().includes(term);
            const matchLocation = item.location.toLowerCase().includes(term);
            const matchNeighborhood = item.neighborhood.toLowerCase().includes(term);
            const matchType = item.type.toLowerCase().includes(term);
            const matchDesc = item.description.toLowerCase().includes(term);
            const matchCode = item.id.toLowerCase().includes(term);
            const matchAmenities = item.amenities.some(a => a.toLowerCase().includes(term));
            
            if (!matchTitle && !matchLocation && !matchNeighborhood && !matchType && !matchDesc && !matchAmenities && !matchCode) {
                return false;
            }
        }

        return true;
    });

    // Ordenação
    if (currentFilter.sort === "menor-preco") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentFilter.sort === "maior-preco") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentFilter.sort === "maior-area") {
        filtered.sort((a, b) => b.area - a.area);
    } else {
        // Destaques primeiro
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    if (countBadge) countBadge.textContent = filtered.length;

    // Mostra ou esconde botão de limpar filtros
    const hasActiveFilters = currentFilter.purpose !== "todos" || 
                             currentFilter.type !== "todos" || 
                             currentFilter.neighborhood !== "todos" ||
                             currentFilter.bedrooms > 0 || 
                             currentFilter.search !== "" || 
                             showFavoritesOnly;

    if (btnClear) {
        btnClear.classList.toggle("hidden", !hasActiveFilters);
    }

    // Estado vazio
    if (filtered.length === 0) {
        grid.innerHTML = "";
        if (emptyState) emptyState.classList.remove("hidden");
        return;
    }

    if (emptyState) emptyState.classList.add("hidden");

    // Gerar Cards com Detalhamento Profissional
    grid.innerHTML = filtered.map(item => {
        const isFav = favorites.includes(item.id);
        const purposeClass = item.purpose.toLowerCase();
        const formattedPrice = formatPrice(item.price, item.purpose);
        const badgeLabel = item.badge || item.purpose;

        return `
            <div class="property-card" onclick="openModal('${item.id}')">
                <div class="card-media">
                    <img src="${item.images[0]}" alt="${item.title}" loading="lazy">
                    <div class="card-badges">
                        <span class="card-badge-purpose ${purposeClass}">${item.purpose}</span>
                        ${item.badge ? `<span class="card-badge-special">${item.badge}</span>` : ''}
                    </div>
                    <button class="card-btn-fav ${isFav ? 'active' : ''}" 
                            title="${isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
                            onclick="event.stopPropagation(); toggleFavorite('${item.id}')">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <span class="card-photo-count">📷 ${item.images.length} fotos</span>
                </div>
                
                <div class="card-content">
                    <div class="card-header-meta">
                        <span class="card-neighborhood-tag">${item.neighborhood}</span>
                        <span class="card-id-tag">REF: ${item.id}</span>
                    </div>

                    <h3 class="card-title">${item.title}</h3>

                    <div class="card-location">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>${item.location}</span>
                    </div>

                    <div class="card-features">
                        <div class="feat-item" title="Área Útil">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            </svg>
                            <span>${item.area} m²</span>
                        </div>
                        <div class="feat-item" title="Quartos e Suítes">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"></path>
                            </svg>
                            <span>${item.bedrooms} qtos (${item.suites} suítes)</span>
                        </div>
                        <div class="feat-item" title="Vagas de Garagem">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="1" y="3" width="15" height="13"></rect>
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                <circle cx="18.5" cy="18.5" r="2.5"></circle>
                            </svg>
                            <span>${item.parking} vagas</span>
                        </div>
                    </div>

                    <div class="card-highlights">
                        <span>✓ ${item.amenities[0]}</span>
                        <span>✓ ${item.amenities[1]}</span>
                    </div>

                    <div class="card-footer">
                        <div>
                            <span class="card-price-label">${item.purpose === 'Aluguel' ? 'Aluguel Mensal' : 'Valor de Venda'}</span>
                            <div class="card-price">${formattedPrice}</div>
                            <span class="card-condo-mini">Condomínio: ${currencyFormatter.format(item.condo)}/mês</span>
                        </div>
                        <span class="card-btn-action">Ver Detalhes →</span>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

// Favoritos
function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem("lumina_favorites", JSON.stringify(favorites));
    updateFavoritesBadge();
    renderProperties();
}

function updateFavoritesBadge() {
    const badge = document.getElementById("favCountBadge");
    if (badge) badge.textContent = favorites.length;
}

// Modal de Detalhes Completo
function openModal(id) {
    const property = PROPERTIES_DATA.find(p => p.id === id);
    if (!property) return;

    currentModalProperty = property;
    currentModalImageIndex = 0;

    // Atualiza Informações Básicas
    document.getElementById("modalCode").textContent = `REF: ${property.id}`;
    document.getElementById("modalBadge").textContent = property.purpose;
    document.getElementById("modalType").textContent = `${property.type} • ${property.neighborhood}`;
    document.getElementById("modalTitle").textContent = property.title;
    
    const locElem = document.getElementById("modalLocation");
    locElem.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span><strong>${property.location}</strong></span>
    `;

    document.getElementById("modalPrice").innerHTML = formatPrice(property.price, property.purpose);
    document.getElementById("modalCondo").textContent = currencyFormatter.format(property.condo);
    document.getElementById("modalIptu").textContent = currencyFormatter.format(property.iptu);

    // Ficha Técnica Detalhada
    document.getElementById("modalArea").textContent = `${property.area} m²`;
    document.getElementById("modalBedrooms").textContent = property.bedrooms;
    document.getElementById("modalSuites").textContent = property.suites;
    document.getElementById("modalBathrooms").textContent = property.bathrooms;
    document.getElementById("modalParking").textContent = property.parking;

    // Especificações Adicionais (Andar, Sol, Ano, Garagem)
    const extraSpecsContainer = document.getElementById("modalExtraSpecs");
    if (extraSpecsContainer) {
        extraSpecsContainer.innerHTML = `
            <div class="extra-spec-row">
                <span class="spec-label">Orientação Solar:</span>
                <span class="spec-val">${property.sunOrientation}</span>
            </div>
            <div class="extra-spec-row">
                <span class="spec-label">Andar / Pavimento:</span>
                <span class="spec-val">${property.floor}</span>
            </div>
            <div class="extra-spec-row">
                <span class="spec-label">Ano de Construção:</span>
                <span class="spec-val">${property.yearBuilt}</span>
            </div>
            <div class="extra-spec-row">
                <span class="spec-label">Garagem e Vagas:</span>
                <span class="spec-val">${property.parkingType}</span>
            </div>
            <div class="extra-spec-row">
                <span class="spec-label">Status da Unidade:</span>
                <span class="spec-val"><strong style="color: #16a34a;">● ${property.status}</strong></span>
            </div>
        `;
    }

    // Descrição
    document.getElementById("modalDescription").textContent = property.description;
    
    // Comodidades e Diferenciais
    const amenitiesContainer = document.getElementById("modalAmenities");
    amenitiesContainer.innerHTML = property.amenities.map(a => `<li>${a}</li>`).join("");

    // O que há por perto / Localização
    const nearbyContainer = document.getElementById("modalNearby");
    if (nearbyContainer && property.nearby) {
        nearbyContainer.innerHTML = property.nearby.map(n => `<li>${n}</li>`).join("");
    }

    // Galeria de Fotos
    updateModalGallery();

    // Mensagem WhatsApp Padrão Pré-preenchida e Formatada
    const defaultMsg = `Olá! Gostaria de mais informações e agendar uma visita para o imóvel "${property.title}" (Ref: ${property.id}), localizado no ${property.neighborhood}, com valor de ${currencyFormatter.format(property.price)}.`;
    const textarea = document.getElementById("customWhatsappMsg");
    if (textarea) textarea.value = defaultMsg;

    updateModalWhatsappLink();

    // Exibe o modal
    const modal = document.getElementById("propertyModal");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("propertyModal");
    if (modal) modal.classList.remove("active");
    document.body.style.overflow = "";
    currentModalProperty = null;
}

function updateModalGallery() {
    if (!currentModalProperty) return;

    const mainImg = document.getElementById("modalMainImage");
    mainImg.src = currentModalProperty.images[currentModalImageIndex];

    const thumbsContainer = document.getElementById("modalThumbnails");
    thumbsContainer.innerHTML = currentModalProperty.images.map((imgUrl, idx) => `
        <button class="thumb-btn ${idx === currentModalImageIndex ? 'active' : ''}" onclick="setModalImage(${idx})">
            <img src="${imgUrl}" alt="Foto ${idx + 1} - ${currentModalProperty.title}">
        </button>
    `).join("");
}

function setModalImage(idx) {
    currentModalImageIndex = idx;
    updateModalGallery();
}

function navigateModalGallery(direction) {
    if (!currentModalProperty) return;
    const total = currentModalProperty.images.length;
    currentModalImageIndex = (currentModalImageIndex + direction + total) % total;
    updateModalGallery();
}

function updateModalWhatsappLink() {
    if (!currentModalProperty) return;
    const textarea = document.getElementById("customWhatsappMsg");
    const text = textarea ? textarea.value : `Olá! Tenho interesse no imóvel REF: ${currentModalProperty.id}`;
    
    const whatsappBtn = document.getElementById("modalWhatsappBtn");
    if (whatsappBtn) {
        const encoded = encodeURIComponent(text);
        whatsappBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
    }
}
