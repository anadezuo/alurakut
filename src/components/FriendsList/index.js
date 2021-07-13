import React, { useEffect, useState } from "react";
import GitHubService from "../../api/api";
import { FriendsCard } from "../FriendsCard";

export function FriendsList({githubUser, quantidade, randomico}) {
  const [friendsList, setFriendsList] = useState([]);
  

  useEffect(() => {
    GitHubService.getFollowers(githubUser, quantidade, randomico).then((friendsGit) =>
      setFriendsList(friendsGit)
    );
  }, []);

  return (
    <>
      <h2 className="smallTitle">Pessoas da comunidade ({friendsList.length})</h2>
      <ul>
        {friendsList.map((friend) => {
          return (
              <FriendsCard
                key={friend.login}
                html_url={friend.html_url}
                login={friend.login}
                avatar_url={friend.avatar_url}
              />
            
          );
        }).slice(0, quantidade)}
      </ul>
    </>
  );
}
