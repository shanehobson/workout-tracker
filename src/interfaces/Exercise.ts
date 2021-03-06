export interface Exercise {
    date: string,
    type: string,
    name: string,
    sets: number,
    reps: number,
    miles: number,
    bodyParts: Array<string>,
    _id?: string,
    createdAt?: string,
    updatedAt?: string,
    imageUrl?: string
}