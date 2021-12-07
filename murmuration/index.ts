
export function handler(event: any ) {
  console.log('event 👉', event);

  return {
    body: JSON.stringify({message: 'Successful lambda invocation now with docker'}),
    statusCode: 200,
  };
}