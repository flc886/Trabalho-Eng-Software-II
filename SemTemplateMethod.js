// PROBLEMA: cada tipo de treino repete a mesma estrutura
// (aquecer -> fase específica -> alongar) do zero.
// Só muda o miolo, mas o resto do fluxo é todo duplicado.

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

// Testando
console.log("--- SEM TEMPLATE METHOD ---");

const cardio = new TreinoCardio();
cardio.iniciar();

const forca = new TreinoForca();
forca.iniciar();

// Se um dia decidirmos mudar o tempo de aquecimento de 5 para 10 minutos,
// temos que lembrar de alterar em TODAS as classes manualmente.
// Quanto mais tipos de treino existirem, maior o risco de inconsistência.