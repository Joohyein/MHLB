import { init, track, setUserId, reset } from '@amplitude/analytics-browser';

const apiKey:any = process.env.REACT_APP_API_KEY;

export const initAmplitude = () => {
    init(apiKey);
};

export const logEvent = (eventName:string, eventProperty:any) => {
    track(eventName, eventProperty);
};

export const setAmplitudeUserId = (userId:any) => {
    setUserId(userId);
};

export const resetAmplitude = () => {
    reset();
};