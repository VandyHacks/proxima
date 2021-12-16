// import {MigrationInterface, QueryRunner, Table, TableUnique} from "typeorm";
// import { User } from "../entity/User";

// export class AddUsersTable1614547800141 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.createTable(new Table({
//             name: "users",
//             columns: [
//                 {
//                     name: "id",
//                     type: "varchar",
//                     isPrimary: true
//                 },
//                 {
//                     name: "name",
//                     type: "varchar",
//                 },
//                 {
//                     name: "email",
//                     type: "varchar",
//                 },
//                 {
//                     name: "displayName",
//                     type: "varchar",
//                 },
//                 {
//                     name: "image_24",
//                     type: "varchar",
//                 },
//                 {
//                     name: "image_32",
//                     type: "varchar",
//                 },
//                 {
//                     name: "image_48",
//                     type: "varchar",
//                 },
//                 {
//                     name: "image_72",
//                     type: "varchar",
//                 },
//                 {
//                     name: "image_192",
//                     type: "varchar",
//                 },
//                 {
//                     name: "image_512",
//                     type: "varchar",
//                 }
//             ]
//         }), true);
//         await queryRunner.createUniqueConstraint("users", new TableUnique({ columnNames: ["id"] }));

//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.dropTable("users");
//     }

// }
