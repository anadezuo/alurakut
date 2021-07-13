import { Box } from "../src/components/Box";
import { MainGrid } from "../src/components/MainGrid";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import { AlurakutProfileSidebarMenuDefault, AlurakutMenuProfileSidebar } 
       from "../src/lib/AlurakutCommons";
import { FriendsList } from "../src/components/FriendsList";

export default function Home() {
  const githubUser = "anadezuo";

  //os parenteses é adicionado para quebra de linha
  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <Box>
            <AlurakutMenuProfileSidebar githubUser={githubUser} />
          </Box>
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
        <ProfileRelationsBoxWrapper>
          <FriendsList githubUser={githubUser} quantidade={6} randomico={true}/>
        </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
