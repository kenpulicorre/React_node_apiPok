const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Pokemon.create({ name: "Pikachu" });
      });
    });
  });
  //-----------
  describe("nombre_pikachu", () => {
    it("Debe tener un id", async () => {
      await Pokemon.create({ name: "pokenew_kenneth" });
      const poke_busca = await Pokemon.findOne({
        where: { name: "pokenew_kenneth" },
      });
      expect(poke_busca.dataValues.name).to.not.equal("");
    });
  });
});
