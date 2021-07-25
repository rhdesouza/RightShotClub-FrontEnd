import { environment } from "src/environments/environment";
export const rightshot = {
    tituloAplicacao: 'Right Shot Club',
    versao: '0.2.0' + (!environment.production ? '-dev' : null),
};

/**
 * 6.1.3 - Comitado e Publicado
 * FRONT-END: CDU-FORNECEDORES-> CORRIGIDO O DIRTY DO FORM PARA FECHAMENTO DO MODAL.
 * BACK-END: Ajuste para envio de e-mail Assíncrono. Pool de Thread
 * BACK-END: Ajuste visual e padronizado dos templates de e-mail.
 * FRONT-END: Ajuste ordenação histórico de precificação
 * BACK-END: Adicionado Lombok ao projeto.
 */


/**
 * 6.1.2 - Comitado e Publicado
 * FRONT-END: HOT-FIX -> Criado PrecificacaoProdutoAudDTO como exemplo de auditoria.
 * BACK-END: Modificado a função para buscar o histórico. 
 */


/**
 * 6.1.1 - Comitado e Publicado
 * FRONT-END: HOT-FIX -> Buscar precificação
 */

/**
 * 6.1.0 - Comitado e Publicado
 * BACK-END: Ajuste das novas conexões de banco de dados
 * FRONT-END: Ajuste de Roles implementadas
 * BACK-END: Implementação das funções para trazer a sigestão de Precificação
 * BACK-END: Criação precificaçãoDAO.
 * FRONT-END: Inclusão da tela para adicionar precificação aos disponiveis.
 * BACK-END: Validação e construção do serviço de salvar a precificação.
 * FRONT-END: Inclusão do modal-title que verifica as alterações do formulário antes de salva.
 * BACK-END: Envio de e-mail para as precificações.
 * FRONT-END: Padronização do comando fechar aos modais com a confirmação de alteração para os CDU Cliente, Fornecedor, Produto e Tipo de Produto.
 * BACK-END: Implementado histórico de precificação, adicionado as roles para as ações.
 */


/**
 * 6.0.0 - Comitado e Publicado
 * FRONT-END: Funções para paginção no CDU-Cliente; 
 * BACK-END: Funções para paginção no CDU-Cliente;
 * FRONT-END: Funções para paginção no CDU-Fornecedor; 
 * FRONT-END: Ajuste para máscaras dinâmicas;
 * BACK-END: Funções para paginção no CDU-Fornecedor;
 * BACK-END: Adicionada a segurança de Roles ao CDU-Fornecedor;
 * FRONT-END: Criação do Menu Financeiro, Inserido a rotina de Nota Fiscal para o Financeiro
 * FRONT-END: Ajuste da máscara para Markup.
 * FRONT-END: CDU - Precificação Produto, Inclusão das telas de pesquisa, inclusão e lista de produtos precificados.
 * BACK-END: CDU - Precificação Produto: Inclusão da Entidade, controller e serviços (novo, exluir e listar) produtos precificados.
 * BACK-END: Criadas as ROLES de controle ao CDU - Precificação Produto
 * FRONT-END: CDU - User X Roles: Componente drag in drop e botões com funcionalidades.
 */


/**
 * 5.0.0 - Comitado e Publicado
 * FRONT-END: Refatoração das paginas de Administração
 * FRONT-END: Inclusão da pagina de configurações RIGHT SHOT CLUB
 * FRONT-END: Definição do novo menu da página principal de Estoque
 * FRONT-END: CDU Cadastro de Informações
 * BACK-END: Criação dos serviços de cadastro de informações.
 * BACK-END: Todo serviço de e-mail deverá ser apontado para o e-mail geral.
 */

