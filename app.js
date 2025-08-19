// Array global para armazenar a lista de amigos.
let amigos = [];

/**
 * Função para adicionar um novo amigo à lista.
 * É chamada pelo atributo 'onclick' do botão "Adicionar" no HTML.
 */
function adicionarAmigo() {
    // 1. Encontra o campo de input no HTML pelo seu ID 'amigo' e pega o valor digitado.
    const campoNome = document.getElementById('amigo');
    const nomeAmigo = campoNome.value.trim();
    
    // 2. Valida se um nome foi realmente digitado.
    if (nomeAmigo === '') {
        alert('Por favor, insira um nome.');
        return; // Encerra a função se o campo estiver vazio.
    }
    
    // 3. Adiciona o nome ao nosso array 'amigos'.
    amigos.push(nomeAmigo);
    
    // 4. Limpa o campo de input e coloca o foco nele novamente para facilitar a digitação do próximo nome.
    campoNome.value = '';
    campoNome.focus();
    
    // 5. Chama a função para atualizar a lista de nomes na tela.
    exibirAmigos();
}

/**
 * Função para mostrar a lista de amigos na tela.
 */
function exibirAmigos() {
    // Encontra o elemento <ul> da lista no HTML.
    const listaAmigos = document.getElementById('listaAmigos');
    
    // Limpa a lista atual para não duplicar os nomes.
    listaAmigos.innerHTML = '';

    // Percorre o array 'amigos' e cria um item de lista (<li>) para cada nome.
    amigos.forEach(amigo => {
        const item = document.createElement('li');
        item.textContent = amigo;
        listaAmigos.appendChild(item);
    });
}

/**
 * Realiza o sorteio do amigo secreto.
 */
function sortearAmigo() {
    // 1. Valida se há amigos suficientes para o sorteio.
    if (amigos.length < 4) {
        alert('Adicione pelo menos 4 amigos para realizar o sorteio!');
        return;
    }

    // 2. Embaralha a lista de amigos (Algoritmo de Fisher-Yates).
    for (let i = amigos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Troca os elementos de posição para garantir a aleatoriedade.
        [amigos[i], amigos[j]] = [amigos[j], amigos[i]];
    }

    // 3. Encontra o elemento no HTML onde o resultado será exibido.
    const listaSorteio = document.getElementById('resultado');
    listaSorteio.innerHTML = ''; // Limpa resultados anteriores

    // 4. Monta e exibe as duplas do sorteio.
    for (let i = 0; i < amigos.length; i++) {
        // O último amigo da lista sorteia o primeiro para fechar o ciclo.
        const amigoSorteado = (i === amigos.length - 1) ? amigos[0] : amigos[i + 1];
        
        const item = document.createElement('li');
        item.textContent = `${amigos[i]} --> ${amigoSorteado}`;
        listaSorteio.appendChild(item);
    }
}

/**
 * Reinicia o sorteio, limpando as listas e o array de amigos.
 */
function reiniciar() {
    // Limpa o array de amigos
    amigos = [];
    // Limpa a lista de amigos na tela
    document.getElementById('listaAmigos').innerHTML = '';
    // Limpa o resultado do sorteio na tela
    document.getElementById('resultado').innerHTML = '';
}