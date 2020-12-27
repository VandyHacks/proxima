import { Router } from "../deps.ts";
import { parseTypeForm } from "./controllers/applicationController.ts"

const router = new Router();

router.put('/typeform/submit', parseTypeForm);

router.get

export { router };