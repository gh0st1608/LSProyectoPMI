import { Request, Response, response } from "express";
import AuthApplication from "../../application/auth.application";
import { Tokens } from "../../domain/repository/auth.repository";


export default class {
  application: AuthApplication;

  constructor(readonly app: AuthApplication) {
    this.application = app;
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.validateAccessToken = this.validateAccessToken.bind(this);
    this.getNewAccessToken = this.getNewAccessToken.bind(this);
  }


async register(req: Request, res: Response) {
    const { user, password } = req.body;

    const results: Tokens = await this.application.register(
      user,
      password
    );
    res.json(results);
  }

async login(req: Request, res: Response) {
    const { user, password } = req.body;
    const tokens: Tokens | null = await this.application.login(user, password);

    if (tokens) {
      res.json(tokens);
    } else {
      res.status(401).send("Not found user");
    }
  }

  validateAccessToken(req: Request, res: Response) {
    const { accessToken } = req.body;
    this.application
      .validateAccessToken(accessToken)
      .then(() => res.json({ valid: true }))
      .catch((err: { status: number; message: string }) => {
        console.log(err);
        res.status(err.status).send(err.message);
      });
  }

  async getNewAccessToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    const tokens = await this.application.getNewAccessToken(refreshToken);

    if (tokens) {
      res.json(tokens);
    } else {
      res.status(404).send("Not found user");
    }
  }
}

