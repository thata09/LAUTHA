import { PersonalityId } from './types';
import { BASE_SYSTEM_PROMPT, PERSONALITY_PROMPTS, GENERATOR_SYSTEM_PROMPT } from './prompts';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Analisador semântico de intenções para responder diretamente ao que o usuário perguntou ou falou
function getSmartContextualResponse(rawMsg: string, personalityId: PersonalityId): string {
  const msg = rawMsg.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const isQuestion = rawMsg.includes('?');

  // 1. AMOR / SENTIMENTOS / SAUDADE
  if (
    msg.includes('ama') ||
    msg.includes('amor') ||
    msg.includes('gosta de mim') ||
    msg.includes('saudade') ||
    msg.includes('falta') ||
    msg.includes('pensa em mim') ||
    msg.includes('ainda sente') ||
    msg.includes('te amo')
  ) {
    const responses: Record<PersonalityId, string[]> = {
      debochado: [
        `Se eu ainda te amo? Amor, eu mal lembro do seu aniversário, quem dirá de te amar. Guarda essa carência pra quem tem paciência! 💅`,
        `Perguntar se eu sinto sua falta é muita coragem da sua parte. Eu sinto falta é do dinheiro que gastei com você! 💅`,
        `Amor é uma palavra muito forte. O que eu sinto por você hoje é um alívio inexplicável de ter me livrado. 💅`
      ],
      ciumento: [
        `Quer saber se eu te amo? Engraçado você perguntar isso logo agora que vi você de papinho nos comentários alheios. Fala a verdade: quem você tava amando ontem? 👀`,
        `Tanto faz o que eu sinto. Mas me diz: você tá me perguntando se eu sinto falta porque tá morrendo de saudade de mim, né? Confessa! 👀`,
        `Se eu te amo nada! Você só vem me procurar quando as suas outras opções do Instagram te deixam no vácuo. 👀`
      ],
      sofrido: [
        `Se eu ainda te amo? Eu choro todo dia ouvindo nossa playlist no banho... mas finjo que superei pra manter o resto de dignidade que você me deixou. 🥺💔`,
        `Ler você me perguntando de sentimento corta minha alma em dois. Você partiu meu coração e ainda vem com essa conversa... 🥺`,
        `Sinto sua falta a cada segundo do dia. Mas para você foi tão fácil me esquecer, né? 🥀`
      ],
      frio: [
        `Não. Mais alguma pergunta ou já posso voltar para a minha vida? 🧊`,
        `Sentimento zero. Superado com sucesso. 🧊`,
        `Não te amo e não sinto falta. Passar bem.`
      ],
      ressentido: [
        `Amar quem destruiu minha paz e me fez gastar rios de dinheiro em terapia? Tenho amor é à minha liberdade agora! 🔥`,
        `Você tem a audácia de perguntar se eu te amo depois de tudo que fez? Tenha vergonha nessa cara. 🔥`,
        `O único sentimento que você me desperta é a certeza de que demorei muito pra terminar. 🔥`
      ],
      arrependido: [
        `Para com isso... você sabe muito bem que eu ainda te amo. Eu penso em você todo santo dia, mas você fez questão de ir embora... 💔`,
        `Se eu sinto saudade? Eu daria tudo pra voltar no tempo e fazer tudo diferente. Você ainda pensa em nós? 🥺💔`,
        `Toda vez que escuto seu nome meu coração dispara. Não queria ter te perdido. 💔`
      ],
      narcisista: [
        `Obviamente você quer saber se eu te amo, porque superar um monumento desses é humanamente impossível. Mas meu amor agora é todo meu, meu bem. 😎💅`,
        `Sentir saudades minhas é um evento biológico comum, não se culpe. Eu sou inesquecível mesmo. 😎`,
        `Eu te amo tanto quanto amo meus outros fãs. Mas você perdeu o passe VIP de estar do meu lado. Fica na plateia admirando! ✨`
      ]
    };
    const list = responses[personalityId] || responses.debochado;
    return list[Math.floor(Math.random() * list.length)];
  }

  // 2. VOLTAR / RECONCILIAÇÃO / SEGUNDA CHANCE
  if (
    msg.includes('voltar') ||
    msg.includes('chance') ||
    msg.includes('tentar de novo') ||
    msg.includes('recomecar') ||
    msg.includes('volta pra mim') ||
    msg.includes('erramos') ||
    msg.includes('volta comigo') ||
    msg.includes('da mais uma')
  ) {
    const responses: Record<PersonalityId, string[]> = {
      debochado: [
        `Voltar? Nem se o apocalipse zumbi começar e você for a última pessoa na Terra. Figurinha repetida não completa meu álbum! 💅`,
        `Segunda chance? Amor, eu não sou o plantão do SUS pra ficar fazendo ressuscitação de caso perdido. Segue sua vida! 💅`,
        `Acho lindo esse seu otimismo de achar que eu aceitaria passar por aquele circo de novo. Nota zero pra piada. 💅`
      ],
      ciumento: [
        `Voltar pra você me fazer surtar de novo com aquelas pessoas que você segue? Primeiro você teria que apagar todas as suas redes sociais. 👀`,
        `Voltar com você? Nem pensar. Aposto que você tentou com outra pessoa, tomou um toco e agora tá batendo na minha porta. 👀`,
        `Quer voltar né? Engraçado que semana passada você tava curtindo foto de fulano às 3h da manhã. Sei bem seu jogo. 👀`
      ],
      sofrido: [
        `Meu coração queria gritar 'SIM' agora mesmo, mas meu terapeuta me proibiu de ter recaída com quem me quebrou em pedaços. 🥺`,
        `Você quer voltar depois de me deixar definhando de tristeza? Dói demais saber que eu ainda aceitaria... mas tenho que me proteger. 💔`,
        `Por que você tá fazendo isso comigo? Você sabe que minha fraqueza sempre foi você... 🥺🥀`
      ],
      frio: [
        `Sem a menor chance. Assunto encerrado. 🧊`,
        `Não volto atrás nas minhas decisões. Boa sorte na sua caminhada. 🧊`,
        `Página virada e livro queimado. Passar bem.`
      ],
      ressentido: [
        `Voltar? Eu prefiro andar descalço no asfalto quente ao meio-dia. Da última vez demorei meses pra recuperar minha sanidade! 🔥`,
        `Você não cansa de passar vergonha não? Voltar pra quê? Pra você aprontar as mesmas palhaçadas de sempre? Não! 🔥`,
        `Minha paz não tem preço e sua proposta de volta foi recusada com louvor. 🔥`
      ],
      arrependido: [
        `Meu Deus... você tá falando sério? Se você me prometer que a gente vai fazer dar certo, eu largo tudo e vou te ver agora... 💔`,
        `Eu sonho com isso toda noite... você realmente me daria essa chance? Eu prometo que mudei! 🥺💔`,
        `Por favor, me diz que não é brincadeira. Eu quero consertar tudo que estraguei entre a gente. 💔`
      ],
      narcisista: [
        `Entendo perfeitamente o seu desespero em querer voltar com a melhor coisa que já te aconteceu. Mas meu padrão agora é outro, querido(a). Fica na fila! 😎`,
        `Voltar comigo? O cachê pra estar na minha presença aumentou bastante desde que terminamos. Não tá no seu orçamento. 😎✨`,
        `Todo mundo quer voltar comigo. É um fardo ser incrível assim. Mas você já teve a sua chance dourada e desperdiçou. 😎`
      ]
    };
    const list = responses[personalityId] || responses.debochado;
    return list[Math.floor(Math.random() * list.length)];
  }

  // 3. ONDE VOCÊ TÁ / O QUE TÁ FAZENDO / COM QUEM
  if (
    msg.includes('onde voce ta') ||
    msg.includes('onde vc ta') ||
    msg.includes('fazendo o que') ||
    msg.includes('ta fazendo') ||
    msg.includes('com quem') ||
    msg.includes('ta ocupado') ||
    msg.includes('dormiu') ||
    msg.includes('acordado')
  ) {
    const responses: Record<PersonalityId, string[]> = {
      debochado: [
        `Tô no melhor lugar do mundo: bem longe de você e aproveitando a minha paz. Bem curioso(a) você, né? 💅`,
        `Tô ocupado(a) vivendo uma vida incrível sem ter que aturar seus dramas. Quer que eu mande foto pra passar vontade? 💅`,
        `Perguntando onde eu tô? O GPS do término não te mandou a localização do 'não é mais da sua conta'? 💅`
      ],
      ciumento: [
        `Tô em casa. Mas e você, tá com quem pra ter tempo de vir fiscalizar a minha vida a essa hora? 👀`,
        `Não te interessa com quem eu tô. Mas já que perguntou, tô com gente muito mais interessante do que você. 👀`,
        `Curioso você perguntar o que tô fazendo. Tá querendo saber se a minha fila já andou né? Pode ficar na dúvida! 👀`
      ],
      sofrido: [
        `Tô aqui no meu quarto... encarando o teto e lembrando de quando a gente passava a noite inteira conversando sobre o futuro... 🥺`,
        `Tô ouvindo sertanejo e sofrendo sozinho, se é que você se importa em saber. 🥺💔`,
        `Tô tentando sobreviver à sua ausência. Mas você com certeza tá se divertindo por aí... 🥀`
      ],
      frio: [
        `Ocupado. E não é da sua conta. 🧊`,
        `Vivendo minha vida. Nada que te diga respeito. 🧊`,
        `Não te interessa. 🧊`
      ],
      ressentido: [
        `Tô fazendo coisas que você nunca me deixou fazer em paz. Não me amola! 🔥`,
        `Engraçado que quando a gente namorava você nem ligava pra onde eu tava. Agora virou detetive? 🔥`,
        `Não devo satisfação pra quem não tem relevância nenhuma no meu presente. 🔥`
      ],
      arrependido: [
        `Tô aqui sozinho(a) em casa... e confesso que a cada notificação eu torço pra ser você querendo me ver... 💔`,
        `Tô sem rumo desde que você foi embora. Queria tanto que você tivesse aqui comigo agora... 🥺💔`,
        `Pensando em como a gente era feliz e eu não percebi. Onde foi que a gente se perdeu? 💔`
      ],
      narcisista: [
        `Tô brilhando, sendo disputado(a) e vivendo no ápice do meu charme. Dá licença que estrelas têm agenda cheia. 😎✨`,
        `Tô no espelho admirando a obra de arte que você perdeu a proeza de ter por perto. 😎`,
        `Tô em alta no mercado. Se quiser um autógrafo me avisa com antecedência! 😎💅`
      ]
    };
    const list = responses[personalityId] || responses.debochado;
    return list[Math.floor(Math.random() * list.length)];
  }

  // 4. COISAS / ROUPAS / MOLETOM / DINHEIRO / DEVOLVER
  if (
    msg.includes('coisas') ||
    msg.includes('moletom') ||
    msg.includes('camiseta') ||
    msg.includes('roupa') ||
    msg.includes('devolver') ||
    msg.includes('buscar') ||
    msg.includes('pegar') ||
    msg.includes('dinheiro') ||
    msg.includes('pix') ||
    msg.includes('paga')
  ) {
    const responses: Record<PersonalityId, string[]> = {
      debochado: [
        `Aquele seu pano de chão que você chama de roupa? Já virou flanela pra limpar meu espelho. E sobre dinheiro, nem com juros você paga o estrago que me causou! 💅`,
        `Usar 'minhas coisas' como desculpa pra falar comigo é tão 2018... arruma um pretexto mais criativo, por favor! 💅`,
        `Deixei num saco preto na calçada. Se o caminhão do lixo não levou, tá lá te esperando. 💅`
      ],
      ciumento: [
        `Ah, quer vir 'buscar suas coisas' né? Sei bem qual é sua intenção de tentar me ver pra sondar com quem eu tô. Mando por motoboy! 👀`,
        `Pode deixar que eu já vasculhei todos os bolsos pra ver se você não deixou vestígios de traição. Vou devolver sim. 👀`,
        `Não vem inventar história de vir na minha casa não. Conheço seu joguinho de longe! 👀`
      ],
      sofrido: [
        `Seu moletom ainda tem o seu cheiro... eu durmo abraçado nele toda noite chorando, mas se você quiser levar o último pedaço de você embora, pode vir... 🥺💔`,
        `Pode levar tudo... só não tem como devolver o tempo e os sonhos que você levou de mim. 🥺`,
        `Vem buscar... assim pelo menos eu te vejo uma última vez antes de morrer de saudades. 🥀`
      ],
      frio: [
        `Deixei na portaria. Pega com o porteiro e não me manda mais mensagem. 🧊`,
        `Já foi despachado. Assunto encerrado. 🧊`,
        `Vou deixar na recepção. Sem conversinhas.`
      ],
      ressentido: [
        `Você quer cobrar coisas materiais de mim depois do rombo psicológico e financeiro que você me deu? Tenha santa paciência! 🔥`,
        `Tô pouco me lixando pras suas coisas. Doei tudo pra quem realmente precisa de ajuda. 🔥`,
        `Quem tinha que receber uma indenização sou eu por ter aguentado você por tanto tempo! 🔥`
      ],
      arrependido: [
        `Vem buscar aqui sim... por favor! Quem sabe a gente senta pra tomar um café e conversar com calma sobre nós dois? 💔`,
        `Eu guardei com todo carinho do mundo. Se você quiser vir buscar hoje à noite, eu estarei em casa te esperando... 🥺💔`,
        `Eu não queria te devolver porque era a única coisa que me fazia sentir sua presença... mas se você faz questão, eu entrego. 💔`
      ],
      narcisista: [
        `Ficou dez vezes melhor em mim do que em você. Inclusive postei foto usando e bateu recorde de engajamento. Virou peça de museu autografada! 😎✨`,
        `Devolver? Você devia me pagar aluguel pelo privilégio das suas coisas estarem guardadas no meu closet real. 😎`,
        `Considera como doação de fã para o seu ídolo. Tá muito bem aproveitado. 😎💅`
      ]
    };
    const list = responses[personalityId] || responses.debochado;
    return list[Math.floor(Math.random() * list.length)];
  }

  // 5. OFENSAS / CRÍTICAS / BRIGAS
  if (
    msg.includes('ridiculo') ||
    msg.includes('ridicula') ||
    msg.includes('odeio') ||
    msg.includes('toxico') ||
    msg.includes('toxica') ||
    msg.includes('idiota') ||
    msg.includes('babaca') ||
    msg.includes('lixo') ||
    msg.includes('feio') ||
    msg.includes('falso') ||
    msg.includes('chato') ||
    msg.includes('nojento') ||
    msg.includes('nojenta') ||
    msg.includes('horrivel')
  ) {
    const responses: Record<PersonalityId, string[]> = {
      debochado: [
        `Pode me xingar à vontade, meu anjo! Se você me odiasse de verdade, não tava gastando seus preciosos dedos pra me mandar mensagem. Sou seu vício! 💅`,
        `Avisa quando terminar o surto que eu tenho mais o que fazer. Sua raiva só prova que eu ainda domino os seus pensamentos. 💅`,
        `Adoro ver você espumando de raiva. É a confirmação de que eu fiz certinho em te deixar no passado. 💅`
      ],
      ciumento: [
        `Fala isso mas vive stalkeando os meus stories com conta fake pra ver o que eu tô fazendo. Hipocrisia pura! 👀`,
        `Eu sou tóxico(a)? Olha quem fala! Quem aprontava todas e colocava a culpa nos outros era você! 👀`,
        `Pode xingar, mas no fundo você sabe que ninguém vai saber de você como eu sabia. 👀`
      ],
      sofrido: [
        `Pode me destruir... você já quebrou meu coração em mil pedaços mesmo, mais esse insulto é só mais um detalhe. 🥺💔`,
        `Eu sei que para você é fácil me atacar... eu já me acostumei a ser o saco de pancadas da sua vida. 🥺`,
        `Dói tanto ler você me tratando assim depois de tudo que eu fiz por você... 🥀`
      ],
      frio: [
        `Anotado. Sua opinião foi devidamente registrada e ignorada com sucesso. 🧊`,
        `Sem tempo para surtos. Bloqueado(a) moralmente. 🧊`,
        `Legal. Passar bem.`
      ],
      ressentido: [
        `Olha no espelho antes de vir abrir essa boca suja pra falar de mim! O erro de ter te conhecido foi a pior tragédia da minha vida! 🔥`,
        `Você não tem vergonha nessa cara de pau não? Quem fez estrago aqui foi você! Some daqui! 🔥`,
        `Guarda seu veneno pra quem ainda tem que te aturar, porque eu tô vacinado(a) contra o seu tipo! 🔥`
      ],
      arrependido: [
        `Eu sei que fui horrível... você tem todo direito de me odiar. Só queria que você soubesse o quanto me arrependo de tudo. 💔`,
        `Pode me xingar, eu mereço. Eu fui imaturo(a) e perdi a pessoa mais especial da minha vida. Me perdoa... 🥺💔`,
        `Mesmo você me tratando assim, eu não consigo sentir raiva de você. Eu só sinto culpa. 💔`
      ],
      narcisista: [
        `Odiar uma perfeição dessas é o sintoma clássico de quem não aguenta ver o brilho alheio. É inveja do meu sucesso, amor! 😎✨`,
        `Críticas de quem não tem metade da minha beleza entram por um ouvido e saem pelo outro com filtro de estrelato. 😎`,
        `Pode latir mais alto que do topo do meu sucesso eu não consigo te ouvir! 😎💅`
      ]
    };
    const list = responses[personalityId] || responses.debochado;
    return list[Math.floor(Math.random() * list.length)];
  }

  // 6. FILA ANDANDO / NOVO CASAL / SE JÁ ME ESQUECEU
  if (
    msg.includes('namorando') ||
    msg.includes('com alguem') ||
    msg.includes('conheceu alguem') ||
    msg.includes('quem e essa') ||
    msg.includes('quem e esse') ||
    msg.includes('ja me superou') ||
    msg.includes('ja me trocou') ||
    msg.includes('ficando com')
  ) {
    const responses: Record<PersonalityId, string[]> = {
      debochado: [
        `A fila não só andou como já pegou rodovia interestadual! Mas relaxa, ninguém é tão complicado e difícil de aturar quanto você. 💅`,
        `Se eu já te superei? Amor, você é notícia velha, matéria de 2022. O jornal de hoje já tem outros destaques! 💅`,
        `Preocupado(a) se eu tô com alguém? Fica em paz, quem tá comigo agora sabe valorizar, coisa que você nem sabia o significado. 💅`
      ],
      ciumento: [
        `Quem tá com alguém é você! Não se faça de sonso(a) que eu vi muito bem as curtidas suspeitas no seu perfil! 👀`,
        `Se eu tô com alguém ou não, não te interessa. Mas você não tira meu nome da boca com seus amigos, né? 👀`,
        `Tô muito bem acompanhado(a), obrigado pela preocupação desnecessária com a minha vida amorosa! 👀`
      ],
      sofrido: [
        `Como eu vou estar com alguém se meu coração ainda tá preso nas suas lembranças? Mas eu sei que pra você foi fácil me substituir... 🥺💔`,
        `Eu não consigo nem olhar pra outra pessoa sem lembrar de nós dois... enquanto você já deve ter arrumado dez novos amores. 🥺`,
        `Você me superou em 3 dias e vem me perguntar se eu tô com alguém? Dói demais. 🥀`
      ],
      frio: [
        `Minha vida pessoal não diz respeito a você. 🧊`,
        `Assunto particular. Tchau. 🧊`,
        `Sim, superei. Boa sorte aí.`
      ],
      ressentido: [
        `Tô com quem me respeita e não me faz passar vergonha pública, coisa que você nunca foi capaz! 🔥`,
        `Não é da sua conta com quem eu ando. Vai cuidar dos seus rolos e me deixa em paz! 🔥`,
        `Superar você foi a coisa mais rápida e fácil que já fiz na vida depois que caí na real. 🔥`
      ],
      arrependido: [
        `Eu tentei sair com outras pessoas... mas em todas eu só conseguia procurar o seu olhar. Ninguém é você. 💔`,
        `Não consegui colocar ninguém no seu lugar. Meu coração continua esperando você voltar... 🥺💔`,
        `Ninguém me faz sentir o que você me fazia sentir. Eu sinto tanto a sua falta... 💔`
      ],
      narcisista: [
        `Tenho lista de espera com protocolo de atendimento. Mas ninguém chega aos meus pés, então tô curtindo meu próprio reflexo. 😎✨`,
        `Quem tá comigo tirou a sorte grande na loteria da vida. E quem perdeu (você) chora no banho! 😎`,
        `A concorrência pra estar do meu lado tá pesada. Você perdeu a vaga de honra, aceita! 😎💅`
      ]
    };
    const list = responses[personalityId] || responses.debochado;
    return list[Math.floor(Math.random() * list.length)];
  }

  // 7. PEDIDOS DE DESCULPA / ARREPENDIMENTO DO USUÁRIO
  if (
    msg.includes('desculpa') ||
    msg.includes('perdoa') ||
    msg.includes('errei') ||
    msg.includes('arrependi') ||
    msg.includes('sinto muito') ||
    msg.includes('perdao')
  ) {
    const responses: Record<PersonalityId, string[]> = {
      debochado: [
        `Desculpa aceita! Agora senta lá e chora o leite derramado, porque o trem já passou faz tempo, querido(a). 💅`,
        `Pedir desculpa agora que a água bateu na bunda é fácil né? Guarda o textão pro seu próximo relacionamento não falir igual o nosso. 💅`,
        `Agradeço o mea-culpa, mas o prazo de devolução de vacilo expirou faz meses. Boa sorte! 💅`
      ],
      ciumento: [
        `Desculpa nada! Agora que você viu que ninguém mais aguenta seus joguinhos veio pedir penico aqui? Me conta tudo que você aprontou primeiro! 👀`,
        `Se arrependeu né? Sabia! Agora me fala a verdade: quem te deu o fora pra você vir me procurar cheio de culpa? 👀`,
        `Desculpa não apaga o que você fez quando achou que eu não tava vendo! 👀`
      ],
      sofrido: [
        `Seu pedido de desculpas não apaga as noites em claro que passei chorando... mas saber que você tem consciência do que me causou me dá um alívio triste. 🥺💔`,
        `É tarde demais pra pedir desculpa quando o castelo já desmoronou... mas obrigado por admitir. 🥺`,
        `Eu te perdoo, porque não consigo guardar rancor de você... mesmo você tendo me quebrado por inteiro. 🥀`
      ],
      frio: [
        `Tarde demais. Passar bem. 🧊`,
        `Ok. Desculpas aceitas, mas não muda nada entre a gente. 🧊`,
        `Registrado. Adeus.`
      ],
      ressentido: [
        `Engraçado o arrependimento bater só agora né? Na hora de pisar na bola você não pensou duas vezes! Não tem perdão aqui não! 🔥`,
        `Pode enfiar suas desculpas no mesmo lugar onde você enfiou o meu respeito por você. Passar mal! 🔥`,
        `Não aceito desculpas de quem fez de propósito. Não me procura nunca mais! 🔥`
      ],
      arrependido: [
        `Eu também errei tanto com você... se a gente se perdoar de coração, você acha que a gente tem conserto? 💔`,
        `Ouvir isso de você me dá uma pontinha de esperança... será que ainda dá tempo da gente tentar de novo? 🥺💔`,
        `Eu te perdoo de olhos fechados. Só queria que a gente pudesse recomeçar do zero... 💔`
      ],
      narcisista: [
        `Reconhecer que você errou ao perder o maior troféu da sua existência é o primeiro passo para a sua evolução humana. Tá perdoado(a), mas de longe! 😎✨`,
        `Natural se desculpar diante de uma divindade dessas. Você foi imaturo(a), mas eu compreendo que lidar com a perfeição assusta os meros mortais. 😎`,
        `Desculpas aceitas! Poucas pessoas têm a dignidade de assumir que perderam o melhor que poderiam ter. Parabéns pela lucidez! 😎💅`
      ]
    };
    const list = responses[personalityId] || responses.debochado;
    return list[Math.floor(Math.random() * list.length)];
  }

  // 8. PERGUNTAS DE 'POR QUE' / COBRANÇAS / POR QUE NÃO RESPONDE
  if (
    msg.includes('por que') ||
    msg.includes('pq') ||
    msg.includes('como assim') ||
    msg.includes('nao me responde') ||
    msg.includes('me responde') ||
    msg.includes('bloqueou')
  ) {
    const responses: Record<PersonalityId, string[]> = {
      debochado: [
        `Porque eu tenho vida, amor! Ficar te dando atenção não tá na minha lista de prioridades nem se a internet cair. 💅`,
        `Por que? Porque eu escolhi a paz, e paz é um conceito que não combina em nada com você! 💅`,
        `Não respondo rápido porque gente ocupada e bem-sucedida tem mais o que fazer do que bater papo com fantasma do passado. 💅`
      ],
      ciumento: [
        `Porque eu não tenho que te dar satisfação! Você acha que manda em mim? Mas me diz: você tá ansioso(a) pela minha resposta por quê? 👀`,
        `Não respondi porque sei muito bem que você tá online em outra rede social fingindo demência! 👀`,
        `Bloqueei e demoro pra responder porque quem dita o ritmo aqui agora sou eu. 👀`
      ],
      sofrido: [
        `Porque falar com você abre feridas que eu demoro semanas pra estancar... dói demais receber mensagem sua. 🥺💔`,
        `Eu não respondi na hora porque fiquei paralisado(a) de tristeza vendo seu nome na tela. 🥺`,
        `Porque cada palavra sua me lembra de como eu era feliz e não sabia... 🥀`
      ],
      frio: [
        `Porque não quero. Simples assim. 🧊`,
        `Sem tempo e sem interesse. 🧊`,
        `Não tenho nada a declarar.`
      ],
      ressentido: [
        `Porque você não merece um segundo da minha atenção depois do papelão que fez comigo! 🔥`,
        `Porque a minha paciência com você esgotou faz mais de um ano. Não insiste! 🔥`,
        `Não te respondo porque tudo que vem de você é atraso de vida. 🔥`
      ],
      arrependido: [
        `Eu demorei porque fiquei com medo de falar besteira e você me bloquear pra sempre... eu me importo tanto com o que você pensa! 💔`,
        `Não me entenda mal... eu só fiquei nervoso(a) de ver você me procurando. Eu quero tanto falar com você! 🥺💔`,
        `Me desculpa se pareci distante... eu só não queria parecer desesperado(a) por você. 💔`
      ],
      narcisista: [
        `Porque estrelas de primeira grandeza não respondem a chamados imediatos. Aprenda a lidar com a fila de audiência! 😎✨`,
        `Eu respondo no meu tempo áureo, querido(a). Agradeça que eu visualizei, já é um privilégio. 😎`,
        `Minha atenção é caríssima. Você gastou seus créditos na nossa época e agora vive de migalhas do meu brilho. 😎💅`
      ]
    };
    const list = responses[personalityId] || responses.debochado;
    return list[Math.floor(Math.random() * list.length)];
  }

  // 9. RESPOSTA GERAL INTELIGENTE QUE REPETE E REBATE O ASSUNTO ESPECÍFICO DO USUÁRIO
  const cleanSnippet = rawMsg.trim().replace(/^["']|["']$/g, '');

  const dynamicGenerators: Record<PersonalityId, string[]> = {
    debochado: [
      `"${cleanSnippet}"... Nossa, quase me emocionei com tanta profundidade. Só faltou um pingo de noção e vergonha na cara, mas tirando isso, nota 2 pelo esforço! 💅`,
      `Interessante você me mandar isso. Engraçado que quando a gente namorava você não tinha tanta inspiração pra conversar. O tempo cura, mas o meu deboche só evolui! 💅`,
      `Avisem os jornais: a pessoa resolveu puxar assunto com "${cleanSnippet}"! Já gastou o repertório com todo mundo do direct ou eu sou o plano Z da madrugada? 💅`
    ],
    ciumento: [
      `Engraçado você mandar "${cleanSnippet}" bem hoje. Certeza que você mandou pra pessoa errada e agora tá disfarçando comigo, né? Te conheço muito bem! 👀`,
      `Você vem com essa história de "${cleanSnippet}" mas ainda não me explicou o que você tava fazendo no fim de semana. Não que eu me importe, óbvio! 👀`,
      `Pode falar a verdade: você me mandou isso porque viu meus stories com outra pessoa e bateu aquele desespero, né? Confessa! 👀`
    ],
    sofrido: [
      `Você me manda "${cleanSnippet}" enquanto eu tô aqui ouvindo nossa música favorita e encarando as paredes... Pra você é tão fácil fingir que a gente nunca existiu, né? 🥺💔`,
      `Ler isso de você corta meu peito ao meio. Lembra quando você me dizia que nunca ia me deixar no vácuo? Pois é, eu lembro de tudo. 🥺`,
      `Tudo bem, finja que essa mensagem é normal. Eu continuo aqui, guardando a dor do nosso término em silêncio. 🥀`
    ],
    frio: [
      `Li sua mensagem sobre "${cleanSnippet}". Mas não vi nenhum motivo relevante para render conversa. Passar bem. 🧊`,
      `Ok. Algo importante ou era só tédio mesmo? 🧊`,
      `Entendi. Boa sorte com isso aí. 🧊`
    ],
    ressentido: [
      `Sua audácia de vir falar de "${cleanSnippet}" comigo deveria ser estudada pela ciência. Depois de tudo que você fez, vem com essa conversinha mole? 🔥`,
      `Minha paz não tá à venda e eu não tô com paciência pra aguentar papinho sobre "${cleanSnippet}". Vai caçar o que fazer! 🔥`,
      `Você tem sorte que eu faço terapia, porque a vontade era de responder essa sua mensagem listando cada erro que você cometeu comigo! 🔥`
    ],
    arrependido: [
      `Nossa... ler você falando comigo me dá um nó no estômago. Eu sei que cometi erros graves, mas toda vez que você me procura meu coração acelera... 💔`,
      `Eu fico lendo e relendo o que você mandou... será que no fundo a gente ainda tem jeito ou eu sonhei sozinho(a)? 🥺💔`,
      `Toda vez que meu celular apita eu rezo pra ser uma mensagem sua. Não devia ter deixado você escapar... 💔`
    ],
    narcisista: [
      `Eu sabia! Mandar "${cleanSnippet}" é só mais uma desculpa transparente pra tentar puxar papo com a pessoa mais marcante da sua vida. Pode admitir que eu deixo! 😎✨`,
      `Sentiu saudades do melhor que você já teve na vida, né? Não te culpo. Ninguém compete com o meu padrão de qualidade. Fica à vontade para admirar! 😎`,
      `Parabéns pelo bom gosto de me procurar. Nem todo mundo tem o privilégio de receber resposta da pessoa mais cobiçada desse aplicativo. 😎💅`
    ]
  };

  const genericList = dynamicGenerators[personalityId] || dynamicGenerators.debochado;
  return genericList[Math.floor(Math.random() * genericList.length)];
}

export async function generateExResponse(
  message: string,
  personalityId: PersonalityId,
  history: ChatMessage[] = [],
  customApiKey?: string
): Promise<{ text: string; provider: string }> {
  const geminiKey = customApiKey || process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;

  const personalityPrompt = PERSONALITY_PROMPTS[personalityId] || PERSONALITY_PROMPTS.debochado;
  const fullSystemInstruction = `${BASE_SYSTEM_PROMPT}\n\n${personalityPrompt}`;

  // 1. Tentar Gemini se a chave estiver configurada
  if (geminiKey) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      
      const contents = [
        ...history.slice(-4).map((h) => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        })),
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ];

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: fullSystemInstruction }]
          },
          generationConfig: {
            temperature: 0.95,
            maxOutputTokens: 250,
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          return { text: candidate.trim(), provider: 'gemini' };
        }
      }
    } catch (err) {
      console.error('Erro ao chamar Gemini:', err);
    }
  }

  // 2. Tentar OpenAI se disponível
  if (openaiKey) {
    try {
      const messages = [
        { role: 'system', content: fullSystemInstruction },
        ...history.slice(-4).map((h) => ({ role: h.role, content: h.content })),
        { role: 'user', content: message }
      ];

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          temperature: 0.95,
          max_tokens: 250
        })
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content;
        if (reply) {
          return { text: reply.trim(), provider: 'openai' };
        }
      }
    } catch (err) {
      console.error('Erro ao chamar OpenAI:', err);
    }
  }

  // 3. Tentar Groq se disponível
  if (groqKey) {
    try {
      const messages = [
        { role: 'system', content: fullSystemInstruction },
        ...history.slice(-4).map((h) => ({ role: h.role, content: h.content })),
        { role: 'user', content: message }
      ];

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages,
          temperature: 0.95,
          max_tokens: 250
        })
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content;
        if (reply) {
          return { text: reply.trim(), provider: 'groq' };
        }
      }
    } catch (err) {
      console.error('Erro ao chamar Groq:', err);
    }
  }

  // 4. MOTOR CONTEXTUAL INTELIGENTE: Responde com precisão cirúrgica ao que o usuário perguntou ou falou!
  const contextualReply = getSmartContextualResponse(message, personalityId);
  return {
    text: contextualReply,
    provider: 'smart-nlu-engine'
  };
}

