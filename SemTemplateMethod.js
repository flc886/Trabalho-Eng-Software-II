class TreinoCardio {
    iniciar() {
        console.log("Aquecendo por 5 minutos (caminhada leve)...");
        console.log("Iniciando corrida intervalada: 20 minutos");
        console.log("Frequência cardíaca alvo: 140-160 bpm");
        console.log("Alongando por 5 minutos...");
        console.log("Treino finalizado!\n");
    }
}

class TreinoForca {
    iniciar() {
        console.log("Aquecendo por 5 minutos (caminhada leve)...");
        console.log("Iniciando série de musculação: 4x12 supino, 4x12 agachamento");
        console.log("Descanso de 90 segundos entre séries");
        console.log("Alongando por 5 minutos...");
        console.log("Treino finalizado!\n");
    }
}

console.log("--- SEM TEMPLATE METHOD ---");

const cardio = new TreinoCardio();
cardio.iniciar();

const forca = new TreinoForca();
forca.iniciar();

/*
Reparem que aquecer() e alongar() aparecem igual nas duas classes.
Imagina isso multiplicado por 5, 10 tipos de treino diferentes (HIIT, mobilidade, etc).
Cada novo tipo = copiar e colar o aquecimento e o alongamento de novo.
E se alguém decidir trocar o tempo de aquecimento pra 10 minutos,
precisa caçar todas as classes que repetem essa linha e mudar uma por uma.
*/