/**
 * 4.3.0 - Comitado - Publicado
 * FRONT-END: Para CDU estoque foi implementado a paginação pelo back-end
 * FRONT-END: Reorganização dos models, entity, vo e dto
 * FRONT-END: Criação do pageVO
 * FRONT-END: Retirada do Menu Antigo (nav)
 * BACK-END: Criação do pageVO
 * BACK-END: Implementação do serviço de paginação
 * 
 */

/**
 * 4.2.1 - Comitado - Publicado
 * FRONT-END: Correção da funcionalidade adicionar e carregar foto em AddCliente
 * FRONT-END: Ajuste witdth Mat-Table em SearchFornecedor e SearchProduto (CDU-Nota Fiscal)
 * FRONT-END: Correção no campo data de nascimento em cadastro de cliente
 * FRONT-END: Adicionada a validação do campo data em GenericValidators
 * BACK-END: Implementada os Converters para data. Ajustado a entidade de Cliente.
 */

/**
 * 4.1.0 - Comitado 
 * BACK-END: Criação da tabela Estoque;
 * BACK-END: Criação dos serviços de buscar estoque;
 * BACK-END: Criação do serviço para gerar estoque a partir da nota fiscal;
 * BACK-END: Ajustes dos serviços de envio de e-mail para salvar e editar nota fiscal;
 * FRONT-END: Criação da tela de estoque, contendo o relatório de estoque disponivel.
 * FRONT-END: Habilitada a tela visualização de nota fiscal
 * BACK-END: Implementada segurança para regra de negócio.
 */

/**
 * 4.0.0 - Comitado - Publicado
 * Criação do Scheduler.
 * Criação funnção para envio de e-mail.
 * BACK-END: Utilização do template thymeleaf, configuração para serviço de e-mail.
 * BACK-END: Métodos @transient para as entidades NF.java, Itens.java e Fornecedor.java
 * FRONT-END: Somatório total dos itens em cadastro nota fiscal.
 * FRONT-END: Somatório total dos pagamentos em cadastro de nota fiscal.
 */

/**
 * 3.3.0 - Comitado - Publicado
 * Criado serviço para gerenciamento de Modal
 * Criado componente de mat-error hint para validação do formulário
 * Padronização do tamanho dos botões
 * Ajustes e correções de regra no CDU-Cliente
 * Inclusão da cor e tamanho ao título das páginas
 * Padronização da página de Clientes, Fornecedores, Produto, Tipo de Produto, tipo de input e comportamento dos componentes.
 * Inclusião do app-tag-filter filtro para todas as telas de que tenham lista.
 */

/**
 * 3.2.1 - Comitado - Publicado
 * Criado Auditoria para Cadastro de NF
 * Criada Serviço para disponibilizar estoque
 * Parametrizado as Roles para criação de estoque
 * Corrigido o erro para criação das roles e carregamento inicial dos fornecedores (somente para teste)
 */

/**
 * 3.1.0 - Comitado - Publicado
 * Auditoria para Produto.
 * Criação da interface Auditable (Para buscar as informações de auditoria);
 * Auditoria para Fornecedores.
 * Auditoria para Users
 * Auditoria para Roles
 * Adicionado Time_Zone correto ao spring-boot JPA.
 * Adicionado cadastro para data de pagamentos e parcelas.
 */

/**
 * 3.0.0 - Comitado - Publicado
 * Adicionada animação para troca de rota.
 * Corrigido rota de estoque.
 * Adicionada função para salvar nota fiscal.
 * Adicioanda função de fron-end para validar o formuçário;
 * Alteração da entidade de NotaFisca, relacionamento @OneToMAny.
 * Criação da view e serviços getAllNF()
 * Aplicação das Roles.
 * Adicionada sistema de auditoria automática no back-end.
 */

/**
 * 2.1.0 - Comitado - Publicado
 * Adicionado breadCrumbs para ser o título da página e refatorado para a aplicação.
 * Retirado o compononte de titulo descontinuado.
 * Adicionado efeito de giro para o click do menu
 * Adicionado as fots roboto e icones mat-icon para dentro da aplicação.
 */