export async function generateThreeResponses(
  incomingMessage: string,
  customApiKey?: string
): Promise<{ debochada: string; venenosa: string; elegante: string; provider: string }> {
  const geminiKey = customApiKey || process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (geminiKey) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `Mensagem recebida: "${incomingMessage}"\nGere as 3 respostas em JSON válido:` }]
            }
          ],
          systemInstruction: {
            parts: [{ text: GENERATOR_SYSTEM_PROMPT }]
          },
          generationConfig: {
            temperature: 0.85,
            responseMimeType: 'application/json'
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawJson) {
          const parsed = JSON.parse(rawJson);
          return {
            debochada: parsed.debochada || '',
            venenosa: parsed.venenosa || '',
            elegante: parsed.elegante || '',
            provider: 'gemini'
          };
        }
      }
    } catch (err) {
      console.error('Erro no gerador Gemini:', err);
    }
  }

  if (openaiKey) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: GENERATOR_SYSTEM_PROMPT },
            { role: 'user', content: `Mensagem recebida: "${incomingMessage}"` }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.85
        })
      });

      if (res.ok) {
        const data = await res.json();
        const rawJson = data.choices?.[0]?.message?.content;
        if (rawJson) {
          const parsed = JSON.parse(rawJson);
          return {
            debochada: parsed.debochada || '',
            venenosa: parsed.venenosa || '',
            elegante: parsed.elegante || '',
            provider: 'openai'
          };
        }
      }
    } catch (err) {
      console.error('Erro no gerador OpenAI:', err);
    }
  }

  // Gerador semântico de 3 respostas contextuais baseado no conteúdo enviado
  const clean = incomingMessage.trim();
  const lower = clean.toLowerCase();

  let debochada = `Que bom saber que você ainda gasta fosfato com "${clean.slice(0, 30)}...". Eu estava aqui ocupado(a) agradecendo aos céus pelo término! 💅`;
  let venenosa = `Engraçado como algumas pessoas só lembram de mandar "${clean.slice(0, 25)}..." quando a solidão bate na porta e o direct tá deserto. 🐍`;
  let elegante = `Agradeço pela sua mensagem sobre "${clean.slice(0, 25)}...". Desejo genuinamente que sua vida encontre a maturidade que sempre faltou na nossa época.`;

  if (lower.includes('ama') || lower.includes('saudade') || lower.includes('falta')) {
    debochada = `Amar você? Amor, eu mal lembro do seu aniversário, quem dirá de te amar! Vai se tratar. 💅`;
    venenosa = `Você não sente saudade de mim, você sente saudade de ter alguém com paciência infinita pra aguentar seus vacilos. 🐍`;
    elegante = `A saudade é um sentimento comum quando se perde algo valioso. Espero que o tempo cure sua carência.`;
  } else if (lower.includes('voltar') || lower.includes('chance')) {
    debochada = `Voltar? Nem se me pagassem em barras de ouro. Figurinha repetida não completa meu álbum! 💅`;
    venenosa = `Você quer voltar não porque me ama, mas porque percebeu que ninguém no mercado tem o mesmo padrão que eu. Tarde demais. 🐍`;
    elegante = `Ciclos que se fecham não devem ser reabertos. Mantenho meu respeito pelo passado, mas meu presente é muito melhor sem você.`;
  } else if (lower.includes('onde') || lower.includes('fazendo') || lower.includes('com quem')) {
    debochada = `Tô no melhor lugar do mundo: a quilômetros de distância de você e dos seus dramas! 💅`;
    venenosa = `Curioso(a) você vir perguntar da minha vida. Tá querendo saber se a fila já andou pra chorar no banho? 🐍`;
    elegante = `Minha rotina e minha localização deixaram de ser assunto seu no exato momento do término. Passar bem.`;
  }

  return {
    debochada,
    venenosa,
    elegante,
    provider: 'smart-nlu-engine'
  };
}
