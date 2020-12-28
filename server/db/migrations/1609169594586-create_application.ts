import { AbstractMigration, Info } from "https://deno.land/x/nessie/mod.ts";
import Dex from "https://deno.land/x/dex/mod.ts";

export default class ExperimentalMigration extends AbstractMigration {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    const query = Dex({ client: info.dialect }).schema.createTable(
      "c",
      (table: any) => {
        table.id().primary();
        table.text("content");
        table.enum("specificity", ["general", "operations", "development", "hacker experience", "design", "sponsorship", "content", "marketing"], "string");
      },
    );
    this.client.query(query);
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    const query = Dex({ client: info.dialect }).schema.dropTable("typeName");
    this.client.query(query);
  }
}
