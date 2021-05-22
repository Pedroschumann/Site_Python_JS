from config import *

class Anime(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    genero = db.Column(db.String(254))
    numero_de_ep = db.Column(db.Integer)

    def __str__(self):
        return str(self.id)+") " + self.nome + ", " +\
            self.genero + ", " + self.numero_de_ep

    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "genero": self.genero,
            "numero_de_ep": self.numero_de_ep
        }

# teste    
if __name__ == "__main__":
    # apagar o arquivo, se houver
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    #criar tabelas
    db.create_all()

    # teste da classe Anime
    a1 = Anime(nome = "Black Clover", genero = "fantasia", numero_de_ep = 141)
    a2 = Anime(nome = "Dr. Stone", genero = "ficcao cientifica", numero_de_ep = 24)
    a3 = Anime(nome = "Kanojo, Okarishimasu", genero = "romance", numero_de_ep = 9)
    a4 = Anime(nome = "Re: Zero 1", genero = "drama", numero_de_ep = 25)

    # Persistir
    db.session.add(a1)
    db.session.add(a2)
    db.session.add(a3)
    db.session.add(a4)
    db.session.commit()
    
    # exibir o anime
    print(a1)
    print(a2)
    print(a3)
    print(a4)

    # exibir o anime no formato json
    print(a1.json())
    print(a2.json())
    print(a3.json())
    print(a4.json())