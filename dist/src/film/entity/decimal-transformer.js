export class DecimalTransformer {
    to(decimal) {
        return decimal?.toString();
    }
    from(decimal) {
        return decimal === undefined ? undefined : Number(decimal);
    }
}
//# sourceMappingURL=decimal-transformer.js.map