import ForecastConditionEnum from "./enums/ForecastConditionEnum.ts";

export const getWeatherIcon = (condition: ForecastConditionEnum) => {
    return `/assets/images/hg-conditions/${condition}.svg`;
}