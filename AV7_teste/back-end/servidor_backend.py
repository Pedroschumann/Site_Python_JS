from config import *
from modelo import Estudio, Anime, Personagem

@app.route("/")
def inicio():
    return 'Sistema de cadastro de animes. '+\
        '<a href="/listar_anime">Operação listar</a>'


#======================================================= ANIME =======================================================


@app.route("/listar_anime")
def listar_anime():
    # obter as pessoas do cadastro
    anime = db.session.query(Anime).all()
    # aplicar o método json que a classe Pessoa possui a cada elemento da lista
    anime_em_json = [ x.json() for x in anime ]
    # converter a lista do python para json
    resposta = jsonify(anime_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...


@app.route("/incluir_anime", methods=['post'])
def incluir_anime():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações do novo anime
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      novo = Anime(**dados) # criar o novo anime
      db.session.add(novo) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

    # teste: curl -X DELETE http://localhost:5000/excluir_anime/1
@app.route("/excluir_anime/<int:anime_id>", methods=['DELETE'])
def excluir_anime(anime_id):
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        # excluir a anime do ID informado
        Anime.query.filter(Anime.id == anime_id).delete()
        # confirmar a exclusão
        db.session.commit()
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!


#======================================================= PERSONAGEM =======================================================


@app.route("/listar_personagem")
def listar_personagem():
    # obter as pessoas do cadastro
    personagem = db.session.query(Personagem).all()
    # aplicar o método json que a classe Pessoa possui a cada elemento da lista
    personagem_em_json = [ x.json() for x in personagem ]
    # converter a lista do python para json
    resposta = jsonify(personagem_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...


@app.route("/incluir_personagem", methods=['post'])
def incluir_personagem():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações do novo anime
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      novo = Personagem(**dados) # criar o novo anime
      db.session.add(novo) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

    # teste: curl -X DELETE http://localhost:5000/excluir_anime/1
@app.route("/excluir_personagem/<int:personagem_id>", methods=['DELETE'])
def excluir_personagem(personagem_id):
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        # excluir a anime do ID informado
        Personagem.query.filter(Personagem.id == personagem_id).delete()
        # confirmar a exclusão
        db.session.commit()
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!


#======================================================= ESTÚDIO =======================================================


@app.route("/listar_estudio")
def listar_estudio():
    # obter as pessoas do cadastro
    estudio = db.session.query(Estudio).all()
    # aplicar o método json que a classe Pessoa possui a cada elemento da lista
    estudio_em_json = [ x.json() for x in estudio ]
    # converter a lista do python para json
    resposta = jsonify(estudio_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...


@app.route("/incluir_estudio", methods=['post'])
def incluir_estudio():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações do novo anime
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      novo = Estudio(**dados) # criar o novo anime
      db.session.add(novo) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

# teste: curl -X DELETE http://localhost:5000/excluir_estudio/1
@app.route("/excluir_estudio/<int:estudio_id>", methods=['DELETE'])
def excluir_estudio(estudio_id):
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        # excluir a anime do ID informado
        Estudio.query.filter(Estudio.id == estudio_id).delete()
        # confirmar a exclusão
        db.session.commit()
    except Exception as e:
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

app.run(debug=True)