export default class DacoService{

  static async getCommunity() {
    let communityAll = new Array();

    await fetch(
      'https://graphql.datocms.com/', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          //Authorization': `Bearer ${token}`,
          'Authorization': 'aa349b9033ca266e24f5223f42abd7',
        },
        body: JSON.stringify({
          "query": 
          `{ allCommunities
              { 
                id
                name
                image
                creatorSlug
              } 
            }`
        }),
      }
    )
    .then(res => res.json())
    .then((res) => {
      
      const communityList = res.data.allCommunities;
      communityList.forEach((com) => {
        communityAll.push({
          id: com.id,
          name: com.name,
          image: com.image
        });
      });
    })
    .catch((error) => {
      console.log('Error Daco service get communitys: ' + error);
    });

    return communityAll;

  } 
}