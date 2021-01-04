import { Sequelize } from 'sequelize';
import { Store } from 'express-session';

export interface IStoreOptions {
    db: Sequelize;
    table?: string;
}

export type TSequelizeStore = new (options?: IStoreOptions) => Store & {
    sync: (options?: {
        force?: boolean;
    }) => void;
};