/*=========================================
    GERENCIADOR DE TAREFAS
=========================================*/

// Vetor que armazena as tarefas
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Botão adicionar
const btnAdicionar = document.getElementById("btnAdicionar");

// Evento do botão
btnAdicionar.addEventListener("click", adicionarTarefa);

// ===============================
// ADICIONAR TAREFA
// ===============================

function adicionarTarefa() {

    const titulo = document.getElementById("titulo").value.trim();
    const responsavel = document.getElementById("responsavel").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const prioridade = document.getElementById("prioridade").value;
    const data = document.getElementById("data").value;

    // Verifica se todos os campos foram preenchidos
    if (
        titulo === "" ||
        responsavel === "" ||
        descricao === "" ||
        prioridade === "" ||
        data === ""
    ) {

        alert("Preencha todos os campos!");
        return;

    }

    // Cria o objeto da tarefa
    const tarefa = {

        id: Date.now(),

        titulo: titulo,

        responsavel: responsavel,

        descricao: descricao,

        prioridade: prioridade,

        data: data,

        status: "aberto"

    };

    tarefas.push(tarefa);

    salvarDados();

    limparFormulario();

    atualizarTela();

}

// ===============================
// SALVAR NO LOCALSTORAGE
// ===============================

function salvarDados() {

    localStorage.setItem("tarefas", JSON.stringify(tarefas));

}

// ===============================
// LIMPAR FORMULÁRIO
// ===============================

function limparFormulario() {

    document.getElementById("titulo").value = "";
    document.getElementById("responsavel").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("prioridade").value = "";
    document.getElementById("data").value = "";

}

// ===============================
// FORMATAR DATA
// ===============================

function formatarData(data) {

    const partes = data.split("-");

    return partes[2] + "/" + partes[1] + "/" + partes[0];

}

// ===============================
// ATUALIZAR TELA
// ===============================

function atualizarTela() {

    const aberto = document.getElementById("aberto");
    const andamento = document.getElementById("andamento");
    const finalizado = document.getElementById("finalizado");

    aberto.innerHTML = "";
    andamento.innerHTML = "";
    finalizado.innerHTML = "";

    tarefas.forEach(function (tarefa) {

        let classe = "";

        if (tarefa.prioridade === "Baixa") {

            classe = "prioridade-baixa";

        } else if (tarefa.prioridade === "Média") {

            classe = "prioridade-media";

        } else {

            classe = "prioridade-alta";

        }

        let botoes = "";

        // Tarefa aberta
        if (tarefa.status === "aberto") {

            botoes = `
                <button onclick="mudarStatus(${tarefa.id}, 'andamento')">
                    Em andamento
                </button>
            `;

        }

        // Em andamento
        else if (tarefa.status === "andamento") {

            botoes = `
                <button onclick="mudarStatus(${tarefa.id}, 'finalizado')">
                    Finalizar
                </button>

                <button onclick="mudarStatus(${tarefa.id}, 'aberto')">
                    Reabrir
                </button>
            `;

        }

        // Finalizada
        else {

            botoes = `
                <button onclick="mudarStatus(${tarefa.id}, 'aberto')">
                    Reabrir
                </button>
            `;

        }

        const card = `

            <div class="card ${classe}">

                <h3>${tarefa.titulo}</h3>

                <h4>Responsável: ${tarefa.responsavel}</h4>

                <h4>Data: ${formatarData(tarefa.data)}</h4>

                <h4>Prioridade: ${tarefa.prioridade}</h4>

                <p>${tarefa.descricao}</p>

                ${botoes}

                <button onclick="excluirTarefa(${tarefa.id})">
                    Excluir
                </button>

            </div>

        `;

        if (tarefa.status === "aberto") {

            aberto.innerHTML += card;

        }

        else if (tarefa.status === "andamento") {

            andamento.innerHTML += card;

        }

        else {

            finalizado.innerHTML += card;

        }

    });

    atualizarContadores();

}

// ===============================
// CONTADORES
// ===============================

function atualizarContadores() {

    let baixa = 0;
    let media = 0;
    let alta = 0;

    tarefas.forEach(function (tarefa) {

        if (tarefa.prioridade === "Baixa") baixa++;

        if (tarefa.prioridade === "Média") media++;

        if (tarefa.prioridade === "Alta") alta++;

    });

    document.getElementById("totalBaixa").textContent = baixa;
    document.getElementById("totalMedia").textContent = media;
    document.getElementById("totalAlta").textContent = alta;

}

// Inicializa o sistema
atualizarTela();

// ===============================
// ALTERAR STATUS
// ===============================

function mudarStatus(id, novoStatus) {

    tarefas.forEach(function (tarefa) {

        if (tarefa.id === id) {

            tarefa.status = novoStatus;

        }

    });

    salvarDados();

    atualizarTela();

}


// ===============================
// EXCLUIR TAREFA
// ===============================

function excluirTarefa(id) {

    if (confirm("Deseja excluir esta tarefa?")) {

        tarefas = tarefas.filter(function (tarefa) {

            return tarefa.id !== id;

        });

        salvarDados();

        atualizarTela();

    }

}