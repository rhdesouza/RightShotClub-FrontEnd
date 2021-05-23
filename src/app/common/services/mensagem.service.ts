import { Injectable } from '@angular/core';

const msgApp = {
    'MSG01': 'Campo obrigatório!',
    'MSG02': 'Caracteres inválidos!',

    'MSG03': 'O beneficiário {0}, não pode ter a consulta com a especialidade {1}',
    'MSG04': 'Esta opção estará disponível 72 horas antes da sua consulta',
    'MSG05': 'A confirmação do comparecimento já foi realizada.',
    'MSG06': 'Esta opção está disponível até 3 horas antes da sua consulta',
    'MSG07': 'Não é possivel fazer um novo agendamento pois este beneficiário não tem assistência saúde.'
}


@Injectable({
    providedIn: 'root'
})
export class MensagemService {

    /**
     * Função para buscar as mensagens pré-cadastradas;
     * Ex.: 
     *      Uso Simples: getMsgApp('MSG01')
     *      Uso Composto: getMsgApp('MSG03',['João','Cardiologista']
     * 
     * @param codMensagem 
     * @param options 
     */
    public getMsgApp(codMensagem: string, options?: any[]) {
        let msg: string = !!msgApp[codMensagem.toUpperCase()] ? msgApp[codMensagem.toUpperCase()] : 'ERROR_MSG: codigo de mensagem não cadastrada.'

        if (!!options) {
            Object.keys(options).forEach(key => {
                msg = (msg.replace(`{${key}}`, options[key]));
            })
        }

        return msg;
    }

}