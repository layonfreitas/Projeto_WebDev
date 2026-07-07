const express = require('express');
const app = express();
app.use(express.json());

const usuario = "layon";
const senha = "123";

const usuario1 = "marcelo";
const senha1 = "456";

const usuario2 = "thiago";
const senha2 = "789";

const musicas = [
  { id: 1, titulo: 'Bohemian Rhapsody', artista: 'Queen', genero: 'Rock', ano: 1975 },
  { id: 2, titulo: 'Billie Jean', artista: 'Michael Jackson', genero: 'Pop', ano: 1982 },
  { id: 3, titulo: 'Smells Like Teen Spirit', artista: 'Nirvana', genero: 'Rock', ano: 1991 },
  { id: 4, titulo: 'Shape of You', artista: 'Ed Sheeran', genero: 'Pop', ano: 2017 },
  { id: 5, titulo: 'Lose Yourself', artista: 'Eminem', genero: 'Rap', ano: 2002 },
  { id: 6, titulo: 'Evidências', artista: 'Chitãozinho & Xororó', genero: 'Sertanejo', ano: 1990 },
  { id: 7, titulo: '1406', artista: 'Mamonas Assasinas', genero: 'Rock', ano: 1995 },
  { id: 8, titulo: 'Cheia de Manias', artista: 'Raça Negra', genero: 'Pagode', ano: 1992 },
  { id: 9, titulo: 'Leão', artista: 'Marília Mendonça', genero: 'Sertanejo', ano: 2022 },
  { id: 10, titulo: 'Believer', artista: 'Imagine Dragons', genero: 'Rock', ano: 2017 },
  { id: 11, titulo: 'Superfantástico', artista: 'A turma do balão mágico', genero: 'MPB', ano: 1983 },
  { id: 12, titulo: 'Alone', artista: 'Marshmello', genero: 'Eletrônica', ano: 2016 },
  { id: 13, titulo: 'O descobridor dos sete mares', artista: 'Tim Maia', genero: 'MPB', ano: 1983 },
  
];



const pedidos = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/musicas', (req, res) => {
    const  genero = req.query.genero;
    if (genero) {
        const musicasFiltradas = musicas.filter(musica => musica.genero === genero);
        res.json(musicasFiltradas);
    } else {
        res.json(musicas);
    }
});

app.get('/artistas', (req, res) => {
    const artista = req.query.artista;
    if (!artista) {
            return res.status(400).json({ message: "Informe o parâmetro 'artista'" });
    }
    const MusicasDoArtista = musicas.filter(musica => musica.artista.toLowerCase() === artista.toLowerCase());

    res.json(MusicasDoArtista);

});

app.post('/pedidos', (req, res) => {
    const { nome, musicaId } = req.body;

    if (!nome || !musicaId) {
        return res.status(400).json({ 
            message: 'Nome e ID da música são obrigatórios.' 
        });
    }

    const musica = musicas.find(m => m.id === Number(musicaId));
    
    if (!musica) {
        return res.status(404).json({ 
            message: 'Música não encontrada.' 
        });
    }

    const jaPedida = pedidos.find(p => p.idMusica === Number(musicaId));
    if (jaPedida) {
        return res.status(400).json({ 
            message: 'Essa música já foi escolhida.' 
        });
    }

    const novoPedido = {
        nome: nome.trim(),
        idMusica: Number(musicaId),
        data: new Date().toISOString()
    };

    pedidos.push(novoPedido);

    res.json({ 
        message: `Pedido recebido! ${nome} solicitou a música "${musica.titulo}".`
    });
});

app.post('/login', (req, res) => {
    const { usuario: username, senha: password } = req.body;
    if ((username === usuario1 && password === senha1) || (username === usuario2 && password === senha2) || (username === usuario && password === senha)) {
        res.json({ message: 'Login bem-sucedido!', token: '12455'});
    } else {
        res.status(401).json({ message: 'Credenciais inválidas.' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000, http://localhost:3000');
});