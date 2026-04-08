import axios from "axios";

export interface SidraParams {
  table: string | number;         // x
  period?: string;                // default: 'last%201' (último)
  variable?: string | number;     // default: 'allxp'
  geo?: string;                   // default: 'n1/1' (Brasil)
  classific?: string;             // default: vazio
}

/**
 * Constrói a URL e busca dados da API de Valores do SIDRA
 * Baseado na lógica do pacote sidrar
 */
export async function getSidra(params: SidraParams): Promise<any[]> {
  const {
    table,
    period = 'last%201',
    variable = 'allxp',
    geo = 'n1/1',
    classific = ''
  } = params;

  // Montando período
  let p = period;
  if (p === 'last') p = 'last%201';
  if (p === 'first') p = 'first%201';

  // URL Base
  const baseUrl = 'https://apisidra.ibge.gov.br/values';
  const format = '/f/a';     // Cód + Descrições
  const header = '/h/y';     // Retornar cabeçalho na primeira linha
  const digits = '/d/s';     // Padrão

  const classPath = classific ? `/${classific}` : '';
  const url = `${baseUrl}/t/${table}/${geo}/p/${p}/v/${variable}${classPath}${format}${header}${digits}`;

  try {
    const { data } = await axios.get(url);
    if (!Array.isArray(data)) {
        throw new Error("SIDRA retornou um objeto inválido (provavelmente erro na query): " + JSON.stringify(data).substring(0, 50));
    }
    return data;
  } catch (err: any) {
    throw new Error(`Erro ao buscar dados na URL: ${url} -> ${err?.response?.data || err?.message || err}`);
  }
}
