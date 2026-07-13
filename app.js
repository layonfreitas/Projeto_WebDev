const express = require('express');
const app = express();

app.use(express.json());

const musicas = [
  { id: 1,  titulo: 'Bohemian Rhapsody',              artista: 'Queen',                    genero: 'Rock',       ano: 1975 },
  { id: 2,  titulo: 'Billie Jean',                    artista: 'Michael Jackson',          genero: 'Pop',        ano: 1982 },
  { id: 3,  titulo: 'Smells Like Teen Spirit',        artista: 'Nirvana',                  genero: 'Rock',       ano: 1991 },
  { id: 4,  titulo: 'Shape of You',                   artista: 'Ed Sheeran',               genero: 'Pop',        ano: 2017 },
  { id: 5,  titulo: 'Lose Yourself',                  artista: 'Eminem',                   genero: 'Rap',        ano: 2002 },
  { id: 6,  titulo: 'Evidências',                     artista: 'Chitãozinho & Xororó',     genero: 'Sertanejo',  ano: 1990 },
  { id: 7,  titulo: '1406',                           artista: 'Mamonas Assasinas',        genero: 'Rock',       ano: 1995 },
  { id: 8,  titulo: 'Cheia de Manias',                artista: 'Raça Negra',               genero: 'Pagode',     ano: 1992 },
  { id: 9,  titulo: 'Leão',                           artista: 'Marília Mendonça',         genero: 'Sertanejo',  ano: 2022 },
  { id: 10, titulo: 'Believer',                       artista: 'Imagine Dragons',          genero: 'Rock',       ano: 2017 },
  { id: 11, titulo: 'Superfantástico',                artista: 'A turma do balão mágico',  genero: 'MPB',        ano: 1983 },
  { id: 12, titulo: 'Alone',                          artista: 'Marshmello',               genero: 'Eletrônica', ano: 2016 },
  { id: 13, titulo: 'O descobridor dos sete mares',   artista: 'Tim Maia',                 genero: 'MPB',        ano: 1983 },
  { id: 14, titulo: 'A Little Piece of Heaven',       artista: 'Avenged Sevenfold',        genero: 'Rock',       ano: 2007 },
];

const usuario = "layon";
const senha = "123";
const usuario1 = "marcelo";
const senha1 = "456";
const usuario2 = "thiago";
const senha2 = "789";

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/musicas', (req, res) => {
  const genero = req.query.genero;

  if (!genero) {
    return res.status(200).json(musicas);
  }

  const filtradas = [];
  for (let i = 0; i < musicas.length; i++) {
    if (musicas[i].genero === genero) {
      filtradas.push(musicas[i]);
    }
  }

  res.status(200).json(filtradas);
});

app.get('/artistas', (req, res) => {
  const artista = req.query.artista;

  if (!artista) {
    return res.status(400).json({ erro: "Informe o parâmetro 'artista'." });
  }

  const musicasDoArtista = [];
  for (let i = 0; i < musicas.length; i++) {
    if (musicas[i].artista === artista) {
      musicasDoArtista.push(musicas[i]);
    }
  }

  res.status(200).json(musicasDoArtista);
});

app.post('/login', (req, res) => {
  const username = req.body.usuario;
  const password = req.body.senha;

  if ((username === usuario && password === senha) || (username === usuario1 && password === senha1) || (username === usuario2 && password === senha2)) {
    res.status(200).json({ mensagem: 'Login realizado com sucesso!', token: '12455' });
  } else {
    res.status(401).json({ erro: 'Usuário ou senha incorretos.' });
  }
});

app.post('/pedidos', (req, res) => {
  const nome = req.body.nome;
  const musicaId = req.body.musicaId;

  if (!nome || !musicaId) {
    return res.status(400).json({ erro: 'Envie nome e musicaId.' });
  }

  let musica = null;
  for (let i = 0; i < musicas.length; i++) {
    if (musicas[i].id === Number(musicaId)) {
      musica = musicas[i];
    }
  }
  if (musica === null) {
    return res.status(404).json({ erro: 'Música não encontrada.' });
  }

  res.status(201).json({
    mensagem: 'Pedido recebido!'
  });
});

app.listen(3000, () => {
  console.log(' rodando em http://localhost:3000');
});