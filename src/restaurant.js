/* eslint-disable no-loop-func */
/* eslint-disable max-len */

/*
  Você é responsável por escrever o código do sistema de pedidos de um restaurante. Deve ser possível, através desse sistema, 
  cadastrar um menu. Dado que um menu foi cadastrado, o sistema deve disponibilizar um objeto através do qual se consegue:
  - ler o menu cadastrado; 
  - fazer pedidos;
  - verificar o que foi pedido;
  - somar o valor da conta.

  A estrutura deste código e deste objeto já foi definida e você irá implementá-la.
  Abaixo você verá uma série de testes e passos que devem ser, NECESSARIAMENTE, feitos em ordem para o bom desenvolvimento do sistema. 
  Eles guiarão você pelo desenvolvimento.

  Parâmetros:
  - Um objeto. Exemplos: { food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} }.
  Comportamento:

  const meuRestaurante = createMenu({ food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} }).

  meuRestaurante.fetchMenu() // Retorno: { food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} }

  meuRestaurante.order('coxinha') // Retorno: undefined

  meuRestaurante.consumption // Retorno: ['coxinha']

  meuRestaurante.pay() // Retorno: 3.9

  Uma função createMenu retorna um objeto com as seguintes características:
  - Uma chave `fetchMenu` retorna o objeto que a função `createMenu` recebe por parâmetro. O menu tem sempre duas chaves, `food` e `drink`, no seguinte formato:

  const meuRestaurante = createMenu({
    food: {'coxinha': 3.90, 'sanduiche', 9.90},
    drinks: {'agua': 3.90, 'cerveja': 6.90}
  });

  meuRestaurante.fetchMenu() // Retorno: Menu acima

  - Uma chave `consumption` que contém um array de strings, com cada string sendo a chave de um pedido. Por exemplo: ['coxinha', 'cerveja']

  - Uma chave `order` que tem uma função que, recebida uma string como parâmetro, adiciona essa string à lista salva em `consumption`.

  - Uma chave `pay` que, quando chamada, invoca uma função que soma o valor de todos os pedidos e dá o preço com acréscimo de 10%.

  IMPORTANTE: COMECE PELO TESTE 1 DO ARQUIVO `tests/restaurant.spec.js` E NÃO PELO PASSO 1 DESTE ARQUIVO!
*/

// PASSO 1: Crie uma função `createMenu()` que, dado um objeto passado por parâmetro, retorna um objeto com o seguinte formato: { fetchMenu: () => objetoPassadoPorParametro }.
//
// Agora faça o TESTE 4 no arquivo `tests/restaurant.spec.js`.

//------------------------------------------------------------------------------------------

// PASSO 2: Adicione ao objeto retornado por `createMenu` uma chave `consumption` que, como valor inicial, tem um array vazio.
//
// Agora faça o TESTE 5 no arquivo `tests/restaurant.spec.js`.

//------------------------------------------------------------------------------------------

// PASSO 3: Crie uma função, separada da função `createMenu()`, que, dada uma string recebida por parâmetro, 
// adiciona essa string ao array de `objetoRetornado.consumption`. Adicione essa função à chave `order`.
// DICA: para criar isso, você pode: 
// - Definir a função `createMenu()`
// - Definir o objeto que a `createMenu()` retorna, mas separadamente 
// - E, depois, definir a função que será atribuída a `order`.
// ```
// const restaurant = {}
//
// const createMenu = (myMenu) => // Lógica que edita o objeto `restaurant`
//
// const orderFromMenu = (request) => // Lógica que adiciona à chave `consumption` de `restaurant` a string recebida no parâmetro `request`. 
// // Essa função deve ser associada à chave `order` de `restaurant`
// ```
// Agora faça o TESTE 6 no arquivo `tests/restaurant.spec.js`.

//------------------------------------------------------------------------------------------

// PASSO 4: adicione ao objeto retornado por `createMenu()` uma chave `pay` com uma função
// que percorre por todos os itens de `objetoRetornado.consumption`, soma o preço deles e retorna o valor somado acrescido de 10%.
// DICA: para isso, você precisará percorrer tanto o objeto da chave `food` quanto o objeto da chave `drink`.

const createMenu = (itens) => {
  const bill = {
    fetchMenu: () => itens,
    consumption: [],
    order: (string) => {
      bill.consumption.push(string);
      return bill.consumption;
    },
    pay: () => {
      let totalConsumption = bill.consumption;
      let drinks = Object(bill.fetchMenu().drink);
      let foods = Object(bill.fetchMenu().food);
      let sum = 0.0;
      let sum2 = 0.0;
      // *consulta https://pt.stackoverflow.com/questions/173293/como-percorrer-um-objeto-em-javascript
      // Object.keys(foods).forEach((item) => {
      //   console.log(item + " = " + foods[item]);
      // });
      let allMenuItens = Object.assign(drinks, foods);
      // console.log(allMenuItens);
      let counter = (item) => { sum2 += item; };

      for (let value of totalConsumption) {
        Object.keys(allMenuItens).forEach((item) => {
          if (item === value) {
            // sum += allMenuItens[item];
            counter(allMenuItens[item]);
          }
        });
      }
      // console.log(sum2);
      return sum2;
    },
  };
  return bill;
};
// let order1 = createMenu({ food: { coxinha: 5.75, pizza: 42.0 }, drink: { refrigerante: 4.5, agua: 2.25 } });
// order1.order('coxinha');
// order1.order('agua');
// order1.order('coxinha');
// console.log(order1.pay());

module.exports = createMenu;

// pay: () => {
//   let totalConsumption = bill.consumption;
//   let drinks = Object(bill.fetchMenu().drink);
//   let foods = Object(bill.fetchMenu().food);
//   let sum = 0.0;
//   // *consulta https://pt.stackoverflow.com/questions/173293/como-percorrer-um-objeto-em-javascript
//   // Object.keys(foods).forEach((item) => {
//   //   console.log(item + " = " + foods[item]);
//   // });
//   for (let value of totalConsumption) {
//     Object.keys(foods).forEach((item) => {
//       if (item === value) {
//         sum += foods[item];
//       }
//     });
//     Object.keys(drinks).forEach((item) => {
//       if (item === value) {
//         sum += drinks[item];
//       }
//     });
//   }
//   return sum;
// },