class RotinaDeTreino {
    // ordem fixa do processo - isso aqui é o template method
    iniciar() {
        this.aquecer();
        this.executarFaseEspecifica();
        this.tocarMusicaMotivacional();
        this.alongar();
        console.log("Treino finalizado!\n");
    }

    aquecer() {
        console.log("Aquecendo por 5 minutos (caminhada leve)...");
    }

    alongar() {
        console.log("Alongando por 5 minutos...");
    }

    // sem implementação aqui de propósito - quem decide é a subclasse
    executarFaseEspecifica() {
        throw new Error("executarFaseEspecifica() precisa ser implementado pela subclasse.");
    }

    // hook: já vem "desligado", só liga quem quiser
    tocarMusicaMotivacional() {}
}

class TreinoCardio extends RotinaDeTreino {
    executarFaseEspecifica() {
        console.log("Iniciando corrida intervalada: 20 minutos");
        console.log("Frequência cardíaca alvo: 140-160 bpm");
    }

    tocarMusicaMotivacional() {
        console.log("Tocando playlist 'Correr Não Mata' no último km...");
    }
}

class TreinoForca extends RotinaDeTreino {
    executarFaseEspecifica() {
        console.log("Iniciando série de musculação: 4x12 supino, 4x12 agachamento");
        console.log("Descanso de 90 segundos entre séries");
    }
    // não mexeu no hook -> usa o padrão (não toca nada)
}

console.log("--- COM TEMPLATE METHOD ---");

const cardio = new TreinoCardio();
cardio.iniciar();

const forca = new TreinoForca();
forca.iniciar();

/*
Agora aquecer() e alongar() moram só em RotinaDeTreino.
TreinoCardio e TreinoForca nem sabem quando esses passos rodam,
só sabem o que fazer no pedaço que é deles (executarFaseEspecifica).
Trocar o tempo de aquecimento agora é uma linha só, lá na base,
e o efeito já vale pra qualquer treino que existir.
*/
