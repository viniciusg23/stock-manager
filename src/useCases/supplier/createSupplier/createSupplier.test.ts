import {describe, expect, test} from "vitest";
import { Supplier } from "../../../entities/Supplier";

describe("creating supplier", () => {
    test("new supplier object", () => {
        const supplier = new Supplier("Nike", "something");

        expect(supplier.getName()).toBe("Nike");

    });
})