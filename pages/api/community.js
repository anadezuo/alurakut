import { SiteClient } from 'datocms-client';

export default async function recebedor(request, response) {
  if (request.method === 'POST'){
    const TOKEN = process.env.REACT_APP_DATO_TOKEN;
    const modelId = process.env.REACT_APP_DATO_MODEL_ID; //código do modelo presente no DATO

    const client = new SiteClient(TOKEN);
    const newCommunity = await client.items.create({
      itemType: modelId, 
      //title: 'ReactJS 2',
      //image: 'https://cdn.iconscout.com/icon/free/png-512/react-1-282599.png',
      //creatorSlug: 'anadezuo'
      ...request.body
    });
    
    response.json({
      dados: 'Comunidade inserida com sucesso.',
      newCommunity: newCommunity
    });

    return;
  }
  
  response.json({
    message: 'Método GET não existente.'
  })
}