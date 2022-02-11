declare namespace Express {
  interface Request {
    reqId: string;
    user?: User,
  }
}
