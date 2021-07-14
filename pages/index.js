import React, { useEffect, useState } from "react";
import { Box } from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import { AlurakutMenuProfileSidebar } from "../src/lib/AlurakutCommons";
import { CardList } from "../src/components/CardList";
import GitHubService from "../src/api/api";


export default function Home() {
  const githubUser = "anadezuo";

  const [friendsList, setFriendsList] = useState([]);
  useEffect(() => {
    GitHubService.getFollowers(githubUser, 6, true).then((friendsGit) =>
      setFriendsList(friendsGit)
    );
  }, []);

  const [community, setCommunity] = useState([
    {
      id: new Date().toISOString(),
      name: 'Fazendo amizades',
      image: 'https://img.cancaonova.com/cnimages/canais/uploads/sites/6/2019/10/formacao_1600x1200-a-amizade-e-um-dom-do-amor.jpg'
    },
    {
      id: new Date().toISOString(),
      name: 'Amor pela fotografia',
      image: 'https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2020/05/nota-docs-fotografia.jpg'
    },
    {
      id: new Date().toISOString(),
      name: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    },{
      id: new Date().toISOString(),
      name: 'Igualdade',
      image: 'https://static.vecteezy.com/system/resources/previews/000/533/153/non_2x/rainbow-flag-lgbt-symbol-on-heart-vector.jpg'
    }
  ]);

  function handleCreateCommunity(event){
    event.preventDefault();

    const dadosForm = new FormData(event.target);

    const newCommunity = {
      id: new Date().toISOString(),
      name: dadosForm.get('title'),
      image: dadosForm.get('image') ? dadosForm.get('image') : 'http://placehold.it/300x300'
    }

    setCommunity([...community, newCommunity]);

    /*Uma outra opção eh ter mais 2 useState, um para cada campo, que ao 
    salvar ambas as informações no submit, incluir no de comunidades.*/
    //const communityUpdate = [...community, event.target.value];
    //setCommunity(communityUpdate);
  }

  //CURIOSIDADE: os parenteses é adicionado para quebra de linha
  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <Box as="aside">
            <AlurakutMenuProfileSidebar githubUser={githubUser} />
          </Box>
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <p>O que voce deseja fazer?</p>
            <form onSubmit={handleCreateCommunity}>
              <div>
                <input className="subtitle"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  area-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  >
                </input>
                <input 
                  placeholder="Coloque uma url para usarmos de capa"
                  name="image"
                  area-label="Coloque uma url para usarmos de capa"
                  type="url"
                  >
                </input>
                <button
                  type="submit">
                  Criar comunidade
                </button>
              </div>
            </form>
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
        <ProfileRelationsBoxWrapper>
          <CardList cardList={friendsList} title={'Amigos'} quantity={6}/>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <CardList cardList={community} title={'Comunidades'} quantity={6}/>
        </ProfileRelationsBoxWrapper>

        </div>

      </MainGrid>
    </>
  );
}
