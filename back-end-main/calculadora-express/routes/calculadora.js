const express = require('express');
const router = express.Router();
const ops = require('../lib/operacoes');

function parseNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function validarDoisNumeros(req, res) {
  const a = parseNumber(req.query.numA);
  const b = parseNumber(req.query.numB);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).json({ error: 'numA e numB são obrigatórios e devem ser números' });
    return null;
  }
  return { a, b };
}

function validarUmNumero(req, res) {
  const a = parseNumber(req.query.numA);
  if (Number.isNaN(a)) {
    res.status(400).json({ error: 'numA é obrigatório e deve ser um número' });
    return null;
  }
  return a;
}

router.get('/somar', (req, res) => {
  const vals = validarDoisNumeros(req, res);
  if (!vals) return;
  const result = ops.somar(vals.a, vals.b);
  res.json({ operation: 'somar', numA: vals.a, numB: vals.b, result });
});

router.get('/subtrair', (req, res) => {
  const vals = validarDoisNumeros(req, res);
  if (!vals) return;
  const result = ops.subtrair(vals.a, vals.b);
  res.json({ operation: 'subtrair', numA: vals.a, numB: vals.b, result });
});

router.get('/multiplicar', (req, res) => {
  const vals = validarDoisNumeros(req, res);
  if (!vals) return;
  const result = ops.multiplicar(vals.a, vals.b);
  res.json({ operation: 'multiplicar', numA: vals.a, numB: vals.b, result });
});

router.get('/dividir', (req, res) => {
  const vals = validarDoisNumeros(req, res);
  if (!vals) return;
  try {
    const result = ops.dividir(vals.a, vals.b);
    res.json({ operation: 'dividir', numA: vals.a, numB: vals.b, result });
  } catch (err) {
    if (err.message === 'DIVISAO_POR_ZERO') {
      res.status(400).json({ error: 'Divisão por zero não é permitida' });
    } else {
      res.status(500).json({ error: 'Erro interno' });
    }
  }
});

router.get('/aoQuadrado', (req, res) => {
  const a = validarUmNumero(req, res);
  if (a === null) return;
  const result = ops.aoQuadrado(a);
  res.json({ operation: 'aoQuadrado', numA: a, result });
});

router.get('/raizQuadrada', (req, res) => {
  const a = validarUmNumero(req, res);
  if (a === null) return;
  try {
    const result = ops.raizQuadrada(a);
    res.json({ operation: 'raizQuadrada', numA: a, result });
  } catch (err) {
    if (err.message === 'RAIZ_DE_NEGATIVO') {
      res.status(400).json({ error: 'Não é possível calcular raiz quadrada de número negativo' });
    } else {
      res.status(500).json({ error: 'Erro interno' });
    }
  }
});

module.exports = router;
