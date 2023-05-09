export interface NameExists {
    readonly type: 'NameExists';
    readonly name: string | null | undefined;
    readonly id?: number;
}
export type CreateError = NameExists;
export interface VersionInvalid {
    readonly type: 'VersionInvalid';
    readonly version: string | undefined;
}
export interface VersionOutdated {
    readonly type: 'VersionOutdated';
    readonly id: number;
    readonly version: number;
}
export interface FilmNotExists {
    readonly type: 'FilmNotExists';
    readonly id: number | undefined;
}
export type UpdateError = FilmNotExists | VersionInvalid | VersionOutdated;
