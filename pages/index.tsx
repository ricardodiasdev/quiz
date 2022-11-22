import { useState,  useEffect } from "react";
import Questionario from "../components/Questionario";
import QuestaoModel from "../model/questao";
import { useRouter } from "next/router";


const BASE_URL = "https://quiz-nine-beta.vercel.app/";

export default function Home() {

  const router = useRouter()
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([]);
  const [questao, setQuestao] = useState<QuestaoModel>();
  const [respostasCertas, setRespostasCertas] = useState(0);

  async function carregarIdsDasQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`);
    const idsDasQuestoes = await resp.json();
    setIdsDasQuestoes(idsDasQuestoes);
  }

  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`);
    const json = await resp.json();
    setQuestao(QuestaoModel.criarUsandoObjeto(json));
  }

  useEffect(() => {
    carregarIdsDasQuestoes();
  }, []);

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0]);
  }, [idsDasQuestoes]);

  const questaoRespondida = (questaoRespondida: QuestaoModel) => {
    setQuestao(questaoRespondida);
    const acertou = questaoRespondida.acertou;
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0));
  };

  const irProximoPasso = () => {
    const proximoId = idProximaPergunta()
    proximoId ? irProximaQuestao(proximoId) : finalizar()
  };

  const idProximaPergunta = () => {
      const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1
      return idsDasQuestoes[proximoIndice]
  
  }
   

  const irProximaQuestao = (proximoId: number) => {
    carregarQuestao(proximoId)
  }

  const finalizar = () => {
    router.push({
      pathname: '/resultado', 
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }

  return (
    questao ? 
    (<Questionario
      questao={questao}
      ultima={idProximaPergunta() === undefined}
      questaoRespondida={questaoRespondida}
      irParaProximoPasso={irProximoPasso}
    />) 
    : false
  );
}
