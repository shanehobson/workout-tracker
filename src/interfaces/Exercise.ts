export interface Exercise {
    date: string,
    type: string,
    name: string,
    sets: number,
    reps: number,
    miles: number,
    bodyParts: Array<string>
}