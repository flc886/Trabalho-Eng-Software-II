// SOLUÇÃO: a classe mãe define a ORDEM fixa dos passos (o "esqueleto").
// As subclasses só preenchem o que é específico de cada treino.

class RotinaDeTreino {
    // TEMPLATE METHOD: a ordem aqui é fixa, ninguém pode alterá-la de fora
    iniciar() {
        this.aquecer();
        this.executarFaseEspecifica();
        this.tocarMusicaMotivacional(); // hook opcional
        this.alongar();
        console.log("Treino finalizado!\n");
    }

    // Passo comum, igual pra todo mundo
    aquecer() {
        console.log("Aquecendo por 5 minutos (caminhada leve)...");
    }

    // Passo comum, igual pra todo mundo
    alongar() {
        console.log("Alongando por 5 minutos...");
    }

    // Passo obrigatório - cada subclasse TEM que implementar
    executarFaseEspecifica() {
        throw new Error("O método executarFaseEspecifica() deve ser implementado pela subclasse.");
    }

    // HOOK: passo opcional, com implementação padrão "vazia".
    // A subclasse só sobrescreve se fizer sentido pra ela.
    tocarMusicaMotivacional() {
        // por padrão, não faz nada
    }
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
    // Não sobrescreve tocarMusicaMotivacional() -> usa o hook padrão (não faz nada)
}

// Testando
console.log("--- COM TEMPLATE METHOD ---");

const cardio = new TreinoCardio();
cardio.iniciar();

const forca = new TreinoForca();
forca.iniciar();

// Agora, se quisermos mudar o tempo de aquecimento, mudamos em UM lugar só
// (dentro de RotinaDeTreino), e o ajuste vale automaticamente pra todas as subclasses.