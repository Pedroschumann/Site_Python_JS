from config import *

class Anime(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    genero = db.Column(db.String(254))
    numero_de_ep = db.Column(db.String(254))

    def __str__(self):
        return str(self.id)+") " + self.nome + ", " +\
            self.genero + ", " + self.numero_de_ep

    def json(self):
        return json.dumps({
            "id": self.id,
            "nome": self.nome,
            "genero": self.genero,
            "numero_de_ep": self.numero_de_ep
        })