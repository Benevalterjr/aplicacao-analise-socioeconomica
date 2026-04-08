import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  calculateCulturalVulnerability,
  getRedNossaSaoPauloData,
} from "../src/ibge";

describe("IBGE Integration", () => {
  describe("calculateCulturalVulnerability", () => {
    it("deve calcular vulnerabilidade cultural com equipamentos = 0", () => {
      const result = calculateCulturalVulnerability(0);
      // Fórmula: (1 / (0 + 0.1)) * 100 = (1 / 0.1) * 100 = 10 * 100 = 1000
      expect(result).toBe(1000);
    });

    it("deve calcular vulnerabilidade cultural com equipamentos > 0", () => {
      const result = calculateCulturalVulnerability(5);
      // Fórmula: (1 / (5 + 0.1)) * 100 = (1 / 5.1) * 100 ≈ 19.61
      expect(result).toBeCloseTo(19.61, 1);
    });

    it("deve calcular vulnerabilidade cultural com equipamentos = 1", () => {
      const result = calculateCulturalVulnerability(1);
      // Fórmula: (1 / (1 + 0.1)) * 100 = (1 / 1.1) * 100 ≈ 90.91
      expect(result).toBeCloseTo(90.91, 1);
    });

    it("deve retornar valor arredondado para 2 casas decimais", () => {
      const result = calculateCulturalVulnerability(3);
      // Verificar se tem no máximo 2 casas decimais
      const decimalPart = result.toString().split(".")[1];
      expect(decimalPart?.length || 0).toBeLessThanOrEqual(2);
    });
  });

  describe("getRedNossaSaoPauloData", () => {
    it("deve retornar objeto com todos os campos necessários", () => {
      const data = getRedNossaSaoPauloData();
      expect(data).toHaveProperty("incomePerCapita");
      expect(data).toHaveProperty("averageDeathAge");
      expect(data).toHaveProperty("culturalEquipments");
      expect(data).toHaveProperty("idhM");
    });

    it("deve retornar valores numéricos válidos", () => {
      const data = getRedNossaSaoPauloData();
      expect(typeof data.incomePerCapita).toBe("number");
      expect(typeof data.averageDeathAge).toBe("number");
      expect(typeof data.culturalEquipments).toBe("number");
      expect(typeof data.idhM).toBe("number");
    });

    it("deve retornar renda per capita positiva", () => {
      const data = getRedNossaSaoPauloData();
      expect(data.incomePerCapita).toBeGreaterThan(0);
    });

    it("deve retornar IDH-M entre 0 e 1", () => {
      const data = getRedNossaSaoPauloData();
      expect(data.idhM).toBeGreaterThanOrEqual(0);
      expect(data.idhM).toBeLessThanOrEqual(1);
    });

    it("deve retornar idade média de morte positiva", () => {
      const data = getRedNossaSaoPauloData();
      expect(data.averageDeathAge).toBeGreaterThan(0);
    });

    it("deve retornar equipamentos culturais não-negativo", () => {
      const data = getRedNossaSaoPauloData();
      expect(data.culturalEquipments).toBeGreaterThanOrEqual(0);
    });

    it("deve retornar dados consistentes entre chamadas", () => {
      const data1 = getRedNossaSaoPauloData();
      const data2 = getRedNossaSaoPauloData();
      expect(data1).toEqual(data2);
    });
  });

  describe("Validação de Fórmulas", () => {
    it("deve validar a fórmula de vulnerabilidade cultural conforme especificação", () => {
      // Teste específico para validar a fórmula exata do script original
      // gap_score = (1 / (equipamentos_culturais + 0.1)) * 100

      const equipamentos = 0;
      const expected = (1 / (equipamentos + 0.1)) * 100;
      const result = calculateCulturalVulnerability(equipamentos);

      expect(result).toBe(Math.round(expected * 100) / 100);
    });

    it("deve validar dados da Rede Nossa São Paulo conforme especificação", () => {
      const data = getRedNossaSaoPauloData();

      // Validar valores específicos mencionados no script original
      expect(data.incomePerCapita).toBe(2554.87);
      expect(data.averageDeathAge).toBe(73.5);
      expect(data.culturalEquipments).toBe(0);
      expect(data.idhM).toBe(0.902);
    });
  });
});
