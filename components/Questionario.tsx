import styles from '../styles/Questionario.module.css'
import QuestaoModel from "../model/questao";
import Questao from './Questao';
import Botao from './Botao';

interface QuestionarioProps {
    questao: QuestaoModel
    ultima: boolean
    questaoRespondida: (questao: QuestaoModel) => void
    irParaProximoPasso: () => void
}

function Questionario(props: QuestionarioProps) {
    
    const respostaFornecida = (indice:number) => {
        if(props.questao.naoRespondida) {
            props.questaoRespondida(props.questao.responderCom(indice))
        }
    }
    
    return (
        <div className={styles.questionario}>
            {props.questao ? 
                <Questao
                    valor={props.questao}
                    tempoDeResposta={6}
                    respostaFornecida={respostaFornecida}
                    tempoEsgotado={props.irParaProximoPasso}
                />
            :
                false
            }
            <Botao 
                onClick={props.irParaProximoPasso} 
                texto={props.ultima ? 'Finalizar' : 'Próxima'}
            />
        </div>
    );
}

export default Questionario;