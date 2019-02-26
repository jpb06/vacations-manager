// used to allow json data extraction in typescript
declare module "*.json" {
    const value: any;
    export default value;
}