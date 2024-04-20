import { Expression } from "./types";

function parseExpression(program: string) {
	program = skipSpace(program);
	let match, expr;

	// Spot String
	if (match = /^"([^"]*)"/.exec(program)) {
		expr = { type: "value", value: match[1] };
		// Spot Number
	} else if (match = /^\d+\b/.exec(program)) {
		expr = { type: "value", value: Number(match[0]) }
		// Spot words (identifiers)
	} else if (match = /^[^\s(),#"]+/.exec(program)) {
		expr = { type: "word", name: match[0] }
	} else {
		throw new SyntaxError(`Unexpected syntax: ${program}`)
	}

	return parseApply(expr, program.slice(match[0].length))
}

function skipSpace(program: string) {
	let first = program.search(/\S/)
	if (first == -1) return ""
	return program.slice(first)
}

function parseApply(expr: Expression, program: string) {
	program = skipSpace(program)
	if (program[0] != "(") {
		return { expr, rest: program }
	}

	program = skipSpace(program.slice(1))
	expr = { type: "apply", operator: expr, args: [] }
	while (program[0] != ")") {
		let arg = parseExpression(program)
		expr.args?.push(arg.expr)
		program = skipSpace(arg.rest)

		if (program[0] === ",") {
			program = skipSpace(program.slice(1))
		} else if (program[0] !== ")") {
			throw new SyntaxError("Expected ',' or ')'")
		}
	}

	return parseApply(expr, program.slice(1))
}

function parse(program: string) {
	let { expr, rest } = parseExpression(program)
	if (skipSpace(rest).length > 0) {
		throw new SyntaxError("Unexpected text after program")
	}
	return expr;
}

const specialForms = Object.create(null)

// @ts-ignore
function evaluate(expr: Expression, scope: { [key: string]: any }): any {
	if (expr.type === "value") {
		return expr.value
	} else if (expr.type === "word") {
		if (expr.name && expr.name in scope) {
			return scope[expr.name]
		} else {
			throw new ReferenceError(`Undefined binding: ${expr.name}`)
		}
	} else if (expr.type === "apply") {
		let { operator, args } = expr as { operator: { type: string, name: string }, args: Array<Expression> };
		if (operator.type === "word" && operator.name in specialForms) {
			return specialForms[operator.name](expr.args, scope)
		} else {
			let op = evaluate(operator, scope)
			if (typeof op === "function") {
				return op(...args?.map(arg => evaluate(arg, scope)))
			} else {
				throw new TypeError("Applying a non-function.")
			}
		}
	}
}

console.log(parse("+(a, 10)"))
