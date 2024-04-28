export type Expression = {
    type: string,
    value?: Value,
    name?: string,
    operator?: Expression,
    args?: Array<Expression>,
    rest?: string
}

export type Value = string | number

export type Scope = { [key: string]: any }