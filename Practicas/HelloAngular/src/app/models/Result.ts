import { Gender, Status } from "./Catalogues";

export interface Result {
    id:            number;
    age:           number | null;
    birthdate:     Date | null;
    gender:        Gender;
    name:          string;
    occupation:    string;
    portrait_path: string;
    phrases:       string[];
    status:        Status;
}
