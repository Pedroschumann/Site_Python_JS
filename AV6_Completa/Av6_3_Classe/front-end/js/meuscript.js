$(function() { // quando o documento estiver pronto/carregado

    function mostrar_conteudo(identificador) {
        // esconde todos os conteúdos
        $("#cadastroAnime").addClass('d-none');
        $("#cadastroPersonagem").addClass('d-none');
        $("#cadastroEstudio").addClass('d-none');
        $("#conteudoInicial").addClass('d-none');
        // torna o conteúdo escolhido visível
        $("#"+identificador).removeClass('d-none');      
    }

    // código para mapear click do link Inicio
    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });


// ================================================================= ESTUDIO =======================================================================

    function exibir_estudio() {
        mostrar_conteudo('TabelaEstudio')
        $.ajax({
            url: 'http://localhost:5000/listar_estudio',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function listar (estudio) {
            // esvaziar o corpo da tabela
            $('#corpoTabelaEstudio').empty();
            // tornar visível a página de estudio
            mostrar_conteudo("cadastroEstudio");      
            // percorrer a lista de estudio retornadas; 
            for (var i in estudio) { //i vale a posição no vetor
                lin = '<tr id="linha_'+estudio[i].id+'">' + 
                '<td>' + estudio[i].nome + '</td>' + 
                '<td>' + estudio[i].fundacao + '</td>' + 
                '<td><a href=# id="excluir_' + estudio[i].id + '" ' + 
                    'class="excluir_estudio"><img src="img/excluir.png" '+
                    'alt="Excluir estudio" title="Excluir estudio"></a>' + 
                '</td>' + 
                '</tr>';
                // adiciona a linha no corpo da tabela
                $('#corpoTabelaEstudio').append(lin);
            }
        }
    }

    $(document).on("click", "#linkListarEstudio", function() {
        exibir_estudio();
    });

    // código para mapear click do botão incluir estudio
    $(document).on("click", "#btIncluirEstudio", function() {
        //pegar dados da tela
        nome = $("#campoNome").val();
        fundacao = $("#campoFundacao").val();

        // preparar dados no formato json
        var dados = JSON.stringify({ nome: nome, fundacao: fundacao});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/incluir_estudio',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: estudioIncluido, // chama a função listar para processar o resultado
            error: erroAoIncluir
         });
        function estudioIncluido (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Estúdio incluído com sucesso!");
                // limpar os campos
                $("#campoNome").val("");
                $("#campoFundacao").val("");
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("erro ao incluir dados, verifique o backend: ");
        }
    });

    // código a ser executado quando a janela de inclusão de animes for fechada
    $('#modalIncluirEstudio').on('hide.bs.modal', function (e) {
        // se a página de listagem não estiver invisível
        if (! $("#cadastroEstudio").hasClass('invisible')) {
            // atualizar a página de listagem
            exibir_estudio();
        }
    });

    mostrar_conteudo("conteudoInicial");

    // código para os ícones de excluir animes (classe css)
    $(document).on("click", ".excluir_estudio", function() {
        // obter o ID do ícone que foi clicado
        var componente_clicado = $(this).attr('id'); 
        // no id do ícone, obter o ID do anime
        var nome_icone = "excluir_";
        var id_estudio = componente_clicado.substring(nome_icone.length);
        // solicitar a exclusão da anime
        $.ajax({
            url: 'http://localhost:5000/excluir_estudio/'+id_estudio,
            type: 'DELETE', // método da requisição
            dataType: 'json', // os dados são recebidos no formato json
            success: estudioExcluido, // chama a função listar para processar o resultado
            error: erroAoExcluir
        });
        function estudioExcluido (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // remover da tela a linha cuja anime foi excluído
                $("#linha_" + id_estudio).fadeOut(1000, function(){
                    // informar resultado de sucesso
                    alert("Estúdio removido com sucesso!");
                });
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            // informar mensagem de erro
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });
    
    

//================================================================== PERSONAGEM ==================================================================


    function exibir_personagem() {
        $.ajax({
            url: 'http://localhost:5000/listar_personagem',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function listar (personagem) {
            // esvaziar o corpo da tabela
            $('#corpoTabelaPersonagem').empty();
            // tornar visível a página de personagem
            mostrar_conteudo("cadastroPersonagem");      
            // percorrer a lista de personagem retornadas; 
            for (var i in personagem) { //i vale a posição no vetor
                lin = '<tr id="linha_'+personagem[i].id+'">' + 
                '<td>' + personagem[i].nome + '</td>' + 
                '<td>' + personagem[i].funcao + '</td>' + 
                '<td>' + personagem[i].caracteristicas + '</td>' +
                '<td><a href=# id="excluir_' + personagem[i].id + '" ' + 
                    'class="excluir_personagem"><img src="img/excluir.png" '+
                    'alt="Excluir personagem" title="Excluir personagem"></a>' + 
                '</td>' + 
                '</tr>';
                // adiciona a linha no corpo da tabela
                $('#corpoTabelaPersonagem').append(lin);
            }
        }
    }

    $(document).on("click", "#linkListarPersonagem", function() {
        exibir_personagem();
    });

    // código para mapear click do botão incluir personagem
    $(document).on("click", "#btIncluirPersonagem", function() {
        //pegar dados da tela
        nome = $("#campoNome").val();
        fundacao = $("#campoFuncao").val();
        caracteristicas = $("#campoCaracteristicas").val();

        // preparar dados no formato json
        var dados = JSON.stringify({ nome: nome, funcao: funcao, caracteristicas: caracteristicas });
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/incluir_personagem',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: personagemIncluido, // chama a função listar para processar o resultado
            error: erroAoIncluir
         });
        function personagemIncluido (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Personagem incluído com sucesso!");
                // limpar os campos
                $("#campoNome").val("");
                $("#campoFuncao").val("");
                $("#campoCaracteristicas").val("");
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("erro ao incluir dados, verifique o backend: ");
        }
    });

    // código a ser executado quando a janela de inclusão de animes for fechada
    $('#modalIncluirPersonagem').on('hide.bs.modal', function (e) {
        // se a página de listagem não estiver invisível
        if (! $("#cadastroPersonagem").hasClass('invisible')) {
            // atualizar a página de listagem
            exibir_personagem();
        }
    });

    mostrar_conteudo("conteudoInicial");

    // código para os ícones de excluir animes (classe css)
    $(document).on("click", ".excluir_personagem", function() {
        // obter o ID do ícone que foi clicado
        var componente_clicado = $(this).attr('id'); 
        // no id do ícone, obter o ID do anime
        var nome_icone = "excluir_";
        var id_personagem = componente_clicado.substring(nome_icone.length);
        // solicitar a exclusão da anime
        $.ajax({
            url: 'http://localhost:5000/excluir_personagem/'+id_personagem,
            type: 'DELETE', // método da requisição
            dataType: 'json', // os dados são recebidos no formato json
            success: personagemExcluido, // chama a função listar para processar o resultado
            error: erroAoExcluir
        });
        function personagemExcluido (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // remover da tela a linha cuja anime foi excluído
                $("#linha_" + id_personagem).fadeOut(1000, function(){
                    // informar resultado de sucesso
                    alert("Personagem removido com sucesso!");
                });
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            // informar mensagem de erro
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });


//================================================================== ANIME ==================================================================
        
    function exibir_anime() {
        $.ajax({
            url: 'http://localhost:5000/listar_anime',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function listar (anime) {
            // esvaziar o corpo da tabela
            $('#corpoTabelaAnime').empty();
            // tornar visível a página de personagem
            mostrar_conteudo("cadastroAnime");      
            // percorrer a lista de personagem retornadas; 
            for (var i in anime) { //i vale a posição no vetor
                lin = '<tr id="linha_'+anime[i].id+'">' + 
                '<td>' + anime[i].nome + '</td>' + 
                '<td>' + anime[i].genero + '</td>' + 
                '<td>' + anime[i].num_de_ep + '</td>' +
                '<td><a href=# id="excluir_' + anime[i].id + '" ' + 
                    'class="excluir_anime"><img src="img/excluir.png" '+
                    'alt="Excluir anime" title="Excluir anime"></a>' + 
                '</td>' + 
                '</tr>';
                // adiciona a linha no corpo da tabela
                $('#corpoTabelaAnime').append(lin);
            }
        }
    }

    $(document).on("click", "#linkListarAnime", function() {
        exibir_anime();
    });
        
// código para mapear click do botão incluir anime
$(document).on("click", "#btIncluirAnime", function() {
    //pegar dados da tela
    nome = $("#campoNome").val();
    genero = $("#campoGenero").val();
    num_de_ep = $("#campoNum_de_ep").val();

    // preparar dados no formato json
    var dados = JSON.stringify({ nome: nome, genero: genero, num_de_ep: num_de_ep});
    // fazer requisição para o back-end
    $.ajax({
        url: 'http://localhost:5000/incluir_anime',
        type: 'POST',
        dataType: 'json', // os dados são recebidos no formato json
        contentType: 'application/json', // tipo dos dados enviados
        data: dados, // estes são os dados enviados
        success: animeIncluido, // chama a função listar para processar o resultado
        error: erroAoIncluir
     });
    function animeIncluido (retorno) {
        if (retorno.resultado == "ok") { // a operação deu certo?
            // informar resultado de sucesso
            alert("Anime incluído com sucesso!");
            // limpar os campos
            $("#campoNome").val("");
            $("#campoGenero").val("");
            $("#campoNum_de_ep").val("");
        } else {
            // informar mensagem de erro
            alert(retorno.resultado + ":" + retorno.detalhes);
        }            
    }
    function erroAoIncluir (retorno) {
        // informar mensagem de erro
        alert("erro ao incluir dados, verifique o backend: ");
    }
});

// código a ser executado quando a janela de inclusão de animes for fechada
$('#modalIncluirAnime').on('hide.bs.modal', function (e) {
    // se a página de listagem não estiver invisível
    if (! $("#cadastroAnime").hasClass('invisible')) {
        // atualizar a página de listagem
        exibir_anime();
    }
});

mostrar_conteudo("conteudoInicial");

// código para os ícones de excluir animes (classe css)
$(document).on("click", ".excluir_anime", function() {
    // obter o ID do ícone que foi clicado
    var componente_clicado = $(this).attr('id'); 
    // no id do ícone, obter o ID do anime
    var nome_icone = "excluir_";
    var id_anime = componente_clicado.substring(nome_icone.length);
    // solicitar a exclusão da anime
    $.ajax({
        url: 'http://localhost:5000/excluir_anime/'+id_anime,
        type: 'DELETE', // método da requisição
        dataType: 'json', // os dados são recebidos no formato json
        success: animeExcluido, // chama a função listar para processar o resultado
        error: erroAoExcluir
    });
    function animeExcluido (retorno) {
        if (retorno.resultado == "ok") { // a operação deu certo?
            // remover da tela a linha cuja anime foi excluído
            $("#linha_" + id_anime).fadeOut(1000, function(){
                // informar resultado de sucesso
                alert("Anime removido com sucesso!");
            });
        } else {
            // informar mensagem de erro
            alert(retorno.resultado + ":" + retorno.detalhes);
        }            
    }
    function erroAoExcluir (retorno) {
        // informar mensagem de erro
        alert("erro ao excluir dados, verifique o backend: ");
    }
});


});

