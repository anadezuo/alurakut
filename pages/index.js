import React, { useState } from 'react';
import { Box } from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import { AlurakutProfileSidebarMenuDefault, AlurakutMenuProfileSidebar } 
       from "../src/lib/AlurakutCommons";
import { FriendsList } from "../src/components/FriendsList";

export default function Home() {
  const githubUser = "anadezuo";

  const [community, setCommunity] = useState([{
    id: new Date().toISOString(),
    title: 'Eu odeio acordar cedo',
    imageUrl: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

  function handleCreateCommunity(event){
    event.preventDefault();

    const dadosForm = new FormData(event.target);

    const newCommunity = {
      id: new Date().toISOString(),
      title: dadosForm.get('title'),
      imageUrl: dadosForm.get('image')
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
                  type="text"
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
          <FriendsList githubUser={githubUser} quantidade={6} randomico={true}/>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades ({community.length})
          </h2>

          <ul>
            {community.map((item) => {
              return (
                <li key={item.id}>
                  <a href={`/users/${item.title}`} key={item.title}>
                    <img src={item.imageUrl ? 
                              item.imageUrl : 
                              'http://placehold.it/300x300'}/>
                    <span>{item.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
