$(function() { // quando o documento estiver pronto/carregado
    
    // função para exibir musicas na tabela
    function exibir_animes() {
        $.ajax({
            url: 'http://localhost:5000/listar_animes',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
         
        function listar (animes) {
            // esvaziar o corpo da tabela
            $('#corpoTabelaAnimes').empty();
            // tornar a tabela visível
            mostrar_conteudo("tabelaAnimes");       
            for (var i in animes) { //i vale a posição no vetor
                lin = '<tr>' + // elabora linha com os dados da profissão
                '<td>' + animes[i].nome + '</td>' + 
                '<td>' + animes[i].genero + '</td>' + 
                '<td>' + animes[i].numero_de_ep + '</td>' + 
                '</tr>';
                // adiciona a linha no corpo da tabela
                $('#corpoTabelaAnimes').append(lin);
            }
        }
    }

    // função que mostra um conteúdo e esconde os outros
    function mostrar_conteudo(identificador) {
        // esconde todos os conteúdos
        $("#tabelaAnimes").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        // torna o conteúdo escolhido visível
        $("#"+identificador).removeClass('invisible');      
    }

    // código para mapear o click do link Listar
    $(document).on("click", "#linkListarAnimes", function() {
        exibir_animes();
    });
    
    // código para mapear click do link Inicio
    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    // código para mapear click do botão incluir profissao
    $(document).on("click", "#btIncluirAnime", function() {
        //pegar dados da tela
        nome = $("#campoNome").val();
        genero = $("#campoGenero").val();
        numero_de_ep = $("#campoNumero_de_ep").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ nome: nome, genero: genero, numero_de_ep: numero_de_ep});
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/incluir_anime',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: animeIncluida, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function animeIncluida (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Anime incluída com sucesso!");
                // limpar os campos
                $("#campoNome").val("");
                $("#campoGenero").val("");
                $("#campoNumero_de_ep").val("");
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });

    // código a ser executado quando a janela de inclusão de pessoas for fechada
    $('#modalIncluirAnime').on('hide.bs.modal', function (e) {
        // se a página de listagem não estiver invisível
        if (! $("#tabelaAnimes").hasClass('invisible')) {
            // atualizar a página de listagem
            exibir_animes();
        }
    });

    // a função abaixo é executada quando a página abre
    mostrar_conteudo("conteudoInicial");
});