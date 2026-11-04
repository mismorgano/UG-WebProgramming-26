import { Result } from "./Result";

export interface SimpsonCharacter {
    count:   number;
    next:    string;
    prev:    null;
    pages:   number;
    results: Result[];
}
