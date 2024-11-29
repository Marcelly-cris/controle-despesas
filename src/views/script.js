const API_URL = "http://localhost:3001/api/despesas";
let despesas = [];
let editandoId = null;

// Definindo os elementos de entrada e botão
const descricaoInput = document.getElementById('descricao');
const valorInput = document.getElementById('valor');
const dataInput = document.getElementById('data');
const cadastrarButton = document.getElementById('cadastrarButton');

// Função para buscar o total das despesas
async function fetchTotalExpenses() {
    try {
        const response = await fetch(`${API_URL}/total`);
        const data = await response.json();
        document.getElementById('totalDespesas').innerText = `Total das Despesas: R$${data.totalAmount.toFixed(2)}`;
    } catch (error) {
        console.error('Erro ao buscar o total das despesas: ', error);
    }
}

// Função para buscar todas as despesas
async function fetchDespesas() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    despesas = data;
    atualizarTotal();
    renderizarDespesas();
  } catch (error) {
    console.error("Erro ao buscar despesas:", error);
  }
}

// Função para adicionar ou editar uma despesa
async function adicionarDespesa() {
  const descricao = descricaoInput.value;
  const valor = parseFloat(valorInput.value);
  const data = dataInput.value;

  if (!descricao || isNaN(valor) || !data) {
    alert("Preencha todos os campos!");
    return;
  }

  const despesa = { descricao, valor, data };

  try {
    if (editandoId !== null) {
      // Atualizar despesa existente
      await fetch(`${API_URL}/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(despesa),
      });
      editandoId = null;
    } else {
      // Adicionar nova despesa
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(despesa),
      });
    }
    // Limpar os campos
    descricaoInput.value = "";
    valorInput.value = "";
    dataInput.value = "";
    fetchDespesas();
  } catch (error) {
    console.error("Erro ao adicionar despesa:", error);
  }
}

// Função para excluir uma despesa
async function excluirDespesa(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchDespesas();
  } catch (error) {
    console.error("Erro ao excluir despesa:", error);
  }
}

// Função para editar uma despesa
async function editarDespesa(id) {
  const despesa = despesas.find((despesa) => despesa._id === id);
  if (despesa) {
    descricaoInput.value = despesa.descricao;
    valorInput.value = despesa.valor;
    dataInput.value = despesa.data.split("T")[0]; // Formata a data para o input
    editandoId = id;
  }
}

// Função para atualizar o total das despesas
function atualizarTotal() {
  const total = despesas.reduce((sum, despesa) => sum + despesa.valor, 0);
  document.getElementById('totalDespesas').innerText = `Total das Despesas: R$${total.toFixed(2)}`;
}

// Função para renderizar as despesas na tela
function renderizarDespesas() {
  const listaDespesas = document.getElementById('listaDespesas');
  listaDespesas.innerHTML = '';
  despesas.forEach((despesa) => {
    const li = document.createElement('li');
    const dataLimitada = despesa.data.slice(0, 10);
    li.innerHTML = `
      ${despesa.descricao} - R$${despesa.valor.toFixed(2)} - ${dataLimitada}
      <button class="alterar" onclick="editarDespesa('${despesa._id}')">Editar</button>
      <button class="excluir" onclick="excluirDespesa('${despesa._id}')">Excluir</button>
    `;
    listaDespesas.appendChild(li);
  });
}

// Adicionar evento para o botão de cadastro
cadastrarButton.addEventListener("click", adicionarDespesa);

// Carregar as despesas e o total ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    fetchDespesas();
    fetchTotalExpenses();
});
