import { IdGenerator } from "src/_core";
import { v4 } from "uuid";

export class UUIDGenerator implements IdGenerator {
    
    generate(): string {
        return v4()
    }

}