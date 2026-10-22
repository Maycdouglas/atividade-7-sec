/**
 * Implementação Criptográfica do Gerador Blum Blum Shub (BBS)
 * Utiliza BigInt para evitar perda de precisão em (x^2) > Number.MAX_SAFE_INTEGER
 */

// 1. Funções Auxiliares de Validação Matemática
function mdc(a, b) {
  while (b !== 0n) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function ehPrimo(n) {
  if (n < 2n) return false;
  if (n % 2n === 0n) return n === 2n;
  for (let i = 3n; i * i <= n; i += 2n) {
    if (n % i === 0n) return false;
  }
  return true;
}

function validarParametrosBBS(p, q, s) {
  if (p <= 10000n || q <= 10000n) {
    throw new Error("Erro: p e q devem ser maiores que 10.000.");
  }
  if (!ehPrimo(p) || !ehPrimo(q)) {
    throw new Error("Erro: p e q devem ser números primos.");
  }
  if (p % 4n !== 3n || q % 4n !== 3n) {
    throw new Error("Erro: p e q devem ser congruentes a 3 (mod 4).");
  }
  const M = p * q;
  if (s <= 1n || s >= M || mdc(s, M) !== 1n) {
    throw new Error(
      "Erro: A semente 's' deve ser coprima a M (mdc(s, M) = 1)."
    );
  }
  return M;
}

// 2. Algoritmo Gerador Blum Blum Shub
function gerarBitsBBS(p, q, s, quantidadeBits) {
  const M = validarParametrosBBS(p, q, s);

  // Estado inicial: x_0 = (s^2) mod M
  let x = (s * s) % M;
  const bits = [];

  for (let i = 0; i < quantidadeBits; i++) {
    // Próximo estado: x_i = (x_{i-1}^2) mod M
    x = (x * x) % M;

    // Extrai o bit menos significativo (LSB): x_i mod 2
    const bit = x & 1n; // Operação bitwise equivalente a x % 2n
    bits.push(bit.toString());
  }

  return {
    parametros: {
      p: p.toString(),
      q: q.toString(),
      M: M.toString(),
      s: s.toString(),
    },
    bitstream: bits.join(""),
  };
}

// 3. Execução do Algoritmo
const p = 10007n;
const q = 10079n;
const s = 1234567n;
const tamanhoSequencia = 100000; // 100.000 bits para a suíte NIST

const resultado = gerarBitsBBS(p, q, s, tamanhoSequencia);

console.log("=== PARÂMETROS BLUM BLUM SHUB ===");
console.log(`p = ${resultado.parametros.p}`);
console.log(`q = ${resultado.parametros.q}`);
console.log(`M = ${resultado.parametros.M}`);
console.log(`s = ${resultado.parametros.s}`);
console.log(`Total de bits gerados: ${resultado.bitstream.length}`);
console.log(`Primeiros 100 bits: ${resultado.bitstream.slice(0, 100)}...`);

// Caso esteja executando no Node.js, salva a sequência em um arquivo .txt
if (typeof require !== "undefined") {
  const fs = require("fs");
  fs.writeFileSync("bbs_bits.txt", resultado.bitstream);
  console.log(
    "\nArquivo 'bbs_bits.txt' salvo com sucesso! Copie o conteúdo para o site do teste NIST."
  );
}
