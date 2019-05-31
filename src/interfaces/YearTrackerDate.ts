import { Exercise } from './Exercise';

export interface YearTrackerDate {
    date: string,
    exercises: Array<Exercise>,
    colorScale: number
}