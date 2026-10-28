
const TARGET_HOST = "tnmc6mz3wlkw8ccy.3sn.lambda-web.eu-central-1.on.aws";

export async function onRequest(context) {
  const request = context.request;
  const userAgent = request.headers.get("user-agent") || "";

  // Verifica se lo User-Agent contiene la stringa "curl"
  if (userAgent.toLowerCase().includes("curl")) {
    
    // Costruisce l'URL statico della root utilizzando la costante
    const targetUrl = `https://${TARGET_HOST}/`;

    // Clona la richiesta forzando l'header host con la costante comune
    const modifiedRequest = new Request(targetUrl, new Request(request, {
      headers: {
        ...Object.fromEntries(request.headers),
        "host": TARGET_HOST
      }
    }));

    // Esegue il proxy verso l'host configurato senza ereditare la URI originaria
    return fetch(modifiedRequest);
  }

  // Se non è curl, prosegue normalmente con il sito Pages
  return context.next();
}
