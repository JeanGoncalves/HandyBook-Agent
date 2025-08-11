class HandyBookAgent {
  private name: string;

  constructor() {
    this.name = "HandyBook-Agent";
  }

  public sayHello(): void {
    console.log(`🚀 ${this.name} iniciado com sucesso!`);
    console.log("✨ Concierge de serviços para profissionais");
    console.log("🔧 Mecânicos, manicures, pedreiros e mais...");
    console.log("📍 Busca por localização, preço e avaliação");
    console.log("📅 Consulta de agendas e reservas");
    console.log("💬 Solicitação de orçamentos e avaliações");
  }

  public getStatus(): string {
    return `${this.name} está funcionando perfeitamente!`;
  }
}

function main(): void {
  const agent = new HandyBookAgent();
  agent.sayHello();
  
  console.log("\n" + "=".repeat(50));
  console.log(`Status: ${agent.getStatus()}`);
  console.log("=".repeat(50));
}

if (require.main === module) {
  main();
}

export { HandyBookAgent };
