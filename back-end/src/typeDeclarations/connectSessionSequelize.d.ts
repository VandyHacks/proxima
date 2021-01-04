import { TSequelizeStore } from '../types/SequelizeStore';
import { Store } from 'express-session';

export default function<U>(store: typeof Store): TSequelizeStore;