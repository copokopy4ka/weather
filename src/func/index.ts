import { weatherApi } from '../variables'

export const makeUrl = (lat: number, lng: number) => {
    return {
        metric: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,alerts&units=metric&appid=${weatherApi}`,
        imperial: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,alerts&units=imperial&appid=${weatherApi}`
    }
}

export const getIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export const getTime = (unix: number) => {
    return new Date(unix * 1000).toLocaleTimeString('en-US', {hour12: false}).slice(0, -3)
}

export const getDay = (unix: number) => {
    const dayNumber = new Date(unix * 1000).getDay();

    switch(dayNumber) {
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
    }
}

export const getWindName = (windSpeed: number) => {
    if (windSpeed < 2) {
        return 'Calm';
    } else if (windSpeed >= 2 && windSpeed < 6) {
        return 'Light air';
    } else if (windSpeed >= 6 && windSpeed < 12) {
        return 'Light breeze';
    } else if (windSpeed >= 12 && windSpeed < 20) {
        return 'Gentle breeze';
    } else if (windSpeed >= 20 && windSpeed < 29) {
        return 'Moderate breeze';
    } else if (windSpeed >= 29 && windSpeed < 39) {
        return 'Fresh breeze';
    } else if (windSpeed >= 39 && windSpeed < 50) {
        return 'Strong breeze';
    } else if (windSpeed >= 50 && windSpeed < 62) {
        return 'High wind';
    } else if (windSpeed >= 62 && windSpeed < 75) {
        return 'Gale';
    } else if (windSpeed >= 75 && windSpeed < 89) {
        return 'Strong/severe gale';
    } else if (windSpeed >= 89 && windSpeed < 103) {
        return 'Storm';
    } else if (windSpeed >= 103 && windSpeed < 117) {
        return 'Violent storm';
    } else {
        return 'Hurricane force';
    }
}