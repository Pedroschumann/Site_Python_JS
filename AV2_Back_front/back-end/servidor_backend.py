from config import *
from modelo import Anime

@app.route("/")
def inicio():
    return 'Sistema de cadastro de animes. '+\
        '<a href="/listar_animes">Operação listar</a>'

@app.route("/listar_animes")
def listar_animes():
    # obter as animes do cadastro
    animes = db.session.query(Anime).all()
    # aplicar o método json que a classe Anime possui a cada elemento da lista
    animes_em_json = [ x.json() for x in animes ]
    # converter a lista do python para json
    resposta = jsonify(animes_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

app.run(debug=True)