import { HTTPS } from "./Https";

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
