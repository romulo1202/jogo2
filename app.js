let listaDeNumerosSorteados = []; // Declara uma lista vazia para armazenar os números sorteados
let numeroLimite = 100; // Define o limite de números que podem ser sorteados
let numeroSecreto = gerarNumeroSecreto();
let tentativas = 1; // Variável para contar o número de tentativas
const botaoReiniciar = document.getElementById('reiniciar');
const botaoChutar = document.getElementById('chutar'); // Seleciona o botão "Chutar"
const campoEntrada = document.querySelector('input'); // Seleciona o campo de entrada

campoEntrada.focus(); // Foca no campo de entrada

function gerarNumeroSecreto() {
  let numeroSecreto = parseInt(Math.random() * (numeroLimite) + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
  } // Verifica se a lista de números sorteados atingiu o limite
  
  if (listaDeNumerosSorteados.includes(numeroSecreto)) {
      return gerarNumeroSecreto(); // Chama a função novamente se o número já foi sorteado
  } else {
      listaDeNumerosSorteados.push(numeroSecreto); // Adiciona o número à lista de números sorteados
      console.log(listaDeNumerosSorteados); // Exibe a lista de números sorteados no console (apenas para fins de depuração)
      return numeroSecreto; // Retorna o número secreto
  }
}
botaoChutar.disabled = false; // Habilita o botão "Reiniciar"
console.log(numeroSecreto); // Exibe o número secreto no console (apenas para fins de depuração)

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag); 
  campo.innerHTML = texto; 
  if ('speechSynthesis' in window) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; 
    utterance.rate = 1.2; 
    window.speechSynthesis.speak(utterance); 
  } else {
    console.log("Web Speech API não suportada neste navegador.");
}
}

function exibirMensagemInicial() { 
  exibirTextoNaTela('h1', 'Jogo do número secreto'); 
  exibirTextoNaTela('p', 'Escolha um número entre 1 e ' + numeroLimite);
}

exibirMensagemInicial(); // Exibe a mensagem inicial

campoEntrada.focus(); // Foca no campo de entrada

function verificarChute() {
  let chute = document.querySelector('input').value; // Seleciona o valor do campo de entrada
  
  if (chute == numeroSecreto) {
    exibirTextoNaTela('h1', 'Acertou!');
    let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; 
    exibirTextoNaTela('p', mensagemTentativas); 
    botaoReiniciar.disabled = false; // Habilita o botão "Reiniciar"
    botaoChutar.disabled = true; // Desabilita o botão "Chutar"
    campoEntrada.disabled = true; // Desabilita o campo de entrada
    
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela('p', 'O número secreto é menor que ' + chute);
    } else {
      exibirTextoNaTela('p', 'O número secreto é maior que ' + chute);
    }
  }
  tentativas++; // Incrementa o número de tentativas
  limparCampo(); // Limpa o campo de entrada
  }

campoEntrada.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
      verificarChute(); // Chama a função verificarChute() ao pressionar "Enter"
  }
});

function limparCampo() {
  campoEntrada.value = ''; // Limpa o campo de entrada
  campoEntrada.focus(); // Foca no campo de entrada
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroSecreto();
  limparCampo();
  tentativas =1;
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
  botaoChutar.disabled = false; 
  campoEntrada.disabled = false; 
  campoEntrada.focus(); // Foca no campo de entrada
};

/* Adiciona um evento de clique para recarregar a página
botaoReiniciar.onclick = function() {
location.reload();
} */