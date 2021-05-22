from config import *

class Estudio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254)) # nome do estúdio
    fundacao = db.Column(db.String(254)) # fundação do estúdio

    def __str__(self): # expressão da classe em forma de texto
        return self.fundacao + ", " + self.nome

    def json(self):
        return {
            "id":self.id,
            "nome":self.nome,
            "fundacao":self.fundacao
        }

class Anime(db.Model):
    # atributos do anime
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    genero = db.Column(db.String(254))
    num_de_ep = db.Column(db.String(254))

    # atributo de chave estrangeira
    estudio_id = db.Column(db.Integer, db.ForeignKey(Estudio.id), nullable=False)

    # atributo de relacionamento, para acesso aos dados via objeto
    estudio = db.relationship("Estudio")

    # método para expressar o anime em forma de texto
    def __str__(self):
        return self.nome + ", " + self.genero + ", " + self.num_de_ep
    # expressao da classe no formato json
    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "genero": self.genero,
            "num_de_ep": self.num_de_ep
        }

class Personagem(db.Model):
    id = db.Column(db.Integer, primary_key=True) # id interno
    nome = db.Column(db.String(254)) # nome do personagem
    funcao = db.Column(db.String(254)) # Se é protagonista, vilão, figurante 
    caracteristicas = db.Column(db.String(254)) # Descrever características "Ele é loiro, tem 14 ano..."

    # atributo de chave estrangeira
    anime_id = db.Column(db.Integer, db.ForeignKey(Anime.id), nullable=False)
    # atributo de relacionamento, para acesso aos dados via objeto
    anime = db.relationship("Anime")

    def __str__(self): # expressão da classe em forma de texto
        return self.nome + ", " + self.funcao + " do anime " + self.anime.nome + ". " + self.caracteristicas

    def json(self):
            
        return {
            "id": self.id,
            "nome": self.nome,
            "funcao": self.funcao,
            "anime": self.anime.nome,
            "caracteristicas": self.caracteristicas
        } 


#          <===========================    TESTES    ===========================>  

if __name__ == "__main__":
    # apagar o arquivo, se houver
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    # criar tabelas
    db.create_all()

# Teste da classe Estudio
    e1 = Estudio(nome="Mashiro SB", fundacao="28/05/1998")

    db.session.add(e1)
    db.session.commit()

    print(f"Estúdio: {e1}")
    print(f"Estúdio em json: {e1.json()}")

 # teste da classe Anime
    a1 = Anime(nome = "Boruto", genero = "Ação", 
        num_de_ep = "300", estudio=e1)
    a2 = Anime(nome = "Dororo", genero = "Romance", 
        num_de_ep = "41", estudio=e1) 

    # persistir
    db.session.add(a1)
    db.session.add(a2)
    db.session.commit()
    
    print(f"Anime: {a2}") # exibir o anime
    print(f"Anime em json: {a2.json()} ") # exibir o anime no formato json

    # Criar um personagem
    p1 = Personagem(nome="Naruto", funcao="protagonista", 
    caracteristicas="Tem cabelo loiro, marcas no rosto e uma besta de 9 rabos na barriga", anime=a1)
    p2 = Personagem(nome="Sasuke", funcao="Antagonista", 
    caracteristicas="Rival do Naruto, último uchiha homem vivo e um dos ninjas mais fortes atuais", anime=a1)

    db.session.add(p1)
    db.session.commit()
    print(f"Personagem 1: {p1}")
    print(f"Personagem 1 em json: {p1.json()}")