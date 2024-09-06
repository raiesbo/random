import { Expression, Scope } from "./types";


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
function evaluate(expr: Expression, scope: Scope): any {
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

specialForms.if = (args: Array<Expression>, scope: Scope) => {
	if (args.length != 3) {
		throw new SyntaxError("Wrong number of args to if")
	} else if (evaluate(args[0], scope) !== false) {
		return evaluate(args[1], scope)
	} else {
		return evaluate(args[2], scope)
	}
}

specialForms.do = (args: Array<Expression>, scope: Scope) => {
	let value = false;
	for (let arg of args) {
		value = evaluate(arg, scope)
	}
	return value
}

specialForms.while = (args: Array<Expression>, scope: Scope) => {
	if (args.length != 2) {
		throw new SyntaxError("Wrong number of args to while")
	}
	while (evaluate(args[0], scope) !== false) {
		evaluate(args[1], scope)
	}

	// Since udefined does not exist in Egg, we return false,
	// for lack of meaningful result.
	return false
}

specialForms.define = (args: Array<Expression>, scope: Scope) => {
	if (args.length != 2 || args[0].type != 'word') {
		throw new SyntaxError("Incorrect use of define")
	}
	let value = evaluate(args[1], scope)
	scope[args[0]?.name || ''] = value
	return value
}

specialForms.fun = (args: Array<Expression>, scope: Scope) => {
	if (!args.length) {
		throw new SyntaxError("Functions need a body")
	}
	let body = args[args.length - 1]
	let params = args.slice(0, args.length - 1).map(expr => {
		if (expr.type != "word") {
			throw new SyntaxError("Parameter names must be words")
		}
		return expr.name
	})

	return function () {
		if (arguments.length != params.length) {
			throw new TypeError("Wrong number of arguments")
		}
		let localScope = Object.create(scope)
		for (let i = 0; i < arguments.length; i++) {
			localScope[params[i] as string] = arguments[i]
		}
		return evaluate(body, localScope)
	}
}

const topScope = Object.create(null)
topScope.true = true
topScope.false = false

for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
	topScope[op] = Function("a, b", `return a ${op} b;`)
}

topScope.print = (value: any) => {
	console.log(value)
	return value
}

export default function run(program: string) {
	return evaluate(parse(program), Object.create(topScope))
}

run(`
do(define(total, 0),
	define(count, 1),
	while(<(count, 11),
		do(define(total, +(total, count)),
			define(count, +(count, 1)))),
	print(total))
`) // 55

run(`
do(define(plusOne, fun(a, +(a,1))),
	print(plusOne(10)))
`) // 11

run(`
do(define(pow, fun(base, exp,
	if(==(exp, 0),
		1,
		*(base, pow(base, -(exp, 1)))))),
	print(pow(2, 10)))
`) // 1024
