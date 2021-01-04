import { Model, Table, Column, DataType, PrimaryKey } from 'sequelize-typescript';

export interface ISess {
    cookie: {
        originalMaxAge: number;
        expires: string;
        httpOnly: boolean;
        path: string;
    };
    passport: {
        user: number;
    };
}

@Table({
    tableName: 'sessions'
})
export default class Session extends Model<Session> {

    @PrimaryKey
    @Column
    sid!: string;

    @Column(DataType.JSON)
    data!: ISess;

    @Column
    expires!: Date;
}