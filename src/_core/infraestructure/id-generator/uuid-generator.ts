import { IdGenerator } from "src/_core/application/id-generator/id-generator.interface";
import { v4 } from "uuid";

export class UuidGenerator implements IdGenerator {
    
    generate(): string {
        return v4()
    }

}