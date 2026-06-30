# Template Method — Padrão Comportamental

Trabalho de Engenharia de Software II — Padrões Comportamentais
(parte do Template Method)

---

## O que é e pra que serve

O Template Method é um padrão que serve pra quando existem vários processos que seguem basicamente a mesma sequência de passos, mas cada um faz essas etapas de um jeito um pouco diferente.

A sacada do padrão é colocar a ordem desses passos dentro de um único método, diretamente na classe base (esse método é o "template method" em si). Esse método vai chamando outros métodos por dentro, só que alguns desses métodos não tem implementação na classe base — eles ficam "em aberto" pra cada subclasse decidir como vai fazer aquele passo específico. Ou seja: a classe mãe decide a ordem, a classe filha decide o conteúdo.

Tem também os chamados *hooks*, que são passos opcionais. A classe base já deixa uma implementação padrão (geralmente vazia, sem fazer nada), e a subclasse só sobrescreve se quiser/precisar. Isso dá uma flexibilidade a mais sem obrigar todo mundo a implementar algo que talvez nem faça sentido pra ela.

Algunns exemplos de onde isso aparece na prática:
- pipeline de processamento de dado (tipo coletar -> tratar -> exportar)
- inicialização de um jogo (carregar config -> carregar assets -> rodar)
- qualquer fluxo que tenha um "esqueleto" fixo e partes que mudam dependendo do tipo

---

## Exemplo: rotina de treino

Pra ilustrar foi usado um exemplo de academia: uma rotina de treino de cardio e uma de força. As duas seguem a mesma estrutura — aquece, faz o treino específico, alonga — só que a parte do meio (o treino em si) muda totalmente.

### Sem o padrão (`sem_template_method.js`)
Aqui cada treino implementa o fluxo inteiro na mão. Dá pra ver que o aquecimento e o alongamento ficam repetidos nas duas classes. Se um dia precisar mudar o tempo de aquecimento, por exemplo, tem que lembrar de mudar em todo lugar que ele aparece — e é bem fácil esquecer algum.

### Com o padrão (`com_template_method.js`)
A classe `RotinaDeTreino` centraliza a ordem dos passos dentro do método `iniciar()`. As subclasses `TreinoCardio` e `TreinoForca` só cuidam da parte que é delas mesmo, o `executarFaseEspecifica()`. Também foi utilizado um hook (`tocarMusicaMotivacional`) só pra mostrar essa parte do padrão também — o `TreinoCardio` sobrescreve ele, o `TreinoForca` nem mexe e mesmo assim continua funcionando normal.

---

## Pontos fortes
- Acaba (ou pelo menos diminui bastante) a duplicação de código.
- O fluxo principal fica concentrado num lugar só, então é mais fácil de manter.
- Os hooks dão uma flexibilidade extra sem forçar toda subclasse a implementar passo que ela não precisa.
- O código fica "auto-documentado" — só de olhar o template method já dá pra entender a ordem do processo todo.

## Pontos fracos
- Como usa herança, carrega os problemas de herança junto: acopla bastante a subclasse com a classe base.
- Se o fluxo principal mudar com frequência, o padrão atrapalha mais do que ajuda (toda mudança estrutural mexe na base e pode afetar todo mundo que herda dela).
- Pra entender o comportamento completo de uma subclasse, às vezes precisa ficar pulando entre ela e a classe base, o que deixa a leitura um pouco mais chata.

---

## Conclusão

Entendo que o Template Method é bem direto de implementar e resolve bem um problema específico: processos parecidos com pequenas diferenças entre si. Ele não se preocupa em desacoplar objeto de objeto (isso é mais função do Command) — o foco dele é garantir que o fluxo seja sempre consistente, usando herança pra isso.

A desvantagem é justamente essa dependência de herança: o padrão parte do princípio de que a estrutura geral do algoritmo não vai mudar muito, porque se mudar, a mudança se espalha pra todas as subclasses. No nosso exemplo isso ficou bem claro: bastou mudar o `aquecer()` lá na classe base que o ajuste já valeu pras duas subclasses automaticamente, sem precisar tocar em nenhuma delas.
