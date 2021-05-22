from config import *
from anime import Anime

@app.route("/")
def inicio():
    return 'Sistema para cadastrar animes. '+\
        '<a href="/listar_animes">Listar Animes</a>'

@app.route("/listar_animes")
def listar_animes():
    animes = db.session.query(Anime).all()
    anime_em_json = [ x.json() for x in animes ]
    # fornecer a lista de animes em formato json
    return jsonify(anime_em_json)

app.run(debug=True)