from config import *
from anime import Anime

@app.route("/")
def inicio():
    return 'Sistema para cadastrar animes. '+\
        '<a href="/listar_animes">Listar Animes</a>'

@app.route("/listar_animes")
def listar_animes():
    animes = db.session.query(Anime).all()
    # aplicar o método json que a classe Musica possui a cada elemento da lista
    animes_em_json = [ x.json() for x in animes]
    # converter a lista do python para json
    resposta = jsonify(animes_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

# teste da rota: curl -d '{"nome":"James Kirk", "telefone":"92212-1212", "email":"jakirk@gmail.com"}' -X POST -H "Content-Type:application/json" localhost:5000/incluir_pessoa
@app.route("/incluir_anime", methods=['post'])
def incluir_anime():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova pessoa
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      nova = Anime(**dados) # criar a nova pessoa
      db.session.add(nova) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/excluir_anime/<int:anime_id>", methods=['DELETE'])
def excluir_anime(anime_id):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        Anime.query.filter(Anime.id == anime_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

app.run(debug=True)