export enum EnumMonth {
    Janeiro = 1,
    Fevereiro,
    Marco,
    Abril,
    Maio,
    Junho,
    Julho,
    Agosto,
    Setembro,
    Outubro,
    Novembro,
    Dezembro,
}

export function getMonthValue(month: keyof typeof EnumMonth): number | undefined {
    return EnumMonth[month];
}