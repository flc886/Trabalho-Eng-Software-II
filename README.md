# Template Method — Padrão de Projeto Comportamental

> Trabalho de Engenharia de Software II — Padrões Comportamentais
> Parte referente ao padrão **Template Method**

---

## 1. Funcionamento e Aplicação

O Template Method resolve um problema bem comum: várias classes precisam executar um processo que segue **sempre a mesma sequência de passos**, mas cada uma delas realiza esses passos de um jeito ligeiramente diferente.

A ideia do padrão é colocar o "roteiro" do processo (a ordem fixa dos passos) em um único método na classe base — esse é o *template method* propriamente dito. Esse método chama uma série de outros métodos internos, alguns dos quais são deixados em aberto (abstratos) para que cada subclasse decida como implementar. A classe base controla **quando** cada passo acontece; a subclasse decide **como** aquele passo específico é feito.

Isso é diferente de simplesmente copiar e colar a estrutura em cada classe filha: aqui a ordem dos passos só existe em um lugar, então não tem como uma subclasse "esquecer" um passo ou executá-lo fora de ordem.

Costuma aparecer em situações como:
- Pipelines de processamento de dados (coletar → transformar → exportar).
- Fluxos de inicialização de jogos ou aplicações (carregar configs → carregar assets → iniciar loop).
- Qualquer fluxo que tenha etapas fixas + etapas "plugáveis" por tipo.

### Componentes do padrão
- **Classe Abstrata (AbstractClass):** define o template method e os métodos que as subclasses precisam ou podem sobrescrever.
- **Passos obrigatórios (primitive operations):** métodos sem implementação útil na classe base — forçam a subclasse a implementar.
- **Passos comuns:** métodos já implementados na base e compartilhados por todas as subclasses.
- **Hooks (opcional):** métodos com implementação padrão "vazia" que a subclasse *pode* sobrescrever, mas não é obrigada a.

---

## 2. Exemplo prático: Rotina de Treino

Para deixar o funcionamento claro, montamos um exemplo de um sistema que organiza rotinas de treino (cardio e força). Toda rotina segue a mesma estrutura — aquecer, treinar, (opcionalmente, música motivacional) e alongar — mas o que acontece na fase de treino muda de acordo com o tipo.

### Sem o padrão — [`sem_template_method.js`](./sem_template_method.js)
Cada tipo de treino implementa o fluxo inteiro do zero. O resultado é código duplicado: o aquecimento e o alongamento aparecem repetidos em cada classe, e qualquer ajuste nesses trechos precisa ser replicado manualmente em todos os lugares.

### Com o padrão — [`com_template_method.js`](./com_template_method.js)
A classe `RotinaDeTreino` centraliza a ordem dos passos no método `iniciar()` (o template method). As subclasses `TreinoCardio` e `TreinoForca` só implementam a parte específica (`executarFaseEspecifica`). Incluímos também um **hook** (`tocarMusicaMotivacional`), que mostra como o padrão permite passos opcionais — só quem quiser sobrescreve.

---

## 3. Análise do Padrão

### Pontos Fortes
- Elimina duplicação de código ao concentrar o fluxo comum em um só lugar.
- Centraliza a lógica do processo, facilitando manutenção: um ajuste no fluxo geral é feito em um único método.
- Os *hooks* dão flexibilidade extra sem obrigar todas as subclasses a implementar passos que nem sempre fazem sentido para elas.
- Reforça a leitura do código: o template method funciona quase como um "sumário" do algoritmo, deixando claro o que acontece e em que ordem.

### Pontos Fracos
- Por ser baseado em herança, herda também as limitações da herança: pouca flexibilidade em runtime e acoplamento entre classe base e subclasses.
- Se a ordem dos passos do algoritmo principal precisar mudar com frequência, o padrão se torna um empecilho — toda mudança estrutural afeta a classe base e potencialmente todas as subclasses.
- Existe risco de violar o Princípio de Substituição de Liskov se uma subclasse implementar um passo abstrato de um jeito que contradiga a expectativa do fluxo definido na base.
- Fica menos óbvio "de fora" entender o comportamento completo de uma subclasse sem olhar também a classe base — exige ler duas classes para entender um fluxo.

---

## 4. Conclusão do Grupo

O Template Method é um padrão simples de implementar, mas poderoso quando o problema real é "processos parecidos, com pequenas variações". Ele não tenta resolver desacoplamento entre objetos (como o Command faz) — ele resolve consistência e reaproveitamento de fluxo. A contrapartida é o acoplamento típico de herança: quem usa o padrão está apostando que a estrutura geral do algoritmo é estável, porque mudanças nela se propagam para todas as subclasses.

Na prática, percebemos que o ganho mais evidente foi de manutenibilidade: bastou alterar `aquecer()` em um único lugar para que toda subclasse passasse a refletir a mudança, sem precisar tocar em `TreinoCardio` ou `TreinoForca`.
