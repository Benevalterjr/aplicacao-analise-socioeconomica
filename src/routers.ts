import { publicProcedure, router } from "./_core/trpc";
import { fetchAllIndicators } from "./ibge";
import { getLatestVilaSoniaIndicators, upsertVilaSoniaIndicators } from "./db";

let indicatorsCache: any = null;

export const appRouter = router({

  vilaSonia: router({
    getIndicators: publicProcedure.query(async () => {
      const dbIndicators = await getLatestVilaSoniaIndicators();
      if (dbIndicators) {
        return dbIndicators;
      }
      return indicatorsCache;
    }),

    updateIndicators: publicProcedure.mutation(async () => {
      const indicators = await fetchAllIndicators();
      if (!indicators) {
        throw new Error("Failed to fetch indicators from IBGE");
      }

      // Convert to Decimal string format for MySQL decimal type
      const toDecimalString = (value: number | null): string | null => {
        return value !== null ? value.toString() : null;
      };

      try {
        await upsertVilaSoniaIndicators({
          // ... (values defined below)
          populationTotal: indicators.populationTotal,
          populationBlack: indicators.populationBlack,
          populationPardo: indicators.populationPardo,
          populationWhite: indicators.populationWhite,
          populationYellow: indicators.populationYellow,
          populationIndigenous: indicators.populationIndigenous,
          percentageBlackPardo: toDecimalString(
            indicators.percentageBlackPardo
          ) as any,
          incomePerCapita: toDecimalString(
            indicators.incomePerCapita
          ) as any,
          idhM: toDecimalString(indicators.idhM) as any,
          averageDeathAge: toDecimalString(
            indicators.averageDeathAge
          ) as any,
          culturalEquipments: indicators.culturalEquipments,
          culturalVulnerability: toDecimalString(
            indicators.culturalVulnerability
          ) as any,
          dataSource: "IBGE Censo 2022 + Rede Nossa São Paulo 2024",
        });
      } catch (err) {
        console.warn("Could not save to DB, using in-memory cache", err);
      }

      indicatorsCache = {
        ...indicators,
        lastUpdated: new Date()
      };

      return indicators;
    }),
  }),
});

export type AppRouter = typeof appRouter;
