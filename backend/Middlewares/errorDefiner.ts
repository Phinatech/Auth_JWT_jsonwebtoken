export enum HTTPS {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTORIZED = 401,
  NOT_FOUND = 404,
  FORBIBBEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  TIMEOUT = 508,
  NETWORK_UNAVAILABLE = 599,
}

interface errorArgs {
  name: string;
  message: string;
  status: HTTPS;
  sucess: boolean;
}

export class mainAppErroHandling extends Error {
  public readonly name: string;
  public readonly message: string;
  public readonly status: HTTPS;
  public readonly success: boolean = true;

  constructor(args: errorArgs) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || "Error";

    this.status = args.status;

    if (this.success != undefined) {
      this.success = args.sucess;
    }
  }
}
