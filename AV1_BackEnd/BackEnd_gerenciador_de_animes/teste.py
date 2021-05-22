from anime import *
import os

if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    a1 = Anime(nome = "Black Clover", genero = "fantasia", numero_de_ep = "141")
    a2 = Anime(nome = "Dr. Stone", genero = "ficcao cientifica", numero_de_ep = "24")
    a3 = Anime(nome = "Kanojo, Okarishimasu", genero = "romance", numero_de_ep = "09")
    a4 = Anime(nome = "Re: Zero 1", genero = "drama", numero_de_ep = "25")

    db.session.add(a1)
    db.session.add(a2)
    db.session.add(a3)
    db.session.add(a4)
    db.session.commit()
    
    print(a1.json())
    print(a2.json())
    print(a3.json())
    print(a4.json())
