import { Context } from "../deps.ts";

const errorMiddleware = async(context: Context, next: any) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
}

const requestTimingMiddleware = async({ request }: Context, next: any) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${request.method} ${request.url.pathname} - ${ms} ms`);
}


export { errorMiddleware, requestTimingMiddleware };