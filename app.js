// app.js (Front-end) - FUNÇÕES MODIFICADAS

const apiUrl = 'http://localhost:3000/api/produtos';
const formProduto = document.getElementById('form-produto');
const listaProdutos = document.getElementById('lista-produtos');

// Função para buscar e exibir os produtos (agora mostra a quantidade)
async function carregarProdutos() {
    try {
        const response = await fetch(apiUrl);
        const produtos = await response.json();
        
        listaProdutos.innerHTML = ''; // Limpa a lista antes de recarregar

        produtos.forEach(produto => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${produto.nome} (${produto.quantidade} un.)</span>
                <span class="preco">R$ ${parseFloat(produto.preco).toFixed(2)}</span>
            `;
            listaProdutos.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        listaProdutos.innerHTML = '<li>Erro ao carregar produtos. Verifique o servidor!</li>';
    }
}

// Manipulador de envio do formulário (agora coleta e envia a quantidade)
formProduto.addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;
    const quantidade = document.getElementById('quantidade').value; // Coleta o novo campo

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Envia 'quantidade' junto com 'nome' e 'preco'
            body: JSON.stringify({ nome, preco, quantidade }) 
        });

        if (response.ok) {
            alert('Produto salvo com sucesso!');
            formProduto.reset(); // Limpa o formulário
            carregarProdutos(); // Recarrega a lista
        } else {
            alert('Erro ao salvar produto.');
        }

    } catch (error) {
        console.error('Erro de rede:', error);
        alert('Erro de conexão com o servidor.');
    }
});

// Carrega os produtos assim que a página carrega
document.addEventListener('DOMContentLoaded', carregarProdutos);