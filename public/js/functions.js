let cotacao = {}

let invertido = false

window.addEventListener('load', (event) => {
    fetch('/api/cotacao/hoje')
        .then(res => res.json())
        .then(dados => {
            cotacao = dados
            atualizarTela(cotacao)
        })
})

document.getElementById('btnInverter').addEventListener('click', inverter)
document.forms['conversor'].addEventListener('submit', converter)

function atualizarTela(cotacao) {
    document.getElementById('cotacao-data').innerText = moment(cotacao.data).format('DD/MM/YYYY')
    document.getElementById('cotacao-venda').innerText = cotacao.venda
    document.getElementById('cotacao-compra').innerText = cotacao.compra
}

function inverter() {
    let entrada = document.querySelector('label[for="inputEntrada"] strong').innerText
    let resultado = document.querySelector('label[for="inputResultado"] strong').innerText

    document.querySelector('label[for="inputEntrada"] strong').innerText = resultado
    document.querySelector('label[for="inputResultado"] strong').innerText = entrada

    invertido = !invertido
}

function converter(event) {
    event.preventDefault()
    let entrada = document.querySelector('#inputEntrada').value

    if (!entrada) {
        return
    }

    entrada = parseFloat(entrada.replace('.', '').replace(',', '')) / 100.0

    let operacao = Array.from(document.querySelectorAll('input[name="operacao"]'))
        .find(radio => radio.checked).value

    let vlCotacao = operacao == "compra" ? cotacao.compra : cotacao.venda
    vlCotacao = invertido ? 1 / vlCotacao : vlCotacao

    let resultado = parseFloat((entrada / vlCotacao).toFixed(2)).toLocaleString('pt-BR')
    document.querySelector('#inputResultado').value = resultado
}