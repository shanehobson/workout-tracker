import { Exercise } from './Exercise';

export interface TrackerDate {
    date: string,
    exercises: Array<Exercise>,
    colorScale: number
}