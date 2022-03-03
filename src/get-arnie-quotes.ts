import { httpGet } from "./mock-http-interface";

// TODO define this type properly
type TResult = { [key: string]: string };

type HttpResponse = { status: number; body: string };

const RESPONSE_MAPPINGS: { [key: number]: string } = {
  200: "Arnie Quote",
  500: "FAILURE",
};

const parseHttpResponse = (httpResponse: HttpResponse) => ({
  [RESPONSE_MAPPINGS[httpResponse.status]]: JSON.parse(httpResponse.body)
    .message,
});

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
  // TODO: Implement this function.
  const pendingPromises = [];

  for (let i = 0; i < urls.length; i++) {
    const promise = httpGet(urls[i]);
    pendingPromises.push(promise);
  }

  const results = await Promise.all(pendingPromises).then((res) =>
    res.map((httpResponse) => parseHttpResponse(httpResponse))
  );

  return results;
};
