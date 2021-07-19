import React, { useEffect, useState } from "react";
import { Box } from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";
import { AlurakutMenuProfileSidebar } from "../src/lib/AlurakutCommons";
import { CardList } from "../src/components/CardList";
import GitHubService from "../src/api/apiGitHubService";
import DacoService from "../src/api/apiDacoService";
import nookies from 'nookies';
import jwt from 'jsonwebtoken';


export default function Home(props) {
  const githubUser = props.githubUser;

  const [nameCommunity, setNameCommunity] = useState('');
  const [imageCommunity, setImageCommunity] = useState('');

  const [friendsList, setFriendsList] = useState([]);
  useEffect(() => {
    GitHubService.getFollowers(githubUser, 6, true).then((friendsGit) =>
      setFriendsList(friendsGit)
    );
  }, []);

  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/following`)
    .then((response)=> {
      return response.json();
    })
    .then((followingGit) => {

      let followingAll = new Array();
      followingGit.forEach((following) => {
        followingAll.push({
          id: following.login,
          name: following.login,
          image: following.avatar_url,
          url: following.html_url,
        });
      })
      setFollowers(followingAll);
    })
    //TODO: Desligar o useffect
  }, []);

  const [community, setCommunity] = useState([]);
  useEffect(() => {
    DacoService.getCommunity().then((communityDaco) => {
      setCommunity(communityDaco)
    });
  }, []);


  function handleCreateCommunity(event){
    event.preventDefault();

    const newCommunity = {
      name: nameCommunity,
      image: imageCommunity ? imageCommunity : 'http://placehold.it/300x300',
      creatorSlug: githubUser
    }

    fetch('/api/community', 
      {
        method: 'POST',
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify(newCommunity)
      })
      .then(async (response) => {
        const returnNewCommunity = await response.json();
        const addCommunity = returnNewCommunity.newCommunity;
        setCommunity([...community, addCommunity]);
        setNameCommunity('');
        setImageCommunity('');
      })
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
          <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCreateCommunity}>
              <div>
                <input className="subtitle"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="name"
                  area-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  value={nameCommunity}
                  onChange={(event) => {
                    setNameCommunity(event.target.value);
                  }}
                  >
                </input>
                <input 
                  placeholder="Coloque uma url para usarmos de capa"
                  name="image"
                  area-label="Coloque uma url para usarmos de capa"
                  type="url"
                  value={imageCommunity}
                  onChange={(event) => {
                    setImageCommunity(event.target.value);
                  }}
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
          <CardList 
            cardList={friendsList}
            title='Sigam me os bons...'
            quantity={6}/>
          <CardList
            cardList={followers}
            title='Vou com os bons...'
            quantity={6}/>
          <CardList
            cardList={community}
            title='Comunidades'
            quantity={6}/>
        </div>

      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  //console.log('Cookies');
  //console.log(nookies.get(context));
  const token = nookies.get(context).USER_TOKEN;
  const { githubUser } = jwt.decode(token);
  
  console.log(jwt.decode(token));
  console.log('githubUser:' + githubUser);
  
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization : token
    }
  })
  .then((res) => res.json())
  
  console.log('isAuthenticated:' + isAuthenticated);
  
  if(!isAuthenticated){
    return{
      redirect: {
        destination:'/login',
        permanent: false
      }
    }
  }
  
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}