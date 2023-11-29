export const switchTextToBoolean = (value) => {
	if (String(value) === '1') {
		return true;
	} else if (String(value) === '0') {
		return false;
	}

	return value;
};

export const switchInputTextBoolean = (value) => {
	if (String(value).toUpperCase() === 'ON') {
		return '1';
	}

	return '0';
};

// check only text
export const hasOnlyText = /^[A-Za-z]+( [A-Za-z]+)*$/;

// First Letter Upercase in String
export function toLetterFisrtUperCase(str) {
	return str
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

// [0]: text, [1]: link, [2]: color, [3]: archive, [4]: icon, [5]: datatime, [6]: boolean
const { typesMedia } = useRuntimeConfig();

export const listSchemaDataMedia = [
	// Config
	{
		name: 'config_will_have_hotsite',
		description:
			'Utilizado para exibir a primeira página da aplicação, que será a landing page ou o hub autenticado.',
		value: 'null',
		tag: 'config',
		type: typesMedia[6],
	},

	// Layout
	{
		name: 'layout_background_app',
		description: 'Imagem de fundo da aplicação.',
		tag: 'layout',
		type: typesMedia[3],
	},
	{
		name: 'layout_background_app_two',
		description: 'Imagem de fundo da aplicação.',
		tag: 'layout',
		type: typesMedia[3],
	},
	{
		name: 'layout_background_modal',
		description: 'Imagem de fundo referente ao modal da página Revelar-Prêmio',
		tag: 'layout',
		type: typesMedia[3],
	},

	// Brand
	{
		name: 'brand_image_one',
		description: 'Imagem do logo na página de carregamento.',
		tag: 'brand',
		type: typesMedia[3],
	},
	{
		name: 'brand_image_two',
		description: 'Imagem do logo presente dentro do footer na página Hub.',
		tag: 'brand',
		type: typesMedia[3],
	},
	{
		name: 'brand_image_three',
		description: 'Imagem principal da página de carregamento.',
		tag: 'brand',
		type: typesMedia[3],
	},
	{
		name: 'brand_image_four',
		description: 'Imagem de logo principal utilizado na landing page.',
		tag: 'brand',
		type: typesMedia[3],
	},
	{
		name: 'brand_image_five',
		description: 'Imagem de destaque do banner utilizado na landing page.',
		tag: 'brand',
		type: typesMedia[3],
	},
	{
		name: 'brand_text_one',
		description: 'Slogan de destaque do banner utilizado na landing page.',
		value: 'É você de nave na garagem e dinheiro no bolso!',
		tag: 'brand',
		type: typesMedia[0],
	},

	// Sessions
	{
		name: 'sessions_image_one',
		description:
			'Imagem que representa o tipo de prêmio na seção de meus prêmios (Sorteio)',
		tag: 'sessions',
		type: typesMedia[3],
	},
	{
		name: 'sessions_image_two',
		description:
			'Imagem que representa o tipo de prêmio na seção de meus prêmios (Rabiscadinha)',
		tag: 'sessions',
		type: typesMedia[3],
	},
	{
		name: 'sessions_image_three',
		description: 'Imagem que representa um logo, como exemplo o WhatsApp.',
		tag: 'sessions',
		type: typesMedia[3],
	},
	{
		name: 'sessions_image_four',
		description: 'Imagem que representa um logo representativo (1).',
		tag: 'sessions',
		type: typesMedia[3],
	},
	{
		name: 'sessions_image_five',
		description: 'Imagem que representa um logo representativo (2).',
		tag: 'sessions',
		type: typesMedia[3],
	},

	{
		name: 'sessions_title_one',
		description: 'Título da seção de números premiados.',
		value: 'Número premiado de hoje:',
		tag: 'sessions',
		type: typesMedia[0],
	},
	{
		name: 'sessions_title_two',
		description:
			'Título da seção de detalhes dos premios referente a rabiscadinha.',
		value: 'Rabiscadinha',
		tag: 'sessions',
		type: typesMedia[0],
	},
	{
		name: 'sessions_title_three',
		description:
			'Título da seção de detalhes dos premios referente ao número premiado.',
		value: 'Número premiado:',
		tag: 'sessions',
		type: typesMedia[0],
	},
	{
		name: 'sessions_title_four',
		description:
			'Título da seção de termos.',
		value: 'TERMOS DE USO E POLÍTICA DE PRIVACIDADE',
		tag: 'sessions',
		type: typesMedia[0],
	},
	{
		name: 'sessions_title_five',
		description:
			'Título do Regulamento.',
		value: 'Regulamento',
		tag: 'sessions',
		type: typesMedia[0],
	},
	{
		name: 'sessions_subtitle_one',
		description:
			'Subtítulo da seção localizado na lista dos prêmios (sorteio) do ganhador.',
		value: 'Número da sorte',
		tag: 'sessions',
		type: typesMedia[0],
	},
	{
		name: 'sessions_subtitle_two',
		description:
			'Subtítulo da seção localizado na lista dos prêmios (rabiscadinha) do ganhador.',
		value: 'Rabiscadinha',
		tag: 'sessions',
		type: typesMedia[0],
	},
	{
		name: 'sessions_subtitle_three',
		description:
			'Subtítulo da seção localizado no detalhes-premios do ganhador.',
		value:
			'Lembre-se: mantenha seu cadastro sempre atualizado pra nossa equipe poder entregar seu prêmio!',
		tag: 'sessions',
		type: typesMedia[0],
	},
	{
		name: 'sessions_subtitle_four',
		description:
			'Subtítulo da seção localizado no detalhes-premios do ganhador, como exemplo para dúvidas.',
		value: 'Dúvidas? É só entrar em contato:',
		tag: 'sessions',
		type: typesMedia[0],
	},
	{
		name: 'sessions_subtitle_five',
		description:
			'Ultimo texto da seção localizado no detalhes-premios do ganhador, com informações de contato.',
		value: '(11) 91221 3445',
		tag: 'sessions',
		type: typesMedia[0],
	},
	{
		name: 'sessions_subtitle_six',
		description:
			'Ultimo texto da seção localizado no detalhes-premios do ganhador.',
		value: '*Este item não é reembolsável.',
		tag: 'sessions',
		type: typesMedia[0],
	},
	{
		name: 'sessions_subtitle_seven',
		description:
			'Texto referente aos termos.',
		value: 'Insira os termos',
		tag: 'sessions',
		type: typesMedia[0],
	},
	{
		name: 'sessions_subtitle_eight',
		description:
			'Texto referente a Política de Privacidae.',
		value: 'Insira a Política de Privacidade',
		tag: 'sessions',
		type: typesMedia[0],
	},
	{
		name: 'sessions_subtitle_nine',
		description:
			'Texto referente ao Regulamento.',
		value: 'Insira texto do Regulamento',
		tag: 'sessions',
		type: typesMedia[0],
	},
	{
		name: 'sessions_button_label_one',
		description:
			'Texto de dentro dos botões de filtro para a tela de meus prêmios.',
		value: 'apenas rabiscadinhas',
		tag: 'sessions',
		type: typesMedia[0],
	},
	{
		name: 'sessions_button_label_two',
		description:
			'Texto de dentro dos botões de filtro para a tela de meus prêmios. ',
		value: 'apenas sorteios',
		tag: 'sessions',
		type: typesMedia[0],
	},
	{
		name: 'sessions_button_label_three',
		description:
			'Texto de dentro dos botões de filtro para a tela de meus prêmios. ',
		value: 'todos os sorteios',
		tag: 'sessions',
		type: typesMedia[0],
	},

	// Banner
	{
		name: 'banner_background_card_one',
		description:
			'Imagem do Banner principal que está localizado como o primeiro banner da página.',
		tag: 'banner',
		type: typesMedia[3],
	},
	{
		name: 'banner_background_card_two',
		description: 'Imagem do Banner secundário, localizado na página Hub.',
		tag: 'banner',
		type: typesMedia[3],
	},
	{
		name: 'banner_background_card_three',
		description: 'Imagem do Card localizado ao lado esquerdo da página.',
		tag: 'banner',
		type: typesMedia[3],
	},
	{
		name: 'banner_background_card_four',
		description: 'Imagem do Card localizado ao lado direito da página',
		tag: 'banner',
		type: typesMedia[3],
	},
	{
		name: 'banner_image_card_one',
		description: 'Primeira imagem localizada dentro do Banner principal.',
		tag: 'banner',
		type: typesMedia[3],
	},
	{
		name: 'banner_image_card_two',
		description:
			'Primeira imagem localizada dentro do Banner secundário, localizado na página Hub.',
		tag: 'banner',
		type: typesMedia[3],
	},
	{
		name: 'banner_image_card_three',
		description: 'Imagem presente dentro do Banner destacado',
		tag: 'banner',
		type: typesMedia[3],
	},
	{
		name: 'banner_image_card_four',
		description:
			'Imagem localizada dentro do Banner Blog (último Banner da página Hub).',
		tag: 'banner',
		type: typesMedia[3],
	},
	{
		name: 'banner_image_card_scrathcard_two',
		description:
			'Imagem dentro no Banner secundário, localizada ao lado da quantidade de raspadinhas restantes.',
		tag: 'banner',
		type: typesMedia[3],
	},
	{
		name: 'banner_text_card_title_one',
		description: 'Título do Banner principal do hub.',
		value: 'Fique atento!',
		tag: 'banner',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_title_two',
		description:
			'Texto em primeira posição dentro do Banner secundário que contém raspadinhas.',
		value: 'Está com sorte?',
		tag: 'banner',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_title_three',
		description: 'Título localizado dentro do Card fixado ao lado esquerdo.',
		value: 'Último sorteio',
		tag: 'banner',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_title_four',
		description: 'Título localizado dentro do Card fixado ao lado direito.',
		value: 'Próximos sorteios',
		tag: 'banner',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_title_five',
		description: 'Título do banner que não contém raspadinhas disponíveis.',
		value: 'Sem Rabiscadinhas?',
		tag: 'banner',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_title_six',
		description:
			'Título do Banner principal do hub em que o próximo sorteio já tenha sido realizado.',
		value: 'O Prêmio já saiu!',
		tag: 'banner',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_subtitle_one',
		description: 'Subtitulo localizado dentro do Banner principal.',
		value: 'Acompanhe a contagem regressiva pro sorteio de hoje e boa sorte!',
		tag: 'banner',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_subtitle_two',
		description: 'Subtitulo localizado dentro do Banner secundário.',
		value: 'Você tem rabiscadinhas!',
		tag: 'banner',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_subtitle_three',
		description: 'Subtitulo do banner quando o usuário não possui raspadinhas.',
		value: 'Não se preocupe, logo mais você terá mais chances!',
		tag: 'banner',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_subtitle_four',
		description:
			'Subtitulo do banner dentro do Banner principal em que o próximo sorteio já tenha sido realizado.',
		value: 'Quer saber se você foi o sortudo? É só tocar pra revelar!',
		tag: 'banner',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_scrathcard_two',
		description:
			'Texto abaixo da imagem referente a quantidade de raspadinhas.',
		value: 'Rabiscadinhas',
		tag: 'banner',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_label_button_one',
		description:
			'Subtitulo do (clique de redirecionamento) dentro Card fixado ao lado esquerdo.',
		value: 'Revelar prêmio',
		tag: 'banner',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_label_button_two',
		description:
			'Ultimo texto de (clique de redirecionamento) localizado ao final do Banner secundário.',
		value: 'Rabiscar agora',
		tag: 'banner',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_label_button_three',
		description:
			'texto de (clique de redirecionamento) no botão do banner principal quando um sorteio já foi realizado.',
		value: 'Revelar agora',
		tag: 'banner',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_description_two',
		description:
			'Texto descritivo da data de expiração dentro do Banner Principal que revela o prêmio',
		value: 'Números válidos até',
		tag: 'banner',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_description_three',
		description: 'Texto dentro do Banner Destacado',
		value:
			'Toque aqui pra visualizar os prêmios que você já ganhou no seu Fiel da Sorte.',
		tag: 'banner',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_description_four',
		description:
			'Texto localizado dentro do Banner Blog, fixado ao final do Hub.',
		value: 'Ganhadores do Fiel da Sorte: conheça suas histórias tocando aqui.',
		tag: 'banner',
		type: typesMedia[0],
	},
	{
		name: 'banner_link_external_card_one',
		description:
			'Insira um link de redirecionamento, ficará fixado dentro do Banner Blog.',
		value: 'https://blog.fieldasorte.com.br/',
		tag: 'banner',
		type: typesMedia[1],
	},

	// Colors
	{
		name: 'colors_text_one',
		description: 'Cor do texto padrão utilizado na aplicação.',
		value: '#FFFFFF',
		tag: 'colors',
		type: typesMedia[2],
	},
	{
		name: 'colors_text_button',
		description: 'Cor do texto interno do botão',
		value: '#FFFFFF',
		tag: 'colors',
		type: typesMedia[2],
	},
	{
		name: 'colors_border_one',
		description:
			'Cor da borda que é compartilhada com outros componentes do site. Exemplo: Banner Blog e Números da Sorte.',
		value: '#847248',
		tag: 'colors',
		type: typesMedia[2],
	},
	{
		name: 'colors_border_two',
		description: 'Cor da borda do separador utilizado entre seções',
		value: '#FFBE00',
		tag: 'colors',
		type: typesMedia[2],
	},
	{
		name: 'colors_background_one',
		description: 'Cor de fundo do Banner Blog.',
		value: '#000006',
		tag: 'colors',
		type: typesMedia[2],
	},
	{
		name: 'colors_background_two',
		description: 'Cor de fundo do Banner Destacado',
		value: '#847248',
		tag: 'colors',
		type: typesMedia[2],
	},
	{
		name: 'colors_background_three',
		description: 'Cor dos campos de números sorteados',
		value: '#DFA701',
		tag: 'colors',
		type: typesMedia[2],
	},
	{
		name: 'colors_detach_one',
		description: 'Cor para destacar elementos gerais na aplicação.',
		value: '#FF0019',
		tag: 'colors',
		type: typesMedia[2],
	},
	{
		name: 'colors_background_button',
		description: 'Selecione a cor padrão dos botões.',
		value: '#847248',
		tag: 'colors',
		type: typesMedia[2],
	},
	{
		name: 'colors_carousel_pagination_background',
		description: 'Cor de fundo da paginação do slide que não está ativo.',
		value: '#FFFFFF',
		tag: 'colors',
		type: typesMedia[2],
	},
	{
		name: 'colors_carousel_pagination_active',
		description: 'Cor ativa da paginação, do slide que foi selecionado.',
		value: '#FF0019',
		tag: 'colors',
		type: typesMedia[2],
	},

	// Modal
	{
		name: 'modal_text_prize_title_one',
		description:
			'Título principal do modal fixado dentro da página revelar prêmios.',
		value: 'Boa sorte!',
		tag: 'modal',
		type: typesMedia[0],
	},
	{
		name: 'modal_text_prize_title_two',
		description: 'Título informando retorno da raspadinha negativo.',
		value: 'Não foi dessa vez...',
		tag: 'modal',
		type: typesMedia[0],
	},
	{
		name: 'modal_text_prize_title_three',
		description: 'Título informando retorno da raspadinha positivo.',
		value: 'Parabéns!',
		tag: 'modal',
		type: typesMedia[0],
	},
	{
		name: 'modal_text_prize_subtitle_one',
		description: 'Subtitulo do modal fixado dentro da página revelar prêmios.',
		value:
			'Se a combinação dos números sorteados bater com algum dos seus números, você ganhou!',
		tag: 'modal',
		type: typesMedia[0],
	},
	{
		name: 'modal_text_prize_subtitle_two',
		description:
			'Subtitulo do modal da página revelar-premio com retorno negativo.',
		value:
			'Continue atento aos sorteios, aqui no Fiel da Sorte todo dia tem ganhador!',
		tag: 'modal',
		type: typesMedia[0],
	},
	{
		name: 'modal_text_prize_subtitle_three',
		description:
			'Subtitulo do modal da página revelar-premio com retorno positivo.',
		value:
			'Seu número da sorte foi contemplado! Lembre-se: Mantenha seu cadastro atualizado que nossa equipe vai entrar em contato em breve!',
		tag: 'modal',
		type: typesMedia[0],
	},
	{
		name: 'modal_text_prize_label_one',
		description: 'Texto dentro do botão da página revelar-premio.',
		value: 'Revelar resultado',
		tag: 'modal',
		type: typesMedia[0],
	},
	{
		name: 'modal_text_prize_label_two',
		description:
			'Texto dentro do botão da página revelar-premio com retorno negativo.',
		value: 'voltar',
		tag: 'modal',
		type: typesMedia[0],
	},
	{
		name: 'modal_text_prize_label_three',
		description:
			'Texto dentro do botão da página revelar-premio com retorno positivo.',
		value: 'ver detalhes',
		tag: 'modal',
		type: typesMedia[0],
	},

	// Header
	{
		name: 'header_button_label_one',
		description: 'Texto localizado dentro do botão de login do header',
		value: 'Login',
		tag: 'header',
		type: typesMedia[0],
	},
];
