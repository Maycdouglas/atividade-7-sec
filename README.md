# Atividade 7 - Segurança em Sistemas de Informação

Projeto em JavaScript que implementa o gerador Blum Blum Shub (BBS) e gera uma sequência de bits para uso em testes da suíte NIST.

## Pré-requisitos

- Node.js instalado na máquina

## Como executar

1. Abra o terminal na pasta do projeto.
2. Execute:

```bash
node bbs.js
```

3. O script irá:
   - validar os parâmetros do gerador BBS;
   - gerar a sequência de bits;
   - exibir os principais valores e os primeiros bits produzidos;
   - salvar a sequência em um arquivo chamado `bbs_bits.txt`.

## Arquivos gerados

- `bbs_bits.txt`: contém a sequência de bits gerada pelo algoritmo, pronta para ser copiada e utilizada no teste da suíte NIST.

## Observação

O projeto utiliza `BigInt` para evitar perda de precisão em operações matemáticas com números grandes, o que é essencial no algoritmo BBS.

## Como foi implementado

Código gerado com o `Gemini AI`, da Google. O modelo utilizado foi o `Argon` com nível de raciocínio no máximo.

Prompt usado:

```
Você é um especialista em Segurança em Sistemas de Computação. Você me ajudará com atividades práticas da disciplina na universidade. Preciso que me explique didaticamente o que cada atividade pede e depois implemente o que é pedido em JAVASCRIPT.

Implementar o Blum Blum Shub escolhendo números p e q maiores que 10000 (link exemplo) e que atendam às premissas do algoritmo. Realizar testes na suite NIST. Você deve enviar o algoritmo e os valores de "p", "q" e "s" junto com o resultado da suite NIST (print).

https://pt.wikibooks.org/wiki/Teoria_de_n%C3%BAmeros/10000_primos

https://mzsoltmolnar.github.io/random-bitstream-tester/"
```
