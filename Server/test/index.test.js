const app = require("../src/app");
const session = require("supertest");
const agent = session(app);

describe("Test de RUTAS", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      return await agent.get("/rickandmorty/character/1").expect(200);
    });
    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image', async () => {
      const res = (await agent.get("/rickandmorty/character/1")).body;
      expect(res).toHaveProperty("id");
      expect(res).toHaveProperty("name");
      expect(res).toHaveProperty("species");
      expect(res).toHaveProperty("gender");
      expect(res).toHaveProperty("status");
      expect(res).toHaveProperty("origin");
      expect(res).toHaveProperty("image");
    });
    it("Si hay un error responde con status: 500", async () => {
      return await agent.get("/rickandmorty/character/989").expect(500);
    });
  });
  describe("GET /rickandmorty/login", () => {
    it("Retorna {access: true} si el email y password son correctos", async () => {
      const res = (
        await agent.get(
          "/rickandmorty/login?email=canalesluis9@gmail.com&password=admin27"
        )
      ).body;
      expect(res).toEqual({ access: true });
    });
    it("Retorna {access: false} si el email y password son incorrectos", async () => {
      const res = (
        await agent.get(
          "/rickandmorty/login?email=luis@gmail.com&password=admin278"
        )
      ).body;
      expect(res).toEqual({ access: false });
    });
  });
  describe("POST /rickandmorty/fav", () => {
    const character1 = { id: 1, name: "Luis" };
    const character2 = { id: 2, name: "Gregorio" };
    it("Responde un arreglo con lo que envies por body", async () => {
      const res = (await agent.post("/rickandmorty/fav").send(character1)).body;
      expect(res).toContainEqual(character1);
    });
    it("Si se envia un nuevo elemento por body, debe ser agregado al arreglo", async () => {
      const res = (await agent.post("/rickandmorty/fav").send(character2)).body;
      expect(res).toContainEqual(character1);
      expect(res).toContainEqual(character2);
    });
  });
  describe("DELETE /rickandmorty/fav/:id", () => {
    const character1 = { id: 1, name: "Luis" };
    const character2 = { id: 2, name: "Gregorio" };
    it("Devuelve el arreglo sin modificar si no encontro un personaje con el ID que se envia", async () => {
      const res = (await agent.delete("/rickandmorty/fav/3")).body;
      expect(res).toContainEqual(character1);
      expect(res).toContainEqual(character2);
    });
    it("Se elimina correctamente el personaje con el ID que se envia", async () => {
      const res = (await agent.delete("/rickandmorty/fav/1")).body;
      expect(res).toContainEqual(character2);
    });
  });
});
